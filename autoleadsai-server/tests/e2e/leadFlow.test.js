import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../../app.js';
import User from '../../src/models/User.model.js';
import Lead from '../../src/models/Lead.model.js';

let mongoServer;
let accessToken;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);

  const signupRes = await request(app).post('/api/v1/auth/signup').send({
    firstName: 'Lead',
    lastName: 'Tester',
    email: 'leadtest@autoleadsai.com',
    password: 'SecurePass123!',
  });
  accessToken = signupRes.body.accessToken;
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

afterEach(async () => {
  await Lead.deleteMany({});
});

describe('Lead Flow E2E', () => {
  const validLead = {
    email: 'lead@example.com',
    name: 'John Prospect',
    company: 'Acme Corp',
    source: 'manual',
  };

  // ─── Create Lead ──────────────────────────────────
  test('POST /api/v1/leads — creates a new lead', async () => {
    const res = await request(app)
      .post('/api/v1/leads')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(validLead)
      .expect(201);

    expect(res.body.lead).toBeDefined();
    expect(res.body.lead.email).toBe(validLead.email);
    expect(res.body.lead.sourceMeta).toBeDefined();
    expect(res.body.lead.sourceMeta.label).toBe('Manual Entry');
  });

  // ─── Get Leads ────────────────────────────────────
  test('GET /api/v1/leads — returns paginated leads', async () => {
    // Create multiple leads
    await request(app)
      .post('/api/v1/leads')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(validLead);

    await request(app)
      .post('/api/v1/leads')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ ...validLead, email: 'lead2@example.com' });

    const res = await request(app)
      .get('/api/v1/leads')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(res.body.leads).toBeDefined();
    expect(res.body.total).toBe(2);
    expect(res.body.page).toBe(1);
  });

  // ─── Get Lead by ID ───────────────────────────────
  test('GET /api/v1/leads/:id — returns a specific lead', async () => {
    const createRes = await request(app)
      .post('/api/v1/leads')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(validLead);

    const leadId = createRes.body.lead._id;

    const res = await request(app)
      .get(`/api/v1/leads/${leadId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(res.body.lead._id).toBe(leadId);
    expect(res.body.lead.sourceMeta).toBeDefined();
  });

  // ─── Update Lead ──────────────────────────────────
  test('PUT /api/v1/leads/:id — updates lead fields', async () => {
    const createRes = await request(app)
      .post('/api/v1/leads')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(validLead);

    const leadId = createRes.body.lead._id;

    const res = await request(app)
      .put(`/api/v1/leads/${leadId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ name: 'Updated Name', qualification: 'hot' })
      .expect(200);

    expect(res.body.lead.name).toBe('Updated Name');
    expect(res.body.lead.qualification).toBe('hot');
  });

  // ─── Delete Lead ──────────────────────────────────
  test('DELETE /api/v1/leads/:id — deletes a lead', async () => {
    const createRes = await request(app)
      .post('/api/v1/leads')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(validLead);

    const leadId = createRes.body.lead._id;

    await request(app)
      .delete(`/api/v1/leads/${leadId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    const deleted = await Lead.findById(leadId);
    expect(deleted).toBeNull();
  });

  // ─── Filter by Qualification ──────────────────────
  test('GET /api/v1/leads?qualification=hot — filters correctly', async () => {
    // Create a hot lead
    await request(app)
      .post('/api/v1/leads')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(validLead);

    // Create and update another lead to hot
    const createRes = await request(app)
      .post('/api/v1/leads')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ ...validLead, email: 'hot@example.com' });

    await request(app)
      .put(`/api/v1/leads/${createRes.body.lead._id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ qualification: 'hot' });

    const res = await request(app)
      .get('/api/v1/leads?qualification=hot')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(res.body.total).toBe(1);
    res.body.leads.forEach((lead) => {
      expect(lead.qualification).toBe('hot');
    });
  });

  // ─── Not Found ────────────────────────────────────
  test('GET /api/v1/leads/:id — returns 404 for non-existent lead', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    await request(app)
      .get(`/api/v1/leads/${fakeId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(404);
  });

  // ─── Unauthorized ─────────────────────────────────
  test('GET /api/v1/leads — rejects unauthenticated', async () => {
    await request(app).get('/api/v1/leads').expect(401);
  });
});