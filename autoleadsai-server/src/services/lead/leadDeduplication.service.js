import { Lead } from '../../models/index.js';
import { logger } from '../../utils/logger.js';
import {
  getCache,
  setCache,
  deleteCachePattern,
  cacheKeys,
  DEFAULT_TTL,
} from '../cache/cache.service.js';

// ─── Check for Duplicate Leads ──────────────────────

export const isDuplicateLead = async (userId, email, sourceUrl) => {
  try {
    // Check Redis cache first (fast) — email
    if (email) {
      const emailKey = cacheKeys.dedupEmail(userId, email);
      const emailCached = await getCache(emailKey);
      if (emailCached === '1') return true;
    }

    // Check Redis cache — source URL
    if (sourceUrl) {
      const urlKey = cacheKeys.dedupUrl(userId, sourceUrl);
      const urlCached = await getCache(urlKey);
      if (urlCached === '1') return true;
    }

    // Check MongoDB
    const existing = await Lead.findOne({
      userId,
      $or: [{ email: email || '' }, { sourceUrl: sourceUrl || '' }],
    });

    if (existing) {
      // Cache the hit
      if (email) await setCache(cacheKeys.dedupEmail(userId, email), '1', DEFAULT_TTL.DEDUP_HIT);
      if (sourceUrl) await setCache(cacheKeys.dedupUrl(userId, sourceUrl), '1', DEFAULT_TTL.DEDUP_HIT);
      return true;
    }

    // Cache negative result
    if (email) await setCache(cacheKeys.dedupEmail(userId, email), '0', DEFAULT_TTL.DEDUP_MISS);
    if (sourceUrl) await setCache(cacheKeys.dedupUrl(userId, sourceUrl), '0', DEFAULT_TTL.DEDUP_MISS);
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

      // Check against existing leads in DB (with cache)
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

      // Clear dedup cache after merge
      for (const mergeLead of mergeLeads) {
        if (mergeLead.email) {
          await setCache(cacheKeys.dedupEmail(userId, mergeLead.email), null, 1);
        }
      }
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
    await deleteCachePattern(`dedup:${userId}:*`);
    logger.info(`Dedup cache cleared for user ${userId}`);
  } catch (error) {
    logger.error(`Failed to clear dedup cache for user ${userId}:`, error);
  }
};