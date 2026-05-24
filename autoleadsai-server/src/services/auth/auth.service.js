import { User, RefreshToken } from '../../models/index.js';
import {
  generateTokenPair,
  verifyRefreshToken,
  blacklistToken,
} from './token.service.js';
import { hashPassword, comparePassword } from './password.service.js';
import { logger } from '../../utils/logger.js';
import { eventBus, EVENT_TYPES } from '../../events/index.js';

// ─── Signup ─────────────────────────────────────────

export const signupUser = async ({ firstName, lastName, email, password }) => {
  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('Email already registered');
  }

  // Create user (password is hashed in the model pre-save hook)
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
  });

  // Generate tokens
  const { accessToken, refreshToken } = generateTokenPair(user._id);

  // Store refresh token
  user.refreshTokens.push({
    token: refreshToken,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });
  await user.save();

  // Emit event
  eventBus.emitEvent(EVENT_TYPES.USER_SIGNUP, {
    userId: user._id,
    email: user.email,
  });

  return {
    user: user.toJSON(),
    accessToken,
    refreshToken,
  };
};

// ─── Login ──────────────────────────────────────────

export const loginUser = async (email, password) => {
  // Find user with password
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw new Error('Invalid email or password');
  }

  // Check if account is active
  if (!user.isActive) {
    throw new Error('Account has been deactivated. Contact support.');
  }

  // Verify password
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  // Generate tokens
  const { accessToken, refreshToken } = generateTokenPair(user._id);

  // Clean up expired tokens
  user.refreshTokens = user.refreshTokens.filter(
    (rt) => rt.expiresAt > new Date()
  );

  // Store new refresh token
  user.refreshTokens.push({
    token: refreshToken,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  // Update last login
  user.lastLogin = new Date();
  await user.save();

  // Emit event
  eventBus.emitEvent(EVENT_TYPES.USER_LOGIN, {
    userId: user._id,
    email: user.email,
  });

  return {
    user: user.toJSON(),
    accessToken,
    refreshToken,
  };
};

// ─── Refresh Token ──────────────────────────────────

export const refreshUserToken = async (token) => {
  if (!token) {
    throw new Error('No refresh token provided');
  }

  // Verify the token
  let decoded;
  try {
    decoded = verifyRefreshToken(token);
  } catch {
    throw new Error('Invalid refresh token');
  }

  // Find user with refresh tokens
  const user = await User.findById(decoded.userId).select('+refreshTokens');
  if (!user || !user.isActive) {
    throw new Error('User not found or inactive');
  }

  // Check if token exists in user's stored tokens (prevents reuse)
  const storedToken = user.refreshTokens.find((rt) => rt.token === token);
  if (!storedToken) {
    // Token reuse detected — possible theft. Invalidate all tokens.
    user.refreshTokens = [];
    await user.save();
    throw new Error('Token reuse detected. All sessions invalidated.');
  }

  // Remove old token (rotation)
  user.refreshTokens = user.refreshTokens.filter((rt) => rt.token !== token);

  // Generate new pair
  const { accessToken, refreshToken } = generateTokenPair(user._id);

  // Store new refresh token
  user.refreshTokens.push({
    token: refreshToken,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });
  await user.save();

  return { accessToken, refreshToken };
};

// ─── Logout ─────────────────────────────────────────

export const logoutUser = async (userId, refreshToken) => {
  if (refreshToken) {
    // Remove specific refresh token
    await User.findByIdAndUpdate(userId, {
      $pull: { refreshTokens: { token: refreshToken } },
    });

    // Blacklist the current access token (handled by middleware)
  }
};

// ─── Logout All Devices ─────────────────────────────

export const logoutAllDevices = async (userId) => {
  await User.findByIdAndUpdate(userId, {
    refreshTokens: [],
  });
};

// ─── Get Current User ───────────────────────────────

export const getCurrentUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  return user.toJSON();
};

// ─── Change Password ────────────────────────────────

export const changePassword = async (userId, currentPassword, newPassword) => {
  const user = await User.findById(userId).select('+password');
  if (!user) {
    throw new Error('User not found');
  }

  const isMatch = await comparePassword(currentPassword, user.password);
  if (!isMatch) {
    throw new Error('Current password is incorrect');
  }

  user.password = newPassword;
  await user.save();

  // Invalidate all existing sessions for security
  user.refreshTokens = [];
  await user.save();

  return { message: 'Password changed successfully. Please log in again.' };
};

// ─── Forgot Password ────────────────────────────────

export const initiatePasswordReset = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    // Don't reveal whether the email exists
    return { message: 'If that email exists, a reset link has been sent.' };
  }

  const { plainToken, hashedToken, expiresAt } = generateResetToken();

  // Store hashed token and expiry
  user.passwordResetToken = hashedToken;
  user.passwordResetExpires = expiresAt;
  await user.save();

  // In a real app, send plainToken via email here
  logger.info(`Password reset token generated for ${email}`);

  return {
    message: 'If that email exists, a reset link has been sent.',
    // Only return token in development
    ...(process.env.NODE_ENV === 'development' && { resetToken: plainToken }),
  };
};

// ─── Reset Password ─────────────────────────────────

export const resetPassword = async (token, newPassword) => {
  const hashedToken = hashResetToken(token);

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: new Date() },
  });

  if (!user) {
    throw new Error('Invalid or expired reset token');
  }

  // Update password
  user.password = newPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  // Invalidate all sessions
  user.refreshTokens = [];
  await user.save();

  return { message: 'Password reset successfully. Please log in.' };
};