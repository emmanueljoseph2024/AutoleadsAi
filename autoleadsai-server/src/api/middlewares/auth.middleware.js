import { verifyAccessToken } from '../../services/auth/token.service.js';
import User from '../../models/User.model.js';
import { getCachedOrFetch, setCache, cacheKeys, DEFAULT_TTL } from '../../services/cache/cache.service.js';

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyAccessToken(token);

    // Check cache first for user data
    const cacheKey = cacheKeys.userSession(decoded.userId);
    let user = await getCachedOrFetch(
      cacheKey,
      async () => {
        const dbUser = await User.findById(decoded.userId).select('-password -refreshTokens');
        return dbUser ? dbUser.toJSON() : null;
      },
      DEFAULT_TTL.USER_SESSION
    );

    if (!user) {
      return res.status(401).json({ error: 'User no longer exists' });
    }

    // Attach user to request (re-hydrate to Mongoose document if needed)
    if (user._id && !user.save) {
      user = await User.findById(decoded.userId).select('-password -refreshTokens');
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};