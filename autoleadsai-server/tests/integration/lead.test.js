import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../../app.js';
import User from '../../src/models/User.model.js';
import Lead from '../../src/models/Lead.model.js';
import {
  validUser,
  validLead,
  hotLead,
  leadResponseShape,
  leadListResponseShape,
} from '../fixtures/index.js';

let mongoServer;
let accessToken;
let userId;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());

  // Create user and get token
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

afterEach(async () => {
  await Lead.deleteMany({});
});

describe('Lead Integration', () => {
  describe('POST /api/v1/leads', () => {
    test('creates a lead with correct shape and sourceMeta', async () => {
      const res = await request(app)
        .post('/api/v1/leads')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(validLead)
        .expect(201);

      expect(res.body.lead).toMatchObject(leadResponseShape);
      expect(res.body.lead.email).toBe(validLead.email);
      expect(res.body.lead.sourceMeta.label).toBe('Manual Entry');
      expect(res.body.lead.sourceMeta.canChat).toBe(false);
      expect(res.body.lead.sourceMeta.chatUrl).toBeNull();

      // Verify database state
      const lead = await Lead.findOne({ email: validLead.email });
      expect(lead).not.toBeNull();
      expect(lead.userId.toString()).toBe(userId.toString());
      expect(lead.status).toBe('new');
    });

    test('returns 400 for invalid email', async () => {
      const res = await request(app)
        .post('/api/v1/leads')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ ...validLead, email: 'invalid' })
        .expect(400);
      expect(res.body.error).toBeDefined();
    });

    test('returns 409 for duplicate email per user', async () => {
      await Lead.create({ ...validLead, userId });
      const res = await request(app)
        .post('/api/v1/leads')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(validLead)
        .expect(409);
      expect(res.body.error).toContain('already exists');
    });
  });

  describe('GET /api/v1/leads', () => {
    beforeEach(async () => {
      await Lead.create([
        { ...hotLead, userId },
        { ...validLead, userId, email: 'second@test.com' },
        { ...validLead, userId, email: 'third@test.com', qualification: 'warm' },
      ]);
    });

    test('returns paginated leads', async () => {
      const res = await request(app)
        .get('/api/v1/leads')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(res.body).toMatchObject(leadListResponseShape);
      expect(res.body.leads.length).toBe(3);
      expect(res.body.total).toBe(3);
      expect(res.body.page).toBe(1);
      expect(res.body.pages).toBe(1);
    });

    test('filters by qualification', async () => {
      const res = await request(app)
        .get('/api/v1/leads?qualification=hot')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(res.body.total).toBe(1);
      expect(res.body.leads[0].qualification).toBe('hot');
    });

    test('filters by status', async () => {
      const res = await request(app)
        .get('/api/v1/leads?status=qualified')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(res.body.total).toBe(1);
      expect(res.body.leads[0].status).toBe('qualified');
    });

    test('searches by name', async () => {
      const res = await request(app)
        .get('/api/v1/leads?search=Hot')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(res.body.total).toBe(1);
      expect(res.body.leads[0].name).toContain('Hot');
    });

    test('supports pagination', async () => {
      const res = await request(app)
        .get('/api/v1/leads?page=1&limit=2')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(res.body.leads.length).toBe(2);
      expect(res.body.pages).toBe(2);
    });

    test('each lead has sourceMeta with link', async () => {
      const res = await request(app)
        .get('/api/v1/leads')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      res.body.leads.forEach((lead) => {
        expect(lead.sourceMeta).toBeDefined();
        expect(lead.sourceMeta.label).toBeDefined();
        expect(lead.sourceMeta.icon).toBeDefined();
        expect(lead.sourceMeta.color).toBeDefined();
        expect(lead.link).toContain('/leads/');
      });
    });
  });

  describe('GET /api/v1/leads/:id', () => {
    test('returns a specific lead by ID', async () => {
      const lead = await Lead.create({ ...validLead, userId });

      const res = await request(app)
        .get(`/api/v1/leads/${lead._id}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(res.body.lead).toMatchObject(leadResponseShape);
      expect(res.body.lead._id.toString()).toBe(lead._id.toString());
    });

    test('returns 404 for non-existent lead', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      await request(app)
        .get(`/api/v1/leads/${fakeId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(404);
    });

    test('returns 404 for another user\'s lead', async () => {
      const otherUserId = new mongoose.Types.ObjectId();
      const lead = await Lead.create({ ...validLead, userId: otherUserId });

      await request(app)
        .get(`/api/v1/leads/${lead._id}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(404);
    });
  });

  describe('PUT /api/v1/leads/:id', () => {
    test('updates allowed fields', async () => {
      const lead = await Lead.create({ ...validLead, userId });

      const res = await request(app)
        .put(`/api/v1/leads/${lead._id}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'Updated Name', qualification: 'hot', status: 'qualified' })
        .expect(200);

      expect(res.body.lead.name).toBe('Updated Name');
      expect(res.body.lead.qualification).toBe('hot');
      expect(res.body.lead.status).toBe('qualified');
    });

    test('ignores disallowed fields', async () => {
      const lead = await Lead.create({ ...validLead, userId });

      const res = await request(app)
        .put(`/api/v1/leads/${lead._id}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ email: 'hacked@test.com', userId: 'fake' })
        .expect(200);

      expect(res.body.lead.email).toBe(validLead.email);
    });
  });

  describe('DELETE /api/v1/leads/:id', () => {
    test('deletes a lead', async () => {
      const lead = await Lead.create({ ...validLead, userId });

      await request(app)
        .delete(`/api/v1/leads/${lead._id}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      const deleted = await Lead.findById(lead._id);
      expect(deleted).toBeNull();
    });
  });
});