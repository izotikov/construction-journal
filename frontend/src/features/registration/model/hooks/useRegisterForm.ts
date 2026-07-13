import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ERROR_MESSAGES } from "@shared/api/errors/errorMessages";
import { RegisterFormData, registerFormSchema } from "@features/registration/model/schema/registerFormSchema";
import { handleFormSubmit } from "@shared/lib/form/handleFormSubmit";
import { useRegister } from "@features/registration/model/hooks/useRegister";
import type { RegisterDto } from "@features/registration/config/type";

export const useRegisterForm = () => {

  const { mutateAsync: register, isPending } = useRegister();

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

  const onSubmit: SubmitHandler<RegisterFormData> = async ({ confirmPassword, ...data }) => {
    await handleFormSubmit(register, data, setError, {
      getErrorMessage: (error) =>
        ERROR_MESSAGES[error.messageCode] ?? ERROR_MESSAGES['DEFAULT'],
    });
  };

  return {
    methods,
    handleSubmit,
    onSubmit,
    isPending,
    rootError: methods.formState.errors.root?.message ?? 'Произошла ошибка',
  };
};