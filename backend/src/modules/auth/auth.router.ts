import { Router } from 'express';
import { login, logout, refreshToken } from './auth.controller';
import { authMiddleware, refreshTokenValidation } from '../../middlewares/auth.middleware';

const router = Router();

router.post('/login', login);
router.post('/logout',authMiddleware, logout);
router.post('/refresh-token', refreshTokenValidation, refreshToken)

export { router as authRouter };