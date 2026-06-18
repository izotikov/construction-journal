import { ErrorCode } from "@shared/api/errors/errorCodes";

export const ERROR_MESSAGES: Record<ErrorCode, string> = {
  AUTH_INVALID_CREDENTIALS: 'Неверный email или пароль',
  AUTH_INVALID_TOKEN: "Неверный JWT токен",
  AUTH_EXPIRED_TOKEN: "Ваш JWT токен истёк",
  AUTH_MISSING_TOKEN: "Отсутствует JWT токен",
  USER_NOT_FOUND: 'Пользователь не найден',
  USER_ALREADY_EXISTS: "Пользователь с такой почтой уже зарегестрирован",
  COMMON_VALIDATION_ERROR: "Ошибка валидации",
  COMMON_INTERNAL_ERROR: "Внутренняя ошибка сервера",
  COMMON_FORBIDDEN: "Доступ запрещен",
  DEFAULT: 'Что-то пошло не так',
};