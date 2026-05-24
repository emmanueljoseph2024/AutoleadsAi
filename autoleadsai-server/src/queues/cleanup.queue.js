import { Queue } from 'bullmq';
import { getRedisConnection } from '../config/redis.js';

const connection = getRedisConnection();

// Cleanup queue (logs, expired tokens, temp data)
export const cleanupQueue = new Queue('cleanup', {
  connection,
  defaultJobOptions: {
    attempts: 1,
    removeOnComplete: 10,
    removeOnFail: 10,
  },
});

// ─── Job creators ──────────────────────────────────

export const enqueueCleanupExpiredTokens = async () => {
  await cleanupQueue.add(
    'cleanup_tokens',
    {},
    {
      repeat: {
        pattern: '0 3 * * *', // Daily at 3 AM
      },
    }
  );
};

export const enqueueCleanupOldLogs = async () => {
  await cleanupQueue.add(
    'cleanup_logs',
    {},
    {
      repeat: {
        pattern: '0 4 * * 0', // Weekly on Sunday at 4 AM
      },
    }
  );
};

export const enqueueCleanupInactiveAccounts = async () => {
  await cleanupQueue.add(
    'cleanup_inactive',
    {},
    {
      repeat: {
        pattern: '0 5 1 * *', // Monthly on the 1st at 5 AM
      },
    }
  );
};