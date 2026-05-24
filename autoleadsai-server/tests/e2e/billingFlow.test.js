import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../../app.js';
import User from '../../src/models/User.model.js';

let mongoServer;
let accessToken;
let userId;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);

  const signupRes = await request(app).post('/api/v1/auth/signup').send({
    firstName: 'Billing',
    lastName: 'Tester',
    email: 'billingtest@autoleadsai.com',
    password: 'SecurePass123!',
  });
  accessToken = signupRes.body.accessToken;
  userId = signupRes.body.user._id;
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe('Billing Flow E2E', () => {
  // ─── Get Plans ────────────────────────────────────
  test('GET /api/v1/billing/plans — returns available plans', async () => {
    const res = await request(app)
      .get('/api/v1/billing/plans')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(res.body.plans).toBeDefined();
  });

  // ─── Create Checkout ──────────────────────────────
  test('POST /api/v1/billing/checkout — creates a checkout session', async () => {
    const res = await request(app)
      .post('/api/v1/billing/checkout')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        priceId: 'pri_01h7qj8xq9f5y2b3m4n6k8p0',
        successUrl: 'http://localhost:5173/dashboard',
      })
      .expect(200);

    // In test mode, Paddle returns a checkout URL
    expect(res.body.checkoutUrl || res.body.message).toBeDefined();
  });

  // ─── Cancel Subscription ──────────────────────────
  test('POST /api/v1/billing/cancel — attempts cancellation', async () => {
    const res = await request(app)
      .post('/api/v1/billing/cancel')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(400); // No active Paddle subscription in test

    expect(res.body.error).toBeDefined();
  });

  // ─── Unauthorized ─────────────────────────────────
  test('GET /api/v1/billing/plans — rejects unauthenticated', async () => {
    await request(app).get('/api/v1/billing/plans').expect(401);
  });
});