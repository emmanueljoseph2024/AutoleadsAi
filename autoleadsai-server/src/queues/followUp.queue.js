import { Queue } from 'bullmq';
import { getRedisConnection } from '../config/redis.js';

const connection = getRedisConnection();

// Follow‑up sequence management queue
export const followUpQueue = new Queue('followup:sequence', {
  connection,
  defaultJobOptions: {
    attempts: 2,
    backoff: {
      type: 'fixed',
      delay: 60000,
    },
    removeOnComplete: 100,
    removeOnFail: 200,
  },
});

// ─── Job creators ──────────────────────────────────

export const enqueueFollowUpCheck = async (userId) => {
  await followUpQueue.add(
    'check_sequences',
    { userId: userId.toString() },
    {
      repeat: {
        pattern: '*/30 * * * *', // Every 30 minutes
      },
    }
  );
};

export const enqueueProcessSequence = async (leadId, workflowId) => {
  await followUpQueue.add('process_sequence', {
    leadId: leadId.toString(),
    workflowId: workflowId.toString(),
  });
};