import { FieldError, Path, useFormContext } from "react-hook-form";
import { InputField } from "@shared/ui/input-field/InputField";

type WithPassword = { password: string };

type PasswordFieldProps = {
  label?: string;
  placeholder?: string;
  autoComplete?: 'on' | 'off' | 'new-password';
  forgotPasswordHref?: string;
};

export const PasswordField = <TFormData extends WithPassword>({ 
  label = 'Пароль', 
  placeholder = 'Введите пароль', 
  autoComplete = 'on',
  forgotPasswordHref
}: PasswordFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<TFormData>();

  const passwordError = errors.password as FieldError | undefined;

  return (
    <InputField
      label={label}
      id="password"
      type="password"
      placeholder={placeholder}
      autoComplete={autoComplete}
      link={forgotPasswordHref ? { href: forgotPasswordHref, text: "Забыли пароль?" } : undefined}
      error={passwordError?.message}
      {...register('password' as Path<TFormData>)}
    />
  );
};