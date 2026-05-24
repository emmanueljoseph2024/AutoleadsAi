import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import User from '../../../src/models/User.model.js';

let mongoServer;

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

describe('User Model', () => {
  const validUser = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    password: 'SecurePass123!',
  };

  // ─── Validation ──────────────────────────────────
  describe('Validation', () => {
    test('creates a valid user', async () => {
      const user = new User(validUser);
      const saved = await user.save();

      expect(saved._id).toBeDefined();
      expect(saved.firstName).toBe(validUser.firstName);
      expect(saved.lastName).toBe(validUser.lastName);
      expect(saved.email).toBe(validUser.email);
      expect(saved.role).toBe('user');
      expect(saved.subscription.tier).toBe('starter');
      expect(saved.subscription.status).toBe('trialing');
      expect(saved.isActive).toBe(true);
    });

    test('throws error when firstName is missing', async () => {
      const user = new User({ ...validUser, firstName: undefined });
      await expect(user.save()).rejects.toThrow('First name is required');
    });

    test('throws error when lastName is missing', async () => {
      const user = new User({ ...validUser, lastName: undefined });
      await expect(user.save()).rejects.toThrow('Last name is required');
    });

    test('throws error when email is missing', async () => {
      const user = new User({ ...validUser, email: undefined });
      await expect(user.save()).rejects.toThrow('Email is required');
    });

    test('throws error for invalid email format', async () => {
      const user = new User({ ...validUser, email: 'not-an-email' });
      await expect(user.save()).rejects.toThrow('Please provide a valid email');
    });

    test('throws error when password is missing', async () => {
      const user = new User({ ...validUser, password: undefined });
      await expect(user.save()).rejects.toThrow('Password is required');
    });

    test('throws error for password less than 8 characters', async () => {
      const user = new User({ ...validUser, password: 'Short1!' });
      await expect(user.save()).rejects.toThrow('Password is required'); // minlength triggers required-like error
    });

    test('throws error for duplicate email', async () => {
      await new User(validUser).save();
      const duplicate = new User(validUser);
      await expect(duplicate.save()).rejects.toThrow('duplicate key error');
    });

    test('trims whitespace from firstName and lastName', async () => {
      const user = new User({
        ...validUser,
        firstName: '  John  ',
        lastName: '  Doe  ',
      });
      const saved = await user.save();
      expect(saved.firstName).toBe('John');
      expect(saved.lastName).toBe('Doe');
    });

    test('converts email to lowercase', async () => {
      const user = new User({ ...validUser, email: 'JOHN@EXAMPLE.COM' });
      const saved = await user.save();
      expect(saved.email).toBe('john@example.com');
    });
  });

  // ─── Password Hashing ────────────────────────────
  describe('Password Hashing', () => {
    test('hashes password before saving', async () => {
      const user = new User(validUser);
      const saved = await user.save();

      // Password should be hashed
      expect(saved.password).not.toBe(validUser.password);
      expect(saved.password.length).toBeGreaterThan(20);
    });

    test('does not re-hash password if not modified', async () => {
      const user = new User(validUser);
      const saved = await user.save();
      const originalHash = saved.password;

      saved.firstName = 'Updated';
      const updated = await saved.save();

      expect(updated.password).toBe(originalHash);
    });

    test('re-hashes password when password field is modified', async () => {
      const user = new User(validUser);
      const saved = await user.save();
      const originalHash = saved.password;

      saved.password = 'NewSecurePass456!';
      const updated = await saved.save();

      expect(updated.password).not.toBe(originalHash);
    });
  });

  // ─── Methods ─────────────────────────────────────
  describe('comparePassword', () => {
    test('returns true for correct password', async () => {
      const user = new User(validUser);
      await user.save();

      const isMatch = await user.comparePassword(validUser.password);
      expect(isMatch).toBe(true);
    });

    test('returns false for incorrect password', async () => {
      const user = new User(validUser);
      await user.save();

      const isMatch = await user.comparePassword('WrongPassword1!');
      expect(isMatch).toBe(false);
    });
  });

  describe('isTrialActive', () => {
    test('returns true when trial has not expired', async () => {
      const user = new User(validUser);
      await user.save();

      expect(user.isTrialActive()).toBe(true);
    });

    test('returns false when trial has expired', async () => {
      const user = new User({
        ...validUser,
        subscription: {
          status: 'trialing',
          trialStart: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
          trialEnd: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        },
      });
      await user.save();

      expect(user.isTrialActive()).toBe(false);
    });

    test('returns false when subscription is not trialing', async () => {
      const user = new User({
        ...validUser,
        subscription: {
          tier: 'pro',
          status: 'active',
        },
      });
      await user.save();

      expect(user.isTrialActive()).toBe(false);
    });
  });

  // ─── Default Values ──────────────────────────────
  describe('Defaults', () => {
    test('sets default role to user', async () => {
      const user = new User(validUser);
      const saved = await user.save();
      expect(saved.role).toBe('user');
    });

    test('sets default subscription tier to starter', async () => {
      const user = new User(validUser);
      const saved = await user.save();
      expect(saved.subscription.tier).toBe('starter');
    });

    test('sets default subscription status to trialing', async () => {
      const user = new User(validUser);
      const saved = await user.save();
      expect(saved.subscription.status).toBe('trialing');
    });

    test('sets trial end to 14 days from now', async () => {
      const user = new User(validUser);
      const saved = await user.save();

      const expectedEnd = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
      const actualEnd = new Date(saved.subscription.trialEnd);

      // Allow 1 second tolerance
      expect(Math.abs(actualEnd - expectedEnd)).toBeLessThan(1000);
    });

    test('sets isActive to true by default', async () => {
      const user = new User(validUser);
      const saved = await user.save();
      expect(saved.isActive).toBe(true);
    });

    test('sets emailVerified to false by default', async () => {
      const user = new User(validUser);
      const saved = await user.save();
      expect(saved.emailVerified).toBe(false);
    });
  });

  // ─── toJSON Transform ────────────────────────────
  describe('toJSON', () => {
    test('removes password from JSON output', async () => {
      const user = new User(validUser);
      const saved = await user.save();
      const json = saved.toJSON();

      expect(json.password).toBeUndefined();
    });

    test('removes refreshTokens from JSON output', async () => {
      const user = new User(validUser);
      const saved = await user.save();
      const json = saved.toJSON();

      expect(json.refreshTokens).toBeUndefined();
    });

    test('removes __v from JSON output', async () => {
      const user = new User(validUser);
      const saved = await user.save();
      const json = saved.toJSON();

      expect(json.__v).toBeUndefined();
    });
  });

  // ─── Indexes ─────────────────────────────────────
  describe('Indexes', () => {
    test('has index on email', async () => {
      const indexes = await User.collection.indexes();
      const emailIndex = indexes.find((idx) => idx.key.email === 1);
      expect(emailIndex).toBeDefined();
      expect(emailIndex.unique).toBe(true);
    });

    test('has index on subscription.status', async () => {
      const indexes = await User.collection.indexes();
      const statusIndex = indexes.find((idx) => idx.key['subscription.status'] === 1);
      expect(statusIndex).toBeDefined();
    });
  });
});