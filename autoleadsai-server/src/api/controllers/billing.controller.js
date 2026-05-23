import { Subscription, User } from '../../models/index.js';
import { paddleService } from '../../services/billing/paddle.service.js';

// GET /billing/plans – available plans for the user
export const getPlans = async (req, res, next) => {
  try {
    // Fetch plans from Paddle or return static config
    const plans = await paddleService.getProducts(); // returns list of products/prices
    res.status(200).json({ plans });
  } catch (error) {
    next(error);
  }
};

// POST /billing/checkout – create a checkout session for upgrade
export const createCheckout = async (req, res, next) => {
  try {
    const { priceId, successUrl } = req.body;
    const user = await User.findById(req.user._id);
    if (!user.subscription.paddleCustomerId) {
      // Create customer in Paddle
      const customer = await paddleService.createOrUpdateCustomer(user);
      user.subscription.paddleCustomerId = customer.id;
      await user.save();
    }

    const checkout = await paddleService.createSubscriptionCheckout(
      user.subscription.paddleCustomerId,
      priceId,
      successUrl
    );
    res.status(200).json({ checkoutUrl: checkout.url });
  } catch (error) {
    next(error);
  }
};

// POST /billing/portal – customer billing portal (to manage payment methods, invoices)
export const billingPortal = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user.subscription.paddleCustomerId) {
      return res.status(400).json({ error: 'No Paddle customer found' });
    }
    const portalUrl = await paddleService.createPortalSession(user.subscription.paddleCustomerId);
    res.status(200).json({ portalUrl });
  } catch (error) {
    next(error);
  }
};

// GET /billing/invoices – list invoices
export const getInvoices = async (req, res, next) => {
  try {
    const invoices = await Invoice.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ invoices });
  } catch (error) {
    next(error);
  }
};

// POST /billing/cancel – cancel subscription
export const cancelSubscription = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    const subId = user.subscription.paddleSubscriptionId;
    if (!subId) return res.status(400).json({ error: 'No active subscription' });

    await paddleService.cancelSubscription(subId);
    user.subscription.canceledAt = new Date();
    await user.save();

    res.status(200).json({ message: 'Subscription will be cancelled at period end' });
  } catch (error) {
    next(error);
  }
};