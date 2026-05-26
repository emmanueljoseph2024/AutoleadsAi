import User from '../../models/User.model.js';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '../../services/auth/token.service.js';
import { deleteCache, cacheKeys } from '../../services/cache/cache.service.js';

// SIGNUP
export const signup = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    const user = await User.create({ firstName, lastName, email, password });

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // Store refresh token in user document
    user.refreshTokens.push({
      token: refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    await user.save();

    // Send refresh token as httpOnly cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      user: user.toJSON(),
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};

// LOGIN
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // Remove old expired tokens, add new one
    user.refreshTokens = user.refreshTokens.filter((rt) => rt.expiresAt > new Date());
    user.refreshTokens.push({
      token: refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    user.lastLogin = new Date();
    await user.save();

    // Invalidate old session cache, new one will be created on next request
    await deleteCache(cacheKeys.userSession(user._id));

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      user: user.toJSON(),
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};

// GET CURRENT USER (for auto‑login / dashboard redirect)
export const getMe = async (req, res) => {
  // req.user is set by protect middleware
  res.status(200).json({ user: req.user.toJSON() });
};

// REFRESH TOKEN
export const refreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ error: 'No refresh token provided' });
    }

    const decoded = verifyRefreshToken(refreshToken);
    const user = await User.findById(decoded.userId).select('+refreshTokens');

    // Check if token exists in user's list (not stolen/reused)
    const storedToken = user.refreshTokens.find((rt) => rt.token === refreshToken);
    if (!storedToken) {
      // Possible token reuse attack – clear all tokens and cache
      user.refreshTokens = [];
      await user.save();
      await deleteCache(cacheKeys.userSession(user._id));
      return res.status(401).json({ error: 'Invalid refresh token' });
    }

    // Remove old token, generate new pair
    user.refreshTokens = user.refreshTokens.filter((rt) => rt.token !== refreshToken);
    const newAccessToken = generateAccessToken(user._id);
    const newRefreshToken = generateRefreshToken(user._id);
    user.refreshTokens.push({
      token: newRefreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    await user.save();

    // Invalidate old session cache
    await deleteCache(cacheKeys.userSession(user._id));

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(401).json({ error: 'Invalid refresh token' });
  }
};

// LOGOUT
export const logout = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
      const decoded = verifyRefreshToken(refreshToken);
      await User.findByIdAndUpdate(decoded.userId, {
        $pull: { refreshTokens: { token: refreshToken } },
      });

      // Invalidate user session cache on logout
      await deleteCache(cacheKeys.userSession(decoded.userId));
    }
    res.clearCookie('refreshToken');
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    res.clearCookie('refreshToken');
    res.status(200).json({ message: 'Logged out' });
  }
};