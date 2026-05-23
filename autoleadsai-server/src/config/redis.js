import Redis from 'ioredis';
import { logger } from '../utils/logger.js';
import { REDIS_URL } from './env.js';

let redisClient = null;

export const connectRedis = async () => {
  try {
    redisClient = new Redis(REDIS_URL, {
      maxRetriesPerRequest: null, // Required for BullMQ
      enableReadyCheck: true,
      lazyConnect: false,
      retryStrategy(times) {
        const delay = Math.min(times * 50, 2000);
        logger.warn(`Redis retry attempt ${times} in ${delay}ms`);
        return delay;
      },
      reconnectOnError(err) {
        const targetError = 'READONLY';
        if (err.message.includes(targetError)) {
          return true; // Reconnect on READONLY error
        }
        return false;
      },
    });

    // Event handlers
    redisClient.on('connect', () => {
      logger.info('Redis connected');
    });

    redisClient.on('ready', () => {
      logger.info('Redis ready for commands');
    });

    redisClient.on('error', (err) => {
      logger.error('Redis connection error:', err);
    });

    redisClient.on('close', () => {
      logger.warn('Redis connection closed');
    });

    redisClient.on('reconnecting', () => {
      logger.info('Redis reconnecting...');
    });

    // Test the connection
    await redisClient.ping();
    logger.info('Redis ping successful');

    return redisClient;
  } catch (error) {
    logger.error('Redis connection failed:', error.message);
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
    redisClient = null;
  }
};

// Export the raw client for BullMQ connection config
export const getRedisConnection = () => {
  return {
    host: new URL(REDIS_URL).hostname,
    port: new URL(REDIS_URL).port || 6379,
  };
};