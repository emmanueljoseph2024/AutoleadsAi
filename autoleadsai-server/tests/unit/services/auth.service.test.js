import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import User from '../../../src/models/User.model.js';
import {
  signupUser,
  loginUser,
  refreshUserToken,
  logoutUser,
  changePassword,
} from '../../../src/services/auth/auth.service.js';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} from '../../../src/services/auth/token.service.js';
import {
  hashPassword,
  comparePassword,
  validatePasswordStrength,
} from '../../../src/services/auth/password.service.js';

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

describe('Auth Service', () => {
  const validUser = {
    firstName: 'Test',
    lastName: 'User',
    email: 'test@autoleadsai.com',
    password: 'SecurePass123!',
  };

  // ─── Token Service ────────────────────────────────
  describe('Token Service', () => {
    test('generateAccessToken creates a valid JWT', () => {
      const userId = new mongoose.Types.ObjectId().toString();
      const token = generateAccessToken(userId);

      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(token.split('.')).toHaveLength(3); // JWT has 3 parts
    });

    test('generateRefreshToken creates a valid JWT', () => {
      const userId = new mongoose.Types.ObjectId().toString();
      const token = generateRefreshToken(userId);

      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
    });

    test('verifyAccessToken decodes correctly', () => {
      const userId = new mongoose.Types.ObjectId().toString();
      const token = generateAccessToken(userId);
      const decoded = verifyAccessToken(token);

      expect(decoded.userId).toBe(userId);
    });

    test('verifyRefreshToken decodes correctly', () => {
      const userId = new mongoose.Types.ObjectId().toString();
      const token = generateRefreshToken(userId);
      const decoded = verifyRefreshToken(token);

      expect(decoded.userId).toBe(userId);
    });

    test('verifyAccessToken throws on invalid token', () => {
      expect(() => verifyAccessToken('invalid-token')).toThrow();
    });
  });

  // ─── Password Service ─────────────────────────────
  describe('Password Service', () => {
    test('hashPassword creates a bcrypt hash', async () => {
      const hashed = await hashPassword('MyPassword123!');
      expect(hashed).not.toBe('MyPassword123!');
      expect(hashed.length).toBeGreaterThan(20);
    });

    test('hashPassword creates unique hashes for same input', async () => {
      const hash1 = await hashPassword('MyPassword123!');
      const hash2 = await hashPassword('MyPassword123!');
      expect(hash1).not.toBe(hash2);
    });

    test('comparePassword returns true for matching password', async () => {
      const hashed = await hashPassword('MyPassword123!');
      const isMatch = await comparePassword('MyPassword123!', hashed);
      expect(isMatch).toBe(true);
    });

    test('comparePassword returns false for non-matching password', async () => {
      const hashed = await hashPassword('MyPassword123!');
      const isMatch = await comparePassword('WrongPassword1!', hashed);
      expect(isMatch).toBe(false);
    });

    describe('validatePasswordStrength', () => {
      test('accepts strong password', () => {
        const result = validatePasswordStrength('StrongPass1!');
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
      });

      test('rejects password without uppercase', () => {
        const result = validatePasswordStrength('weakpass1!');
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Password must contain at least one uppercase letter');
      });

      test('rejects password without lowercase', () => {
        const result = validatePasswordStrength('WEAKPASS1!');
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Password must contain at least one lowercase letter');
      });

      test('rejects password without number', () => {
        const result = validatePasswordStrength('WeakPass!!');
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Password must contain at least one number');
      });

      test('rejects password without special character', () => {
        const result = validatePasswordStrength('WeakPass12');
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Password must contain at least one special character');
      });

      test('rejects password shorter than 8 characters', () => {
        const result = validatePasswordStrength('Short1!');
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Password must be at least 8 characters long');
      });
    });
  });

  // ─── Auth Service ─────────────────────────────────
  describe('signupUser', () => {
    test('creates a new user and returns tokens', async () => {
      const result = await signupUser(validUser);

      expect(result.user).toBeDefined();
      expect(result.user.email).toBe(validUser.email);
      expect(result.user.password).toBeUndefined();
      expect(result.accessToken).toBeDefined();
      expect(result.refreshToken).toBeDefined();

      // Verify user in database
      const dbUser = await User.findOne({ email: validUser.email }).select('+password +refreshTokens');
      expect(dbUser).not.toBeNull();
      expect(dbUser.refreshTokens.length).toBe(1);
      expect(dbUser.refreshTokens[0].token).toBe(result.refreshToken);
    });

    test('throws error for duplicate email', async () => {
      await signupUser(validUser);
      await expect(signupUser(validUser)).rejects.toThrow('Email already registered');
    });

    test('sets trial period correctly', async () => {
      const result = await signupUser(validUser);
      expect(result.user.subscription.tier).toBe('starter');
      expect(result.user.subscription.status).toBe('trialing');
    });
  });

  describe('loginUser', () => {
    beforeEach(async () => {
      const user = new User({ ...validUser, emailVerified: true });
      await user.save();
    });

    test('logs in with correct credentials', async () => {
      const result = await loginUser(validUser.email, validUser.password);

      expect(result.user).toBeDefined();
      expect(result.user.email).toBe(validUser.email);
      expect(result.accessToken).toBeDefined();
      expect(result.refreshToken).toBeDefined();

      // Verify lastLogin updated
      const dbUser = await User.findOne({ email: validUser.email });
      expect(dbUser.lastLogin).not.toBeNull();
    });

    test('throws error for wrong password', async () => {
      await expect(
        loginUser(validUser.email, 'WrongPassword1!')
      ).rejects.toThrow('Invalid email or password');
    });

    test('throws error for non-existent email', async () => {
      await expect(
        loginUser('nobody@test.com', 'SomePass1!')
      ).rejects.toThrow('Invalid email or password');
    });

    test('throws error for deactivated account', async () => {
      await User.findOneAndUpdate({ email: validUser.email }, { isActive: false });
      await expect(
        loginUser(validUser.email, validUser.password)
      ).rejects.toThrow('deactivated');
    });

    test('cleans up expired refresh tokens on login', async () => {
      const user = await User.findOne({ email: validUser.email }).select('+refreshTokens');

      // Add an expired token
      user.refreshTokens.push({
        token: 'expired_token_123',
        expiresAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      });
      await user.save();

      await loginUser(validUser.email, validUser.password);

      const updatedUser = await User.findOne({ email: validUser.email }).select('+refreshTokens');
      const expiredToken = updatedUser.refreshTokens.find((rt) => rt.token === 'expired_token_123');
      expect(expiredToken).toBeUndefined();
    });
  });

  describe('refreshUserToken', () => {
    test('issues new token pair with valid refresh token', async () => {
      const user = new User({ ...validUser, emailVerified: true });
      await user.save();

      const tokens = generateRefreshToken(user._id);
      user.refreshTokens.push({
        token: tokens,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });
      await user.save();

      const result = await refreshUserToken(tokens);

      expect(result.accessToken).toBeDefined();
      expect(result.refreshToken).toBeDefined();
      expect(result.refreshToken).not.toBe(tokens); // Rotation
    });

    test('throws error for invalid refresh token', async () => {
      await expect(refreshUserToken('invalid-token')).rejects.toThrow('Invalid refresh token');
    });

    test('detects token reuse and invalidates all sessions', async () => {
      const user = new User({ ...validUser, emailVerified: true });
      await user.save();

      const token1 = generateRefreshToken(user._id);
      const token2 = generateRefreshToken(user._id);
      user.refreshTokens = [
        { token: token1, expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
        { token: token2, expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
      ];
      await user.save();

      // Use token1 once (should work and rotate)
      await refreshUserToken(token1);

      // Try using token1 again (should detect reuse)
      await expect(refreshUserToken(token1)).rejects.toThrow('Token reuse detected');

      // Verify all tokens were cleared
      const dbUser = await User.findById(user._id).select('+refreshTokens');
      expect(dbUser.refreshTokens.length).toBe(0);
    });
  });

  describe('logoutUser', () => {
    test('removes refresh token from user', async () => {
      const user = new User({ ...validUser, emailVerified: true });
      await user.save();

      const refreshToken = generateRefreshToken(user._id);
      user.refreshTokens.push({
        token: refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });
      await user.save();

      await logoutUser(user._id, refreshToken);

      const dbUser = await User.findById(user._id).select('+refreshTokens');
      const token = dbUser.refreshTokens.find((rt) => rt.token === refreshToken);
      expect(token).toBeUndefined();
    });
  });

  describe('changePassword', () => {
    test('changes password successfully', async () => {
      const user = new User({ ...validUser, emailVerified: true });
      await user.save();

      await changePassword(user._id, validUser.password, 'NewSecurePass456!');

      const dbUser = await User.findById(user._id).select('+password');
      const isOldMatch = await comparePassword(validUser.password, dbUser.password);
      const isNewMatch = await comparePassword('NewSecurePass456!', dbUser.password);

      expect(isOldMatch).toBe(false);
      expect(isNewMatch).toBe(true);
    });

    test('throws error for incorrect current password', async () => {
      const user = new User({ ...validUser, emailVerified: true });
      await user.save();

      await expect(
        changePassword(user._id, 'WrongCurrentPass1!', 'NewSecurePass456!')
      ).rejects.toThrow('Current password is incorrect');
    });

    test('invalidates all sessions after password change', async () => {
      const user = new User({ ...validUser, emailVerified: true });
      user.refreshTokens.push({
        token: 'some_token',
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });
      await user.save();

      await changePassword(user._id, validUser.password, 'NewSecurePass456!');

      const dbUser = await User.findById(user._id).select('+refreshTokens');
      expect(dbUser.refreshTokens.length).toBe(0);
    });
  });
});