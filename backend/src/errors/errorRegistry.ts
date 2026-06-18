export const ERROR_CODES = {
  AUTH: {
    MISSING_TOKEN: 'AUTH_MISSING_TOKEN',
    INVALID_TOKEN: 'AUTH_INVALID_TOKEN',
    EXPIRED_TOKEN: 'AUTH_EXPIRED_TOKEN',
    INVALID_CREDENTIALS: 'AUTH_INVALID_CREDENTIALS',
  },
  USER: {
    NOT_FOUND: 'USER_NOT_FOUND',
    ALREADY_EXISTS: 'USER_ALREADY_EXISTS',
  },
  COMMON: {
    VALIDATION_ERROR: 'COMMON_VALIDATION_ERROR',
    INTERNAL_ERROR: 'COMMON_INTERNAL_ERROR',
    FORBIDDEN: 'COMMON_FORBIDDEN',
  },
} as const;

type ErrorCodesMap = typeof ERROR_CODES;
export type ErrorCode = {
  [K in keyof typeof ERROR_CODES]: (typeof ERROR_CODES)[K][keyof (typeof ERROR_CODES)[K]]
}[keyof typeof ERROR_CODES];

export type ErrorMessages = {
  [K in keyof ErrorCodesMap]: {
    [C in keyof ErrorCodesMap[K]]: string
  }
}