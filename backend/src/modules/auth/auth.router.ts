import { Router } from 'express';
import { getMe, login, logout, refreshToken, verifyEmail } from './auth.controller';
import { authMiddleware, refreshTokenValidation } from '../../middlewares/auth.middleware';
import { register } from './auth.controller';

const router = Router();

router.get('/me', authMiddleware, getMe);
router.post('/login', login);
router.post('/logout',refreshTokenValidation, logout);
router.post('/refresh-token', refreshTokenValidation, refreshToken)
router.post('/register', register);
router.get('/verifyEmail', verifyEmail);

export { router as authRouter };