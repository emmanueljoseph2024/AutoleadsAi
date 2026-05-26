import { Worker } from 'bullmq';
import { getRedisConnection } from '../config/redis.js';
import { Lead, AIInsight } from '../models/index.js';
import { eventBus, EVENT_TYPES } from '../events/index.js';
import { logger } from '../utils/logger.js';
import {
  executeLeadScoring,
  executeLeadInsights,
  executeBatchInsights,
} from '../services/n8n/workflowExecutor.service.js';

const connection = getRedisConnection();

const leadProcessor = new Worker(
  'lead:processing',
  async (job) => {
    const { name, data } = job;

    switch (name) {
      // ─── Score a single lead ──────────────────────
      case 'score_lead': {
        const { leadId } = data;
        logger.info(`Scoring lead: ${leadId}`);

        // Trigger n8n AI scoring workflow
        await executeLeadScoring(leadId);

        // Fetch updated lead to get score and userId
        const updatedLead = await Lead.findById(leadId).select('userId intent relevance qualification status').lean();

        if (updatedLead) {
          // Emit real-time scoring event with user context
          eventBus.emitEvent(EVENT_TYPES.LEAD_SCORED, {
            leadId,
            userId: updatedLead.userId,
            intentScore: updatedLead.intent?.score || 0,
            relevanceScore: updatedLead.relevance?.score || 0,
            qualification: updatedLead.qualification,
            status: updatedLead.status,
          });
        }

        break;
      }

      // ─── Enrich a single lead ─────────────────────
      case 'enrich_lead': {
        const { leadId } = data;
        logger.info(`Enriching lead: ${leadId}`);

        await executeLeadInsights(leadId);

        // Emit enrichment complete
        const enrichedLead = await Lead.findById(leadId).select('userId').lean();
        if (enrichedLead) {
          eventBus.emitEvent(EVENT_TYPES.LEAD_ENRICHED, {
            leadId,
            userId: enrichedLead.userId,
          });
        }

        break;
      }

      // ─── Deduplicate leads ────────────────────────
      case 'dedup_leads': {
        const { leads } = data;
        logger.info(`Deduplicating ${leads.length} leads`);

        let disqualifiedCount = 0;

        for (const lead of leads) {
          const duplicates = await Lead.find({
            userId: lead.userId,
            email: lead.email,
            _id: { $ne: lead._id },
          });

          if (duplicates.length > 0) {
            await Lead.findByIdAndUpdate(lead._id, { status: 'disqualified' });
            disqualifiedCount++;
          }
        }

        // Emit dedup result
        if (leads.length > 0) {
          eventBus.emitEvent(EVENT_TYPES.LEAD_DISQUALIFIED, {
            userId: leads[0].userId,
            totalProcessed: leads.length,
            disqualified: disqualifiedCount,
            kept: leads.length - disqualifiedCount,
          });
        }

        break;
      }

      // ─── Execute workflow ─────────────────────────
      case 'execute_workflow': {
        const { eventType, leadId } = data;
        logger.info(`Executing workflow for lead ${leadId}: ${eventType}`);

        if (eventType === 'lead.qualified.hot') {
          const lead = await Lead.findById(leadId).select('userId name company qualification').lean();
          if (lead) {
            eventBus.emitEvent(EVENT_TYPES.LEAD_QUALIFIED_HOT, {
              leadId,
              userId: lead.userId,
              leadName: lead.name,
              company: lead.company,
              qualification: lead.qualification,
            });
          }
        } else if (eventType === 'new_lead') {
          await executeLeadScoring(leadId);
        }
        break;
      }

      default:
        logger.warn(`Unknown job name: ${name}`);
    }
  },
  { connection, concurrency: 5 }
);

logger.info('Lead Processor Worker started');
export default leadProcessor;