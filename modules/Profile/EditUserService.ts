import { useMutation } from "react-query";
import { RegisterRequest } from "../../types/Auth";
import instance from "../../utils/axios";



async function updateUser(request: RegisterRequest): Promise<unknown> {
  return (await instance.post('/auth/editUser', request)).data;
}

function useUpdateUser() {
  return useMutation((params: RegisterRequest) => updateUser(params));
}

export { useUpdateUser }