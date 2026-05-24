import { Worker } from 'bullmq';
import { getRedisConnection } from '../config/redis.js';
import { User, Subscription } from '../models/index.js';
import { logger } from '../utils/logger.js';
import { eventBus, EVENT_TYPES } from '../events/index.js';

const connection = getRedisConnection();

const billingWorker = new Worker(
  'billing',
  async (job) => {
    const { name, data } = job;

    switch (name) {
      // ─── Check trial expiry ───────────────────────
      case 'check_trial': {
        const { userId } = data;
        logger.info(`Checking trial for user ${userId}`);

        const user = await User.findById(userId);
        if (!user) break;

        if (user.subscription.status === 'trialing' && !user.isTrialActive()) {
          user.subscription.status = 'inactive';
          await user.save();

          eventBus.emitEvent(EVENT_TYPES.TRIAL_EXPIRED, { userId });
        }
        break;
      }

      // ─── Trial ending reminder ────────────────────
      case 'trial_ending': {
        const { userId, daysRemaining } = data;
        logger.info(`Trial ending for user ${userId} in ${daysRemaining} days`);

        eventBus.emitEvent(EVENT_TYPES.TRIAL_ENDING, { userId, daysRemaining });
        break;
      }

      // ─── Sync subscription with Paddle ────────────
      case 'sync_subscription': {
        const { userId, paddleSubscriptionId } = data;
        logger.info(`Syncing subscription for user ${userId}`);

        // Paddle webhook already handles this — no extra logic needed
        break;
      }

      // ─── Generate invoice ─────────────────────────
      case 'generate_invoice': {
        const { userId, transactionId } = data;
        logger.info(`Generating invoice for transaction ${transactionId}`);
        // Invoice generation handled by Paddle webhook
        break;
      }

      // ─── Payment failed ───────────────────────────
      case 'payment_failed': {
        const { userId } = data;
        logger.info(`Payment failed for user ${userId}`);

        await User.findByIdAndUpdate(userId, {
          'subscription.status': 'past_due',
        });

        eventBus.emitEvent(EVENT_TYPES.SUBSCRIPTION_PAST_DUE, { userId });
        break;
      }

      default:
        logger.warn(`Unknown billing job: ${name}`);
    }
  },
  { connection, concurrency: 1 }
);

logger.info('Billing Worker started');
export default billingWorker;