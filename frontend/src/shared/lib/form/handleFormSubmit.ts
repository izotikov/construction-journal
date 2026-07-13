import { FieldValues, UseFormSetError } from "react-hook-form";
import { ServerError } from "@shared/api/errors/errors";

type BaseOptions = {
  getErrorMessage?: (error: ServerError) => string;
};

type OptionsWithResult<TResult> = BaseOptions & {
  onSuccess?: (result: TResult) => void | Promise<void>;
};

type OptionsWithoutResult = BaseOptions & {
  onSuccess?: () => void | Promise<void>;
};

// action без полезного результата
export async function handleFormSubmit<TFormData extends FieldValues>(
  action: (data: TFormData) => Promise<void>,
  data: TFormData,
  setError: UseFormSetError<TFormData>,
  options?: OptionsWithoutResult
): Promise<void>;

// action с полезным результатом
export async function handleFormSubmit<TFormData extends FieldValues, TResult>(
  action: (data: TFormData) => Promise<TResult>,
  data: TFormData,
  setError: UseFormSetError<TFormData>,
  options?: OptionsWithResult<TResult>
): Promise<void>;

// реализация
export async function handleFormSubmit<TFormData extends FieldValues, TResult>(
  action: (data: TFormData) => Promise<TResult>,
  data: TFormData,
  setError: UseFormSetError<TFormData>,
  options?: BaseOptions & {
    onSuccess?: ((result: TResult) => void | Promise<void>) | (() => void | Promise<void>);
  }
) {
  try {
    const result = await action(data);
    await options?.onSuccess?.(result as TResult);
  } catch (error) {
    if (error instanceof ServerError) {
      setError("root", {
        message: options?.getErrorMessage?.(error) ?? error.message,
      });
    }
  }
}