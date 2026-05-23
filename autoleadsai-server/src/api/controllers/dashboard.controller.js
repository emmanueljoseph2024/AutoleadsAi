import { Lead, Scan, EmailLog } from '../../models/index.js';
import { getRedisClient } from '../../config/redis.js'; // ioredis client

// GET /dashboard/stats – high‑level summary
export const getStats = async (req, res, next) => {
  try {
    const cacheKey = `dashboard:${req.user._id}:stats`;
    const redis = getRedisClient();
    const cached = await redis.get(cacheKey);
    if (cached) return res.status(200).json(JSON.parse(cached));

    const userId = req.user._id;
    const [
      totalLeads,
      hotLeads,
      warmLeads,
      coldLeads,
      convertedLeads,
      emailsSent,
      emailsOpened,
      scansRun,
    ] = await Promise.all([
      Lead.countDocuments({ userId }),
      Lead.countDocuments({ userId, qualification: 'hot' }),
      Lead.countDocuments({ userId, qualification: 'warm' }),
      Lead.countDocuments({ userId, qualification: 'cold' }),
      Lead.countDocuments({ userId, status: 'converted' }),
      EmailLog.countDocuments({ userId, status: { $in: ['sent', 'delivered', 'opened', 'clicked', 'replied'] } }),
      EmailLog.countDocuments({ userId, status: { $in: ['opened', 'clicked', 'replied'] } }),
      Scan.countDocuments({ userId }),
    ]);

    const stats = {
      totalLeads,
      hotLeads,
      warmLeads,
      coldLeads,
      convertedLeads,
      emailsSent,
      emailsOpened,
      openRate: emailsSent ? ((emailsOpened / emailsSent) * 100).toFixed(1) : 0,
      scansRun,
    };

    // Cache for 5 minutes
    await redis.set(cacheKey, JSON.stringify(stats), 'EX', 300);
    res.status(200).json(stats);
  } catch (error) {
    next(error);
  }
};

// GET /dashboard/pipeline – breakdown by status
export const getPipeline = async (req, res, next) => {
  try {
    const pipeline = await Lead.aggregate([
      { $match: { userId: req.user._id } },
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);
    res.status(200).json({ pipeline });
  } catch (error) {
    next(error);
  }
};

// GET /dashboard/recent-leads – last 10 leads
export const getRecentLeads = async (req, res, next) => {
  try {
    const leads = await Lead.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(10);
    res.status(200).json({ leads });
  } catch (error) {
    next(error);
  }
};