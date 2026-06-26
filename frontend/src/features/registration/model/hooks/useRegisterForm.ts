import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ERROR_MESSAGES } from "@shared/api/errors/errorMessages";
import { RegisterFormData, registerFormSchema } from "@features/registration/model/schema/registerFormSchema";
import { handleFormSubmit } from "@shared/lib/form/handleFormSubmit";
import { registerByEmail } from "@features/registration/model/services/registerByEmail";
import { useRegistrationRedirect } from "./useRegistrationRedirect";
import { toast } from 'react-toastify';

export const useRegisterForm = () => {

  const methods = useForm<RegisterFormData>({
    defaultValues: {
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(registerFormSchema),
    mode: 'onSubmit',
  });

  const {
    setError,
    handleSubmit,
  } = methods;
  const { redirectToLogin } = useRegistrationRedirect();
  const notify = () => toast.success('Регистрация прошла успешно!', {
    position: 'bottom-right',
  });

  const redirectAndNotify = () => {
    notify();
    redirectToLogin();
  }

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    await handleFormSubmit(registerByEmail, data, setError, {
      onSuccess: redirectAndNotify,
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