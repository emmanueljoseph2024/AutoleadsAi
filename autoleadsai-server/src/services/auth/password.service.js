import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { logger } from '../../utils/logger.js';

// ─── Hash Password ──────────────────────────────────

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
};

// ─── Compare Password ───────────────────────────────

export const comparePassword = async (plainPassword, hashedPassword) => {
  return bcrypt.compare(plainPassword, hashedPassword);
};

// ─── Validate Password Strength ─────────────────────

export const validatePasswordStrength = (password) => {
  const errors = [];

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// ─── Generate Password Reset Token ──────────────────

export const generateResetToken = () => {
  // Generate a cryptographically secure random token
  const buffer = crypto.randomBytes(32);
  const token = buffer.toString('hex');

  // Also create a hashed version for storage
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  return {
    plainToken: token,      // Send this to the user via email
    hashedToken,             // Store this in the database
    expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
  };
};

// ─── Hash Reset Token ───────────────────────────────

export const hashResetToken = (token) => {
  return crypto.createHash('sha256').update(token).digest('hex');
};