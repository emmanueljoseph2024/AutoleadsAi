import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../../app.js';
import User from '../../src/models/User.model.js';
import Scan from '../../src/models/Scan.model.js';
import { validUser, validScan, scanResponseShape } from '../fixtures/index.js';

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

afterEach(async () => {
  await Scan.deleteMany({});
});

describe('Scan Integration', () => {
  describe('POST /api/v1/scans/trigger', () => {
    test('queues a new scan with valid sources', async () => {
      const res = await request(app)
        .post('/api/v1/scans/trigger')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(validScan)
        .expect(202);

      expect(res.body.message).toContain('queued');
      expect(res.body.scan).toMatchObject(scanResponseShape);
      expect(res.body.scan.sources).toEqual(['linkedin', 'website']);
      expect(res.body.scan.status).toBe('pending');
      expect(res.body.scan.userId.toString()).toBe(userId.toString());
    });

    test('rejects without sources', async () => {
      await request(app)
        .post('/api/v1/scans/trigger')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({})
        .expect(400);
    });

    test('rejects invalid source', async () => {
      await request(app)
        .post('/api/v1/scans/trigger')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ sources: ['invalid_source'] })
        .expect(400);
    });

    test('rejects empty sources array', async () => {
      await request(app)
        .post('/api/v1/scans/trigger')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ sources: [] })
        .expect(400);
    });

    test('rejects unauthenticated requests', async () => {
      await request(app)
        .post('/api/v1/scans/trigger')
        .send(validScan)
        .expect(401);
    });
  });

  describe('GET /api/v1/scans', () => {
    beforeEach(async () => {
      await Scan.create([
        { ...validScan, userId, status: 'completed', totalFound: 30, newLeads: 8 },
        { ...validScan, userId, sources: ['reddit'], status: 'running' },
        { ...validScan, userId, sources: ['facebook'], status: 'failed' },
      ]);
    });

    test('returns scan history with pagination', async () => {
      const res = await request(app)
        .get('/api/v1/scans')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(res.body.scans).toBeDefined();
      expect(res.body.total).toBe(3);
      expect(res.body.scans.length).toBe(3);
    });

    test('each scan has correct shape', async () => {
      const res = await request(app)
        .get('/api/v1/scans')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      res.body.scans.forEach((scan) => {
        expect(scan).toMatchObject(scanResponseShape);
      });
    });

    test('only returns scans for the authenticated user', async () => {
      const otherUserId = new mongoose.Types.ObjectId();
      await Scan.create({ ...validScan, userId: otherUserId });

      const res = await request(app)
        .get('/api/v1/scans')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(res.body.total).toBe(3); // Only the user's own scans
    });
  });

  describe('GET /api/v1/scans/:id', () => {
    test('returns scan detail with jobs', async () => {
      const scan = await Scan.create({ ...validScan, userId });

      const res = await request(app)
        .get(`/api/v1/scans/${scan._id}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(res.body.scan).toMatchObject(scanResponseShape);
      expect(res.body.jobs).toBeDefined();
      expect(Array.isArray(res.body.jobs)).toBe(true);
    });

    test('returns 404 for non-existent scan', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      await request(app)
        .get(`/api/v1/scans/${fakeId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(404);
    });
  });

  describe('POST /api/v1/scans/:id/cancel', () => {
    test('cancels a running scan', async () => {
      const scan = await Scan.create({ ...validScan, userId, status: 'running' });

      const res = await request(app)
        .post(`/api/v1/scans/${scan._id}/cancel`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(res.body.message).toContain('cancelled');

      const updated = await Scan.findById(scan._id);
      expect(updated.status).toBe('cancelled');
    });

    test('rejects cancellation of non-running scan', async () => {
      const scan = await Scan.create({ ...validScan, userId, status: 'completed' });

      await request(app)
        .post(`/api/v1/scans/${scan._id}/cancel`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(400);
    });
  });
});