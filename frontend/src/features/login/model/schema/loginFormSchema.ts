import z from "zod";

export const loginFormSchema = z.object({
  email: z.email("Введите email"),
  password: z.string().min(1, 'Введите пароль')
});

export type LoginFormData = z.infer<typeof loginFormSchema>;