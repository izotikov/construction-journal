import { ERROR_MESSAGES } from "../../errors/errorMessages";
import { ERROR_CODES } from "../../errors/errorRegistry";
import { withNotFoundHandling } from "../../errors/withNotFoundHandling";
import { prisma } from "../../prisma/client";
import type { CreateTaskDto, UpdateTaskDto } from "./config/type";

export async function create(data: CreateTaskDto, createdById: number, projectId: number) {
  return prisma.task.create({
    data: {
      ...data,
      projectId,
      createdById,
    },
  });
}

export async function findById(id: number, userId: number) {
  return prisma.task.findUnique({ 
    where: {
      id,
      project: {
        members: {
          some: {
            userId,
          },
        },
      },
    } 
  });
}

export async function findAllAssignedForUser(assigneeId: number) {
  return prisma.task.findMany({
    where: {
      assigneeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function findAllForProject(projectId: number) {
  return prisma.task.findMany({
    where: {
      projectId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function update(id: number, data: UpdateTaskDto) {
 return withNotFoundHandling(
    () => prisma.task.update({ where: { id }, data }),
    ERROR_MESSAGES.TASK.NOT_FOUND,
    ERROR_CODES.TASK.NOT_FOUND
  );
}

export async function remove(id: number) {
  return withNotFoundHandling(
    () => prisma.task.delete({ where: { id } }),
    ERROR_MESSAGES.TASK.NOT_FOUND,
    ERROR_CODES.TASK.NOT_FOUND
  );
}