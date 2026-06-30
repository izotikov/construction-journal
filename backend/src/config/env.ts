import type { StringValue } from "ms";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined');
}

if (!JWT_REFRESH_SECRET) {
  throw new Error('JWT_REFRESH_SECRET is not defined');
}

const JWT_SECRET_EXPIRES_IN = (process.env.JWT_SECRET_EXPIRES_IN ?? "15m") as StringValue;
const JWT_REFRESH_EXPIRES_IN = (process.env.JWT_REFRESH_EXPIRES_IN ?? "7d") as StringValue;

export const env = {
  PORT: Number(process.env.PORT) || 3000,
  DATABASE_URL: process.env.DATABASE_URL as string,
  DATABASE_USER: process.env.DATABASE_USER as string,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD as string,
  DATABASE_NAME: process.env.DATABASE_NAME as string,
  DATABASE_HOST: process.env.DATABASE_HOST as string,
  DATABASE_PORT: Number(process.env.DATABASE_PORT) || 3306,
  NODE_ENV: process.env.NODE_ENV || 'development',
  JWT_SECRET,
  JWT_SECRET_EXPIRES_IN,
  JWT_REFRESH_SECRET,
  JWT_REFRESH_EXPIRES_IN,
  RESEND_API_KEY: process.env.RESEND_API_KEY as string,
  CLIENT_URL: process.env.CLIENT_URL as string,
  API_URL: process.env.API_URL as string,
};