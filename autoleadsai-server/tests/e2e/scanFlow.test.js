import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../../app.js';
import User from '../../src/models/User.model.js';
import Scan from '../../src/models/Scan.model.js';

let mongoServer;
let accessToken;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);

  // Create a test user and get token
  const signupRes = await request(app).post('/api/v1/auth/signup').send({
    firstName: 'Scan',
    lastName: 'Tester',
    email: 'scantest@autoleadsai.com',
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
  await Scan.deleteMany({});
});

describe('Scan Flow E2E', () => {
  // ─── Trigger Scan ─────────────────────────────────
  test('POST /api/v1/scans/trigger — queues a new scan', async () => {
    const res = await request(app)
      .post('/api/v1/scans/trigger')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ sources: ['linkedin', 'website'] })
      .expect(202);

    expect(res.body.message).toContain('queued');
    expect(res.body.scan).toBeDefined();
    expect(res.body.scan.sources).toEqual(['linkedin', 'website']);
    expect(res.body.scan.status).toBe('pending');
  });

  // ─── Get Scan History ─────────────────────────────
  test('GET /api/v1/scans — returns scan history', async () => {
    // Create a few scans first
    await request(app)
      .post('/api/v1/scans/trigger')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ sources: ['linkedin'] });

    await request(app)
      .post('/api/v1/scans/trigger')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ sources: ['website'] });

    const res = await request(app)
      .get('/api/v1/scans')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(res.body.scans).toBeDefined();
    expect(res.body.total).toBeGreaterThanOrEqual(2);
  });

  // ─── Unauthorized ─────────────────────────────────
  test('POST /api/v1/scans/trigger — rejects unauthenticated requests', async () => {
    await request(app)
      .post('/api/v1/scans/trigger')
      .send({ sources: ['linkedin'] })
      .expect(401);
  });

  // ─── Invalid Source ───────────────────────────────
  test('POST /api/v1/scans/trigger — rejects invalid source', async () => {
    await request(app)
      .post('/api/v1/scans/trigger')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ sources: ['invalid_source'] })
      .expect(400);
  });
});