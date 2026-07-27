import z from "zod";

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