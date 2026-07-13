import { InputField } from "@shared/ui/input-field/InputField"
import { FieldError, Path, useFormContext } from "react-hook-form";

type WithUsername = { name: string };

export function UsernameField<TFormData extends WithUsername>() {
    const {
      register,
      formState: { errors },
    } = useFormContext<TFormData>();
  
    const usernameError = errors.name as FieldError | undefined;
  return (
    <InputField
      label="Имя пользователя" 
      id="username" 
      type="text" 
      placeholder="Придумайте имя пользователя" 
      error={usernameError?.message}
      {...register('name' as Path<TFormData>)}
    />
  )
}