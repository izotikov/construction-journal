import z from "zod";
import { ProjectRole } from "../../../../generated/prisma";

export const createProjectSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
});

export type CreateProjectDto = z.infer<typeof createProjectSchema>;

export const UpdateProjectSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
});

export type UpdateProjectDto = z.infer<typeof UpdateProjectSchema>;

export const UpdateProjectMemberRoleSchema = z.object({
  role: z.enum(ProjectRole),
});

export type UpdateProjectMemberRoleDto = z.infer<typeof UpdateProjectMemberRoleSchema>;

export const addProjectMemberSchema = z.object({
  userId: z.number(),
});

export type AddProjectMemberDto = z.infer<typeof addProjectMemberSchema>;