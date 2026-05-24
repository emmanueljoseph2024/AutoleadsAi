import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import User from '../../../src/models/User.model.js';
import Lead from '../../../src/models/Lead.model.js';
import Scan from '../../../src/models/Scan.model.js';
import EmailLog from '../../../src/models/EmailLog.model.js';
import {
  getDashboardStats,
  getPipelineData,
  getRecentLeads,
  getActivityFeed,
} from '../../../src/services/analytics/dashboard.service.js';

let mongoServer;
let userId;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
  userId = new mongoose.Types.ObjectId();
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

beforeEach(async () => {
  // Seed test data
  await Lead.create([
    { userId, email: 'hot1@test.com', name: 'Hot 1', qualification: 'hot', status: 'new' },
    { userId, email: 'hot2@test.com', name: 'Hot 2', qualification: 'hot', status: 'contacted' },
    { userId, email: 'warm1@test.com', name: 'Warm 1', qualification: 'warm', status: 'qualified' },
    { userId, email: 'warm2@test.com', name: 'Warm 2', qualification: 'warm', status: 'scored' },
    { userId, email: 'cold1@test.com', name: 'Cold 1', qualification: 'cold', status: 'new' },
    { userId, email: 'converted@test.com', name: 'Converted', qualification: 'hot', status: 'converted' },
  ]);

  await Scan.create([
    { userId, sources: ['linkedin'], status: 'completed', totalFound: 30, newLeads: 8 },
    { userId, sources: ['website'], status: 'completed', totalFound: 15, newLeads: 3 },
  ]);

  await EmailLog.create([
    { userId, to: 'lead1@test.com', from: 'agent@test.com', type: 'initial', status: 'sent', sentAt: new Date() },
    { userId, to: 'lead2@test.com', from: 'agent@test.com', type: 'initial', status: 'opened', sentAt: new Date() },
    { userId, to: 'lead3@test.com', from: 'agent@test.com', type: 'follow_up_1', status: 'replied', sentAt: new Date() },
  ]);
});

afterEach(async () => {
  await Lead.deleteMany({});
  await Scan.deleteMany({});
  await EmailLog.deleteMany({});
});

describe('Dashboard Service', () => {
  // ─── getDashboardStats ────────────────────────────
  describe('getDashboardStats', () => {
    test('returns correct lead counts', async () => {
      const stats = await getDashboardStats(userId);

      expect(stats.leads.total.count).toBe(6);
      expect(stats.leads.hot.count).toBe(3);
      expect(stats.leads.warm.count).toBe(2);
      expect(stats.leads.cold.count).toBe(1);
      expect(stats.leads.converted.count).toBe(1);
    });

    test('returns correct email counts', async () => {
      const stats = await getDashboardStats(userId);

      expect(stats.emails.sent.count).toBe(3);
      expect(stats.emails.opened.count).toBe(2); // opened + replied
      expect(stats.emails.replied.count).toBe(1);
    });

    test('returns correct scan counts', async () => {
      const stats = await getDashboardStats(userId);

      expect(stats.scans.total.count).toBe(2);
    });

    test('every stat has a count and link', async () => {
      const stats = await getDashboardStats(userId);

      expect(stats.leads.hot.count).toBeDefined();
      expect(stats.leads.hot.link).toContain('/leads?qualification=hot');
      expect(stats.leads.converted.link).toContain('/leads?status=converted');
      expect(stats.emails.opened.link).toContain('/email-logs');
    });

    test('calculates conversion rate correctly', async () => {
      const stats = await getDashboardStats(userId);
      const expected = ((1 / 6) * 100).toFixed(1);
      expect(stats.leads.conversionRate).toBe(expected);
    });

    test('calculates open rate correctly', async () => {
      const stats = await getDashboardStats(userId);
      const expected = ((2 / 3) * 100).toFixed(1);
      expect(stats.emails.openRate).toBe(expected);
    });

    test('calculates reply rate correctly', async () => {
      const stats = await getDashboardStats(userId);
      const expected = ((1 / 3) * 100).toFixed(1);
      expect(stats.emails.replyRate).toBe(expected);
    });

    test('returns samples when expand=true', async () => {
      const stats = await getDashboardStats(userId, null, true);

      expect(stats.samples).toBeDefined();
      expect(stats.samples.hotLeads).toBeDefined();
      expect(stats.samples.hotLeads.length).toBeGreaterThan(0);
    });

    test('returns zero counts when no data', async () => {
      await Lead.deleteMany({});
      await Scan.deleteMany({});
      await EmailLog.deleteMany({});

      const stats = await getDashboardStats(userId);

      expect(stats.leads.total.count).toBe(0);
      expect(stats.emails.sent.count).toBe(0);
      expect(stats.scans.total.count).toBe(0);
      expect(stats.leads.conversionRate).toBe('0.0');
    });
  });

  // ─── getPipelineData ──────────────────────────────
  describe('getPipelineData', () => {
    test('returns status breakdown', async () => {
      const pipeline = await getPipelineData(userId);

      expect(pipeline.statusBreakdown).toBeDefined();
      expect(pipeline.statusBreakdown.length).toBeGreaterThan(0);
    });

    test('returns qualification breakdown', async () => {
      const pipeline = await getPipelineData(userId);

      expect(pipeline.qualificationBreakdown).toBeDefined();

      const hotEntry = pipeline.qualificationBreakdown.find(
        (q) => q.qualification === 'hot'
      );
      expect(hotEntry.count).toBe(3);
    });

    test('returns source breakdown', async () => {
      const pipeline = await getPipelineData(userId);

      expect(pipeline.sourceBreakdown).toBeDefined();
    });

    test('pipeline items have links', async () => {
      const pipeline = await getPipelineData(userId);

      if (pipeline.statusBreakdown.length > 0) {
        expect(pipeline.statusBreakdown[0].link).toBeDefined();
      }
    });
  });

  // ─── getRecentLeads ───────────────────────────────
  describe('getRecentLeads', () => {
    test('returns recent leads sorted by createdAt', async () => {
      const leads = await getRecentLeads(userId, 5);

      expect(leads.length).toBe(5);
      expect(new Date(leads[0].createdAt).getTime()).toBeGreaterThanOrEqual(
        new Date(leads[1].createdAt).getTime()
      );
    });

    test('respects limit parameter', async () => {
      const leads = await getRecentLeads(userId, 3);

      expect(leads.length).toBe(3);
    });

    test('returns empty array when no leads exist', async () => {
      await Lead.deleteMany({});

      const leads = await getRecentLeads(userId);

      expect(leads.length).toBe(0);
    });

    test('each lead has required fields', async () => {
      const leads = await getRecentLeads(userId, 2);

      leads.forEach((lead) => {
        expect(lead.name).toBeDefined();
        expect(lead.email).toBeDefined();
        expect(lead.source).toBeDefined();
        expect(lead.sourceUrl).toBeDefined();
        expect(lead.qualification).toBeDefined();
        expect(lead.status).toBeDefined();
      });
    });
  });

  // ─── getActivityFeed ──────────────────────────────
  describe('getActivityFeed', () => {
    test('returns activity feed with correct structure', async () => {
      const activities = await getActivityFeed(userId);

      expect(Array.isArray(activities)).toBe(true);
      expect(activities.length).toBeGreaterThan(0);
    });

    test('each activity has type, message, timestamp, and link', async () => {
      const activities = await getActivityFeed(userId);

      activities.forEach((activity) => {
        expect(activity.type).toBeDefined();
        expect(activity.message).toBeDefined();
        expect(activity.timestamp).toBeDefined();
        expect(activity.link).toBeDefined();
      });
    });

    test('respects limit parameter', async () => {
      const activities = await getActivityFeed(userId, 3);

      expect(activities.length).toBeLessThanOrEqual(3);
    });

    test('includes scan activities', async () => {
      const activities = await getActivityFeed(userId);

      const scanActivities = activities.filter((a) => a.type === 'scan');
      expect(scanActivities.length).toBeGreaterThan(0);
    });

    test('returns empty array when no data', async () => {
      await Lead.deleteMany({});
      await Scan.deleteMany({});
      await EmailLog.deleteMany({});

      const activities = await getActivityFeed(userId);

      expect(activities.length).toBe(0);
    });
  });
});