import type { NextFunction, Response } from "express";
import type { AuthRequest } from "../../../middlewares/types/type";
import { ERROR_MESSAGES } from "../../../errors/errorMessages";
import { AppError } from "../../../errors/AppError";
import { prisma } from "../../../prisma/client";
import { ERROR_CODES } from "../../../errors/errorRegistry";
import type { ProjectRole } from "../../../../generated/prisma";
import { assertAuthenticatedUser } from "../../../utils/assertEntities/assertEntities";

export async function requireProjectMember(req: AuthRequest, res: Response, next: NextFunction) {
  const projectId = Number(req.params.projectId);
  assertAuthenticatedUser(req);

  const userId = req.user.id;

  const membership = await prisma.projectMember.findUnique({
    where: { projectId_userId: { projectId, userId } },
  });

  if (!membership) {
    throw new AppError(ERROR_MESSAGES.COMMON.FORBIDDEN, 403, ERROR_CODES.COMMON.FORBIDDEN);
  }

  req.projectMembership = membership;
  next();
}

export function requireProjectRole(...roles: ProjectRole[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.projectMembership || !roles.includes(req.projectMembership.role)) {
      throw new AppError(ERROR_MESSAGES.COMMON.FORBIDDEN, 403, ERROR_CODES.COMMON.FORBIDDEN);
    }
    next();
  };
}