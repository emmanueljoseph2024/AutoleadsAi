import { Worker } from 'bullmq';
import { getRedisConnection } from '../config/redis.js';
import { NurtureSequence, Lead } from '../models/index.js';
import { logger } from '../utils/logger.js';
import { executeNurtureStep } from '../services/n8n/workflowExecutor.service.js';

const connection = getRedisConnection();

const followUpWorker = new Worker(
  'followup:sequence',
  async (job) => {
    const { name, data } = job;

    switch (name) {
      // ─── Global follow-up check (every 30 min) ────
      case 'check_sequences': {
        logger.info('Running global follow-up check');

        const activeSequences = await NurtureSequence.find({
          status: 'active',
          currentStep: { $lt: 7 },
        });

        for (const seq of activeSequences) {
          const lastStep = seq.steps[seq.currentStep - 1];
          if (!lastStep || lastStep.status === 'pending') continue;

          const daysSinceLastStep = Math.floor(
            (Date.now() - new Date(lastStep.sentAt || seq.startedAt).getTime()) /
              (1000 * 60 * 60 * 24)
          );

          // Check if it's time for the next step
          if (daysSinceLastStep >= seq.steps[seq.currentStep]?.delayDays || 2) {
            await executeNurtureStep(seq._id, seq.currentStep + 1);
          }
        }
        break;
      }

      // ─── Process a single sequence step ───────────
      case 'process_sequence': {
        const { leadId, stepIndex } = data;
        logger.info(`Processing follow-up for lead ${leadId}, step ${stepIndex}`);

        const sequence = await NurtureSequence.findOne({
          leadId,
          status: 'active',
        });

        if (!sequence) {
          logger.warn(`No active sequence found for lead ${leadId}`);
          return;
        }

        await executeNurtureStep(sequence._id, stepIndex + 1);
        break;
      }

      default:
        logger.warn(`Unknown follow-up job: ${name}`);
    }
  },
  { connection, concurrency: 3 }
);

logger.info('Follow-Up Worker started');
export default followUpWorker;