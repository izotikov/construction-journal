import { useSearch } from "@tanstack/react-router";


export function VerifyResult() {
  const search = useSearch({ from: '/verify-result' });
  const status = search?.status;
  const message = search?.message;

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold text-green-600">✅ Email подтверждён!</h1>
        <p className="mt-2 text-gray-700">Ваш адрес электронной почты успешно верифицирован.</p>
        <a href="/login" className="mt-4 text-blue-500 underline">Войти в аккаунт</a>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold text-red-600">❌ Ошибка подтверждения</h1>
        <p className="mt-2 text-gray-700">
          {message ? decodeURIComponent(message) : 'Ссылка недействительна или истекла'}
        </p>
        <a href="/" className="mt-4 text-blue-500 underline">Вернуться на главную</a>
      </div>
    );
  }

  // Если статус не распознан – показываем нейтральное сообщение
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Подтверждение email</h1>
      <p className="mt-2 text-gray-700">Неизвестный статус. Попробуйте перейти по ссылке из письма ещё раз.</p>
    </div>
  );
}