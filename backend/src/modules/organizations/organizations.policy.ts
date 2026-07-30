import type { OrganizationMember, OrganizationRole } from "../../../generated/prisma";
import { ERROR_MESSAGES } from "../../errors/errorMessages";
import { ERROR_CODES } from "../../errors/errorRegistry";
import * as hierarchy from "../../shared/access-control/roleHierarchy";
import type { RoleHierarchyConfig } from "../../shared/access-control/roleHierarchy";

const config: RoleHierarchyConfig<OrganizationRole> = {
  top: "OWNER",
  mid: "ADMIN",
  bottom: "MEMBER",
  errors: {
    forbidden: {
      message: ERROR_MESSAGES.ORGANIZATION_MEMBER.FORBIDDEN,
      code: ERROR_CODES.ORGANIZATION_MEMBER.FORBIDDEN,
    },
    lastOwnerCannotBeRemoved: {
      message: ERROR_MESSAGES.ORGANIZATION_MEMBER.LAST_OWNER_CANNOT_BE_REMOVED,
      code: ERROR_CODES.ORGANIZATION_MEMBER.LAST_OWNER_CANNOT_BE_REMOVED,
    },
  },
};

export const ensureActorCanManageTarget = (actor: OrganizationMember, target: OrganizationMember) =>
  hierarchy.ensureActorCanManageTarget(actor, target, config);

export const ensureRoleAssignmentAllowed = (
  actor: OrganizationMember,
  target: OrganizationMember,
  newRole: OrganizationRole,
) => hierarchy.ensureRoleAssignmentAllowed(actor, target, newRole, config);

export const ensureOwnerWillRemain = (target: OrganizationMember, ownersCount: number) =>
  hierarchy.ensureOwnerWillRemain(target, ownersCount, config);