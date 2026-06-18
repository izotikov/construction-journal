import { FieldError, Path, useFormContext } from "react-hook-form";
import { InputField } from "@shared/ui/input-field/InputField";

type WithPassword = { password: string };

type PasswordFieldProps = {
  forgotPasswordHref?: string;
};

export const PasswordField = <TFormData extends WithPassword>({ forgotPasswordHref }: PasswordFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<TFormData>();

  const passwordError = errors.password as FieldError | undefined;

  return (
    <InputField
      label="Пароль"
      id="password"
      type="password"
      placeholder="Введите пароль"
      link={forgotPasswordHref ? { href: forgotPasswordHref, text: "Забыли пароль?" } : undefined}
      error={passwordError?.message}
      {...register('password' as Path<TFormData>)}
    />
  );
};