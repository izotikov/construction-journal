import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useRedirectToLogin } from '@shared/model/hooks/useRedirectToLogin';
import { resetPasswordApi } from '@features/reset-password/api/resetPassword.api';

export const useResetPassword = () => {

  // TODO - создать словарь серверных ответов и привязать нотификейшны к ответам сервера 
  const notify = () => toast.success('Пароль успешно изменён', {
    position: 'bottom-right',
  });

  const { redirectToLogin } = useRedirectToLogin();

  const redirectAndNotify = () => {
      notify();
      redirectToLogin();
    }

  return useMutation({
    mutationFn: resetPasswordApi.resetPassword,
    onSuccess: redirectAndNotify
  })
}