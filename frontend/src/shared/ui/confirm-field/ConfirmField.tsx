import { FieldError, Path, FieldValues, useFormContext } from "react-hook-form";
import { InputField } from "@shared/ui/input-field/InputField";
import { HTMLInputTypeAttribute } from "react";

type ConfirmFieldProps<TFormData extends FieldValues> = {
  fieldName: Path<TFormData>;
  label: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
};

export const ConfirmField = <TFormData extends FieldValues,>({
  fieldName,
  label,
  type = "text",
  placeholder,
}: ConfirmFieldProps<TFormData>) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<TFormData>();

  const error = errors[fieldName] as FieldError | undefined;

  return (
    <InputField
      label={label}
      id={fieldName}
      type={type}
      placeholder={placeholder}
      error={error?.message}
      {...register(fieldName)}
    />
  );
};