import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ERROR_MESSAGES } from "@shared/api/errors/errorMessages";
import { handleFormSubmit } from "@shared/lib/form/handleFormSubmit";
import { useResetPassword } from "@features/reset-password/model/hooks/useResetPassword";
import { resetPasswordFormSchema, type ResetPasswordFormData } from "@features/reset-password/schema/resetPasswordFormSchema";

export const useResetPasswordForm = (token: string) => {
  const { mutateAsync: resetPassword, isPending } = useResetPassword();


  const methods = useForm<ResetPasswordFormData>({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(resetPasswordFormSchema),
    mode: 'onSubmit',
  });

  const {
    setError,
    handleSubmit,
  } = methods;

  const onSubmit: SubmitHandler<ResetPasswordFormData> = async (formData) => {
    await handleFormSubmit(({ password }) => resetPassword({ data: { newPassword: password }, token }), formData, setError, 
    {
      getErrorMessage: (error) =>
        ERROR_MESSAGES[error.messageCode] ?? ERROR_MESSAGES['DEFAULT'],
    })
  };

  return {
    methods,
    handleSubmit,
    onSubmit,
    isPending,
    rootError: methods.formState.errors.root?.message ?? 'Произошла ошибка',
  };
};