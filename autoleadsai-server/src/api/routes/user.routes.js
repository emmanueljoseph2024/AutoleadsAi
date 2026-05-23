import { Router } from 'express';
import {
  getProfile,
  updateProfile,
  updatePassword,
  deleteAccount,
} from '../controllers/user.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import {
  updateProfileValidation,
  updatePasswordValidation,
} from '../middlewares/validator.middleware.js';

const userRouter = Router();

userRouter.use(protect);

userRouter.get('/me', getProfile);
userRouter.put('/me', updateProfileValidation, updateProfile);
userRouter.put('/me/password', updatePasswordValidation, updatePassword);
userRouter.delete('/me', deleteAccount);

export default userRouter;