import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ERROR_MESSAGES } from "@shared/api/errors/errorMessages";
import { handleFormSubmit } from "@shared/lib/form/handleFormSubmit";
import { ForgotPasswordFormData, forgotPasswordFormSchema } from "@features/forgot-password/model/schema/forgotPasswordFormSchema";
import { useForgotPassword } from "@features/forgot-password/model/hooks/useForgotPassword";

export const useForgotPasswordForm = () => {
  const { mutateAsync: forgotPassword, isPending } = useForgotPassword();


  const methods = useForm<ForgotPasswordFormData>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(forgotPasswordFormSchema),
    mode: 'onSubmit',
  });

  const {
    setError,
    handleSubmit,
  } = methods;

  const onSubmit: SubmitHandler<ForgotPasswordFormData> = async (data) => {
    await handleFormSubmit(forgotPassword, data, setError, {
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