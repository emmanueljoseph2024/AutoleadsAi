import { Router } from 'express';
import {
  getPlans,
  createCheckout,
  billingPortal,
  getInvoices,
  cancelSubscription,
} from '../controllers/billing.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const billingRouter = Router();

billingRouter.use(protect);

billingRouter.get('/plans', getPlans);
billingRouter.post('/checkout', createCheckout);
billingRouter.post('/portal', billingPortal);
billingRouter.get('/invoices', getInvoices);
billingRouter.post('/cancel', cancelSubscription);

export default billingRouter;