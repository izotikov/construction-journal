import { ErrorCode } from "@shared/api/errors/errorCodes";

export class ServerError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
    public readonly messageCode: ErrorCode,
  ) {
    super(message);
    this.name = 'ServerError';
  }
}