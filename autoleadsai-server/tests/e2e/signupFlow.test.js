import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../../app.js';
import User from '../../src/models/User.model.js';

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

afterEach(async () => {
  await User.deleteMany({});
});

describe('Signup Flow E2E', () => {
  const validUser = {
    firstName: 'Test',
    lastName: 'User',
    email: 'test@autoleadsai.com',
    password: 'SecurePass123!',
  };

  // ─── Successful Signup ────────────────────────────
  test('POST /api/v1/auth/signup — creates a new user and returns tokens', async () => {
    const res = await request(app)
      .post('/api/v1/auth/signup')
      .send(validUser)
      .expect(201);

    expect(res.body.user).toBeDefined();
    expect(res.body.user.email).toBe(validUser.email);
    expect(res.body.user.firstName).toBe(validUser.firstName);
    expect(res.body.accessToken).toBeDefined();
    expect(res.body.user.password).toBeUndefined();
    expect(res.body.user.refreshTokens).toBeUndefined();

    // Verify user was saved to database
    const user = await User.findOne({ email: validUser.email });
    expect(user).not.toBeNull();
    expect(user.subscription.tier).toBe('starter');
    expect(user.subscription.status).toBe('trialing');
  });

  // ─── Duplicate Email ──────────────────────────────
  test('POST /api/v1/auth/signup — rejects duplicate email', async () => {
    await User.create(validUser);

    const res = await request(app)
      .post('/api/v1/auth/signup')
      .send(validUser)
      .expect(409);

    expect(res.body.error).toContain('Email already registered');
  });

  // ─── Missing Fields ───────────────────────────────
  test('POST /api/v1/auth/signup — rejects missing required fields', async () => {
    const res = await request(app)
      .post('/api/v1/auth/signup')
      .send({ email: 'bad@test.com' })
      .expect(400);

    expect(res.body.error).toBeDefined();
  });

  // ─── Weak Password ────────────────────────────────
  test('POST /api/v1/auth/signup — rejects weak password', async () => {
    const res = await request(app)
      .post('/api/v1/auth/signup')
      .send({ ...validUser, password: '123' })
      .expect(400);

    expect(res.body.error).toBeDefined();
  });
});