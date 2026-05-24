import { scheduleRecurringScans, removeUserScanSchedule } from './scanScheduler.js';
import { scheduleFollowUpCheck, scheduleLeadFollowUp, cancelLeadFollowUp } from './followUpScheduler.js';
import { scheduleCleanupJobs } from './cleanupScheduler.js';
import { scheduleWeeklyReports, generateUserReport, removeUserReportSchedule } from './reportScheduler.js';
import { logger } from '../utils/logger.js';

// ─── Initialize All Schedulers ─────────────────────

export const startAllSchedulers = async () => {
  try {
    logger.info('Starting all schedulers...');

    await scheduleRecurringScans();
    await scheduleFollowUpCheck();
    await scheduleCleanupJobs();
    await scheduleWeeklyReports();

    logger.info('All schedulers started successfully');
  } catch (error) {
    logger.error('Failed to start schedulers:', error);
  }
};

// ─── User‑Specific Scheduler Management ───────────

export const setupUserSchedulers = async (userId) => {
  try {
    // These are set up automatically via repeatable jobs when:
    // 1. User enables auto‑scan (scanScheduler handles it)
    // 2. User signs up (weekly report is scheduled)
    // 3. User creates a workflow (follow‑up scheduler handles it)
    logger.info(`Schedulers initialised for user: ${userId}`);
  } catch (error) {
    logger.error(`Failed to setup schedulers for user ${userId}:`, error);
  }
};

export const removeUserSchedulers = async (userId) => {
  try {
    await removeUserScanSchedule(userId);
    await removeUserReportSchedule(userId);
    // Follow‑ups are cancelled per‑lead when they reply or are disqualified
    logger.info(`All schedulers removed for user: ${userId}`);
  } catch (error) {
    logger.error(`Failed to remove schedulers for user ${userId}:`, error);
  }
};

// ─── Re‑exports for direct use ────────────────────

export {
  scheduleRecurringScans,
  removeUserScanSchedule,
  scheduleFollowUpCheck,
  scheduleLeadFollowUp,
  cancelLeadFollowUp,
  scheduleCleanupJobs,
  scheduleWeeklyReports,
  generateUserReport,
  removeUserReportSchedule,
};