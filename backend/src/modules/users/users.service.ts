import { Prisma } from '../../../generated/prisma';
import { AppError } from '../../errors/AppError';
import { ERROR_MESSAGES } from '../../errors/errorMessages';
import { ERROR_CODES } from '../../errors/errorRegistry';
import { prisma } from '../../prisma/client';

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
  try {
    await prisma.user.delete({ where: { id } });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      throw new AppError(ERROR_MESSAGES.USER.NOT_FOUND, 404, ERROR_CODES.USER.NOT_FOUND);
    }
    throw error;
  }
}

export async function update(id: number, data: Prisma.UserUpdateInput) {
  return prisma.user.update({ where: { id }, data });
}


export async function saveVerificationToken(userId: number, token: string, expires: Date) {
  return prisma.user.update({
    where: { id: userId },
    data: {
      emailVerificationToken: token,
      emailVerificationExpires: expires,
    },
  });
}

export async function markAsVerified(userId: number) {
  return prisma.user.update({
    where: { id: userId },
    data: {
      isEmailVerified: true,
      emailVerificationToken: null,
      emailVerificationExpires: null,
    },
  });
}