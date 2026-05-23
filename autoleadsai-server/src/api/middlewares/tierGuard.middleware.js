import { TIERS } from '../../utils/tierConfig.js';
import { Scan } from '../../models/index.js';

export const tierGuard = (feature) => {
  return async (req, res, next) => {
    try {
      const user = req.user;
      const tier = TIERS[user.subscription.tier];

      if (!tier) {
        return res.status(403).json({
          error: 'No active subscription. Please subscribe to continue.',
        });
      }

      // Check if subscription is active
      if (user.subscription.status === 'past_due') {
        return res.status(402).json({
          error: 'Payment past due. Please update your payment method.',
        });
      }

      if (user.subscription.status === 'canceled') {
        return res.status(403).json({
          error: 'Subscription cancelled. Please resubscribe to continue.',
        });
      }

      // Boolean features (true/false)
      if (typeof tier.limits[feature] === 'boolean') {
        if (!tier.limits[feature]) {
          return res.status(403).json({
            error: `${feature} is not available on your ${tier.name} plan.`,
            upgradeRequired: true,
            currentTier: tier.name,
          });
        }
      }

      // Numeric limits (count-based)
      if (typeof tier.limits[feature] === 'number') {
        const usage = await getUsageThisMonth(req.user._id, feature);

        if (usage >= tier.limits[feature]) {
          return res.status(429).json({
            error: `${feature} limit reached (${usage}/${tier.limits[feature]}).`,
            upgradeRequired: true,
            currentTier: tier.name,
            limit: tier.limits[feature],
            usage,
            resetsAt: getEndOfMonth(),
          });
        }
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

// Get usage for the current month
const getUsageThisMonth = async (userId, feature) => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  if (feature === 'scansPerMonth') {
    return await Scan.countDocuments({
      userId,
      createdAt: { $gte: startOfMonth },
    });
  }

  // Add more features as needed (emailsPerMonth, apiCalls, etc.)
  return 0;
};

// Get end of current month
const getEndOfMonth = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + 1, 1);
};