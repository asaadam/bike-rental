import { useMutation } from "react-query";
import { RatingBikeRequest } from "../../types/Bike";
import instance from "../../utils/axios";

async function ratingBike(request: RatingBikeRequest): Promise<unknown> {
  return (await instance.post('/bike/addRating', request)).data;
}

function useRatingBike() {
  return useMutation((params: RatingBikeRequest) => ratingBike(params));
}

export { useRatingBike }