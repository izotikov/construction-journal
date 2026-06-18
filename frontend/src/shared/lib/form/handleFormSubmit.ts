import { FieldValues, UseFormSetError } from "react-hook-form";
import { ServerError } from "@shared/api/errors/errors";

type HandleFormSubmitOptions<TFormData extends FieldValues> = {
  onSuccess?: () => void;
  getErrorMessage?: (error: ServerError) => string;
};

export async function handleFormSubmit<TFormData extends FieldValues>(
  action: (data: TFormData) => Promise<unknown>,
  data: TFormData,
  setError: UseFormSetError<TFormData>,
  options?: HandleFormSubmitOptions<TFormData>
) {
  try {
    await action(data);
    options?.onSuccess?.();
  } catch (error) {
    if (error instanceof ServerError) {
      setError('root', { message: options?.getErrorMessage?.(error) ?? error.message, });
    }
  }
}