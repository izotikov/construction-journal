import type { OrganizationMember, OrganizationRole } from "../../../generated/prisma";
import { AppError } from "../../errors/AppError";
import { ERROR_MESSAGES } from "../../errors/errorMessages";
import { ERROR_CODES } from "../../errors/errorRegistry";

export function ensureActorCanManageTarget(actor: OrganizationMember, target: OrganizationMember) {
  if (actor.role === "MEMBER") {
    throw new AppError(
      ERROR_MESSAGES.ORGANIZATION_MEMBER.FORBIDDEN,
      403,
      ERROR_CODES.ORGANIZATION_MEMBER.FORBIDDEN,
    );
  }
  if (actor.role === "ADMIN" && target.role !== "MEMBER") {
    throw new AppError(
      ERROR_MESSAGES.ORGANIZATION_MEMBER.FORBIDDEN,
      403,
      ERROR_CODES.ORGANIZATION_MEMBER.FORBIDDEN,
    );
  }

  if (actor.role === "OWNER" && actor.userId === target.userId) {
    throw new AppError(
      ERROR_MESSAGES.ORGANIZATION_MEMBER.FORBIDDEN,
      403,
      ERROR_CODES.ORGANIZATION_MEMBER.FORBIDDEN,
    );
  }
}

export function ensureRoleAssignmentAllowed(
  actor: OrganizationMember,
  target: OrganizationMember,
  newRole: OrganizationRole,
) {
  // OWNER может понизить самого себя,
  // но не может "повысить" обратно в OWNER через этот же запрос
  if (actor.role === "OWNER" && actor.userId === target.userId) {
    if (newRole === "OWNER") {
      throw new AppError(
        ERROR_MESSAGES.ORGANIZATION_MEMBER.FORBIDDEN,
        403,
        ERROR_CODES.ORGANIZATION_MEMBER.FORBIDDEN,
      );
    }

    return;
  }

  // ADMIN может назначать только MEMBER или ADMIN
  if (actor.role === "ADMIN") {
    if (newRole !== "MEMBER" && newRole !== "ADMIN") {
      throw new AppError(
        ERROR_MESSAGES.ORGANIZATION_MEMBER.FORBIDDEN,
        403,
        ERROR_CODES.ORGANIZATION_MEMBER.FORBIDDEN,
      );
    }
  }

  // OWNER может назначать любые роли другим участникам
}

export function ensureOwnerWillRemain(
  target: OrganizationMember,
  ownersCount: number,
) {
  if (target.role === "OWNER" && ownersCount === 1) {
    throw new AppError(
      ERROR_MESSAGES.ORGANIZATION_MEMBER.LAST_OWNER_CANNOT_BE_REMOVED,
      403,
      ERROR_CODES.ORGANIZATION_MEMBER.LAST_OWNER_CANNOT_BE_REMOVED,
    );
  }
}