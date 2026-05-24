import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import crypto from 'crypto';
import app from '../../app.js';
import User from '../../src/models/User.model.js';
import Subscription from '../../src/models/Subscription.model.js';
import { validUser } from '../fixtures/index.js';

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

describe('Webhook Integration', () => {
  describe('POST /api/v1/webhooks/paddle', () => {
    let user;
    let paddleCustomerId;

    beforeEach(async () => {
      paddleCustomerId = 'ctm_01h7qj8xq9f5y2b3m4n6k8p0';
      user = new User({
        ...validUser,
        emailVerified: true,
        subscription: {
          ...validUser.subscription,
          paddleCustomerId,
        },
      });
      await user.save();
    });

    test('handles subscription.created event', async () => {
      const paddleEvent = {
        event_type: 'subscription.created',
        data: {
          id: 'sub_01h7qj8xq9f5y2b3m4n6k8p0',
          customer_id: paddleCustomerId,
          status: 'active',
          items: [{ price_id: 'pri_pro_monthly' }],
          current_billing_period: {
            starts_at: new Date().toISOString(),
            ends_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          },
          custom_data: { userId: user._id.toString() },
        },
      };

      const res = await request(app)
        .post('/api/v1/webhooks/paddle')
        .send(paddleEvent)
        .expect(200);

      expect(res.body.received).toBe(true);

      // Verify subscription was created
      const subscription = await Subscription.findOne({ userId: user._id });
      expect(subscription).not.toBeNull();
      expect(subscription.paddleSubscriptionId).toBe('sub_01h7qj8xq9f5y2b3m4n6k8p0');
      expect(subscription.status).toBe('active');
    });

    test('handles subscription.canceled event', async () => {
      // Create an existing subscription first
      const subscription = await Subscription.create({
        userId: user._id,
        paddleCustomerId,
        paddleSubscriptionId: 'sub_cancel_test',
        tier: 'pro',
        status: 'active',
      });

      const paddleEvent = {
        event_type: 'subscription.canceled',
        data: {
          id: 'sub_cancel_test',
          customer_id: paddleCustomerId,
          status: 'canceled',
          custom_data: { userId: user._id.toString() },
          scheduled_change: {
            effective_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          },
        },
      };

      const res = await request(app)
        .post('/api/v1/webhooks/paddle')
        .send(paddleEvent)
        .expect(200);

      expect(res.body.received).toBe(true);

      const updated = await Subscription.findById(subscription._id);
      expect(updated.status).toBe('canceled');
      expect(updated.canceledAt).not.toBeNull();
    });

    test('handles subscription.past_due event', async () => {
      await Subscription.create({
        userId: user._id,
        paddleCustomerId,
        paddleSubscriptionId: 'sub_past_due_test',
        tier: 'pro',
        status: 'active',
      });

      const paddleEvent = {
        event_type: 'subscription.past_due',
        data: {
          id: 'sub_past_due_test',
          customer_id: paddleCustomerId,
          status: 'past_due',
          custom_data: { userId: user._id.toString() },
        },
      };

      await request(app)
        .post('/api/v1/webhooks/paddle')
        .send(paddleEvent)
        .expect(200);

      // Verify user subscription status updated
      const updatedUser = await User.findById(user._id);
      expect(updatedUser.subscription.status).toBe('past_due');
    });

    test('handles transaction.completed event', async () => {
      const paddleEvent = {
        event_type: 'transaction.completed',
        data: {
          id: 'txn_01h7qj8xq9f5y2b3m4n6k8p0',
          customer_id: paddleCustomerId,
          custom_data: { userId: user._id.toString() },
          items: [{ price: { unit_price: { amount: '7900', currency_code: 'USD' } } }],
        },
      };

      const res = await request(app)
        .post('/api/v1/webhooks/paddle')
        .send(paddleEvent)
        .expect(200);

      expect(res.body.received).toBe(true);
    });

    test('rejects webhook with invalid signature', async () => {
      const paddleEvent = {
        event_type: 'subscription.created',
        data: {},
      };

      await request(app)
        .post('/api/v1/webhooks/paddle')
        .set('paddle-signature', 'invalid_signature_here')
        .send(paddleEvent)
        .expect(400);
    });

    test('handles n8n callback webhook', async () => {
      const n8nEvent = {
        event: 'ai.insight.generated',
        payload: {
          userId: user._id.toString(),
          leadId: new mongoose.Types.ObjectId().toString(),
          type: 'lead_analysis',
          title: 'Test Insight',
          content: 'This lead shows high buying intent.',
          suggestedMessage: 'Hi there, would love to connect!',
          tone: 'professional',
          keyPoints: ['Buying intent', 'Real estate investor'],
          leadCategory: 'investor',
          confidence: 85,
        },
      };

      const res = await request(app)
        .post('/api/v1/webhooks/n8n')
        .send(n8nEvent)
        .expect(200);

      expect(res.body.received).toBe(true);
    });
  });

  describe('POST /api/v1/webhooks/slack', () => {
    test('acknowledges slack webhook', async () => {
      await request(app)
        .post('/api/v1/webhooks/slack')
        .send({ type: 'url_verification', challenge: 'test_challenge' })
        .expect(200);
    });
  });
});