import { ERROR_MESSAGES } from '../../errors/errorMessages';
import { ERROR_CODES } from '../../errors/errorRegistry';
import { withNotFoundHandling } from '../../errors/withNotFoundHandling';
import { prisma } from '../../prisma/client';
import type { UpdateUserDto } from './config/type';

export async function findAll() {
  return prisma.user.findMany();
}

export async function findById(id: number) {
  return prisma.user.findUnique({ where: { id }});
}

export async function findByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export async function findByVerificationToken(token: string) {
  return prisma.user.findFirst({
    where: { emailVerificationToken: token },
  });
}

export async function create(data: { email: string; name: string; password: string }) {
  return prisma.user.create({ data });
}

export async function remove(id: number) {
  return withNotFoundHandling(
    () => prisma.user.delete({ where: { id } }),
    ERROR_MESSAGES.USER.NOT_FOUND,
    ERROR_CODES.USER.NOT_FOUND
  );
}

export async function update(id: number, data: UpdateUserDto) {
  return withNotFoundHandling(
    () => prisma.user.update({ where: { id }, data }),
    ERROR_MESSAGES.USER.NOT_FOUND,
    ERROR_CODES.USER.NOT_FOUND
  );
}

export async function updateRefreshToken(id: number, refreshToken: string | null) {
  return withNotFoundHandling(
    () => prisma.user.update({ where: { id }, data: { refreshToken } }),
    ERROR_MESSAGES.USER.NOT_FOUND,
    ERROR_CODES.USER.NOT_FOUND
  );
}

export async function updatePassword(id: number, password: string) {
  return withNotFoundHandling(
    () => prisma.user.update({ where: { id }, data: { password } }),
    ERROR_MESSAGES.USER.NOT_FOUND,
    ERROR_CODES.USER.NOT_FOUND
  );
}

export async function saveVerificationToken(userId: number, token: string, expires: Date) {
  return withNotFoundHandling(
    () => prisma.user.update({ 
      where: { id: userId }, 
      data: {
      emailVerificationToken: token,
      emailVerificationExpires: expires,
    }, }),
    ERROR_MESSAGES.USER.NOT_FOUND,
    ERROR_CODES.USER.NOT_FOUND
  );
}

export async function markAsVerified(userId: number) {
  return withNotFoundHandling(
    () => prisma.user.update({ 
      where: { id: userId }, 
      data: {
      isEmailVerified: true,
      emailVerificationToken: null,
      emailVerificationExpires: null,
    }, }),
    ERROR_MESSAGES.USER.NOT_FOUND,
    ERROR_CODES.USER.NOT_FOUND
  );
}