import { useQuery } from "react-query";
import { UsersResponse } from "../../types/Auth";
import instance from "../../utils/axios";

async function getUersList(): Promise<UsersResponse> {
  return (await instance.get('/auth/getListUser')).data;
}

function useGetUsersList() {
  return useQuery(['getListUser'], async () => await getUersList());
}

export { useGetUsersList }