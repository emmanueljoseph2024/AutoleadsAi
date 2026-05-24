import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../../app.js';
import User from '../../src/models/User.model.js';
import Lead from '../../src/models/Lead.model.js';
import Scan from '../../src/models/Scan.model.js';
import EmailLog from '../../src/models/EmailLog.model.js';
import { validUser, generateBulkLeads } from '../fixtures/index.js';

let mongoServer;
let accessToken;
let userId;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());

  const user = new User({ ...validUser, emailVerified: true });
  await user.save();
  userId = user._id;

  const loginRes = await request(app)
    .post('/api/v1/auth/login')
    .send({ email: validUser.email, password: validUser.password });
  accessToken = loginRes.body.accessToken;
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

beforeEach(async () => {
  // Seed data for dashboard
  const leads = generateBulkLeads(userId, 20);
  await Lead.insertMany(leads);

  await Scan.create([
    { userId, sources: ['linkedin', 'website'], status: 'completed', totalFound: 45, newLeads: 12, createdAt: new Date() },
    { userId, sources: ['reddit'], status: 'completed', totalFound: 20, newLeads: 5, createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
  ]);

  await EmailLog.create([
    { userId, to: 'lead1@test.com', from: 'agent@test.com', type: 'initial', status: 'sent', sentAt: new Date() },
    { userId, to: 'lead2@test.com', from: 'agent@test.com', type: 'follow_up_1', status: 'opened', sentAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), openedAt: new Date() },
    { userId, to: 'lead3@test.com', from: 'agent@test.com', type: 'follow_up_2', status: 'replied', sentAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), repliedAt: new Date() },
  ]);
});

afterEach(async () => {
  await Lead.deleteMany({});
  await Scan.deleteMany({});
  await EmailLog.deleteMany({});
});

describe('Dashboard Integration', () => {
  describe('GET /api/v1/dashboard/stats', () => {
    test('returns dashboard statistics with correct counts', async () => {
      const res = await request(app)
        .get('/api/v1/dashboard/stats')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(res.body.leads).toBeDefined();
      expect(res.body.leads.total.count).toBe(20);
      expect(res.body.emails).toBeDefined();
      expect(res.body.emails.sent.count).toBe(3);
      expect(res.body.scans).toBeDefined();
      expect(res.body.scans.total.count).toBe(2);
    });

    test('every stat has count and link', async () => {
      const res = await request(app)
        .get('/api/v1/dashboard/stats')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      // Check leads stats
      expect(res.body.leads.hot.count).toBeDefined();
      expect(res.body.leads.hot.link).toContain('/leads?qualification=hot');

      // Check email stats
      expect(res.body.emails.opened.count).toBeDefined();
      expect(res.body.emails.opened.link).toContain('/email-logs');

      // Check scan stats
      expect(res.body.scans.total.count).toBeDefined();
      expect(res.body.scans.total.link).toContain('/scans');
    });

    test('expand=true returns sample leads with sourceUrl', async () => {
      const res = await request(app)
        .get('/api/v1/dashboard/stats?expand=true')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(res.body.samples).toBeDefined();
      expect(res.body.samples.hotLeads).toBeDefined();
      if (res.body.samples.hotLeads.length > 0) {
        expect(res.body.samples.hotLeads[0].sourceUrl).toBeDefined();
      }
    });
  });

  describe('GET /api/v1/dashboard/pipeline', () => {
    test('returns pipeline breakdown with links', async () => {
      const res = await request(app)
        .get('/api/v1/dashboard/pipeline')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(res.body.statusBreakdown).toBeDefined();
      expect(res.body.qualificationBreakdown).toBeDefined();
      expect(res.body.sourceBreakdown).toBeDefined();

      // Each item should have a link
      if (res.body.statusBreakdown.length > 0) {
        expect(res.body.statusBreakdown[0].link).toBeDefined();
      }
      if (res.body.sourceBreakdown.length > 0) {
        expect(res.body.sourceBreakdown[0].link).toBeDefined();
      }
    });
  });

  describe('GET /api/v1/dashboard/recent-leads', () => {
    test('returns recent leads with sourceMeta', async () => {
      const res = await request(app)
        .get('/api/v1/dashboard/recent-leads')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(res.body.leads).toBeDefined();
      expect(res.body.leads.length).toBeLessThanOrEqual(10);

      res.body.leads.forEach((lead) => {
        expect(lead.sourceMeta).toBeDefined();
        expect(lead.link).toContain('/leads/');
      });
    });
  });

  describe('GET /api/v1/dashboard/activity', () => {
    test('returns activity feed', async () => {
      const res = await request(app)
        .get('/api/v1/dashboard/activity')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(res.body.activities).toBeDefined();
      expect(Array.isArray(res.body.activities)).toBe(true);
    });
  });

  describe('GET /api/v1/dashboard/email-performance', () => {
    test('returns email performance metrics', async () => {
      const res = await request(app)
        .get('/api/v1/dashboard/email-performance')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(res.body.summary).toBeDefined();
      expect(res.body.dailyStats).toBeDefined();
    });
  });

  describe('GET /api/v1/dashboard/scan-performance', () => {
    test('returns scan performance metrics', async () => {
      const res = await request(app)
        .get('/api/v1/dashboard/scan-performance')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(res.body.summary).toBeDefined();
      expect(res.body.sourceBreakdown).toBeDefined();
      expect(res.body.dailyStats).toBeDefined();
    });
  });

  describe('GET /api/v1/dashboard/source-analytics', () => {
    test('returns source breakdown with links', async () => {
      const res = await request(app)
        .get('/api/v1/dashboard/source-analytics')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(res.body.sources).toBeDefined();
      expect(Array.isArray(res.body.sources)).toBe(true);
    });
  });

  describe('POST /api/v1/dashboard/invalidate-cache', () => {
    test('clears dashboard cache', async () => {
      const res = await request(app)
        .post('/api/v1/dashboard/invalidate-cache')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(res.body.message).toContain('cleared');
    });
  });
});