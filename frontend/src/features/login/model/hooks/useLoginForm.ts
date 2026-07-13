import { SubmitHandler, useForm } from "react-hook-form";
import { LoginFormData, loginFormSchema } from "@features/login/model/schema/loginFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginByEmail } from "@features/login/model/services/loginByEmail";
import { ERROR_MESSAGES } from "@shared/api/errors/errorMessages";
import { handleFormSubmit } from "@shared/lib/form/handleFormSubmit";
import { useLogin } from "@features/login/model/hooks/useLogin";

export const useLoginForm = () => {
  const { mutateAsync: login, isPending } = useLogin();


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
    await handleFormSubmit(login, data, setError, {
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