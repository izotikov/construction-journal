import type { ErrorMessages } from "./errorRegistry";


export const ERROR_MESSAGES: ErrorMessages = {

  AUTH: {
    MISSING_TOKEN: 'Токен не передан',
    INVALID_TOKEN: 'Токен невалиден',
    EXPIRED_TOKEN: 'Токен истёк',
    INVALID_CREDENTIALS: 'Неверный email или пароль',
  },
  USER: {
    NOT_FOUND: 'Пользователь не найден',
    ALREADY_EXISTS: 'Пользователь уже существует',
  },
  COMMON: {
    VALIDATION_ERROR: 'Ошибка валидации',
    INTERNAL_ERROR: 'Внутренняя ошибка сервера',
    FORBIDDEN: 'Доступ запрещён',
  },
};