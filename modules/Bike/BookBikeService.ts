import { useMutation } from "react-query";
import { BookBikeRequest } from "../../types/Bike";
import instance from "../../utils/axios";

async function bookBike(request: BookBikeRequest): Promise<unknown> {
  return (await instance.post('/bike/bookBike', request)).data;
}

function useBookBike() {
  return useMutation((params: BookBikeRequest) => bookBike(params));
}

export { useBookBike }