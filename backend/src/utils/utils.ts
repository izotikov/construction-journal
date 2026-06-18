import type { User } from "../../generated/prisma";

export function stripUser(user: User) {
  const { password, refreshToken, ...safe } = user;
  return safe;
}