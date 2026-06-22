import { User } from "@entities/user/config/type";

export type LoginDto = {
  email: string,
  password: string
}

export type LoginResponse = {
  message: string;
  result: {
    user: User;
    accessToken: string;
  }
};