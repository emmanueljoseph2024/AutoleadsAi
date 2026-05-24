import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import User from '../../../src/models/User.model.js';
import Subscription from '../../../src/models/Subscription.model.js';
import { TIERS } from '../../../src/utils/tierConfig.js';

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

afterEach(async () => {
  await User.deleteMany({});
  await Subscription.deleteMany({});
});

describe('Subscription Service', () => {
  // ─── Tier Configuration ───────────────────────────
  describe('Tier Config', () => {
    test('all tiers have required fields', () => {
      const tiers = Object.keys(TIERS);

      tiers.forEach((tier) => {
        expect(TIERS[tier].name).toBeDefined();
        expect(TIERS[tier].price).toBeDefined();
        expect(TIERS[tier].limits).toBeDefined();
        expect(TIERS[tier].limits.scansPerMonth).toBeDefined();
        expect(TIERS[tier].limits.sources).toBeDefined();
        expect(TIERS[tier].limits.emailsPerMonth).toBeDefined();
      });
    });

    test('starter tier has lowest limits', () => {
      expect(TIERS.starter.limits.scansPerMonth).toBeLessThan(TIERS.pro.limits.scansPerMonth);
      expect(TIERS.starter.limits.emailsPerMonth).toBeLessThan(TIERS.pro.limits.emailsPerMonth);
      expect(TIERS.starter.limits.teamMembers).toBeLessThan(TIERS.pro.limits.teamMembers);
    });

    test('scale tier has highest limits', () => {
      expect(TIERS.scale.limits.scansPerMonth).toBeGreaterThan(TIERS.pro.limits.scansPerMonth);
      expect(TIERS.scale.limits.apiAccess).toBe(true);
      expect(TIERS.scale.limits.whiteLabel).toBe(true);
    });

    test('boolean limits return true/false', () => {
      expect(typeof TIERS.starter.limits.slackAlerts).toBe('boolean');
      expect(typeof TIERS.pro.limits.slackAlerts).toBe('boolean');
      expect(TIERS.starter.limits.slackAlerts).toBe(false);
      expect(TIERS.pro.limits.slackAlerts).toBe(true);
    });

    test('starter has only basic aiScoring', () => {
      expect(TIERS.starter.limits.aiScoring).toBe('basic');
      expect(TIERS.pro.limits.aiScoring).toBe('advanced');
    });
  });

  // ─── Trial Management ─────────────────────────────
  describe('Trial', () => {
    test('new user has active trial', async () => {
      const user = new User({
        firstName: 'Trial',
        lastName: 'User',
        email: 'trial@test.com',
        password: 'SecurePass123!',
      });
      await user.save();

      expect(user.subscription.status).toBe('trialing');
      expect(user.isTrialActive()).toBe(true);
    });

    test('trial expires after 14 days', async () => {
      const user = new User({
        firstName: 'Expired',
        lastName: 'Trial',
        email: 'expired@test.com',
        password: 'SecurePass123!',
        subscription: {
          tier: 'starter',
          status: 'trialing',
          trialStart: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
          trialEnd: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        },
      });
      await user.save();

      expect(user.isTrialActive()).toBe(false);
    });

    test('user can be upgraded from trial to paid', async () => {
      const user = new User({
        firstName: 'Upgrade',
        lastName: 'User',
        email: 'upgrade@test.com',
        password: 'SecurePass123!',
      });
      await user.save();

      user.subscription.tier = 'pro';
      user.subscription.status = 'active';
      await user.save();

      expect(user.subscription.tier).toBe('pro');
      expect(user.subscription.status).toBe('active');
      expect(user.isTrialActive()).toBe(false);
    });
  });

  // ─── Subscription Status Transitions ──────────────
  describe('Status Transitions', () => {
    test('active to past_due', async () => {
      const user = new User({
        firstName: 'PastDue',
        lastName: 'User',
        email: 'pastdue@test.com',
        password: 'SecurePass123!',
        subscription: { tier: 'pro', status: 'active' },
      });
      await user.save();

      user.subscription.status = 'past_due';
      await user.save();

      expect(user.subscription.status).toBe('past_due');
    });

    test('active to canceled', async () => {
      const user = new User({
        firstName: 'Cancel',
        lastName: 'User',
        email: 'cancel@test.com',
        password: 'SecurePass123!',
        subscription: { tier: 'pro', status: 'active' },
      });
      await user.save();

      user.subscription.status = 'canceled';
      await user.save();

      expect(user.subscription.status).toBe('canceled');
    });

    test('past_due to active (resolved)', async () => {
      const user = new User({
        firstName: 'Resolved',
        lastName: 'User',
        email: 'resolved@test.com',
        password: 'SecurePass123!',
        subscription: { tier: 'pro', status: 'past_due' },
      });
      await user.save();

      user.subscription.status = 'active';
      await user.save();

      expect(user.subscription.status).toBe('active');
    });
  });

  // ─── Subscription Model ───────────────────────────
  describe('Subscription Model', () => {
    test('creates a subscription record', async () => {
      const userId = new mongoose.Types.ObjectId();
      const subscription = new Subscription({
        userId,
        paddleSubscriptionId: 'sub_test_123',
        tier: 'pro',
        status: 'active',
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        currency: 'USD',
        amount: 7900,
        interval: 'month',
      });
      const saved = await subscription.save();

      expect(saved._id).toBeDefined();
      expect(saved.paddleSubscriptionId).toBe('sub_test_123');
      expect(saved.tier).toBe('pro');
      expect(saved.status).toBe('active');
      expect(saved.currency).toBe('USD');
      expect(saved.amount).toBe(7900);
      expect(saved.interval).toBe('month');
    });

    test('accepts valid tier values', async () => {
      const tiers = ['starter', 'pro', 'scale'];

      for (const tier of tiers) {
        const subscription = new Subscription({
          userId: new mongoose.Types.ObjectId(),
          paddleSubscriptionId: `sub_${tier}_123`,
          tier,
          status: 'active',
        });
        const saved = await subscription.save();
        expect(saved.tier).toBe(tier);
      }
    });

    test('accepts valid status values', async () => {
      const statuses = ['active', 'past_due', 'canceled', 'paused', 'trialing'];

      for (const status of statuses) {
        const subscription = new Subscription({
          userId: new mongoose.Types.ObjectId(),
          paddleSubscriptionId: `sub_${status}_123`,
          tier: 'pro',
          status,
        });
        const saved = await subscription.save();
        expect(saved.status).toBe(status);
      }
    });
  });
});