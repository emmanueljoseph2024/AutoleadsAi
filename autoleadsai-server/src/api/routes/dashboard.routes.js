import { Router } from 'express';
import {
  getStats,
  getPipeline,
  getRecentLeads,
  getActivityFeed,
  getEmailPerformance,
  getScanPerformance,
  getSourceAnalytics,
  getNicheOverview,
  invalidateDashboardCache,
} from '../controllers/dashboard.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const dashboardRouter = Router();

dashboardRouter.use(protect);

// Niche overview (sidebar)
dashboardRouter.get('/niches', getNicheOverview);

// Core dashboard (all accept ?nicheId=xxx)
dashboardRouter.get('/stats', getStats);
dashboardRouter.get('/pipeline', getPipeline);
dashboardRouter.get('/recent-leads', getRecentLeads);

// Activity & performance
dashboardRouter.get('/activity', getActivityFeed);
dashboardRouter.get('/email-performance', getEmailPerformance);
dashboardRouter.get('/scan-performance', getScanPerformance);
dashboardRouter.get('/source-analytics', getSourceAnalytics);

// Cache control
dashboardRouter.post('/invalidate-cache', invalidateDashboardCache);

export default dashboardRouter;