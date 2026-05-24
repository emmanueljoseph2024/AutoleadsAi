import jwt from 'jsonwebtoken';
import {
  JWT_SECRET,
  JWT_REFRESH_SECRET,
  JWT_EXPIRES_IN,
  JWT_REFRESH_EXPIRES_IN,
} from '../../config/env.js';
import { BlacklistedToken } from '../../models/index.js';

// ─── Generate Tokens ────────────────────────────────

export const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

export const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRES_IN });
};

// ─── Generate Token Pair ────────────────────────────

export const generateTokenPair = (userId) => {
  const accessToken = generateAccessToken(userId);
  const refreshToken = generateRefreshToken(userId);
  return { accessToken, refreshToken };
};

// ─── Verify Tokens ──────────────────────────────────

export const verifyAccessToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

export const verifyRefreshToken = (token) => {
  return jwt.verify(token, JWT_REFRESH_SECRET);
};

// ─── Decode Token Without Verification ─────────────

export const decodeToken = (token) => {
  return jwt.decode(token);
};

// ─── Blacklist Token (for logout / password change) ──

export const blacklistToken = async (token, type = 'access') => {
  try {
    const decoded = decodeToken(token);
    if (!decoded || !decoded.exp) return;

    await BlacklistedToken.create({
      token,
      type,
      expiresAt: new Date(decoded.exp * 1000),
    });
  } catch (error) {
    // Token might already be blacklisted or invalid — ignore
  }
};

// ─── Check if Token is Blacklisted ──────────────────

export const isTokenBlacklisted = async (token) => {
  const blacklisted = await BlacklistedToken.findOne({ token });
  return !!blacklisted;
};

// ─── Get Token Expiry Time ──────────────────────────

export const getTokenExpiry = (token) => {
  try {
    const decoded = decodeToken(token);
    return decoded?.exp ? new Date(decoded.exp * 1000) : null;
  } catch {
    return null;
  }
};

// ─── Check if Token is Expired ──────────────────────

export const isTokenExpired = (token) => {
  const expiry = getTokenExpiry(token);
  if (!expiry) return true;
  return new Date() > expiry;
};