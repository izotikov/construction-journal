import bcrypt from 'bcryptjs';
import { prisma } from '../../prisma/client';
import { AppError } from '../../errors/AppError';
import type { Response } from 'express';
import { clearJWT, generateAccessToken, generateRefreshToken } from './utils/jwtUtils';
import { ERROR_MESSAGES } from '../../errors/errorMessages';
import { ERROR_CODES } from '../../errors/errorRegistry';
import * as UsersService from '../users/users.service';
import * as EmailService from '../email/email.service';
import crypto from 'crypto';
import { stripUser } from '../../utils/utils';

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

  await UsersService.update(user.id, { refreshToken });

  return { user: stripUser(user), accessToken };
}

export async function logout(res: Response, userId: number) {
  if (userId) {
    await UsersService.update(userId, { refreshToken: null });{ refreshToken: null }
  }
  clearJWT(res);
}


export async function refreshToken(res: Response, userId: number, refreshToken: string) {
  const user = await UsersService.findById(userId);

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


export async function register(email: string, name: string, password: string) {
  const existing = await UsersService.findByEmail(email);
  if (existing) {
    throw new AppError(ERROR_MESSAGES.USER.ALREADY_EXISTS, 400, ERROR_CODES.USER.ALREADY_EXISTS);
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await UsersService.create({ email, name, password: hashedPassword });

  const token = crypto.randomBytes(32).toString('hex');
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 часа

  await UsersService.saveVerificationToken(user.id, token, expires);
  await EmailService.sendVerificationEmail(email, token);

  return { message: 'Check your email to verify your account' };
}

export async function verifyEmail(token: string) {
  const user = await UsersService.findByVerificationToken(token);

  if (!user) {
    throw new AppError(ERROR_MESSAGES.AUTH.INVALID_TOKEN, 401, ERROR_CODES.AUTH.INVALID_TOKEN);
  }

  if (!user.emailVerificationExpires || user.emailVerificationExpires < new Date()) {
    throw new AppError(ERROR_MESSAGES.AUTH.INVALID_TOKEN, 401, ERROR_CODES.AUTH.INVALID_TOKEN);
  }

  await UsersService.markAsVerified(user.id);
}