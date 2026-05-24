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

        // Mark lead as scored (n8n webhook will update the actual scores)
        await Lead.findByIdAndUpdate(leadId, { status: 'scored' });

        eventBus.emitEvent(EVENT_TYPES.LEAD_SCORED, { leadId });
        break;
      }

      // ─── Enrich a single lead ─────────────────────
      case 'enrich_lead': {
        const { leadId } = data;
        logger.info(`Enriching lead: ${leadId}`);

        await executeLeadInsights(leadId);
        break;
      }

      // ─── Deduplicate leads ────────────────────────
      case 'dedup_leads': {
        const { leads } = data;
        logger.info(`Deduplicating ${leads.length} leads`);

        for (const lead of leads) {
          const duplicates = await Lead.find({
            userId: lead.userId,
            email: lead.email,
            _id: { $ne: lead._id },
          });

          if (duplicates.length > 0) {
            await Lead.findByIdAndUpdate(lead._id, { status: 'disqualified' });
          }
        }
        break;
      }

      // ─── Execute workflow ─────────────────────────
      case 'execute_workflow': {
        const { eventType, leadId } = data;
        logger.info(`Executing workflow for lead ${leadId}: ${eventType}`);

        if (eventType === 'lead.qualified.hot') {
          eventBus.emitEvent(EVENT_TYPES.LEAD_QUALIFIED_HOT, { leadId });
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