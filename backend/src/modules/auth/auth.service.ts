import bcrypt from 'bcryptjs';
import { prisma } from '../../prisma/client';
import { AppError } from '../../errors/AppError';
import type { Response } from 'express';
import { clearJWT, generateAccessToken, generateRefreshToken } from './utils/jwtUtils';
import { ERROR_MESSAGES } from '../../errors/errorMessages';
import { ERROR_CODES } from '../../errors/errorRegistry';

export async function login(res: Response, email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new AppError(ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS, 401, ERROR_CODES.AUTH.INVALID_CREDENTIALS);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new AppError(ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS, 401, ERROR_CODES.AUTH.INVALID_CREDENTIALS);
  }

  const accessToken = generateAccessToken(user.id, user.email);
  const refreshToken = generateRefreshToken(res, user.id, user.email);

  await prisma.user.update({
    where: { email },
    data: { refreshToken }
  })

  return { user: { id: user.id, email: user.email, name: user.name }, accessToken };
}

export async function logout(res: Response, userId: number) {
  if (userId) {
    await prisma.user.update({
      where: { id: userId },
      data: { refreshToken: null }
    });
  }

  clearJWT(res);
}

export async function refreshToken(res: Response, userId: number, refreshToken: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId }
  });

  if (!user || !user.refreshToken || !refreshToken) {
    throw new AppError(ERROR_MESSAGES.AUTH.MISSING_TOKEN, 401, ERROR_CODES.AUTH.MISSING_TOKEN);
  }

  if (user.refreshToken !== refreshToken) {
    throw new AppError(ERROR_MESSAGES.AUTH.INVALID_TOKEN, 401, ERROR_CODES.AUTH.INVALID_TOKEN);
  }

  // Генерируем новый accessToken
  const accessToken = generateAccessToken(user.id, user.email);
  return { accessToken };
}