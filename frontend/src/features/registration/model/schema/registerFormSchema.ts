import z from "zod";

export const registerFormSchema = z.object({
  email: z.email("Введите email"),
  name: z.string().min(1, 'Введите имя пользователя'),
  password: z.string().min(1, 'Введите пароль'),
  confirmPassword: z.string().min(1, 'Введите пароль ещё раз')
}).refine(
  (data) => data.password === data.confirmPassword,
  { message: "Пароли не совпадают", path: ["confirmPassword"] }
);

export type RegisterFormData = z.infer<typeof registerFormSchema>;