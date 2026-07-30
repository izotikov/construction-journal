import type { OrganizationMember, OrganizationRole } from "../../../generated/prisma";
import { AppError } from "../../errors/AppError";
import { ERROR_MESSAGES } from "../../errors/errorMessages";
import { ERROR_CODES } from "../../errors/errorRegistry";
import { withNotFoundHandling } from "../../errors/withNotFoundHandling";
import { prisma } from "../../prisma/client";
import type { CreateOrganizationDto, UpdateOrganizationDto } from "./config/type";
import { ensureActorCanManageTarget, ensureOwnerWillRemain, ensureRoleAssignmentAllowed } from "./organizations.policy";

export async function create(data: CreateOrganizationDto, ownerId: number) {
  return prisma.$transaction(async (tx) => {
    const organization = await tx.organization.create({ data });

    await tx.organizationMember.create({
      data: {
        organizationId: organization.id,
        userId: ownerId,
        role: 'OWNER',
      },
    });

    return organization;
  });
}

export async function findById(id: number) {
  return prisma.organization.findUnique({ where: {id} });
}

export async function findByIdForUser(id: number, userId: number) {
  return prisma.organization.findFirst({
    where: {
      id,
      members: { some: { userId } },
    },
  });
}

export async function findAllForUser(userId: number) {
  return prisma.organization.findMany({
    where: {
      members: {
        some: { userId },
      },
    },
  });
}

export async function update(id: number, data: UpdateOrganizationDto) {
  return withNotFoundHandling(
    () => prisma.organization.update({ where: { id }, data }),
    ERROR_MESSAGES.ORGANIZATION.NOT_FOUND,
    ERROR_CODES.ORGANIZATION.NOT_FOUND
  );
}

export async function remove(id: number) {
  return withNotFoundHandling(
    () => prisma.organization.delete({ where: { id } }),
    ERROR_MESSAGES.ORGANIZATION.NOT_FOUND,
    ERROR_CODES.ORGANIZATION.NOT_FOUND
  );
}

// Members

export async function findAllMembers(id: number) {
  return prisma.organizationMember.findMany({
    where: {
      organizationId: id,
    },
  });
}

export async function updateMemberRole(
    organizationId: number,
    actor: OrganizationMember,
    targetUserId: number,
    newRole: OrganizationRole,
) {
  return withNotFoundHandling(() => prisma.$transaction(async (tx) => {
    const target = await tx.organizationMember.findUnique({
      where: {
        organizationId_userId: {
          organizationId,
          userId: targetUserId,
        },
      },
    });

    if (!target) {
      throw new AppError(
        ERROR_MESSAGES.ORGANIZATION_MEMBER.NOT_FOUND,
        404,
        ERROR_CODES.ORGANIZATION_MEMBER.NOT_FOUND,
      );
    }

    ensureActorCanManageTarget(actor, target);
    ensureRoleAssignmentAllowed(actor, target, newRole);

    if (target.role === newRole) {
      return target;
    }

    if (target.role === "OWNER" && newRole !== "OWNER") {
      const ownersCount = await tx.organizationMember.count({
        where: {
          organizationId,
          role: "OWNER",
        },
      });

      ensureOwnerWillRemain(target, ownersCount);
    }

    //----------------------------------------
    // UPDATE
    //----------------------------------------

    return tx.organizationMember.update({
      where: {
        organizationId_userId: {
          organizationId,
          userId: targetUserId,
        },
      },
      data: {
        role: newRole,
      },
    });
  }),
  ERROR_MESSAGES.ORGANIZATION_MEMBER.NOT_FOUND,
  ERROR_CODES.ORGANIZATION_MEMBER.NOT_FOUND);
}

export async function addMember(
  organizationId: number,
  userId: number,
  role: OrganizationRole = 'MEMBER',
) {
  return prisma.$transaction(async (tx) => {
    const user = await tx.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new AppError(ERROR_MESSAGES.USER.NOT_FOUND, 404, ERROR_CODES.USER.NOT_FOUND);
    }

    const existing = await tx.organizationMember.findUnique({
      where: { organizationId_userId: { organizationId, userId } },
    });
    if (existing) {
      throw new AppError(
        ERROR_MESSAGES.ORGANIZATION_MEMBER.ALREADY_MEMBER,
        409,
        ERROR_CODES.ORGANIZATION_MEMBER.ALREADY_MEMBER,
      );
    }

    return tx.organizationMember.create({
      data: { organizationId, userId, role },
    });
  });
}

// Если участника удаляют должен также удаляться из всех проектов каскадно, реализовать когда сделаю проекты
export async function removeMember(
  organizationId: number,
  actor: OrganizationMember,
  targetUserId: number,
) {
  return withNotFoundHandling(() => prisma.$transaction(async (tx) => {
    const target = await tx.organizationMember.findUnique({
      where: {
        organizationId_userId: {
          organizationId,
          userId: targetUserId,
        },
      },
    });

    if (!target) {
      throw new AppError(
        ERROR_MESSAGES.ORGANIZATION_MEMBER.NOT_FOUND,
        404,
        ERROR_CODES.ORGANIZATION_MEMBER.NOT_FOUND,
      );
    }

    if (actor.userId === target.userId) {
      throw new AppError(
        ERROR_MESSAGES.ORGANIZATION_MEMBER.FORBIDDEN,
        404,
        ERROR_CODES.ORGANIZATION_MEMBER.FORBIDDEN,
      );
    }

    ensureActorCanManageTarget(actor, target);

    if (target.role === "OWNER") {
      const ownersCount = await tx.organizationMember.count({
        where: {
          organizationId,
          role: "OWNER",
        },
      });

      ensureOwnerWillRemain(target, ownersCount);
    }

    return tx.organizationMember.delete({
      where: {
        organizationId_userId: {
          organizationId,
          userId: targetUserId,
        },
      },
    });
  }),
  ERROR_MESSAGES.ORGANIZATION_MEMBER.NOT_FOUND,
  ERROR_CODES.ORGANIZATION_MEMBER.NOT_FOUND);
}

export async function leaveOrganization(organizationId: number, userId: number) {
  return withNotFoundHandling(() => prisma.$transaction(async (tx) => {
    const target = await tx.organizationMember.findUnique({
      where: {
        organizationId_userId: {
          organizationId,
          userId: userId,
        },
      },
    });

    if (!target) {
      throw new AppError(
        ERROR_MESSAGES.ORGANIZATION_MEMBER.NOT_FOUND,
        404,
        ERROR_CODES.ORGANIZATION_MEMBER.NOT_FOUND,
      );
    }

    if (target.role === "OWNER") {
      const ownersCount = await tx.organizationMember.count({
        where: {
          organizationId,
          role: "OWNER",
        },
      });

      ensureOwnerWillRemain(target, ownersCount);
    }

    return tx.organizationMember.delete({
      where: {
        organizationId_userId: {
          organizationId,
          userId,
        },
      },
    });
  }),
  ERROR_MESSAGES.ORGANIZATION_MEMBER.NOT_FOUND,
  ERROR_CODES.ORGANIZATION_MEMBER.NOT_FOUND);
}