import { useQuery } from "react-query";
import { GetAllBikeResponseType, GetAllBikeRequestType } from "../../types/Bike";
import instance from "../../utils/axios";



async function getBike(request?: GetAllBikeRequestType): Promise<GetAllBikeResponseType> {
  return (await instance.get('/bike/getAllBike', { params: request })).data;
}

function useGetBike(params?: GetAllBikeRequestType) {
  return useQuery([params], async () => await getBike(params));
}

export { useGetBike }