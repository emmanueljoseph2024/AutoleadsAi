import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import dotenv from 'dotenv';
import { jest } from '@jest/globals';

// Load test environment variables
dotenv.config({ path: '.env.test' });

// ─── Global Test Setup ──────────────────────────────

let mongoServer;

// Increase test timeout for database operations
jest.setTimeout(30000);

// Suppress console logs during tests (optional)
global.console = {
  ...console,
  log: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  // Keep error logging for debugging
  error: console.error,
};

// ─── Before All Tests ───────────────────────────────

beforeAll(async () => {
  // Start in-memory MongoDB
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  // Set the MongoDB URI for the test environment
  process.env.MONGODB_URI = mongoUri;

  // Connect to the in-memory database
  await mongoose.connect(mongoUri);

  // Store mongoServer for teardown
  global.__MONGO_SERVER__ = mongoServer;
});

// ─── After All Tests ────────────────────────────────

afterAll(async () => {
  // Drop the database
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  }

  // Stop in-memory MongoDB
  if (global.__MONGO_SERVER__) {
    await global.__MONGO_SERVER__.stop();
  }
});

// ─── Before Each Test ───────────────────────────────

beforeEach(async () => {
  // Clear all collections before each test
  if (mongoose.connection.readyState !== 0) {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  }
});

// ─── After Each Test ────────────────────────────────

afterEach(async () => {
  // Clear any remaining data
  if (mongoose.connection.readyState !== 0) {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  }

  // Clear all mocks
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

// ─── Global Test Helpers ────────────────────────────

// Helper to create a test user with token
global.createTestUser = async (User, overrides = {}) => {
  const defaultUser = {
    firstName: 'Test',
    lastName: 'User',
    email: `test-${Date.now()}@autoleadsai.com`,
    password: 'SecurePass123!',
    emailVerified: true,
    ...overrides,
  };

  const user = new User(defaultUser);
  await user.save();
  return user;
};

// Helper to generate a random ObjectId string
global.generateObjectId = () => {
  return new mongoose.Types.ObjectId().toString();
};

// Helper to generate a valid JWT-like string (for testing invalid tokens)
global.generateFakeToken = () => {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const payload = Buffer.from(JSON.stringify({ userId: 'fake-user-id', iat: Date.now() })).toString('base64url');
  const signature = Buffer.from('fake-signature').toString('base64url');
  return `${header}.${payload}.${signature}`;
};

// Helper to wait for a condition (for async operations)
global.waitFor = async (conditionFn, timeout = 5000, interval = 100) => {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    if (await conditionFn()) return true;
    await new Promise((resolve) => setTimeout(resolve, interval));
  }
  return false;
};

// Helper to create a mock Express request object
global.mockRequest = (overrides = {}) => ({
  body: {},
  params: {},
  query: {},
  headers: {},
  user: null,
  cookies: {},
  ip: '127.0.0.1',
  get: jest.fn((header) => overrides.headers?.[header]),
  ...overrides,
});

// Helper to create a mock Express response object
global.mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  res.cookie = jest.fn().mockReturnValue(res);
  res.clearCookie = jest.fn().mockReturnValue(res);
  res.setHeader = jest.fn().mockReturnValue(res);
  res.redirect = jest.fn().mockReturnValue(res);
  return res;
};

// Helper to create a mock Express next function
global.mockNext = () => jest.fn();

// ─── Mock External Services ─────────────────────────

// Mock n8n webhook calls
jest.mock('../../src/services/n8n/n8nClient.service.js', () => ({
  triggerN8nWebhook: jest.fn().mockResolvedValue({ success: true }),
  triggerWelcomeSequence: jest.fn().mockResolvedValue({ success: true }),
  triggerUsageReminder: jest.fn().mockResolvedValue({ success: true }),
  triggerLeadScoring: jest.fn().mockResolvedValue({ success: true }),
  triggerLeadInsights: jest.fn().mockResolvedValue({ success: true }),
  triggerMessageTemplate: jest.fn().mockResolvedValue({ success: true }),
  triggerCategoryAnalysis: jest.fn().mockResolvedValue({ success: true }),
  triggerNurtureSequence: jest.fn().mockResolvedValue({ success: true }),
  triggerNurtureStep: jest.fn().mockResolvedValue({ success: true }),
  triggerBatchLeadInsights: jest.fn().mockResolvedValue({ success: true }),
}));

// Mock ioredis (for BullMQ and caching)
jest.mock('ioredis', () => {
  const Redis = jest.fn().mockImplementation(() => ({
    get: jest.fn().mockResolvedValue(null),
    set: jest.fn().mockResolvedValue('OK'),
    del: jest.fn().mockResolvedValue(1),
    keys: jest.fn().mockResolvedValue([]),
    ping: jest.fn().mockResolvedValue('PONG'),
    quit: jest.fn().mockResolvedValue('OK'),
    on: jest.fn(),
    once: jest.fn(),
    connect: jest.fn().mockResolvedValue(),
    disconnect: jest.fn().mockResolvedValue(),
  }));
  Redis.Cluster = jest.fn();
  return { default: Redis };
});

// Mock BullMQ queues
jest.mock('bullmq', () => {
  const actual = jest.requireActual('bullmq');
  return {
    ...actual,
    Queue: jest.fn().mockImplementation(() => ({
      add: jest.fn().mockResolvedValue({ id: 'mock-job-id' }),
      addBulk: jest.fn().mockResolvedValue([{ id: 'mock-job-id' }]),
      getJob: jest.fn().mockResolvedValue(null),
      getJobs: jest.fn().mockResolvedValue([]),
      getRepeatableJobs: jest.fn().mockResolvedValue([]),
      removeRepeatableByKey: jest.fn().mockResolvedValue(),
      close: jest.fn().mockResolvedValue(),
      pause: jest.fn().mockResolvedValue(),
      resume: jest.fn().mockResolvedValue(),
      obliterate: jest.fn().mockResolvedValue(),
    })),
    Worker: jest.fn().mockImplementation(() => ({
      on: jest.fn(),
      close: jest.fn().mockResolvedValue(),
      pause: jest.fn().mockResolvedValue(),
      resume: jest.fn().mockResolvedValue(),
    })),
  };
});

// Suppress specific warning messages during tests
process.on('unhandledRejection', (reason, promise) => {
  // Let tests handle their own rejections
  if (process.env.NODE_ENV === 'test') {
    return;
  }
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});