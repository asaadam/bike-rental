import { useMutation } from "react-query";
import { DeleteUserRequest } from "../../types/Auth";
import instance from "../../utils/axios";


async function deleteUser(request: DeleteUserRequest): Promise<unknown> {
  return (await instance.post('/auth/deleteUser', request)).data;
}

function useDeleteUser() {
  return useMutation((params: DeleteUserRequest) => deleteUser(params));
}

export { useDeleteUser }