import { Prisma } from "../../generated/prisma";
import { AppError } from "./AppError";
import type { ErrorCode } from "./errorRegistry";

export async function withNotFoundHandling<T>(
  operation: () => Promise<T>,
  message: string,
  code: ErrorCode
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      throw new AppError(message, 404, code);
    }
    throw error;
  }
}