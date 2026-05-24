import { Queue } from 'bullmq';
import { getRedisConnection } from '../config/redis.js';

const connection = getRedisConnection();

// Notifications queue (Slack, CRM, in‑app)
export const notificationQueue = new Queue('notification', {
  connection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 3000,
    },
    removeOnComplete: 100,
    removeOnFail: 200,
  },
});

// ─── Job creators ──────────────────────────────────

export const enqueueSlackNotification = async (leadId, event = 'hot_lead') => {
  await notificationQueue.add(
    'send_slack',
    {
      leadId: leadId.toString(),
      event,
    },
    {
      priority: event === 'hot_lead' ? 1 : 10,
    }
  );
};

export const enqueueCrmSync = async (leadId) => {
  await notificationQueue.add('sync_crm', {
    leadId: leadId.toString(),
  });
};

export const enqueueInAppNotification = async (userId, message, type = 'info') => {
  await notificationQueue.add('in_app', {
    userId: userId.toString(),
    message,
    type,
  });
};