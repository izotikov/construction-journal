import type { Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../../../config/env";
import ms from "ms";


export const generateAccessToken = (id: number, email: string) => {
  return jwt.sign({ id, email }, env.JWT_SECRET, {
    expiresIn: env.JWT_SECRET_EXPIRES_IN,
  });
};

export const generateRefreshToken = (res: Response, id: number, email: string) => {

  const token = jwt.sign({ id, email }, env.JWT_REFRESH_SECRET, { expiresIn: env.JWT_REFRESH_EXPIRES_IN });

  res.cookie('refreshToken', token, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: ms(env.JWT_REFRESH_EXPIRES_IN),
  });

  return token;
};

export const clearJWT = (res: Response) => {
  res.clearCookie('refreshToken');
};
