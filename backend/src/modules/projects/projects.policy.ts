import type { ProjectMember, ProjectRole } from "../../../generated/prisma";
import { ERROR_MESSAGES } from "../../errors/errorMessages";
import { ERROR_CODES } from "../../errors/errorRegistry";
import * as hierarchy from "../../shared/access-control/roleHierarchy";
import type { RoleHierarchyConfig } from "../../shared/access-control/roleHierarchy";

const config: RoleHierarchyConfig<ProjectRole> = {
  top: "OWNER",
  mid: "MANAGER",
  bottom: "MEMBER",
  errors: {
    forbidden: {
      message: ERROR_MESSAGES.PROJECT_MEMBER.FORBIDDEN,
      code: ERROR_CODES.PROJECT_MEMBER.FORBIDDEN,
    },
    lastOwnerCannotBeRemoved: {
      message: ERROR_MESSAGES.PROJECT_MEMBER.LAST_OWNER_CANNOT_BE_REMOVED,
      code: ERROR_CODES.PROJECT_MEMBER.LAST_OWNER_CANNOT_BE_REMOVED,
    },
  },
};

export const ensureActorCanManageTarget = (actor: ProjectMember, target: ProjectMember) =>
  hierarchy.ensureActorCanManageTarget(actor, target, config);

export const ensureRoleAssignmentAllowed = (
  actor: ProjectMember,
  target: ProjectMember,
  newRole: ProjectRole,
) => hierarchy.ensureRoleAssignmentAllowed(actor, target, newRole, config);

export const ensureOwnerWillRemain = (target: ProjectMember, ownersCount: number) =>
  hierarchy.ensureOwnerWillRemain(target, ownersCount, config);