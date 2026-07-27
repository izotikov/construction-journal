import type { User } from "../../generated/prisma";


export function stripUser(user: User) {
  const { password, refreshToken, emailVerificationToken, emailVerificationExpires, ...safe } = user;
  return safe;
}

