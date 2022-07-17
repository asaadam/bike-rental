type LoginRequest = {
  email: string;
  password: string;
}

type LoginResponse = {
  token: string;
}

export type {
  LoginRequest,
  LoginResponse
}

