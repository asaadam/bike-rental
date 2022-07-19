import { useMutation } from "react-query";
import { CancelBookingRequest } from "../../types/Bike";
import instance from "../../utils/axios";

async function cancelBook(request: CancelBookingRequest): Promise<unknown> {
  return (await instance.post('/bike/cancelBook', request)).data;
}

function useCacelBook() {
  return useMutation((params: CancelBookingRequest) => cancelBook(params));
}

export { useCacelBook }