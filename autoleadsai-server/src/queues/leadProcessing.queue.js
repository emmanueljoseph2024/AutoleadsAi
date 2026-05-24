import { Queue } from 'bullmq';
import { getRedisConnection } from '../config/redis.js';

const connection = getRedisConnection();

// Lead scoring and enrichment queue
export const leadProcessingQueue = new Queue('lead:processing', {
  connection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000,
    },
    removeOnComplete: 200,
    removeOnFail: 500,
  },
});

// ─── Job creators ──────────────────────────────────

export const enqueueLeadScoring = async (leadId) => {
  await leadProcessingQueue.add('score_lead', {
    leadId: leadId.toString(),
  });
};

export const enqueueLeadEnrichment = async (leadId) => {
  await leadProcessingQueue.add('enrich_lead', {
    leadId: leadId.toString(),
  });
};

export const enqueueLeadDeduplication = async (leads) => {
  await leadProcessingQueue.add('dedup_leads', {
    leads,
  });
};

export const enqueueBatchLeadProcessing = async (leadIds) => {
  const jobs = leadIds.map((leadId) => ({
    name: 'score_lead',
    data: { leadId: leadId.toString() },
    opts: { priority: 1 },
  }));
  await leadProcessingQueue.addBulk(jobs);
};

// Trigger workflow execution after scoring
export const enqueueWorkflow = async (eventType, leadId) => {
  await leadProcessingQueue.add(
    'execute_workflow',
    {
      eventType,
      leadId: leadId.toString(),
    },
    {
      priority: eventType === 'lead.qualified.hot' ? 1 : 100,
    }
  );
};