import z from "zod";

export const forgotPasswordFormSchema = z.object({
  email: z.email("Введите email"),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordFormSchema>;