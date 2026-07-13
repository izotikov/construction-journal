import { AxiosError } from "axios";
import { ServerError } from "@shared/api/errors/errors";

export function handleApiError(error: unknown): never {
  if (error instanceof AxiosError) {
    throw new ServerError(
      error.response?.data?.message ?? 'Что-то пошло не так',
      error.response?.status ?? 0,
      error.response?.data.messageCode ?? "DEFAULT"
    );
  }
  throw error;
}