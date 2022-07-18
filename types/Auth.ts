import { RentedBike, User } from "@prisma/client";

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
};

type UserResponse = User & {
  RentedBike: RentedBike
}

export type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  UserResponse
}

