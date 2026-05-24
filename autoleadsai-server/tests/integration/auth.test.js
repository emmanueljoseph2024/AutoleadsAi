import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../../app.js';
import User from '../../src/models/User.model.js';
import { validUser, authResponseShape } from '../fixtures/index.js';

let mongoServer;
let accessToken;
let refreshTokenCookie;

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
});

describe('Auth Integration', () => {
  describe('POST /api/v1/auth/signup', () => {
    test('creates user and returns tokens with correct shape', async () => {
      const res = await request(app)
        .post('/api/v1/auth/signup')
        .send(validUser)
        .expect(201);

      expect(res.body).toMatchObject(authResponseShape);
      expect(res.body.accessToken).toBeTruthy();
      expect(res.headers['set-cookie']).toBeDefined();

      // Verify database state
      const user = await User.findOne({ email: validUser.email }).select('+password');
      expect(user).not.toBeNull();
      expect(user.firstName).toBe(validUser.firstName);
      expect(user.password).not.toBe(validUser.password); // Hashed
      expect(user.subscription.tier).toBe('starter');
      expect(user.subscription.status).toBe('trialing');
    });

    test('returns 409 for duplicate email', async () => {
      await User.create(validUser);
      const res = await request(app)
        .post('/api/v1/auth/signup')
        .send(validUser)
        .expect(409);
      expect(res.body.error).toContain('already registered');
    });

    test('returns 400 when required fields are missing', async () => {
      const res = await request(app)
        .post('/api/v1/auth/signup')
        .send({ email: 'bad@test.com' })
        .expect(400);
      expect(res.body.error).toBeDefined();
    });

    test('returns 400 for invalid email format', async () => {
      const res = await request(app)
        .post('/api/v1/auth/signup')
        .send({ ...validUser, email: 'not-an-email' })
        .expect(400);
      expect(res.body.error).toBeDefined();
    });

    test('returns 400 for password less than 8 characters', async () => {
      const res = await request(app)
        .post('/api/v1/auth/signup')
        .send({ ...validUser, password: 'Short1!' })
        .expect(400);
      expect(res.body.error).toBeDefined();
    });
  });

  describe('POST /api/v1/auth/login', () => {
    beforeEach(async () => {
      // Create a verified user for login tests
      const user = new User({ ...validUser, emailVerified: true });
      await user.save();
    });

    test('logs in with valid credentials', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({ email: validUser.email, password: validUser.password })
        .expect(200);

      expect(res.body).toMatchObject(authResponseShape);
      expect(res.body.accessToken).toBeTruthy();
      accessToken = res.body.accessToken;
      refreshTokenCookie = res.headers['set-cookie'];

      // Verify lastLogin was updated
      const user = await User.findOne({ email: validUser.email });
      expect(user.lastLogin).not.toBeNull();
    });

    test('returns 401 with wrong password', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({ email: validUser.email, password: 'WrongPassword1!' })
        .expect(401);
      expect(res.body.error).toBeDefined();
    });

    test('returns 401 for non-existent email', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({ email: 'nobody@test.com', password: 'SomePass1!' })
        .expect(401);
      expect(res.body.error).toBeDefined();
    });

    test('returns 403 for deactivated account', async () => {
      await User.findOneAndUpdate({ email: validUser.email }, { isActive: false });
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({ email: validUser.email, password: validUser.password })
        .expect(403);
      expect(res.body.error).toContain('deactivated');
    });
  });

  describe('GET /api/v1/auth/me', () => {
    test('returns current user with valid token', async () => {
      // First login to get token
      const user = new User({ ...validUser, emailVerified: true });
      await user.save();
      const loginRes = await request(app)
        .post('/api/v1/auth/login')
        .send({ email: validUser.email, password: validUser.password });

      const res = await request(app)
        .get('/api/v1/auth/me')
        .set('Authorization', `Bearer ${loginRes.body.accessToken}`)
        .expect(200);

      expect(res.body.user.email).toBe(validUser.email);
      expect(res.body.user.password).toBeUndefined();
      expect(res.body.user.refreshTokens).toBeUndefined();
    });

    test('returns 401 without token', async () => {
      await request(app).get('/api/v1/auth/me').expect(401);
    });

    test('returns 401 with invalid token', async () => {
      await request(app)
        .get('/api/v1/auth/me')
        .set('Authorization', 'Bearer invalid-token')
        .expect(401);
    });

    test('returns 401 with expired token', async () => {
      const expiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTc5YzQ4ZjA2YzRmNTJhYjBlYzEyMzQiLCJpYXQiOjE3MDAwMDAwMDAsImV4cCI6MTcwMDAwMDAwMX0.invalid';
      await request(app)
        .get('/api/v1/auth/me')
        .set('Authorization', `Bearer ${expiredToken}`)
        .expect(401);
    });
  });

  describe('POST /api/v1/auth/refresh', () => {
    test('issues new access token with valid refresh cookie', async () => {
      const user = new User({ ...validUser, emailVerified: true });
      await user.save();
      const loginRes = await request(app)
        .post('/api/v1/auth/login')
        .send({ email: validUser.email, password: validUser.password });

      const res = await request(app)
        .post('/api/v1/auth/refresh')
        .set('Cookie', loginRes.headers['set-cookie'])
        .expect(200);

      expect(res.body.accessToken).toBeTruthy();
      expect(res.body.accessToken).not.toBe(loginRes.body.accessToken);
    });

    test('returns 401 without refresh cookie', async () => {
      await request(app).post('/api/v1/auth/refresh').expect(401);
    });
  });

  describe('POST /api/v1/auth/logout', () => {
    test('clears refresh token and logs out', async () => {
      const user = new User({ ...validUser, emailVerified: true });
      await user.save();
      const loginRes = await request(app)
        .post('/api/v1/auth/login')
        .send({ email: validUser.email, password: validUser.password });

      const res = await request(app)
        .post('/api/v1/auth/logout')
        .set('Cookie', loginRes.headers['set-cookie'])
        .expect(200);

      expect(res.body.message).toContain('Logged out');
    });
  });
});