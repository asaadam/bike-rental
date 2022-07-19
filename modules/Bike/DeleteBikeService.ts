import { useMutation } from "react-query";
import { DeleteBikeRequest } from "../../types/Bike";
import instance from "../../utils/axios";

async function deleteBike(request: DeleteBikeRequest): Promise<unknown> {
  return (await instance.post('/bike/deleteBike', request)).data;
}

function useDeleteBike() {
  return useMutation((params: DeleteBikeRequest) => deleteBike(params));
}

export { useDeleteBike }