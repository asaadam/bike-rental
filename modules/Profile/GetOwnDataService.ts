import { useQuery, UseQueryOptions } from "react-query";
import { UserResponse } from "../../types/Auth";
import instance from "../../utils/axios";

async function getOwnData(): Promise<UserResponse> {
  return (await instance.get('/auth/getOwnProfile')).data;
}

function useOwnData<TData = UserResponse>(option?: {
  options?: UseQueryOptions<
    UserResponse,
    unknown,
    TData,
    Array<string>
  >
}) {
  return useQuery(['getOwnData'], async () => await getOwnData(), option?.options);
}

export { useOwnData }