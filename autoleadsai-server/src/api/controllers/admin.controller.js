import { User, Lead, Subscription } from '../../models/index.js';

// GET /admin/users – list all users (admin only)
export const getAllUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 50 } = req.query;
    const users = await User.find()
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });
    const total = await User.countDocuments();
    res.status(200).json({ users, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (error) {
    next(error);
  }
};

// PUT /admin/users/:id – update user role/status
export const updateUser = async (req, res, next) => {
  try {
    const updates = {};
    if (req.body.role) updates.role = req.body.role;
    if (req.body.isActive !== undefined) updates.isActive = req.body.isActive;

    const user = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json({ user: user.toJSON() });
  } catch (error) {
    next(error);
  }
};

// GET /admin/stats – system‑wide stats
export const getSystemStats = async (req, res, next) => {
  try {
    const [totalUsers, totalLeads, totalScans, activeSubscriptions] = await Promise.all([
      User.countDocuments(),
      Lead.countDocuments(),
      Scan.countDocuments(),
      Subscription.countDocuments({ status: 'active' }),
    ]);
    res.status(200).json({ totalUsers, totalLeads, totalScans, activeSubscriptions });
  } catch (error) {
    next(error);
  }
};