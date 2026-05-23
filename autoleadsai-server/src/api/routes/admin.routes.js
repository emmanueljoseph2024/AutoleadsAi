import { Router } from 'express';
import {
  getAllUsers,
  updateUser,
  getSystemStats,
} from '../controllers/admin.controller.js';
import { protect, adminGuard } from '../middlewares/auth.middleware.js';

const adminRouter = Router();

adminRouter.use(protect);
adminRouter.use(adminGuard);

adminRouter.get('/users', getAllUsers);
adminRouter.put('/users/:id', updateUser);
adminRouter.get('/stats', getSystemStats);

export default adminRouter;