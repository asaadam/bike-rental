import { useMutation } from "react-query";
import { CreateBikeRequest } from "../../types/Bike";
import instance from "../../utils/axios";

async function editBike(request: CreateBikeRequest): Promise<unknown> {
  return (await instance.post('/bike/editBike', request)).data;
}

function useEditBike() {
  return useMutation((params: CreateBikeRequest) => editBike(params));
}

export { useEditBike }