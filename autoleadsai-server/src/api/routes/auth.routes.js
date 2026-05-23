import { Router } from 'express';
import { signup, login, getMe, refreshToken, logout } from '../controllers/auth.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { registerValidation, loginValidation } from '../middlewares/validator.middleware.js';

const authRouter = Router();

authRouter.post('/signup', registerValidation, signup);
authRouter.post('/login', loginValidation, login);
authRouter.get('/me', protect, getMe);
authRouter.post('/refresh', refreshToken);
authRouter.post('/logout', logout);

export default authRouter;