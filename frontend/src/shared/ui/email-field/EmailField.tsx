import { InputField } from "@shared/ui/input-field/InputField";
import { FieldError, Path, useFormContext } from "react-hook-form";

type WithEmail = { email: string };

export const EmailField = <TFormData extends WithEmail>() => {
  const {
    register,
    formState: { errors },
  } = useFormContext<TFormData>();

  const emailError = errors.email as FieldError | undefined;

  return (
    <InputField 
      label="Электронная почта" 
      id="email" 
      type="email" 
      placeholder="youremail@mail.com" 
      error={emailError?.message}
      {...register('email' as Path<TFormData>)}
    />
  );
};