import type { NextFunction, Response } from "express";
import { prisma } from "../prisma/client";
import { AppError } from "../errors/AppError";
import { ERROR_MESSAGES } from "../errors/errorMessages";
import { ERROR_CODES } from "../errors/errorRegistry";
import type { AuthRequest } from "./types/type";
import type { OrganizationRole } from "../../generated/prisma";

export async function requireOrganizationMember(req: AuthRequest, res: Response, next: NextFunction) {
  const organizationId = Number(req.params.id);
  if (!req.user) {
    throw new AppError(ERROR_MESSAGES.AUTH.MISSING_TOKEN, 401, ERROR_CODES.AUTH.INVALID_TOKEN);
  }

  const userId = req.user.id;

  const membership = await prisma.organizationMember.findUnique({
    where: { organizationId_userId: { organizationId, userId } },
  });

  if (!membership) {
    throw new AppError(ERROR_MESSAGES.COMMON.FORBIDDEN, 403, ERROR_CODES.COMMON.FORBIDDEN);
  }

  req.organizationMembership = membership;
  next();
}

export function requireOrgRole(...roles: OrganizationRole[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.organizationMembership || !roles.includes(req.organizationMembership.role)) {
      throw new AppError(ERROR_MESSAGES.COMMON.FORBIDDEN, 403, ERROR_CODES.COMMON.FORBIDDEN);
    }
    next();
  };
}