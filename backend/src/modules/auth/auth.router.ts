import { Router } from 'express';
import { getMe, login, logout, refreshToken } from './auth.controller';
import { authMiddleware, refreshTokenValidation } from '../../middlewares/auth.middleware';

const router = Router();

router.get('/me', authMiddleware, getMe);
router.post('/login', login);
router.post('/logout',refreshTokenValidation, logout);
router.post('/refresh-token', refreshTokenValidation, refreshToken)

export { router as authRouter };