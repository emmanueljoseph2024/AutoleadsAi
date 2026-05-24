import { followUpQueue } from '../queues/followUp.queue.js';
import { logger } from '../utils/logger.js';

// Start the recurring follow‑up check (runs every 30 minutes)
export const scheduleFollowUpCheck = async () => {
  try {
    // Remove any existing repeatable job with the same key
    const existingJobs = await followUpQueue.getRepeatableJobs();
    const followUpJob = existingJobs.find((job) => job.id === 'followup:check');

    if (followUpJob) {
      await followUpQueue.removeRepeatableByKey(followUpJob.key);
      logger.info('Removed existing follow‑up check schedule');
    }

    // Schedule global follow‑up check every 30 minutes
    await followUpQueue.add(
      'check_sequences',
      {},
      {
        repeat: {
          pattern: '*/30 * * * *', // Every 30 minutes
          key: 'followup:check',
        },
        jobId: 'followup:check',
      }
    );

    logger.info('Follow‑up check scheduled every 30 minutes');
  } catch (error) {
    logger.error('Failed to schedule follow‑up check:', error);
  }
};

// Schedule follow‑up steps for a specific lead based on workflow config
export const scheduleLeadFollowUp = async (leadId, workflowSteps, delayDays = 2) => {
  try {
    const delayMs = delayDays * 24 * 60 * 60 * 1000;

    for (let i = 0; i < workflowSteps.length; i++) {
      const step = workflowSteps[i];

      if (step.type === 'email') {
        await followUpQueue.add(
          'process_sequence',
          {
            leadId: leadId.toString(),
            stepIndex: i,
            stepType: step.type,
          },
          {
            delay: delayMs * (i + 1), // Stagger each step
            jobId: `followup:${leadId}:step:${i}`,
          }
        );
      }
    }

    logger.info(`Follow‑up sequence scheduled for lead: ${leadId}`);
  } catch (error) {
    logger.error(`Failed to schedule follow‑up for lead ${leadId}:`, error);
  }
};

// Cancel follow‑up sequence for a lead (e.g., when they reply)
export const cancelLeadFollowUp = async (leadId) => {
  try {
    // Remove all delayed jobs for this lead
    const jobs = await followUpQueue.getDelayed();
    const leadJobs = jobs.filter((job) => job.id?.startsWith(`followup:${leadId}`));

    for (const job of leadJobs) {
      await job.remove();
    }

    logger.info(`Follow‑up sequence cancelled for lead: ${leadId}`);
  } catch (error) {
    logger.error(`Failed to cancel follow‑up for lead ${leadId}:`, error);
  }
};