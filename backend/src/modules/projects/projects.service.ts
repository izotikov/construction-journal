import type { ProjectMember, ProjectRole } from "../../../generated/prisma";
import { AppError } from "../../errors/AppError";
import { ERROR_MESSAGES } from "../../errors/errorMessages";
import { ERROR_CODES } from "../../errors/errorRegistry";
import { withNotFoundHandling } from "../../errors/withNotFoundHandling";
import { prisma } from "../../prisma/client";
import type { CreateProjectDto, UpdateProjectDto } from "./config/type";
import { ensureActorCanManageTarget, ensureOwnerWillRemain, ensureRoleAssignmentAllowed } from "./projects.policy";

export async function create(data: CreateProjectDto, ownerId: number, organizationId: number) {
  return prisma.$transaction(async (tx) => {
    const project = await tx.project.create({
      data: {
        ...data,
        organizationId,
      },
    });

    await tx.projectMember.create({
      data: {
        projectId: project.id,
        userId: ownerId,
        role: 'OWNER',
      },
    });

    return project;
  });
}

export async function findById(id: number) {
  return prisma.project.findUnique({ where: {id} });
}

export async function findByIdForUser(id: number, userId: number) {
  return prisma.project.findFirst({
    where: {
      id,
      members: { some: { userId } },
    },
  });
}

export async function findAllForOrganization(organizationId: number) {
  return prisma.project.findMany({
    where: {
      organizationId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function findAllForUser(userId: number) {
  return prisma.project.findMany({
    where: {
      members: {
        some: { userId },
      },
    },
  });
}

export async function update(id: number, data: UpdateProjectDto) {
 return withNotFoundHandling(
    () => prisma.project.update({ where: { id }, data }),
    ERROR_MESSAGES.PROJECT.NOT_FOUND,
    ERROR_CODES.PROJECT.NOT_FOUND
  );
}

export async function remove(id: number) {
  return withNotFoundHandling(
    () => prisma.project.delete({ where: { id } }),
    ERROR_MESSAGES.PROJECT.NOT_FOUND,
    ERROR_CODES.PROJECT.NOT_FOUND
  );
}

// Members

export async function findAllMembers(id: number) {
  return prisma.projectMember.findMany({
    where: {
      projectId: id,
    },
  });
}

export async function updateMemberRole(
    projectId: number,
    actor: ProjectMember,
    targetUserId: number,
    newRole: ProjectRole,
) {
  return withNotFoundHandling(() => prisma.$transaction(async (tx) => {
    const target = await tx.projectMember.findUnique({
      where: {
        projectId_userId: {
          projectId,
          userId: targetUserId,
        },
      },
    });

    if (!target) {
      throw new AppError(
        ERROR_MESSAGES.PROJECT_MEMBER.NOT_FOUND,
        404,
        ERROR_CODES.PROJECT_MEMBER.NOT_FOUND,
      );
    }

    ensureActorCanManageTarget(actor, target);
    ensureRoleAssignmentAllowed(actor, target, newRole);

    if (target.role === newRole) {
      return target;
    }

    if (target.role === "OWNER" && newRole !== "OWNER") {
      const ownersCount = await tx.projectMember.count({
        where: {
          projectId,
          role: "OWNER",
        },
      });

      ensureOwnerWillRemain(target, ownersCount);
    }

    //----------------------------------------
    // UPDATE
    //----------------------------------------

    return tx.projectMember.update({
      where: {
        projectId_userId: {
          projectId,
          userId: targetUserId,
        },
      },
      data: {
        role: newRole,
      },
    });
  }),
  ERROR_MESSAGES.PROJECT_MEMBER.NOT_FOUND,
  ERROR_CODES.PROJECT_MEMBER.NOT_FOUND);
}

export async function addMember(
  projectId: number,
  userId: number,
  role: ProjectRole = 'MEMBER',
) {
  return prisma.$transaction(async (tx) => {
    const user = await tx.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new AppError(ERROR_MESSAGES.USER.NOT_FOUND, 404, ERROR_CODES.USER.NOT_FOUND);
    }

    const existing = await tx.projectMember.findUnique({
      where: { projectId_userId: { projectId, userId } },
    });
    if (existing) {
      throw new AppError(
        ERROR_MESSAGES.PROJECT_MEMBER.ALREADY_MEMBER,
        409,
        ERROR_CODES.PROJECT_MEMBER.ALREADY_MEMBER,
      );
    }

    const project = await tx.project.findUnique({ where: {id: projectId }});

    if (!project) {
      throw new AppError(ERROR_MESSAGES.PROJECT.NOT_FOUND, 404, ERROR_CODES.USER.NOT_FOUND);
    }

    const organizationMember = await tx.organizationMember.findUnique({
      where: { organizationId_userId: { organizationId: project.organizationId, userId } },
    });

    if (!organizationMember) {
      throw new AppError(ERROR_MESSAGES.PROJECT_MEMBER.NOT_MEMBER_OF_ORGANIZATION, 404, ERROR_CODES.PROJECT_MEMBER.NOT_MEMBER_OF_ORGANIZATION);
    }

    return tx.projectMember.create({
      data: { projectId, userId, role },
    });
  });
}

// Если участника удаляют должен также удаляться из всех проектов каскадно, реализовать когда сделаю проекты
export async function removeMember(
  projectId: number,
  actor: ProjectMember,
  targetUserId: number,
) {
  return withNotFoundHandling(() => prisma.$transaction(async (tx) => {
    const target = await tx.projectMember.findUnique({
      where: {
        projectId_userId: {
          projectId,
          userId: targetUserId,
        },
      },
    });

    if (!target) {
      throw new AppError(
        ERROR_MESSAGES.PROJECT_MEMBER.NOT_FOUND,
        404,
        ERROR_CODES.PROJECT_MEMBER.NOT_FOUND,
      );
    }

    if (actor.userId === target.userId) {
      throw new AppError(
        ERROR_MESSAGES.PROJECT_MEMBER.FORBIDDEN,
        404,
        ERROR_CODES.PROJECT_MEMBER.FORBIDDEN,
      );
    }

    ensureActorCanManageTarget(actor, target);

    if (target.role === "OWNER") {
      const ownersCount = await tx.projectMember.count({
        where: {
          projectId,
          role: "OWNER",
        },
      });

      ensureOwnerWillRemain(target, ownersCount);
    }

    return tx.projectMember.delete({
      where: {
        projectId_userId: {
          projectId,
          userId: targetUserId,
        },
      },
    });
  }),
  ERROR_MESSAGES.PROJECT_MEMBER.NOT_FOUND,
  ERROR_CODES.PROJECT_MEMBER.NOT_FOUND);
}

export async function leaveProject(projectId: number, userId: number) {
  return withNotFoundHandling(() => prisma.$transaction(async (tx) => {
    const target = await tx.projectMember.findUnique({
      where: {
        projectId_userId: {
          projectId,
          userId: userId,
        },
      },
    });

    if (!target) {
      throw new AppError(
        ERROR_MESSAGES.PROJECT_MEMBER.NOT_FOUND,
        404,
        ERROR_CODES.PROJECT_MEMBER.NOT_FOUND,
      );
    }

    if (target.role === "OWNER") {
      const ownersCount = await tx.projectMember.count({
        where: {
          projectId,
          role: "OWNER",
        },
      });

      ensureOwnerWillRemain(target, ownersCount);
    }

    return tx.projectMember.delete({
      where: {
        projectId_userId: {
          projectId,
          userId,
        },
      },
    });
  }),
  ERROR_MESSAGES.PROJECT_MEMBER.NOT_FOUND,
  ERROR_CODES.PROJECT_MEMBER.NOT_FOUND);
}