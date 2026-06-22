import type { Request, Response, NextFunction } from 'express';
import * as AuthService from './auth.service';
import type { AuthRequest } from '../../middlewares/auth.middleware';

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required' });
      return;
    }
    const result = await AuthService.login(res, email, password);
    res.status(200).json({message: "Login successful!", result});
  } catch (error) {
    next(error);
  }
}

export async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req as any).user?.id;
    await AuthService.logout(res, userId);
    res.status(200).json({ message: "Logout successful!" })
  } catch (error) {
    next(error);
  }
}

export async function refreshToken(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req as any).user?.id;
    const refreshToken = req.cookies.refreshToken;

    const {accessToken} = await AuthService.refreshToken(res, userId, refreshToken);
    res.status(200).json({message: "Access token refreshed successfully", accessToken});
  } catch (error) {
    next(error);
  }
}

export function getMe(req: AuthRequest, res: Response, next: NextFunction) {
  res.status(200).json({ user: req.user });
}