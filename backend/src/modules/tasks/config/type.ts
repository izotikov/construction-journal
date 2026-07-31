import z from "zod";
import { TaskStatus } from "../../../../generated/prisma";

export const createTaskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  status: z.string().optional(),
  estimatedDuration: z.number().min(1, 'Time duration is required'),
});

export type CreateTaskDto = z.infer<typeof createTaskSchema>;

export const UpdateTaskSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  status: z.enum(TaskStatus).optional(),
  estimatedDuration: z.number().optional(),
});

export type UpdateTaskDto = z.infer<typeof UpdateTaskSchema>;

export const UpdateTaskAssigneeSchema = z.object({
  assigneeId: z.number().nullable(),
});

export type UpdateTaskAssigneeDto = z.infer<typeof UpdateTaskAssigneeSchema>;