import { Bike, BikeRating, RentedBike, User } from "@prisma/client";

type GetAllBikeRequestType = {
  startDateQuery?: string
  endDate?: string
  color?: string
  model?: string
  location?: string
  rating?: string
};

type RentedDataCustom = RentedBike & {
  user: User
  BikeRating: BikeRating
}

type AllBikeType = Bike & {
  rentedData: Array<RentedDataCustom>
}

type GetAllBikeResponseType = {
  bikeData: Array<AllBikeType>;
}

export type { GetAllBikeRequestType, GetAllBikeResponseType, AllBikeType }