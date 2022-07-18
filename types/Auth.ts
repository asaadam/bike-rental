import { Bike, BikeRating, RentedBike, User } from "@prisma/client";

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

type RentedBikeWithBike = RentedBike & {
  bike: Bike;
  BikeRating: BikeRating;
}

type UserResponse = User & {
  RentedBike: Array<RentedBikeWithBike>;
}

type UsersResponse = Array<UserResponse>;

export type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  UserResponse,
  UsersResponse,
}

