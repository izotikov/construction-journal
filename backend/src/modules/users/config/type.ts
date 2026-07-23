import z from "zod";

export type SafeUser = {
    id: number;
    email: string;
    name: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export const updateUserSchema = z
  .object({
    name: z.string().min(1, 'Name cannot be empty').optional(),
    email: z.email('Invalid email format').optional(),
  })
  .refine((data) => data.name !== undefined || data.email !== undefined, {
    message: 'At least one field (name or email) must be provided',
  });

export type UpdateUserDto = z.infer<typeof updateUserSchema>;
