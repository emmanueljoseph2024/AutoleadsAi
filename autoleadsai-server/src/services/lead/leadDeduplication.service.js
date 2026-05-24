import { Lead } from '../../models/index.js';
import { getRedisClient } from '../../config/redis.js';
import { logger } from '../../utils/logger.js';

// ─── Check for Duplicate Leads ──────────────────────

export const isDuplicateLead = async (userId, email, sourceUrl) => {
  try {
    // Check Redis cache first (fast)
    const redis = getRedisClient();
    const cacheKey = `dedup:${userId}:${email}`;
    const cached = await redis.get(cacheKey);
    if (cached === '1') return true;

    // Check MongoDB
    const existing = await Lead.findOne({
      userId,
      $or: [{ email }, { sourceUrl: sourceUrl || '' }],
    });

    if (existing) {
      // Cache the result for 1 hour
      await redis.set(cacheKey, '1', 'EX', 3600);
      return true;
    }

    // Cache negative result for 5 minutes
    await redis.set(cacheKey, '0', 'EX', 300);
    return false;
  } catch (error) {
    logger.error(`Failed to check duplicate lead for user ${userId}:`, error);
    return false; // Fail open — don't block lead creation
  }
};

// ─── Deduplicate Leads Batch ────────────────────────

export const deduplicateLeads = async (userId, leads) => {
  try {
    const uniqueLeads = [];
    const seenEmails = new Set();
    const seenUrls = new Set();

    for (const lead of leads) {
      const email = lead.email?.toLowerCase().trim();
      const sourceUrl = lead.sourceUrl?.trim();

      // Skip if we've already seen this email or URL in the batch
      if ((email && seenEmails.has(email)) || (sourceUrl && seenUrls.has(sourceUrl))) {
        continue;
      }

      // Check against existing leads in DB
      const isDuplicate = await isDuplicateLead(userId, email, sourceUrl);
      if (isDuplicate) continue;

      if (email) seenEmails.add(email);
      if (sourceUrl) seenUrls.add(sourceUrl);
      uniqueLeads.push(lead);
    }

    logger.info(`Deduped ${leads.length} → ${uniqueLeads.length} unique leads`);
    return uniqueLeads;
  } catch (error) {
    logger.error(`Failed to deduplicate leads for user ${userId}:`, error);
    throw error;
  }
};

// ─── Find and Merge Duplicates ──────────────────────

export const findAndMergeDuplicates = async (userId) => {
  try {
    const duplicates = await Lead.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: '$email',
          count: { $sum: 1 },
          ids: { $push: '$_id' },
          firstCreated: { $min: '$createdAt' },
        },
      },
      { $match: { count: { $gt: 1 } } },
    ]);

    let mergedCount = 0;

    for (const dup of duplicates) {
      // Keep the oldest lead, merge others into it
      const [keepId, ...mergeIds] = dup.ids;

      // Update the kept lead with any additional data from duplicates
      const mergeLeads = await Lead.find({ _id: { $in: mergeIds } });
      const updates = {};

      for (const mergeLead of mergeLeads) {
        if (!updates.name && mergeLead.name) updates.name = mergeLead.name;
        if (!updates.company && mergeLead.company) updates.company = mergeLead.company;
        if (mergeLead.intent?.score > 0) {
          updates['intent.score'] = Math.max(updates['intent.score'] || 0, mergeLead.intent.score);
        }
        if (mergeLead.relevance?.score > 0) {
          updates['relevance.score'] = Math.max(updates['relevance.score'] || 0, mergeLead.relevance.score);
        }
        // Merge email history
        if (mergeLead.emailHistory?.length > 0) {
          updates.$push = { emailHistory: { $each: mergeLead.emailHistory } };
        }
      }

      if (Object.keys(updates).length > 0) {
        await Lead.findByIdAndUpdate(keepId, updates);
      }

      // Delete the duplicates
      await Lead.deleteMany({ _id: { $in: mergeIds } });
      mergedCount += mergeIds.length;
    }

    logger.info(`Merged ${mergedCount} duplicate leads for user ${userId}`);
    return { mergedCount, duplicateGroups: duplicates.length };
  } catch (error) {
    logger.error(`Failed to find and merge duplicates for user ${userId}:`, error);
    throw error;
  }
};

// ─── Clear Dedup Cache for User ─────────────────────

export const clearDedupCache = async (userId) => {
  try {
    const redis = getRedisClient();
    const pattern = `dedup:${userId}:*`;
    const keys = await redis.keys(pattern);
    if (keys.length > 0) {
      await redis.del(keys);
    }
    logger.info(`Dedup cache cleared for user ${userId}`);
  } catch (error) {
    logger.error(`Failed to clear dedup cache for user ${userId}:`, error);
  }
};