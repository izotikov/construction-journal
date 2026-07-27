import { ERROR_MESSAGES } from "../../errors/errorMessages";
import { ERROR_CODES } from "../../errors/errorRegistry";
import { withNotFoundHandling } from "../../errors/withNotFoundHandling";
import { prisma } from "../../prisma/client";
import type { CreateProjectDto, UpdateProjectDto } from "./config/type";

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
        role: 'MANAGER',
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