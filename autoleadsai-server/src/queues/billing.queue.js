import { Queue } from 'bullmq';
import { getRedisConnection } from '../config/redis.js';

const connection = getRedisConnection();

// Billing queue (subscription lifecycle, invoicing)
export const billingQueue = new Queue('billing', {
  connection,
  defaultJobOptions: {
    attempts: 2,
    backoff: {
      type: 'fixed',
      delay: 10000,
    },
    removeOnComplete: 50,
    removeOnFail: 100,
  },
});

// ─── Job creators ──────────────────────────────────

export const enqueueTrialCheck = async (userId) => {
  // Schedule trial expiry check
  await billingQueue.add(
    'check_trial',
    { userId: userId.toString() },
    {
      delay: 14 * 24 * 60 * 60 * 1000, // Check after 14 days
    }
  );
};

export const enqueueTrialEndingReminder = async (userId, daysRemaining) => {
  await billingQueue.add('trial_ending', {
    userId: userId.toString(),
    daysRemaining,
  });
};

export const enqueueSubscriptionSync = async (userId, paddleSubscriptionId) => {
  await billingQueue.add('sync_subscription', {
    userId: userId.toString(),
    paddleSubscriptionId,
  });
};

export const enqueueInvoiceGeneration = async (userId, transactionId) => {
  await billingQueue.add('generate_invoice', {
    userId: userId.toString(),
    transactionId: transactionId.toString(),
  });
};

export const enqueuePaymentFailed = async (userId) => {
  await billingQueue.add(
    'payment_failed',
    { userId: userId.toString() },
    {
      attempts: 5,
      backoff: { type: 'fixed', delay: 24 * 60 * 60 * 1000 }, // Retry daily
    }
  );
};