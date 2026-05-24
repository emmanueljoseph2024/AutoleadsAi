import { Worker } from 'bullmq';
import { getRedisConnection } from '../config/redis.js';
import {
  RefreshToken,
  BlacklistedToken,
  EventLog,
  User,
} from '../models/index.js';
import { logger } from '../utils/logger.js';

const connection = getRedisConnection();

const cleanupWorker = new Worker(
  'cleanup',
  async (job) => {
    const { name, data } = job;

    switch (name) {
      // ─── Clean expired refresh tokens ─────────────
      case 'cleanup_tokens': {
        logger.info('Cleaning expired refresh tokens');
        const result = await RefreshToken.deleteMany({
          expiresAt: { $lt: new Date() },
        });
        logger.info(`Removed ${result.deletedCount} expired refresh tokens`);
        break;
      }

      // ─── Clean old event logs ─────────────────────
      case 'cleanup_logs': {
        const retentionDays = data?.retentionDays || 30;
        const cutoff = new Date(Date.now() - retentionDays * 24 * 60 * 60 * 1000);
        logger.info(`Cleaning event logs older than ${retentionDays} days`);

        const result = await EventLog.deleteMany({ createdAt: { $lt: cutoff } });
        logger.info(`Removed ${result.deletedCount} old event logs`);
        break;
      }

      // ─── Clean inactive accounts ──────────────────
      case 'cleanup_inactive': {
        const inactiveDays = data?.inactiveDays || 90;
        const cutoff = new Date(Date.now() - inactiveDays * 24 * 60 * 60 * 1000);
        logger.info(`Deactivating accounts inactive for ${inactiveDays} days`);

        const result = await User.updateMany(
          {
            lastLogin: { $lt: cutoff },
            isActive: true,
            'subscription.status': { $in: ['inactive', 'canceled'] },
          },
          { isActive: false }
        );
        logger.info(`Deactivated ${result.modifiedCount} inactive accounts`);
        break;
      }

      // ─── Clean blacklisted tokens ─────────────────
      case 'cleanup_blacklisted': {
        logger.info('Cleaning expired blacklisted tokens');
        const result = await BlacklistedToken.deleteMany({
          expiresAt: { $lt: new Date() },
        });
        logger.info(`Removed ${result.deletedCount} expired blacklisted tokens`);
        break;
      }

      default:
        logger.warn(`Unknown cleanup job: ${name}`);
    }
  },
  { connection, concurrency: 1 }
);

logger.info('Cleanup Worker started');
export default cleanupWorker;