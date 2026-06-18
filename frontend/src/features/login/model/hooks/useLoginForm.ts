import { SubmitHandler, useForm } from "react-hook-form";
import { LoginFormData, loginFormSchema } from "@features/login/model/schema/loginFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginByEmail } from "@features/login/model/services/loginByEmail";
import { useAuthenticate } from "@features/login/model/hooks/useAuthenticate";
import { ERROR_MESSAGES } from "@shared/api/errors/errorMessages";
import { handleFormSubmit } from "@shared/lib/form/handleFormSubmit";

export const useLoginForm = () => {
  const authenticate = useAuthenticate();

  const methods = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginFormSchema),
    mode: 'onSubmit',
  });

  const {
    setError,
    handleSubmit,
  } = methods;

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    await handleFormSubmit(loginByEmail, data, setError, {
      onSuccess: authenticate,
      getErrorMessage: (error) =>
        ERROR_MESSAGES[error.messageCode] ?? ERROR_MESSAGES['DEFAULT'],
    });
  };

  return {
    methods,
    handleSubmit,
    onSubmit,
    rootError: methods.formState.errors.root?.message ?? 'Произошла ошибка',
  };
};