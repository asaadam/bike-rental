import { Bike, RentedBike } from "@prisma/client";

type GetAllBikeRequestType = {
  startDateQuery: string
  endDate: string
  color: string
  model: string
  location: string
  rating: string
};

type AllBikeType = Bike & {
  rentedData: Array<RentedBike>
}

type GetAllBikeResponseType = {
  bikeData: Array<AllBikeType>;
}

export type { GetAllBikeRequestType, GetAllBikeResponseType }