import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Lead from '../../../src/models/Lead.model.js';

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

afterEach(async () => {
  await Lead.deleteMany({});
});

describe('Lead Model', () => {
  const validLead = {
    userId,
    email: 'lead@example.com',
    name: 'John Prospect',
    company: 'Acme Corp',
    source: 'linkedin',
    sourceUrl: 'https://linkedin.com/in/john-prospect',
  };

  // ─── Validation ──────────────────────────────────
  describe('Validation', () => {
    test('creates a valid lead', async () => {
      const lead = new Lead(validLead);
      const saved = await lead.save();

      expect(saved._id).toBeDefined();
      expect(saved.email).toBe(validLead.email);
      expect(saved.name).toBe(validLead.name);
      expect(saved.company).toBe(validLead.company);
      expect(saved.source).toBe(validLead.source);
      expect(saved.sourceUrl).toBe(validLead.sourceUrl);
      expect(saved.status).toBe('new');
      expect(saved.qualification).toBe('cold');
    });

    test('throws error when userId is missing', async () => {
      const lead = new Lead({ ...validLead, userId: undefined });
      await expect(lead.save()).rejects.toThrow();
    });

    test('throws error when email is missing', async () => {
      const lead = new Lead({ ...validLead, email: undefined });
      await expect(lead.save()).rejects.toThrow('Email is required');
    });

    test('converts email to lowercase', async () => {
      const lead = new Lead({ ...validLead, email: 'LEAD@EXAMPLE.COM' });
      const saved = await lead.save();
      expect(saved.email).toBe('lead@example.com');
    });

    test('rejects duplicate email per user', async () => {
      await new Lead(validLead).save();
      const duplicate = new Lead(validLead);
      await expect(duplicate.save()).rejects.toThrow('duplicate key error');
    });

    test('allows same email for different users', async () => {
      await new Lead(validLead).save();
      const otherLead = new Lead({
        ...validLead,
        userId: new mongoose.Types.ObjectId(),
      });
      const saved = await otherLead.save();
      expect(saved._id).toBeDefined();
    });
  });

  // ─── Default Values ──────────────────────────────
  describe('Defaults', () => {
    test('sets default status to new', async () => {
      const lead = new Lead(validLead);
      const saved = await lead.save();
      expect(saved.status).toBe('new');
    });

    test('sets default qualification to cold', async () => {
      const lead = new Lead(validLead);
      const saved = await lead.save();
      expect(saved.qualification).toBe('cold');
    });

    test('sets default intent score to 0', async () => {
      const lead = new Lead(validLead);
      const saved = await lead.save();
      expect(saved.intent.score).toBe(0);
    });

    test('sets default relevance score to 0', async () => {
      const lead = new Lead(validLead);
      const saved = await lead.save();
      expect(saved.relevance.score).toBe(0);
    });
  });

  // ─── Status Transitions ──────────────────────────
  describe('Status and Qualification', () => {
    test('accepts valid status values', async () => {
      const validStatuses = ['new', 'scored', 'qualified', 'contacted', 'replied', 'converted', 'disqualified'];

      for (const status of validStatuses) {
        const lead = new Lead({ ...validLead, email: `${status}@test.com`, status });
        const saved = await lead.save();
        expect(saved.status).toBe(status);
      }
    });

    test('rejects invalid status value', async () => {
      const lead = new Lead({ ...validLead, status: 'invalid_status' });
      await expect(lead.save()).rejects.toThrow();
    });

    test('accepts valid qualification values', async () => {
      const qualifications = ['hot', 'warm', 'cold'];

      for (const qualification of qualifications) {
        const lead = new Lead({
          ...validLead,
          email: `${qualification}@test.com`,
          qualification,
        });
        const saved = await lead.save();
        expect(saved.qualification).toBe(qualification);
      }
    });

    test('rejects invalid qualification value', async () => {
      const lead = new Lead({ ...validLead, qualification: 'lukewarm' });
      await expect(lead.save()).rejects.toThrow();
    });

    test('accepts valid source values', async () => {
      const sources = ['linkedin', 'facebook', 'reddit', 'twitter', 'instagram', 'website', 'google_maps', 'news', 'manual', 'api', 'other'];

      for (const source of sources) {
        const lead = new Lead({ ...validLead, email: `${source}@test.com`, source });
        const saved = await lead.save();
        expect(saved.source).toBe(source);
      }
    });

    test('rejects invalid source value', async () => {
      const lead = new Lead({ ...validLead, source: 'snapchat' });
      await expect(lead.save()).rejects.toThrow();
    });
  });

  // ─── Intent & Relevance ──────────────────────────
  describe('Intent and Relevance', () => {
    test('stores intent score within 0-100 range', async () => {
      const lead = new Lead({
        ...validLead,
        intent: { score: 85, keywords: ['buying', 'urgent'], summary: 'Ready to buy' },
      });
      const saved = await lead.save();
      expect(saved.intent.score).toBe(85);
      expect(saved.intent.keywords).toEqual(['buying', 'urgent']);
      expect(saved.intent.summary).toBe('Ready to buy');
    });

    test('stores relevance score and factors', async () => {
      const lead = new Lead({
        ...validLead,
        relevance: {
          score: 75,
          factors: { industryMatch: true, roleMatch: false, geoMatch: true },
        },
      });
      const saved = await lead.save();
      expect(saved.relevance.score).toBe(75);
      expect(saved.relevance.factors.industryMatch).toBe(true);
      expect(saved.relevance.factors.roleMatch).toBe(false);
      expect(saved.relevance.factors.geoMatch).toBe(true);
    });
  });

  // ─── Email History ───────────────────────────────
  describe('Email History', () => {
    test('stores email history array', async () => {
      const lead = new Lead({
        ...validLead,
        emailHistory: [
          {
            emailId: 'msg_001',
            type: 'initial',
            sentAt: new Date(),
            status: 'sent',
          },
        ],
      });
      const saved = await lead.save();

      expect(saved.emailHistory.length).toBe(1);
      expect(saved.emailHistory[0].emailId).toBe('msg_001');
      expect(saved.emailHistory[0].type).toBe('initial');
      expect(saved.emailHistory[0].status).toBe('sent');
    });

    test('accepts valid email types', async () => {
      const types = ['initial', 'follow_up_1', 'follow_up_2', 'follow_up_3', 'follow_up_4', 'follow_up_5'];
      const emailHistory = types.map((type, i) => ({
        emailId: `msg_00${i}`,
        type,
        sentAt: new Date(),
        status: 'sent',
      }));

      const lead = new Lead({ ...validLead, emailHistory });
      const saved = await lead.save();
      expect(saved.emailHistory.length).toBe(6);
    });

    test('accepts valid email statuses', async () => {
      const statuses = ['sent', 'delivered', 'opened', 'bounced', 'replied'];
      const emailHistory = statuses.map((status, i) => ({
        emailId: `msg_00${i}`,
        type: 'initial',
        sentAt: new Date(),
        status,
      }));

      const lead = new Lead({ ...validLead, emailHistory });
      const saved = await lead.save();
      expect(saved.emailHistory.length).toBe(5);
    });
  });

  // ─── Indexes ─────────────────────────────────────
  describe('Indexes', () => {
    test('has compound index on userId + qualification', async () => {
      const indexes = await Lead.collection.indexes();
      const idx = indexes.find(
        (i) => i.key.userId === 1 && i.key.qualification === 1
      );
      expect(idx).toBeDefined();
    });

    test('has compound index on userId + status', async () => {
      const indexes = await Lead.collection.indexes();
      const idx = indexes.find(
        (i) => i.key.userId === 1 && i.key.status === 1
      );
      expect(idx).toBeDefined();
    });

    test('has compound index on userId + createdAt', async () => {
      const indexes = await Lead.collection.indexes();
      const idx = indexes.find(
        (i) => i.key.userId === 1 && i.key.createdAt === -1
      );
      expect(idx).toBeDefined();
    });

    test('has unique compound index on email + userId', async () => {
      const indexes = await Lead.collection.indexes();
      const idx = indexes.find(
        (i) => i.key.email === 1 && i.key.userId === 1 && i.unique === true
      );
      expect(idx).toBeDefined();
    });
  });
});