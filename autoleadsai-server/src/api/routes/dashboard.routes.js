import { Router } from 'express';
import {
  getStats,
  getPipeline,
  getRecentLeads,
} from '../controllers/dashboard.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const dashboardRouter = Router();

dashboardRouter.use(protect);

dashboardRouter.get('/stats', getStats);
dashboardRouter.get('/pipeline', getPipeline);
dashboardRouter.get('/recent-leads', getRecentLeads);

export default dashboardRouter;