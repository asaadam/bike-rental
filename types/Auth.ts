import { User } from "@prisma/client";

type LoginRequest = {
  email: string;
  password: string;
}

type LoginResponse = {
  token: string;
  user: User
}

type RegisterRequest = {
  email: string;
  password: string;
  name: string;
}

export type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
}

