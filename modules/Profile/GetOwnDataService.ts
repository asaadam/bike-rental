import { useQuery } from "react-query";
import { UserResponse } from "../../types/Auth";
import instance from "../../utils/axios";

async function getOwnData(): Promise<UserResponse> {
  return (await instance.get('/bike/getAllBike')).data;
}

function useOwnData() {
  return useQuery([], async () => await getOwnData(), {
    refetchOnWindowFocus: false,
    enabled: false
  });
}

export { useOwnData }