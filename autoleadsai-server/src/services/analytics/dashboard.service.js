import { Lead, Scan, EmailLog } from '../../models/index.js';
import { logger } from '../../utils/logger.js';
import {
  getCachedOrFetch,
  deleteCachePattern,
  cacheKeys,
  DEFAULT_TTL,
} from '../cache/cache.service.js';

// ─── Helper: build match filter with optional nicheId ──

const buildFilter = (userId, nicheId = null, extra = {}) => {
  const filter = { userId, ...extra };
  if (nicheId) filter.nicheId = nicheId;
  return filter;
};

// ─── Dashboard Stats (with drill‑down links) ────────

export const getDashboardStats = async (userId, nicheId = null, expand = false) => {
  const key = cacheKeys.dashboardStats(userId, nicheId) + (expand ? ':expand' : '');

  return getCachedOrFetch(key, async () => {
    const now = new Date();
    const weekAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now - 30 * 24 * 60 * 60 * 1000);

    const baseFilter = buildFilter(userId, nicheId);
    const weekFilter = buildFilter(userId, nicheId, { createdAt: { $gte: weekAgo } });
    const monthFilter = buildFilter(userId, nicheId, { createdAt: { $gte: monthAgo } });

    const [
      totalLeads,
      hotLeads,
      warmLeads,
      coldLeads,
      convertedLeads,
      newLeadsThisWeek,
      newLeadsThisMonth,
      emailsSent,
      emailsOpened,
      emailsReplied,
      scansRun,
      scansThisMonth,
    ] = await Promise.all([
      Lead.countDocuments(baseFilter),
      Lead.countDocuments(buildFilter(userId, nicheId, { qualification: 'hot' })),
      Lead.countDocuments(buildFilter(userId, nicheId, { qualification: 'warm' })),
      Lead.countDocuments(buildFilter(userId, nicheId, { qualification: 'cold' })),
      Lead.countDocuments(buildFilter(userId, nicheId, { status: 'converted' })),
      Lead.countDocuments(weekFilter),
      Lead.countDocuments(monthFilter),
      EmailLog.countDocuments({ userId, status: { $ne: 'bounced' } }),
      EmailLog.countDocuments({ userId, status: { $in: ['opened', 'clicked', 'replied'] } }),
      EmailLog.countDocuments({ userId, status: 'replied' }),
      Scan.countDocuments(baseFilter),
      Scan.countDocuments(monthFilter),
    ]);

    const buildLink = (path, params = '') => {
      let link = path;
      const queryParts = [];
      if (nicheId) queryParts.push(`nicheId=${nicheId}`);
      if (params) queryParts.push(params);
      if (queryParts.length) link += '?' + queryParts.join('&');
      return link;
    };

    const stats = {
      nicheId: nicheId || null,
      leads: {
        total: { count: totalLeads, link: buildLink('/leads') },
        hot: { count: hotLeads, link: buildLink('/leads', 'qualification=hot') },
        warm: { count: warmLeads, link: buildLink('/leads', 'qualification=warm') },
        cold: { count: coldLeads, link: buildLink('/leads', 'qualification=cold') },
        converted: { count: convertedLeads, link: buildLink('/leads', 'status=converted') },
        conversionRate: totalLeads ? ((convertedLeads / totalLeads) * 100).toFixed(1) : '0.0',
        newThisWeek: { count: newLeadsThisWeek, link: buildLink('/leads', 'createdAfter=' + weekAgo.toISOString()) },
        newThisMonth: { count: newLeadsThisMonth, link: buildLink('/leads', 'createdAfter=' + monthAgo.toISOString()) },
      },
      emails: {
        sent: { count: emailsSent, link: buildLink('/email-logs') },
        opened: { count: emailsOpened, link: buildLink('/email-logs', 'status=opened') },
        replied: { count: emailsReplied, link: buildLink('/email-logs', 'status=replied') },
        openRate: emailsSent ? ((emailsOpened / emailsSent) * 100).toFixed(1) : '0.0',
        replyRate: emailsSent ? ((emailsReplied / emailsSent) * 100).toFixed(1) : '0.0',
      },
      scans: {
        total: { count: scansRun, link: buildLink('/scans') },
        thisMonth: { count: scansThisMonth, link: buildLink('/scans', 'createdAfter=' + monthAgo.toISOString()) },
      },
    };

    if (expand) {
      const [hotSample, newSample, convertedSample] = await Promise.all([
        Lead.find(buildFilter(userId, nicheId, { qualification: 'hot' }))
          .sort({ createdAt: -1 }).limit(5)
          .select('name email company source sourceUrl linkPreview qualification status nicheId createdAt')
          .lean(),
        Lead.find(weekFilter)
          .sort({ createdAt: -1 }).limit(5)
          .select('name email company source sourceUrl linkPreview qualification status nicheId createdAt')
          .lean(),
        Lead.find(buildFilter(userId, nicheId, { status: 'converted' }))
          .sort({ updatedAt: -1 }).limit(5)
          .select('name email company source sourceUrl linkPreview qualification status nicheId createdAt')
          .lean(),
      ]);

      stats.samples = {
        hotLeads: hotSample.map((l) => ({ ...l, link: `/leads/${l._id}` })),
        newThisWeek: newSample.map((l) => ({ ...l, link: `/leads/${l._id}` })),
        converted: convertedSample.map((l) => ({ ...l, link: `/leads/${l._id}` })),
      };
    }

    return stats;
  }, DEFAULT_TTL.DASHBOARD);
};

// ─── Pipeline Data ──────────────────────────────────

export const getPipelineData = async (userId, nicheId = null) => {
  const key = cacheKeys.dashboardPipeline(userId, nicheId);

  return getCachedOrFetch(key, async () => {
    const baseFilter = buildFilter(userId, nicheId);

    const [statusBreakdown, qualificationBreakdown, sourceBreakdown] = await Promise.all([
      Lead.aggregate([
        { $match: baseFilter },
        { $group: { _id: '$status', count: { $sum: 1 } } },
        { $project: { status: '$_id', count: 1, link: { $concat: ['/leads?status=', '$_id', nicheId ? `&nicheId=${nicheId}` : ''] }, _id: 0 } },
        { $sort: { count: -1 } },
      ]),
      Lead.aggregate([
        { $match: baseFilter },
        { $group: { _id: '$qualification', count: { $sum: 1 } } },
        { $project: { qualification: '$_id', count: 1, link: { $concat: ['/leads?qualification=', '$_id', nicheId ? `&nicheId=${nicheId}` : ''] }, _id: 0 } },
      ]),
      Lead.aggregate([
        { $match: baseFilter },
        { $group: { _id: '$source', count: { $sum: 1 } } },
        { $project: { source: '$_id', count: 1, link: { $concat: ['/leads?source=', '$_id', nicheId ? `&nicheId=${nicheId}` : ''] }, _id: 0 } },
        { $sort: { count: -1 } },
      ]),
    ]);

    return { statusBreakdown, qualificationBreakdown, sourceBreakdown };
  }, DEFAULT_TTL.PIPELINE);
};

// ─── Recent Leads (always returns full objects) ─────

export const getRecentLeads = async (userId, nicheId = null, limit = 10) => {
  const filter = buildFilter(userId, nicheId);

  return Lead.find(filter)
    .sort({ createdAt: -1 })
    .limit(limit)
    .select('name email company source sourceUrl linkPreview qualification status nicheId createdAt')
    .lean();
};

// ─── Activity Feed ──────────────────────────────────

export const getActivityFeed = async (userId, nicheId = null, limit = 20) => {
  const scanFilter = buildFilter(userId, nicheId);
  const leadFilter = buildFilter(userId, nicheId);

  const [recentScans, recentEmails, recentLeads] = await Promise.all([
    Scan.find(scanFilter).sort({ createdAt: -1 }).limit(5)
      .select('sources status totalFound newLeads nicheId createdAt').lean(),
    EmailLog.find({ userId }).sort({ createdAt: -1 }).limit(5)
      .select('leadId to type status sentAt')
      .populate('leadId', 'name email nicheId').lean(),
    Lead.find(leadFilter).sort({ updatedAt: -1 }).limit(5)
      .select('name email status qualification nicheId updatedAt').lean(),
  ]);

  const filteredEmails = nicheId
    ? recentEmails.filter((e) => e.leadId?.nicheId?.toString() === nicheId)
    : recentEmails;

  const activities = [
    ...recentScans.map((scan) => ({
      type: 'scan',
      message: `Scan completed: ${scan.newLeads} new leads from ${scan.sources.join(', ')}`,
      timestamp: scan.createdAt,
      link: `/scans/${scan._id}`,
      nicheId: scan.nicheId,
      data: scan,
    })),
    ...filteredEmails.map((email) => ({
      type: 'email',
      message: `Email ${email.status} to ${email.leadId?.name || email.to}`,
      timestamp: email.sentAt,
      link: email.leadId ? `/leads/${email.leadId._id}` : null,
      nicheId: email.leadId?.nicheId,
      data: email,
    })),
    ...recentLeads.map((lead) => ({
      type: 'lead_update',
      message: `Lead "${lead.name}" marked as ${lead.status}`,
      timestamp: lead.updatedAt,
      link: `/leads/${lead._id}`,
      nicheId: lead.nicheId,
      data: lead,
    })),
  ]
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, limit);

  return activities;
};

// ─── Email Performance ──────────────────────────────

export const getEmailPerformance = async (userId, nicheId = null, days = 30) => {
  const sinceDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

  let leadIdFilter = {};
  if (nicheId) {
    const nicheLeadIds = await Lead.find({ userId, nicheId }).select('_id').lean();
    leadIdFilter = { leadId: { $in: nicheLeadIds.map((l) => l._id) } };
  }

  const emailFilter = { userId, createdAt: { $gte: sinceDate }, ...leadIdFilter };

  const [totalSent, delivered, opened, clicked, replied, bounced, dailyStats] = await Promise.all([
    EmailLog.countDocuments(emailFilter),
    EmailLog.countDocuments({ ...emailFilter, status: 'delivered' }),
    EmailLog.countDocuments({ ...emailFilter, status: 'opened' }),
    EmailLog.countDocuments({ ...emailFilter, status: 'clicked' }),
    EmailLog.countDocuments({ ...emailFilter, status: 'replied' }),
    EmailLog.countDocuments({ ...emailFilter, status: 'bounced' }),
    EmailLog.aggregate([
      { $match: emailFilter },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          sent: { $sum: 1 },
          opened: { $sum: { $cond: [{ $in: ['$status', ['opened', 'clicked', 'replied']] }, 1, 0] } },
          replied: { $sum: { $cond: [{ $eq: ['$status', 'replied'] }, 1, 0] } },
        },
      },
      { $sort: { _id: 1 } },
      { $project: { date: '$_id', sent: 1, opened: 1, replied: 1, _id: 0 } },
    ]),
  ]);

  const buildEmailLink = (params = '') => {
    let link = '/email-logs';
    const parts = [];
    if (nicheId) parts.push(`nicheId=${nicheId}`);
    if (params) parts.push(params);
    if (parts.length) link += '?' + parts.join('&');
    return link;
  };

  return {
    nicheId: nicheId || null,
    summary: {
      totalSent: { count: totalSent, link: buildEmailLink() },
      delivered: { count: delivered, link: buildEmailLink('status=delivered') },
      opened: { count: opened, link: buildEmailLink('status=opened') },
      clicked: { count: clicked, link: buildEmailLink('status=clicked') },
      replied: { count: replied, link: buildEmailLink('status=replied') },
      bounced: { count: bounced, link: buildEmailLink('status=bounced') },
      deliveryRate: totalSent ? ((delivered / totalSent) * 100).toFixed(1) : '0.0',
      openRate: delivered ? ((opened / delivered) * 100).toFixed(1) : '0.0',
      clickRate: delivered ? ((clicked / delivered) * 100).toFixed(1) : '0.0',
      replyRate: delivered ? ((replied / delivered) * 100).toFixed(1) : '0.0',
      bounceRate: totalSent ? ((bounced / totalSent) * 100).toFixed(1) : '0.0',
    },
    dailyStats,
  };
};

// ─── Scan Performance ───────────────────────────────

export const getScanPerformance = async (userId, nicheId = null, days = 30) => {
  const sinceDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

  const scanFilter = buildFilter(userId, nicheId, { createdAt: { $gte: sinceDate } });
  const baseFilter = buildFilter(userId, nicheId);

  const [totalScans, completedScans, failedScans, sourceBreakdown, dailyStats, recentScans] = await Promise.all([
    Scan.countDocuments(scanFilter),
    Scan.countDocuments({ ...scanFilter, status: 'completed' }),
    Scan.countDocuments({ ...scanFilter, status: 'failed' }),
    Scan.aggregate([
      { $match: { ...baseFilter, status: 'completed', createdAt: { $gte: sinceDate } } },
      { $unwind: '$sources' },
      { $group: { _id: '$sources', count: { $sum: 1 }, avgLeads: { $avg: '$newLeads' } } },
      {
        $project: {
          source: '$_id',
          count: 1,
          avgLeads: { $round: ['$avgLeads', 1] },
          link: { $concat: ['/scans?source=', '$_id', nicheId ? `&nicheId=${nicheId}` : ''] },
          _id: 0,
        },
      },
      { $sort: { count: -1 } },
    ]),
    Scan.aggregate([
      { $match: scanFilter },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          scans: { $sum: 1 },
          totalLeads: { $sum: '$newLeads' },
        },
      },
      { $sort: { _id: 1 } },
      { $project: { date: '$_id', scans: 1, totalLeads: 1, _id: 0 } },
    ]),
    Scan.find(baseFilter).sort({ createdAt: -1 }).limit(5)
      .select('sources status totalFound newLeads nicheId startedAt completedAt createdAt').lean(),
  ]);

  const buildScanLink = (params = '') => {
    let link = '/scans';
    const parts = [];
    if (nicheId) parts.push(`nicheId=${nicheId}`);
    if (params) parts.push(params);
    if (parts.length) link += '?' + parts.join('&');
    return link;
  };

  return {
    nicheId: nicheId || null,
    summary: {
      totalScans: { count: totalScans, link: buildScanLink() },
      completedScans: { count: completedScans, link: buildScanLink('status=completed') },
      failedScans: { count: failedScans, link: buildScanLink('status=failed') },
      successRate: totalScans ? ((completedScans / totalScans) * 100).toFixed(1) : '0.0',
    },
    sourceBreakdown,
    dailyStats,
    recentScans: recentScans.map((s) => ({
      sources: s.sources,
      status: s.status,
      totalFound: s.totalFound,
      newLeads: s.newLeads,
      nicheId: s.nicheId,
      startedAt: s.startedAt,
      completedAt: s.completedAt,
      createdAt: s.createdAt,
      link: `/scans/${s._id}`,
    })),
  };
};

// ─── Source Analytics (with links to leads) ────────

export const getSourceAnalytics = async (userId, nicheId = null, days = 30, expand = false) => {
  const sinceDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  const baseFilter = buildFilter(userId, nicheId, { createdAt: { $gte: sinceDate } });

  const buildSourceLink = (source, extra = '') => {
    let link = `/leads?source=${source}`;
    if (nicheId) link += `&nicheId=${nicheId}`;
    if (extra) link += `&${extra}`;
    return link;
  };

  const breakdown = await Lead.aggregate([
    { $match: baseFilter },
    {
      $group: {
        _id: '$source',
        total: { $sum: 1 },
        hot: { $sum: { $cond: [{ $eq: ['$qualification', 'hot'] }, 1, 0] } },
        warm: { $sum: { $cond: [{ $eq: ['$qualification', 'warm'] }, 1, 0] } },
        cold: { $sum: { $cond: [{ $eq: ['$qualification', 'cold'] }, 1, 0] } },
        converted: { $sum: { $cond: [{ $eq: ['$status', 'converted'] }, 1, 0] } },
        sampleIds: { $push: '$_id' },
      },
    },
    {
      $project: {
        source: '$_id',
        total: 1,
        hot: 1,
        warm: 1,
        cold: 1,
        converted: 1,
        hotRate: { $round: [{ $multiply: [{ $divide: ['$hot', '$total'] }, 100] }, 1] },
        conversionRate: { $round: [{ $multiply: [{ $divide: ['$converted', '$total'] }, 100] }, 1] },
        link: { $literal: '' },
        hotLink: { $literal: '' },
        convertedLink: { $literal: '' },
        sampleIds: { $slice: ['$sampleIds', 10] },
        _id: 0,
      },
    },
    { $sort: { total: -1 } },
  ]);

  for (const item of breakdown) {
    item.link = buildSourceLink(item.source);
    item.hotLink = buildSourceLink(item.source, 'qualification=hot');
    item.convertedLink = buildSourceLink(item.source, 'status=converted');
  }

  if (expand) {
    for (const source of breakdown) {
      source.samples = await Lead.find({ _id: { $in: source.sampleIds } })
        .select('name email company source sourceUrl linkPreview qualification status nicheId createdAt')
        .lean();
      source.samples = source.samples.map((l) => ({ ...l, link: `/leads/${l._id}` }));
    }
  }

  return breakdown;
};

// ─── Cache Invalidation ─────────────────────────────

export const invalidateDashboardCache = async (userId) => {
  await deleteCachePattern(`dashboard:${userId}:*`);
  logger.info(`Dashboard cache invalidated for user: ${userId}`);
};

export { invalidateDashboardCache as invalidateUserCache };