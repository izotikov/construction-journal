import { ERROR_MESSAGES } from "../../errors/errorMessages";
import { ERROR_CODES } from "../../errors/errorRegistry";
import { withNotFoundHandling } from "../../errors/withNotFoundHandling";
import { prisma } from "../../prisma/client";
import type { CreateOrganizationDto, UpdateOrganizationDto } from "./config/type";

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