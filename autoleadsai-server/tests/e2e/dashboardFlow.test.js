import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../../app.js';
import User from '../../src/models/User.model.js';
import Lead from '../../src/models/Lead.model.js';

let mongoServer;
let accessToken;
let userId;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);

  const signupRes = await request(app).post('/api/v1/auth/signup').send({
    firstName: 'Dashboard',
    lastName: 'Tester',
    email: 'dashboard@autoleadsai.com',
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

beforeEach(async () => {
  // Create some test leads for dashboard data
  await Lead.create([
    { userId, email: 'hot1@test.com', name: 'Hot Lead 1', qualification: 'hot', status: 'new' },
    { userId, email: 'hot2@test.com', name: 'Hot Lead 2', qualification: 'hot', status: 'contacted' },
    { userId, email: 'warm1@test.com', name: 'Warm Lead 1', qualification: 'warm', status: 'qualified' },
    { userId, email: 'cold1@test.com', name: 'Cold Lead 1', qualification: 'cold', status: 'scored' },
    { userId, email: 'converted@test.com', name: 'Converted Lead', qualification: 'hot', status: 'converted' },
  ]);
});

afterEach(async () => {
  await Lead.deleteMany({});
});

describe('Dashboard Flow E2E', () => {
  // ─── Get Stats ────────────────────────────────────
  test('GET /api/v1/dashboard/stats — returns dashboard statistics', async () => {
    const res = await request(app)
      .get('/api/v1/dashboard/stats')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(res.body.leads).toBeDefined();
    expect(res.body.leads.total.count).toBe(5);
    expect(res.body.leads.hot.count).toBe(3);
    expect(res.body.leads.converted.count).toBe(1);
    expect(res.body.emails).toBeDefined();
    expect(res.body.scans).toBeDefined();

    // Each stat should have a count and link
    expect(res.body.leads.hot.link).toContain('/leads?qualification=hot');
    expect(res.body.leads.converted.link).toContain('/leads?status=converted');
  });

  // ─── Get Pipeline ─────────────────────────────────
  test('GET /api/v1/dashboard/pipeline — returns pipeline breakdown', async () => {
    const res = await request(app)
      .get('/api/v1/dashboard/pipeline')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(res.body.statusBreakdown).toBeDefined();
    expect(res.body.qualificationBreakdown).toBeDefined();
    expect(res.body.sourceBreakdown).toBeDefined();
  });

  // ─── Get Recent Leads ─────────────────────────────
  test('GET /api/v1/dashboard/recent-leads — returns recent leads', async () => {
    const res = await request(app)
      .get('/api/v1/dashboard/recent-leads')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(res.body.leads).toBeDefined();
    expect(res.body.leads.length).toBeLessThanOrEqual(10);

    // Each lead should have sourceMeta with chatUrl
    res.body.leads.forEach((lead) => {
      expect(lead.sourceMeta).toBeDefined();
      expect(lead.link).toContain('/leads/');
    });
  });

  // ─── Get Activity Feed ────────────────────────────
  test('GET /api/v1/dashboard/activity — returns activity feed', async () => {
    const res = await request(app)
      .get('/api/v1/dashboard/activity')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(res.body.activities).toBeDefined();
    expect(Array.isArray(res.body.activities)).toBe(true);
  });

  // ─── Expand Stats ─────────────────────────────────
  test('GET /api/v1/dashboard/stats?expand=true — returns sample leads', async () => {
    const res = await request(app)
      .get('/api/v1/dashboard/stats?expand=true')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(res.body.samples).toBeDefined();
    expect(res.body.samples.hotLeads).toBeDefined();
    expect(res.body.samples.hotLeads.length).toBeGreaterThan(0);
    expect(res.body.samples.hotLeads[0].sourceUrl).toBeDefined();
  });

  // ─── Invalidate Cache ─────────────────────────────
  test('POST /api/v1/dashboard/invalidate-cache — clears dashboard cache', async () => {
    const res = await request(app)
      .post('/api/v1/dashboard/invalidate-cache')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(res.body.message).toContain('cache cleared');
  });

  // ─── Unauthorized ─────────────────────────────────
  test('GET /api/v1/dashboard/stats — rejects unauthenticated', async () => {
    await request(app).get('/api/v1/dashboard/stats').expect(401);
  });
});