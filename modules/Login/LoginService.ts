import { useMutation } from "react-query";
import { LoginRequest, LoginResponse } from "../../types/Auth";
import instance from "../../utils/axios";



async function login(request: LoginRequest): Promise<LoginResponse> {
  return (await instance.post('/auth/loginUser', request)).data;
}

function useLogin() {
  return useMutation((params: LoginRequest) => login(params));
}

export { useLogin }