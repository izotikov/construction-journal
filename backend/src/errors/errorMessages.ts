import type { ErrorMessages } from "./errorRegistry";

export const ERROR_MESSAGES: ErrorMessages = {

  AUTH: {
    MISSING_TOKEN: 'Токен не передан',
    INVALID_TOKEN: 'Токен невалиден',
    EXPIRED_TOKEN: 'Токен истёк',
    INVALID_CREDENTIALS: 'Неверный email или пароль',
    INVALID_RESET_PASSWORD_TOKEN: 'Токен смены пароля истёк'
  },
  USER: {
    NOT_FOUND: 'Пользователь не найден',
    ALREADY_EXISTS: 'Пользователь уже существует',
  },
  ORGANIZATION: {
    NOT_FOUND: 'Организация не найдена',
    ALREADY_EXISTS: 'Организация уже существует',
    MISSING_ID: 'Идентификатор организации не передан',
  },
  ORGANIZATION_MEMBER: {
    NOT_FOUND: 'Член организации не найден',
    ALREADY_EXISTS: 'Член организации уже существует',
    MISSING_ID: 'Идентификатор члена организации не передан',
    LAST_OWNER_CANNOT_BE_REMOVED: "Нельзя понизить или удалить последнего владельца организации",
    FORBIDDEN: "Недостаточно прав для совершения этого действия",
    ALREADY_MEMBER: "Пользователь уже является членом организации"
  },
  PROJECT: {
    NOT_FOUND: 'Проект не найден',
    ALREADY_EXISTS: 'Проект уже существует',
    MISSING_ID: 'Идентификатор проекта не передан',
  },
  PROJECT_MEMBER: {
    NOT_FOUND: 'Член проекта не найден',
    ALREADY_EXISTS: 'Член проекта уже существует',
    MISSING_ID: 'Идентификатор члена проекта не передан'
  },
  TASK: {
    NOT_FOUND: 'Задача не найдена',
    ALREADY_EXISTS: 'Задача уже существует',
    MISSING_ID: 'Идентификатор задачи не передан',
  },
  COMMON: {
    VALIDATION_ERROR: 'Ошибка валидации',
    INTERNAL_ERROR: 'Внутренняя ошибка сервера',
    FORBIDDEN: 'Доступ запрещён',
  },
};