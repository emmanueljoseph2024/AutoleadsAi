import { Router } from 'express';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import leadRouter from './routes/lead.routes.js';
import scanRouter from './routes/scan.routes.js';
import workflowRouter from './routes/workflow.routes.js';
import dashboardRouter from './routes/dashboard.routes.js';
import billingRouter from './routes/billing.routes.js';
import webhookRouter from './routes/webhook.routes.js';
import adminRouter from './routes/admin.routes.js';

const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/users', userRouter);
apiRouter.use('/leads', leadRouter);
apiRouter.use('/scans', scanRouter);
apiRouter.use('/workflows', workflowRouter);
apiRouter.use('/dashboard', dashboardRouter);
apiRouter.use('/billing', billingRouter);
apiRouter.use('/webhooks', webhookRouter);
apiRouter.use('/admin', adminRouter);

export default apiRouter;