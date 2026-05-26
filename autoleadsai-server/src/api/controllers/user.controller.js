import { User } from '../../models/index.js';
import bcrypt from 'bcryptjs';
import { deleteCache, cacheKeys } from '../../services/cache/cache.service.js';

// GET /users/me – full profile (already covered by auth/me, but this can be more detailed)
export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json({ user: user.toJSON() });
  } catch (error) {
    next(error);
  }
};

// PUT /users/me – update firstName, lastName, avatar
export const updateProfile = async (req, res, next) => {
  try {
    const allowedFields = ['firstName', 'lastName', 'avatar'];
    const updates = {};
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    });

    const user = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
      runValidators: true,
    });

    // Invalidate user profile and session cache
    await deleteCache(cacheKeys.userProfile(req.user._id));
    await deleteCache(cacheKeys.userSession(req.user._id));

    res.status(200).json({ user: user.toJSON() });
  } catch (error) {
    next(error);
  }
};

// PUT /users/me/password – change password
export const updatePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id).select('+password');

    if (!(await user.comparePassword(currentPassword))) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    user.password = newPassword;
    await user.save();

    // Invalidate all user caches — password change is a security event
    await deleteCache(cacheKeys.userProfile(req.user._id));
    await deleteCache(cacheKeys.userSession(req.user._id));

    res.status(200).json({ message: 'Password updated' });
  } catch (error) {
    next(error);
  }
};

// DELETE /users/me – deactivate account
export const deleteAccount = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user._id, { isActive: false });

    // Invalidate all user caches — account deactivation
    await deleteCache(cacheKeys.userProfile(req.user._id));
    await deleteCache(cacheKeys.userSession(req.user._id));

    res.status(200).json({ message: 'Account deactivated' });
  } catch (error) {
    next(error);
  }
};