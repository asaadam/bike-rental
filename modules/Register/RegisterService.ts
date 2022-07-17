import { useMutation } from "react-query";
import { RegisterRequest } from "../../types/Auth";
import instance from "../../utils/axios";



async function register(request: RegisterRequest): Promise<unknown> {
  return (await instance.post('/auth/createUser', request)).data;
}

function useRegister() {
  return useMutation((params: RegisterRequest) => register(params));
}

export { useRegister }