import { Queue } from 'bullmq';
import { getRedisConnection } from '../config/redis.js';

const connection = getRedisConnection();

// Email outreach queue
export const emailQueue = new Queue('email:outreach', {
  connection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 5000,
    },
    removeOnComplete: 100,
    removeOnFail: 200,
  },
});

// ─── Job creators ──────────────────────────────────

export const enqueueEmail = async (leadId, type = 'initial') => {
  await emailQueue.add(
    'send_email',
    {
      leadId: leadId.toString(),
      type,
    },
    {
      priority: type === 'initial' ? 1 : 10,
    }
  );
};

export const enqueueBulkEmails = async (leadIds, type = 'initial') => {
  const jobs = leadIds.map((leadId) => ({
    name: 'send_email',
    data: { leadId: leadId.toString(), type },
    opts: { priority: type === 'initial' ? 1 : 10 },
  }));
  await emailQueue.addBulk(jobs);
};

export const enqueueFollowUp = async (leadId, step) => {
  await emailQueue.add(
    'send_follow_up',
    {
      leadId: leadId.toString(),
      step,
    },
    {
      delay: step === 1 ? 2 * 24 * 60 * 60 * 1000 : 3 * 24 * 60 * 60 * 1000, // 2 days for first follow-up, 3 for rest
    }
  );
};