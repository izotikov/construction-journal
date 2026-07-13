import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { AppError } from '../errors/AppError';
import { ERROR_CODES } from '../errors/errorRegistry';
import { ERROR_MESSAGES } from '../errors/errorMessages';

export interface AuthRequest extends Request {
  user?: { id: number; email: string; name: string };
  token?: string;
}

export interface DecodedToken { 
  id: number; 
  email: string; 
  name: string;
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AppError(ERROR_MESSAGES.AUTH.MISSING_TOKEN, 401, ERROR_CODES.AUTH.MISSING_TOKEN);
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    throw new AppError(ERROR_MESSAGES.AUTH.INVALID_TOKEN, 401, ERROR_CODES.AUTH.INVALID_TOKEN);
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as DecodedToken;
    req.user = decoded;
    next();
  } catch {
    throw new AppError(ERROR_MESSAGES.AUTH.INVALID_TOKEN, 401, ERROR_CODES.AUTH.INVALID_TOKEN);
  }

}

export function refreshTokenValidation(req: AuthRequest, res: Response, next: NextFunction) {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    throw new AppError(ERROR_MESSAGES.AUTH.MISSING_TOKEN, 401, ERROR_CODES.AUTH.INVALID_TOKEN);
  }

  try {
    const decoded = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET) as DecodedToken;
    req.user = decoded;
    next();
  } catch {
    throw new AppError(ERROR_MESSAGES.AUTH.INVALID_TOKEN, 401, ERROR_CODES.AUTH.INVALID_TOKEN);
  }

}