import Redis from 'ioredis';
import { logger } from '../utils/logger.js';
import { REDIS_URL } from './env.js';

let redisClient = null;

export const connectRedis = async () => {
  try {
    redisClient = new Redis(REDIS_URL, {
      maxRetriesPerRequest: null, // Required for BullMQ
      enableReadyCheck: true,
      retryStrategy(times) {
        const delay = Math.min(times * 50, 2000);
        return delay;
      },
    });

    redisClient.on('connect', () => {
      logger.info('Redis connected');
    });
    redisClient.on('error', (err) => {
      logger.error('Redis connection error:', err);
    });

    await redisClient.ping();
    return redisClient;
  } catch (error) {
    logger.error('Redis connection failed:', error);
    process.exit(1);
  }
};

export const getRedisClient = () => {
  if (!redisClient) {
    throw new Error('Redis not initialised. Call connectRedis() first.');
  }
  return redisClient;
};

export const disconnectRedis = async () => {
  if (redisClient) {
    await redisClient.quit();
    logger.info('Redis disconnected');
  }
};