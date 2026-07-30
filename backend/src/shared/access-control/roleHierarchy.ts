// src/shared/access-control/roleHierarchy.ts
import { AppError } from "../../errors/AppError";
import type { ErrorCode } from "../../errors/errorRegistry";

export interface RoleMembership<TRole extends string> {
  userId: number;
  role: TRole;
}

interface ErrorSpec {
  message: string;
  code: ErrorCode;
}

export interface RoleHierarchyConfig<TRole extends string> {
  top: TRole;    // OWNER
  mid: TRole;    // ADMIN / MANAGER
  bottom: TRole; // MEMBER
  errors: {
    forbidden: ErrorSpec;
    lastOwnerCannotBeRemoved: ErrorSpec;
  };
}

function forbid(spec: ErrorSpec): never {
  throw new AppError(spec.message, 403, spec.code);
}

export function ensureActorCanManageTarget<TRole extends string>(
  actor: RoleMembership<TRole>,
  target: RoleMembership<TRole>,
  cfg: RoleHierarchyConfig<TRole>,
) {
  if (actor.role === cfg.bottom) {
    forbid(cfg.errors.forbidden);
  }

  if (
    actor.role === cfg.mid &&
    target.userId !== actor.userId &&
    target.role !== cfg.bottom
  ) {
    forbid(cfg.errors.forbidden);
  }
}

export function ensureRoleAssignmentAllowed<TRole extends string>(
  actor: RoleMembership<TRole>,
  target: RoleMembership<TRole>,
  newRole: TRole,
  cfg: RoleHierarchyConfig<TRole>,
) {
  if (actor.role === cfg.top && actor.userId === target.userId) {
    if (newRole === cfg.top) {
      forbid(cfg.errors.forbidden);
    }
    return;
  }

  if (actor.role === cfg.mid) {
    if (newRole !== cfg.bottom && newRole !== cfg.mid) {
      forbid(cfg.errors.forbidden);
    }
  }

  // top может назначать любые роли другим участникам
}

export function ensureOwnerWillRemain<TRole extends string>(
  target: RoleMembership<TRole>,
  ownersCount: number,
  cfg: RoleHierarchyConfig<TRole>,
) {
  if (target.role === cfg.top && ownersCount === 1) {
    forbid(cfg.errors.lastOwnerCannotBeRemoved);
  }
}