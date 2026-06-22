import express from 'express';
import type { Application } from 'express';
import { notFound } from '../middlewares/notFound';
import { errorHandler } from '../middlewares/errorHandler';
import { usersRouter } from '../modules/users/users.router';
import { authRouter } from '../modules/auth/auth.router';
import cookieParser from "cookie-parser";
import cors from 'cors';

export function createApp(): Application {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }));

  // Роуты модулей
  app.use('/api/users', usersRouter);
  app.use('/api/auth', authRouter);


  app.use(notFound);
  app.use(errorHandler);

  return app;
}