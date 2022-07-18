import { useMutation } from "react-query";
import { RegisterRequest } from "../../types/Auth";
import { CreateBikeRequest } from "../../types/Bike";
import instance from "../../utils/axios";



async function createBike(request: CreateBikeRequest): Promise<unknown> {
  return (await instance.post('/bike/createBike', request)).data;
}

function useCreateBike() {
  return useMutation((params: CreateBikeRequest) => createBike(params));
}

export { useCreateBike }