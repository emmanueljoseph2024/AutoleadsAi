import { logger } from '../utils/logger.js';
import { User, Lead, Scan, EmailLog } from '../models/index.js';
import { emailQueue } from '../queues/email.queue.js';

// Generate and send weekly report emails to users
export const scheduleWeeklyReports = async () => {
  try {
    const users = await User.find({
      isActive: true,
      'subscription.status': { $in: ['active', 'trialing'] },
      'settings.weeklyReportEnabled': { $ne: false }, // Enabled by default
    });

    for (const user of users) {
      await emailQueue.add(
        'weekly_report',
        { userId: user._id.toString() },
        {
          repeat: {
            pattern: '0 9 * * 1', // Monday at 9 AM
            key: `report:weekly:${user._id}`,
          },
          jobId: `report:weekly:${user._id}`,
        }
      );
    }

    logger.info(`Weekly reports scheduled for ${users.length} users`);
  } catch (error) {
    logger.error('Failed to schedule weekly reports:', error);
  }
};

// Generate report data for a user
export const generateUserReport = async (userId) => {
  try {
    const now = new Date();
    const weekAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);

    const [newLeads, hotLeads, emailsSent, emailsOpened, scansRun] = await Promise.all([
      Lead.countDocuments({
        userId,
        createdAt: { $gte: weekAgo },
      }),
      Lead.countDocuments({
        userId,
        qualification: 'hot',
        createdAt: { $gte: weekAgo },
      }),
      EmailLog.countDocuments({
        userId,
        createdAt: { $gte: weekAgo },
      }),
      EmailLog.countDocuments({
        userId,
        status: { $in: ['opened', 'clicked', 'replied'] },
        createdAt: { $gte: weekAgo },
      }),
      Scan.countDocuments({
        userId,
        createdAt: { $gte: weekAgo },
      }),
    ]);

    return {
      period: `${weekAgo.toLocaleDateString()} - ${now.toLocaleDateString()}`,
      newLeads,
      hotLeads,
      emailsSent,
      emailsOpened,
      openRate: emailsSent ? ((emailsOpened / emailsSent) * 100).toFixed(1) : 0,
      scansRun,
    };
  } catch (error) {
    logger.error(`Failed to generate report for user ${userId}:`, error);
    return null;
  }
};

// Remove weekly report schedule for a user
export const removeUserReportSchedule = async (userId) => {
  try {
    const jobs = await emailQueue.getRepeatableJobs();
    const reportJob = jobs.find((job) => job.id === `report:weekly:${userId}`);

    if (reportJob) {
      await emailQueue.removeRepeatableByKey(reportJob.key);
      logger.info(`Removed weekly report schedule for user: ${userId}`);
    }
  } catch (error) {
    logger.error(`Failed to remove report schedule for user ${userId}:`, error);
  }
};