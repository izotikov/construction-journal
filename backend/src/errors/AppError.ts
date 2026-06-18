import type { ErrorCode } from "./errorRegistry";

export class AppError extends Error {
  constructor(public message: string, public readonly statusCode: number, public readonly messageCode: ErrorCode) {
    super(message);
    this.name = 'AppError';
  }
}