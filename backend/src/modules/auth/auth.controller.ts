import type { Request, Response, NextFunction } from 'express';
import * as AuthService from './auth.service';
import * as UserService from '../users/users.service';
import type { AuthRequest } from '../../middlewares/auth.middleware';
import { stripUser } from '../../utils/utils';
import { env } from '../../config/env';

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
      res.status(400).json({ message: 'Email, name and password are required' });
      return;
    }
    const result = await AuthService.register(email, name, password);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

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

export async function logout(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await AuthService.logout(res, req.user.id);

    res.status(200).json({ message: "Logout successful!" });
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

export async function getMe(req: AuthRequest, res: Response, next: NextFunction) {
  if (!req.user) return res.status(401).json({message: "Unauthorized"});
  const user = await UserService.findById(req.user?.id);
  if (!user) return res.status(404).json({message: "User not found"});
  res.status(200).json({ user: stripUser(user)});
}

export async function verifyEmail(req: Request, res: Response, next: NextFunction) {
  try {
    const { token } = req.query;
    if (!token || typeof token !== 'string') {
      return res.redirect(
        `${env.CLIENT_URL}/verify-result?status=error&message=${encodeURIComponent('Токен не указан')}`
      );
    }
    await AuthService.verifyEmail(token);
    res.redirect(`${env.CLIENT_URL}/verify-result?status=success`);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Ошибка подтверждения';
    res.redirect(
      `${env.CLIENT_URL}/verify-result?status=error&message=${encodeURIComponent(message)}`
    );
  }
}

export async function resetPassword(req: Request, res: Response, next: NextFunction) {
  try {
    const { token } = req.query;
    const { newPassword } = req.body;

    if (!token || typeof token !== 'string') {
      return res.status(400).json({ message: 'Токен не указан' });
    }

    await AuthService.resetPassword(token, newPassword);
    res.status(200).json({ message: 'Пароль успешно изменён' });
  } catch (error) {
    next(error);
  }
}

export async function forgotPassword(req: Request, res: Response, next: NextFunction) {
  try {
    const {email} = req.body;

    const message = await AuthService.forgotPassword(email);
    res.status(200).json({ message: message });

  } catch (error) {
    next(error)
  }
}