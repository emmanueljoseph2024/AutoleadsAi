import {
  getDashboardStats,
  getPipelineData,
  getRecentLeads as getRecentLeadsService,
  getActivityFeed as getActivityFeedService,
  getEmailPerformance as getEmailPerformanceService,
  getScanPerformance as getScanPerformanceService,
  getSourceAnalytics as getSourceAnalyticsService,
  invalidateUserCache,
} from '../../services/analytics/index.js';

// ─── Source metadata (shared with lead controller) ──

const SOURCE_META = {
  linkedin: { label: 'LinkedIn', icon: 'linkedin', color: '#0A66C2', canChat: true },
  facebook: { label: 'Facebook', icon: 'facebook', color: '#1877F2', canChat: true },
  reddit: { label: 'Reddit', icon: 'reddit', color: '#FF4500', canChat: true },
  twitter: { label: 'X (Twitter)', icon: 'twitter', color: '#000000', canChat: true },
  instagram: { label: 'Instagram', icon: 'instagram', color: '#E4405F', canChat: true },
  website: { label: 'Website', icon: 'globe', color: '#4CAF50', canChat: false },
  google_maps: { label: 'Google Maps', icon: 'map-pin', color: '#EA4335', canChat: false },
  news: { label: 'News Article', icon: 'newspaper', color: '#FF9800', canChat: false },
  manual: { label: 'Manual Entry', icon: 'user-plus', color: '#9E9E9E', canChat: false },
  api: { label: 'API Import', icon: 'code', color: '#607D8B', canChat: false },
  other: { label: 'Other', icon: 'ellipsis', color: '#9E9E9E', canChat: false },
};

const attachSourceMeta = (lead) => {
  const meta = SOURCE_META[lead.source] || SOURCE_META.other;
  return {
    _id: lead._id,
    name: lead.name,
    email: lead.email,
    company: lead.company,
    source: lead.source,
    sourceUrl: lead.sourceUrl,
    sourceMeta: {
      ...meta,
      chatUrl: meta.canChat ? lead.sourceUrl : null,
    },
    qualification: lead.qualification,
    status: lead.status,
    nicheId: lead.nicheId,
    createdAt: lead.createdAt,
    updatedAt: lead.updatedAt,
    link: `/leads/${lead._id}`,
  };
};

// ─── Helper: extract nicheId from query params ──────

const getNicheId = (req) => {
  const { nicheId } = req.query;
  return nicheId || null;
};

// ─── GET /dashboard/stats – high‑level summary ─────

export const getStats = async (req, res, next) => {
  try {
    const { expand } = req.query;
    const nicheId = getNicheId(req);
    const stats = await getDashboardStats(req.user._id, nicheId, expand === 'true');
    res.status(200).json(stats);
  } catch (error) {
    next(error);
  }
};

// ─── GET /dashboard/pipeline – breakdown by status ──

export const getPipeline = async (req, res, next) => {
  try {
    const nicheId = getNicheId(req);
    const pipeline = await getPipelineData(req.user._id, nicheId);
    res.status(200).json(pipeline);
  } catch (error) {
    next(error);
  }
};

// ─── GET /dashboard/recent-leads – last 10 leads ───

export const getRecentLeads = async (req, res, next) => {
  try {
    const { limit = 10 } = req.query;
    const nicheId = getNicheId(req);
    const leads = await getRecentLeadsService(req.user._id, nicheId, Number(limit));

    res.status(200).json({
      leads: leads.map(attachSourceMeta),
    });
  } catch (error) {
    next(error);
  }
};

// ─── GET /dashboard/activity – recent activity feed ─

export const getActivityFeed = async (req, res, next) => {
  try {
    const { limit = 20 } = req.query;
    const nicheId = getNicheId(req);
    const activities = await getActivityFeedService(req.user._id, nicheId, Number(limit));
    res.status(200).json({ activities });
  } catch (error) {
    next(error);
  }
};

// ─── GET /dashboard/email-performance – email stats ─

export const getEmailPerformance = async (req, res, next) => {
  try {
    const { days = 30 } = req.query;
    const nicheId = getNicheId(req);
    const perf = await getEmailPerformanceService(req.user._id, nicheId, Number(days));
    res.status(200).json(perf);
  } catch (error) {
    next(error);
  }
};

// ─── GET /dashboard/scan-performance – scan stats ──

export const getScanPerformance = async (req, res, next) => {
  try {
    const { days = 30 } = req.query;
    const nicheId = getNicheId(req);
    const perf = await getScanPerformanceService(req.user._id, nicheId, Number(days));
    res.status(200).json(perf);
  } catch (error) {
    next(error);
  }
};

// ─── GET /dashboard/source-analytics – by platform ──

export const getSourceAnalytics = async (req, res, next) => {
  try {
    const { days = 30, expand } = req.query;
    const nicheId = getNicheId(req);
    const analytics = await getSourceAnalyticsService(
      req.user._id,
      nicheId,
      Number(days),
      expand === 'true'
    );
    res.status(200).json({ sources: analytics });
  } catch (error) {
    next(error);
  }
};

// ─── GET /dashboard/niche-overview – all niches summary ──

export const getNicheOverview = async (req, res, next) => {
  try {
    const { Niche, Lead, Scan } = await import('../../models/index.js');

    const niches = await Niche.find({ userId: req.user._id, isActive: true })
      .sort({ updatedAt: -1 })
      .lean();

    // Enrich each niche with quick stats
    const enriched = await Promise.all(
      niches.map(async (niche) => {
        const [leadCount, hotCount, scanCount, lastScan] = await Promise.all([
          Lead.countDocuments({ userId: req.user._id, nicheId: niche._id }),
          Lead.countDocuments({ userId: req.user._id, nicheId: niche._id, qualification: 'hot' }),
          Scan.countDocuments({ userId: req.user._id, nicheId: niche._id }),
          Scan.findOne({ userId: req.user._id, nicheId: niche._id })
            .sort({ createdAt: -1 })
            .select('createdAt')
            .lean(),
        ]);

        return {
          _id: niche._id,
          name: niche.name,
          keywords: niche.keywords,
          location: niche.location,
          sources: niche.sources,
          stats: {
            totalLeads: leadCount,
            hotLeads: hotCount,
            totalScans: scanCount,
          },
          lastScanAt: lastScan?.createdAt || niche.lastScanAt,
          createdAt: niche.createdAt,
        };
      })
    );

    res.status(200).json({ niches: enriched });
  } catch (error) {
    next(error);
  }
};

// ─── POST /dashboard/invalidate-cache – manual refresh

export const invalidateDashboardCache = async (req, res, next) => {
  try {
    await invalidateUserCache(req.user._id);
    res.status(200).json({ message: 'Dashboard cache cleared' });
  } catch (error) {
    next(error);
  }
};