import { Router } from 'express';
import { forgotPassword, getMe, login, logout, refreshToken, resetPassword, verifyEmail } from './auth.controller';
import { authMiddleware, refreshTokenValidation } from '../../middlewares/auth.middleware';
import { register } from './auth.controller';

const router = Router();

router.get('/me', authMiddleware, getMe);
router.post('/login', login);
router.post('/logout',refreshTokenValidation, logout);
router.post('/refresh-token', refreshTokenValidation, refreshToken)
router.post('/register', register);
router.get('/verifyEmail', verifyEmail);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

export { router as authRouter };