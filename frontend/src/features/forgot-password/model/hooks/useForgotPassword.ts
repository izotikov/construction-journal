import { useMutation } from '@tanstack/react-query';
import { forgotPasswordApi } from '@features/forgot-password/api/forgotPassword.api';
import { toast } from 'react-toastify';

export const useForgotPassword = () => {


  // TODO - создать словарь серверных ответов и привязать нотификейшны к ответам сервера 
  const notify = () => toast.info('Проверьте почту для сброса пароля', {
    position: 'bottom-right',
  });

  return useMutation({
    mutationFn: forgotPasswordApi.forgotPassword,
    onSuccess: notify
  })
}