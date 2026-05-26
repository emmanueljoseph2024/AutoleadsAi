import { getRedisClient } from '../../config/redis.js';
import { logger } from '../../utils/logger.js';

// Default TTL values (in seconds)
const DEFAULT_TTL = {
  DASHBOARD: 300,        // 5 minutes
  PIPELINE: 300,         // 5 minutes
  LEAD_LIST: 60,         // 1 minute
  SCAN_HISTORY: 60,      // 1 minute
  NICHE_LIST: 120,       // 2 minutes
  DEDUP_HIT: 3600,       // 1 hour
  DEDUP_MISS: 300,       // 5 minutes
  LINK_PREVIEW: 86400,   // 24 hours
  USER_SESSION: 900,     // 15 minutes
  RATE_LIMIT: 60,        // 1 minute
  SOURCE_CONFIG: 3600,   // 1 hour
  BLACKLISTED_TOKEN: 300, // 5 minutes
};

// ─── Core Cache Operations ─────────────────────────

/**
 * Get cached data or fetch and cache it.
 * @param {string} key - Redis cache key
 * @param {Function} fetchFn - Function to fetch data if cache miss
 * @param {number} ttl - Time-to-live in seconds
 */
export const getCachedOrFetch = async (key, fetchFn, ttl = 300) => {
  try {
    const redis = getRedisClient();
    const cached = await redis.get(key);

    if (cached) {
      logger.debug(`Cache HIT: ${key}`);
      return JSON.parse(cached);
    }

    logger.debug(`Cache MISS: ${key}`);
    const data = await fetchFn();

    if (data !== null && data !== undefined) {
      await redis.set(key, JSON.stringify(data), 'EX', ttl);
    }

    return data;
  } catch (error) {
    logger.warn(`Cache error for key ${key}: ${error.message}`);
    // Fallback to direct fetch on cache error
    return await fetchFn();
  }
};

/**
 * Set a cache value directly.
 */
export const setCache = async (key, data, ttl = 300) => {
  try {
    const redis = getRedisClient();
    await redis.set(key, JSON.stringify(data), 'EX', ttl);
    logger.debug(`Cache SET: ${key} (TTL: ${ttl}s)`);
  } catch (error) {
    logger.warn(`Cache set error for key ${key}: ${error.message}`);
  }
};

/**
 * Get a cache value.
 */
export const getCache = async (key) => {
  try {
    const redis = getRedisClient();
    const cached = await redis.get(key);
    return cached ? JSON.parse(cached) : null;
  } catch (error) {
    logger.warn(`Cache get error for key ${key}: ${error.message}`);
    return null;
  }
};

/**
 * Delete a specific cache key.
 */
export const deleteCache = async (key) => {
  try {
    const redis = getRedisClient();
    await redis.del(key);
    logger.debug(`Cache DEL: ${key}`);
  } catch (error) {
    logger.warn(`Cache delete error for key ${key}: ${error.message}`);
  }
};

/**
 * Delete all cache keys matching a pattern.
 */
export const deleteCachePattern = async (pattern) => {
  try {
    const redis = getRedisClient();
    const keys = await redis.keys(pattern);
    if (keys.length > 0) {
      await redis.del(keys);
      logger.debug(`Cache DEL pattern: ${pattern} (${keys.length} keys)`);
    }
  } catch (error) {
    logger.warn(`Cache delete pattern error for ${pattern}: ${error.message}`);
  }
};

/**
 * Increment a counter (for rate limiting).
 */
export const incrementCache = async (key, ttl = 60) => {
  try {
    const redis = getRedisClient();
    const count = await redis.incr(key);
    if (count === 1) {
      await redis.expire(key, ttl);
    }
    return count;
  } catch (error) {
    logger.warn(`Cache increment error for key ${key}: ${error.message}`);
    return 1;
  }
};

/**
 * Check if a key exists.
 */
export const existsCache = async (key) => {
  try {
    const redis = getRedisClient();
    return await redis.exists(key);
  } catch (error) {
    logger.warn(`Cache exists error for key ${key}: ${error.message}`);
    return false;
  }
};

// ─── Cache Key Builders ────────────────────────────

export const cacheKeys = {
  // Dashboard
  dashboardStats: (userId, nicheId) =>
    `dashboard:${userId}:stats${nicheId ? `:niche:${nicheId}` : ''}`,
  dashboardPipeline: (userId, nicheId) =>
    `dashboard:${userId}:pipeline${nicheId ? `:niche:${nicheId}` : ''}`,

  // Leads
  leadList: (userId, filters) =>
    `leads:${userId}:list:${hashObject(filters)}`,
  leadDetail: (leadId) => `leads:detail:${leadId}`,

  // Scans
  scanHistory: (userId, filters) =>
    `scans:${userId}:history:${hashObject(filters)}`,
  scanDetail: (scanId) => `scans:detail:${scanId}`,

  // Niches
  nicheList: (userId) => `niches:${userId}:list`,
  nicheDetail: (nicheId) => `niches:detail:${nicheId}`,

  // Dedup
  dedupEmail: (userId, email) => `dedup:${userId}:email:${email.toLowerCase()}`,
  dedupUrl: (userId, url) => `dedup:${userId}:url:${hashString(url)}`,

  // Link previews
  linkPreview: (url) => `linkpreview:${hashString(url)}`,

  // User
  userSession: (userId) => `session:${userId}`,
  userProfile: (userId) => `user:${userId}:profile`,

  // Rate limiting
  rateLimit: (userId, endpoint) => `ratelimit:${userId}:${endpoint}`,
  scanLimit: (userId) => `ratelimit:${userId}:scans`,

  // Tokens
  blacklistedToken: (token) => `blacklist:token:${hashString(token)}`,

  // Source config
  sourceConfig: () => 'config:sources',

  // Invalidation
  userCache: (userId) => `cache:${userId}:*`,
  allDashboard: (userId) => `dashboard:${userId}:*`,
  allLeads: (userId) => `leads:${userId}:*`,
  allScans: (userId) => `scans:${userId}:*`,
};

// ─── Cache Invalidation Helpers ────────────────────

/**
 * Invalidate all cached data for a user.
 */
export const invalidateUserCache = async (userId) => {
  await deleteCachePattern(cacheKeys.userCache(userId));
  logger.info(`Cache invalidated for user: ${userId}`);
};

/**
 * Invalidate dashboard cache for a user.
 */
export const invalidateDashboardCache = async (userId) => {
  await deleteCachePattern(cacheKeys.allDashboard(userId));
  logger.info(`Dashboard cache invalidated for user: ${userId}`);
};

/**
 * Invalidate lead-related cache for a user.
 */
export const invalidateLeadCache = async (userId) => {
  await deleteCachePattern(cacheKeys.allLeads(userId));
  await invalidateDashboardCache(userId);
  logger.info(`Lead cache invalidated for user: ${userId}`);
};

/**
 * Invalidate scan-related cache for a user.
 */
export const invalidateScanCache = async (userId) => {
  await deleteCachePattern(cacheKeys.allScans(userId));
  await invalidateDashboardCache(userId);
  logger.info(`Scan cache invalidated for user: ${userId}`);
};

// ─── Utility Functions ─────────────────────────────

/**
 * Simple object hasher for cache keys.
 */
const hashObject = (obj) => {
  if (!obj || Object.keys(obj).length === 0) return 'default';
  const sorted = Object.keys(obj)
    .sort()
    .reduce((acc, key) => {
      acc[key] = obj[key];
      return acc;
    }, {});
  return Buffer.from(JSON.stringify(sorted)).toString('base64').slice(0, 32);
};

/**
 * Simple string hasher.
 */
const hashString = (str) => {
  return Buffer.from(str).toString('base64').slice(0, 32);
};

export { DEFAULT_TTL };