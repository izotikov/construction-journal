import type { User } from "../../generated/prisma";
import { AppError } from "../errors/AppError";
import { ERROR_CODES } from "../errors/errorRegistry";
import type { AuthRequest, ResourceRequest } from "../middlewares/types/type";


export function stripUser(user: User) {
  const { password, refreshToken, emailVerificationToken, emailVerificationExpires, ...safe } = user;
  return safe;
}