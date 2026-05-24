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

describe('Auth Flow E2E', () => {
  const validUser = {
    firstName: 'Auth',
    lastName: 'Tester',
    email: 'authtest@autoleadsai.com',
    password: 'SecurePass123!',
  };

  // ─── Full Auth Cycle ──────────────────────────────
  test('Complete auth flow: signup → login → refresh → getMe → logout', async () => {
    // 1. Signup
    const signupRes = await request(app)
      .post('/api/v1/auth/signup')
      .send(validUser)
      .expect(201);

    const accessToken = signupRes.body.accessToken;
    const refreshTokenCookie = signupRes.headers['set-cookie'];

    expect(accessToken).toBeDefined();
    expect(signupRes.body.user.email).toBe(validUser.email);

    // 2. Get current user
    const meRes = await request(app)
      .get('/api/v1/auth/me')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(meRes.body.user.email).toBe(validUser.email);

    // 3. Login (after signup)
    const loginRes = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: validUser.email, password: validUser.password })
      .expect(200);

    const newAccessToken = loginRes.body.accessToken;
    expect(newAccessToken).toBeDefined();

    // 4. Refresh token
    const refreshRes = await request(app)
      .post('/api/v1/auth/refresh')
      .set('Cookie', refreshTokenCookie || loginRes.headers['set-cookie'])
      .expect(200);

    expect(refreshRes.body.accessToken).toBeDefined();
    expect(refreshRes.body.accessToken).not.toBe(newAccessToken);

    // 5. Logout
    await request(app)
      .post('/api/v1/auth/logout')
      .set('Authorization', `Bearer ${refreshRes.body.accessToken}`)
      .expect(200);

    // 6. Verify token no longer works (optional — depends on blacklisting)
  });

  // ─── Login with Wrong Password ────────────────────
  test('POST /api/v1/auth/login — rejects wrong password', async () => {
    await User.create(validUser);

    await request(app)
      .post('/api/v1/auth/login')
      .send({ email: validUser.email, password: 'WrongPassword1!' })
      .expect(401);
  });

  // ─── Login with Non-Existent Email ────────────────
  test('POST /api/v1/auth/login — rejects non-existent email', async () => {
    await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'nobody@test.com', password: 'SecurePass123!' })
      .expect(401);
  });

  // ─── Protected Route Without Token ────────────────
  test('Protected routes reject requests without token', async () => {
    await request(app).get('/api/v1/auth/me').expect(401);
  });

  // ─── Protected Route With Invalid Token ───────────
  test('Protected routes reject invalid token', async () => {
    await request(app)
      .get('/api/v1/auth/me')
      .set('Authorization', 'Bearer invalid-token-here')
      .expect(401);
  });
});