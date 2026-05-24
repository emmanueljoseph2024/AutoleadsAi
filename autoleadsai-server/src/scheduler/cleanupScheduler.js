import { cleanupQueue } from '../queues/cleanup.queue.js';
import { logger } from '../utils/logger.js';

// Schedule all cleanup jobs
export const scheduleCleanupJobs = async () => {
  try {
    // Remove existing repeatable cleanup jobs
    const existingJobs = await cleanupQueue.getRepeatableJobs();
    for (const job of existingJobs) {
      await cleanupQueue.removeRepeatableByKey(job.key);
    }

    // 1. Clean expired refresh tokens — daily at 3 AM
    await cleanupQueue.add(
      'cleanup_tokens',
      {},
      {
        repeat: {
          pattern: '0 3 * * *',
          key: 'cleanup:tokens',
        },
        jobId: 'cleanup:tokens',
      }
    );
    logger.info('Token cleanup scheduled daily at 3 AM');

    // 2. Clean old event logs — weekly on Sunday at 4 AM
    await cleanupQueue.add(
      'cleanup_logs',
      { retentionDays: 30 },
      {
        repeat: {
          pattern: '0 4 * * 0',
          key: 'cleanup:logs',
        },
        jobId: 'cleanup:logs',
      }
    );
    logger.info('Log cleanup scheduled weekly on Sunday at 4 AM');

    // 3. Clean inactive accounts — monthly on the 1st at 5 AM
    await cleanupQueue.add(
      'cleanup_inactive',
      { inactiveDays: 90 },
      {
        repeat: {
          pattern: '0 5 1 * *',
          key: 'cleanup:inactive',
        },
        jobId: 'cleanup:inactive',
      }
    );
    logger.info('Inactive account cleanup scheduled monthly on the 1st at 5 AM');

    // 4. Clean blacklisted tokens — daily at 2 AM
    await cleanupQueue.add(
      'cleanup_blacklisted',
      {},
      {
        repeat: {
          pattern: '0 2 * * *',
          key: 'cleanup:blacklisted',
        },
        jobId: 'cleanup:blacklisted',
      }
    );
    logger.info('Blacklisted token cleanup scheduled daily at 2 AM');

  } catch (error) {
    logger.error('Failed to schedule cleanup jobs:', error);
  }
};