import type { NextFunction, Response } from "express";
import { ERROR_MESSAGES } from "../../../errors/errorMessages";
import { AppError } from "../../../errors/AppError";
import type { AuthRequest } from "../../../middlewares/types/type";
import { prisma } from "../../../prisma/client";
import { ERROR_CODES } from "../../../errors/errorRegistry";
import type { OrganizationRole } from "../../../../generated/prisma";
import { assertAuthenticatedOrganization, assertAuthenticatedUser } from "../../../utils/assertEntities/assertEntities";


export async function requireOrganizationMember(req: AuthRequest, res: Response, next: NextFunction) {
  const organizationId = Number(req.params.organizationId);
  assertAuthenticatedUser(req);

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
    assertAuthenticatedOrganization(req);
    if (!roles.includes(req.organizationMembership.role)) {
      throw new AppError(ERROR_MESSAGES.COMMON.FORBIDDEN, 403, ERROR_CODES.COMMON.FORBIDDEN);
    }
    next();
  };
}