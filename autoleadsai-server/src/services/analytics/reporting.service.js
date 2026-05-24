import { Lead, Scan, EmailLog } from '../../models/index.js';
import { logger } from '../../utils/logger.js';

// ─── Weekly Report ──────────────────────────────────

export const generateWeeklyReport = async (userId, expand = false) => {
  try {
    const now = new Date();
    const weekAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);

    const [
      newLeads,
      hotLeads,
      warmLeads,
      coldLeads,
      convertedLeads,
      emailsSent,
      emailsOpened,
      emailsReplied,
      scansRun,
      topSource,
    ] = await Promise.all([
      Lead.countDocuments({ userId, createdAt: { $gte: weekAgo } }),
      Lead.countDocuments({ userId, qualification: 'hot', createdAt: { $gte: weekAgo } }),
      Lead.countDocuments({ userId, qualification: 'warm', createdAt: { $gte: weekAgo } }),
      Lead.countDocuments({ userId, qualification: 'cold', createdAt: { $gte: weekAgo } }),
      Lead.countDocuments({ userId, status: 'converted', updatedAt: { $gte: weekAgo } }),
      EmailLog.countDocuments({ userId, createdAt: { $gte: weekAgo } }),
      EmailLog.countDocuments({ userId, status: { $in: ['opened', 'clicked', 'replied'] }, createdAt: { $gte: weekAgo } }),
      EmailLog.countDocuments({ userId, status: 'replied', createdAt: { $gte: weekAgo } }),
      Scan.countDocuments({ userId, createdAt: { $gte: weekAgo } }),
      Lead.aggregate([
        { $match: { userId, createdAt: { $gte: weekAgo } } },
        { $group: { _id: '$source', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 1 },
        { $project: { source: '$_id', _id: 0 } },
      ]),
    ]);

    const report = {
      period: { start: weekAgo.toISOString(), end: now.toISOString() },
      summary: {
        newLeads: { count: newLeads, link: '/leads?createdAfter=' + weekAgo.toISOString() },
        hotLeads: { count: hotLeads, link: '/leads?qualification=hot&createdAfter=' + weekAgo.toISOString() },
        warmLeads: { count: warmLeads, link: '/leads?qualification=warm&createdAfter=' + weekAgo.toISOString() },
        coldLeads: { count: coldLeads, link: '/leads?qualification=cold&createdAfter=' + weekAgo.toISOString() },
        convertedLeads: { count: convertedLeads, link: '/leads?status=converted&updatedAfter=' + weekAgo.toISOString() },
        conversionRate: newLeads ? ((convertedLeads / newLeads) * 100).toFixed(1) : '0.0',
      },
      outreach: {
        emailsSent: { count: emailsSent, link: '/email-logs?sentAfter=' + weekAgo.toISOString() },
        emailsOpened: { count: emailsOpened, link: '/email-logs?status=opened&sentAfter=' + weekAgo.toISOString() },
        emailsReplied: { count: emailsReplied, link: '/email-logs?status=replied&sentAfter=' + weekAgo.toISOString() },
        openRate: emailsSent ? ((emailsOpened / emailsSent) * 100).toFixed(1) : '0.0',
        replyRate: emailsSent ? ((emailsReplied / emailsSent) * 100).toFixed(1) : '0.0',
      },
      scans: {
        total: { count: scansRun, link: '/scans?createdAfter=' + weekAgo.toISOString() },
        topSource: topSource[0]?.source || 'N/A',
      },
    };

    if (expand) {
      const [hotSample, newSample, convertedSample, recentScansSample] = await Promise.all([
        Lead.find({ userId, qualification: 'hot', createdAt: { $gte: weekAgo } })
          .sort({ createdAt: -1 }).limit(5)
          .select('name email company source sourceUrl qualification status createdAt')
          .lean(),
        Lead.find({ userId, createdAt: { $gte: weekAgo } })
          .sort({ createdAt: -1 }).limit(5)
          .select('name email company source sourceUrl qualification status createdAt')
          .lean(),
        Lead.find({ userId, status: 'converted', updatedAt: { $gte: weekAgo } })
          .sort({ updatedAt: -1 }).limit(5)
          .select('name email company source sourceUrl qualification status createdAt')
          .lean(),
        Scan.find({ userId, createdAt: { $gte: weekAgo } })
          .sort({ createdAt: -1 }).limit(5)
          .select('sources status totalFound newLeads createdAt')
          .lean(),
      ]);

      report.samples = {
        hotLeads: hotSample.map((l) => ({ ...l, link: `/leads/${l._id}` })),
        newLeads: newSample.map((l) => ({ ...l, link: `/leads/${l._id}` })),
        converted: convertedSample.map((l) => ({ ...l, link: `/leads/${l._id}` })),
        recentScans: recentScansSample.map((s) => ({ ...s, link: `/scans/${s._id}` })),
      };
    }

    return report;
  } catch (error) {
    logger.error(`Failed to generate weekly report for user ${userId}:`, error);
    return null;
  }
};

// ─── Monthly Report ─────────────────────────────────

export const generateMonthlyReport = async (userId, expand = false) => {
  try {
    const now = new Date();
    const monthAgo = new Date(now - 30 * 24 * 60 * 60 * 1000);

    const [
      newLeads,
      hotLeads,
      warmLeads,
      coldLeads,
      convertedLeads,
      emailsSent,
      emailsOpened,
      emailsReplied,
      scansRun,
      sourceBreakdown,
      dailyLeadTrend,
    ] = await Promise.all([
      Lead.countDocuments({ userId, createdAt: { $gte: monthAgo } }),
      Lead.countDocuments({ userId, qualification: 'hot', createdAt: { $gte: monthAgo } }),
      Lead.countDocuments({ userId, qualification: 'warm', createdAt: { $gte: monthAgo } }),
      Lead.countDocuments({ userId, qualification: 'cold', createdAt: { $gte: monthAgo } }),
      Lead.countDocuments({ userId, status: 'converted', updatedAt: { $gte: monthAgo } }),
      EmailLog.countDocuments({ userId, createdAt: { $gte: monthAgo } }),
      EmailLog.countDocuments({ userId, status: { $in: ['opened', 'clicked', 'replied'] }, createdAt: { $gte: monthAgo } }),
      EmailLog.countDocuments({ userId, status: 'replied', createdAt: { $gte: monthAgo } }),
      Scan.countDocuments({ userId, createdAt: { $gte: monthAgo } }),

      Lead.aggregate([
        { $match: { userId, createdAt: { $gte: monthAgo } } },
        {
          $group: {
            _id: '$source',
            count: { $sum: 1 },
            hot: { $sum: { $cond: [{ $eq: ['$qualification', 'hot'] }, 1, 0] } },
            converted: { $sum: { $cond: [{ $eq: ['$status', 'converted'] }, 1, 0] } },
          },
        },
        { $sort: { count: -1 } },
        {
          $project: {
            source: '$_id',
            count: 1,
            hot: 1,
            converted: 1,
            link: { $concat: ['/leads?source=', '$_id', '&createdAfter=', monthAgo.toISOString()] },
            hotLink: { $concat: ['/leads?source=', '$_id', '&qualification=hot&createdAfter=', monthAgo.toISOString()] },
            _id: 0,
          },
        },
      ]),

      Lead.aggregate([
        { $match: { userId, createdAt: { $gte: monthAgo } } },
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
        { $project: { date: '$_id', count: 1, _id: 0 } },
      ]),
    ]);

    const report = {
      period: { start: monthAgo.toISOString(), end: now.toISOString() },
      leads: {
        total: { count: newLeads, link: '/leads?createdAfter=' + monthAgo.toISOString() },
        hot: { count: hotLeads, link: '/leads?qualification=hot&createdAfter=' + monthAgo.toISOString() },
        warm: { count: warmLeads, link: '/leads?qualification=warm&createdAfter=' + monthAgo.toISOString() },
        cold: { count: coldLeads, link: '/leads?qualification=cold&createdAfter=' + monthAgo.toISOString() },
        converted: { count: convertedLeads, link: '/leads?status=converted&updatedAfter=' + monthAgo.toISOString() },
        qualificationRate: newLeads ? ((hotLeads / newLeads) * 100).toFixed(1) : '0.0',
        conversionRate: newLeads ? ((convertedLeads / newLeads) * 100).toFixed(1) : '0.0',
      },
      outreach: {
        emailsSent: { count: emailsSent, link: '/email-logs?sentAfter=' + monthAgo.toISOString() },
        emailsOpened: { count: emailsOpened, link: '/email-logs?status=opened&sentAfter=' + monthAgo.toISOString() },
        emailsReplied: { count: emailsReplied, link: '/email-logs?status=replied&sentAfter=' + monthAgo.toISOString() },
        openRate: emailsSent ? ((emailsOpened / emailsSent) * 100).toFixed(1) : '0.0',
        replyRate: emailsSent ? ((emailsReplied / emailsSent) * 100).toFixed(1) : '0.0',
      },
      scans: {
        total: { count: scansRun, link: '/scans?createdAfter=' + monthAgo.toISOString() },
        bySource: sourceBreakdown,
      },
      trend: dailyLeadTrend,
    };

    if (expand) {
      const [hotSample, convertedSample, topSourceSample] = await Promise.all([
        Lead.find({ userId, qualification: 'hot', createdAt: { $gte: monthAgo } })
          .sort({ createdAt: -1 }).limit(10)
          .select('name email company source sourceUrl qualification status createdAt')
          .lean(),
        Lead.find({ userId, status: 'converted', updatedAt: { $gte: monthAgo } })
          .sort({ updatedAt: -1 }).limit(10)
          .select('name email company source sourceUrl qualification status updatedAt')
          .lean(),
        (async () => {
          if (sourceBreakdown.length > 0) {
            const top = sourceBreakdown[0];
            return Lead.find({
              userId,
              source: top.source,
              createdAt: { $gte: monthAgo },
            })
              .sort({ createdAt: -1 }).limit(10)
              .select('name email company sourceUrl qualification status createdAt')
              .lean();
          }
          return [];
        })(),
      ]);

      report.samples = {
        hotLeads: hotSample.map((l) => ({ ...l, link: `/leads/${l._id}` })),
        converted: convertedSample.map((l) => ({ ...l, link: `/leads/${l._id}` })),
        topSource: topSourceSample.map((l) => ({ ...l, link: `/leads/${l._id}` })),
      };
    }

    return report;
  } catch (error) {
    logger.error(`Failed to generate monthly report for user ${userId}:`, error);
    return null;
  }
};