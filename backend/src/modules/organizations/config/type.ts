import z from "zod";
import { OrganizationRole } from "../../../../generated/prisma";

export const createOrganizationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
});

export type CreateOrganizationDto = z.infer<typeof createOrganizationSchema>;

export const UpdateOrganizationSchema = z.object({
  name: z.string().optional(),
});

export type UpdateOrganizationDto = z.infer<typeof UpdateOrganizationSchema>;

export const UpdateOrganizationMemberRoleSchema = z.object({
  role: z.enum(OrganizationRole),
});

export type UpdateOrganizationMemberRoleDto = z.infer<typeof UpdateOrganizationMemberRoleSchema>;