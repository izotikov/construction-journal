import z from "zod";

export const createOrganizationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
});

export type CreateOrganizationDto = z.infer<typeof createOrganizationSchema>;

export const UpdateOrganizationSchema = z.object({
  name: z.string().optional(),
});

export type UpdateOrganizationDto = z.infer<typeof UpdateOrganizationSchema>;