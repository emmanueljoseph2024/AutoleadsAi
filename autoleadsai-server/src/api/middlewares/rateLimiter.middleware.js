import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import { getRedisClient } from '../../config/redis.js';

// Create Redis store for distributed rate limiting
const createRedisStore = () => {
  try {
    return new RedisStore({
      // @ts-ignore — rate-limit-redis expects specific client interface
      sendCommand: (...args) => getRedisClient().call(...args),
      prefix: 'ratelimit:',
    });
  } catch {
    // Fallback to in-memory store if Redis is unavailable
    return undefined;
  }
};

const redisStore = createRedisStore();

// Global rate limiter
export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  store: redisStore,
  message: {
    error: 'Too many requests. Please try again later.',
  },
  keyGenerator: (req) => {
    // Rate limit by user ID if authenticated, otherwise by IP
    return req.user?._id?.toString() || req.ip;
  },
});

// Auth-specific limiter (stricter)
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20, // 20 attempts per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  store: redisStore,
  message: {
    error: 'Too many login attempts. Please try again later.',
  },
});

// Scan trigger limiter
export const scanLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  store: redisStore,
  message: {
    error: 'Too many scan triggers. Please wait a moment.',
  },
  keyGenerator: (req) => {
    return req.user?._id?.toString() || req.ip;
  },
});

// Tier-based rate limiter factory
export const createTierLimiter = (maxRequests, windowMs = 60 * 1000) => {
  return rateLimit({
    windowMs,
    max: maxRequests,
    standardHeaders: true,
    legacyHeaders: false,
    store: redisStore,
    message: {
      error: 'Rate limit exceeded. Please try again later.',
    },
    keyGenerator: (req) => {
      return req.user?._id?.toString() || req.ip;
    },
  });
};