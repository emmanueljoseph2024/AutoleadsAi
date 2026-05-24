import { scraperQueue } from '../queues/scraper.queue.js';
import { logger } from '../utils/logger.js';
import { User } from '../models/index.js';

// Schedule recurring scans for users who have auto‑scan enabled
export const scheduleRecurringScans = async () => {
  try {
    // Find users with active subscriptions who have recurring scans enabled
    const users = await User.find({
      isActive: true,
      'subscription.status': { $in: ['active', 'trialing'] },
      'settings.autoScanEnabled': true,
    });

    for (const user of users) {
      const interval = user.settings?.scanInterval || 'daily'; // 'hourly', 'daily', 'weekly'

      // Remove existing repeatable job for this user
      const existingJobs = await scraperQueue.getRepeatableJobs();
      const userJob = existingJobs.find((job) => job.id === `scan:user:${user._id}`);
      if (userJob) {
        await scraperQueue.removeRepeatableByKey(userJob.key);
      }

      // Determine cron pattern based on interval
      const cronMap = {
        hourly: '0 * * * *',      // Every hour
        daily: '0 6 * * *',       // Daily at 6 AM
        weekly: '0 7 * * 1',      // Weekly on Monday at 7 AM
      };

      // Schedule recurring scan
      await scraperQueue.add(
        'recurring_scan',
        {
          userId: user._id.toString(),
          sources: user.settings?.defaultSources || ['linkedin', 'website'],
        },
        {
          repeat: {
            pattern: cronMap[interval] || cronMap.daily,
            key: `scan:user:${user._id}`,
          },
          jobId: `scan:user:${user._id}`,
        }
      );

      logger.info(`Scheduled ${interval} scan for user: ${user._id}`);
    }

    logger.info(`Recurring scans scheduled for ${users.length} users`);
  } catch (error) {
    logger.error('Failed to schedule recurring scans:', error);
  }
};

// Remove scheduled scan for a specific user (when they disable or cancel)
export const removeUserScanSchedule = async (userId) => {
  try {
    const jobs = await scraperQueue.getRepeatableJobs();
    const userJob = jobs.find((job) => job.id === `scan:user:${userId}`);

    if (userJob) {
      await scraperQueue.removeRepeatableByKey(userJob.key);
      logger.info(`Removed scan schedule for user: ${userId}`);
    }
  } catch (error) {
    logger.error(`Failed to remove scan schedule for user ${userId}:`, error);
  }
};