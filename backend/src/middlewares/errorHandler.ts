import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ message: err.message, statusCode: err.statusCode, messageCode: err.messageCode });
    return;
  }
  console.error(err.stack);
  res.status(500).json({ message: err.message || 'Internal Server Error' });
}