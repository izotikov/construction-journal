import { Prisma } from '../../../generated/prisma';
import { AppError } from '../../errors/AppError';
import { prisma } from '../../prisma/client';
import bcrypt from 'bcrypt';
import { stripUser } from '../../utils/utils';
import { ERROR_MESSAGES } from '../../errors/errorMessages';
import { ERROR_CODES } from '../../errors/errorRegistry';

export async function getAllUsers() {
  const users = await prisma.user.findMany();
  return users;
}

export async function getUser(id: number) {
  try {
    const user = await prisma.user.findUnique({
      where: { id }
    });
    
    return user;
  } catch (error) {
    throw error;
  }
}

export async function registerUser(email: string, name: string, password: string) {
  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (existing) {
    throw new AppError(ERROR_MESSAGES.USER.ALREADY_EXISTS, 400, ERROR_CODES.USER.ALREADY_EXISTS);
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await prisma.user.create({
    data: { email, name, password: hashedPassword },
  });

  const safeUser = stripUser(user);
  return safeUser;
}

export async function deleteUser(id: number) {
  try {
    await prisma.user.delete({
      where: { id },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      throw new AppError(ERROR_MESSAGES.USER.NOT_FOUND, 404, ERROR_CODES.USER.NOT_FOUND);
    }
    throw error;
  }
}

export async function updateUser(id: number, email: string, name: string) {
  try {
    const updateUser = await prisma.user.update({
      where: { id },
      data: {email, name }
    });

    return updateUser;
  } catch (error) {
    throw error;
  }
}