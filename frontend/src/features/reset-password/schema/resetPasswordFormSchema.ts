import z from "zod";

export const resetPasswordFormSchema = z.object({
  password: z.string().min(1, 'Придумайте новый пароль'),
  confirmPassword: z.string().min(1, 'Подтвердите новый пароль')
}).refine(
  (data) => data.password === data.confirmPassword,
  { message: "Пароли не совпадают", path: ["confirmPassword"] }
);

export type ResetPasswordFormData = z.infer<typeof resetPasswordFormSchema>;