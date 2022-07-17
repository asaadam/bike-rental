import { User } from "@prisma/client";

type LoginRequest = {
  email: string;
  password: string;
}

type LoginResponse = {
  token: string;
  user: User
}

export type {
  LoginRequest,
  LoginResponse
}

