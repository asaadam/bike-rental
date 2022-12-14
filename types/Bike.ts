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

type CreateBikeRequest = {
  id?: string
  model: string
  color: string
  location: string
}

type BookBikeRequest = {
  bikeId: string
  startDate: string
  endDate: string
}

type CancelBookingRequest = {
  rentedId: string
}

type RatingBikeRequest = {
  rentedId: string
  rating: number
}

type DeleteBikeRequest = {
  bikeId: string
}

export type { CancelBookingRequest, GetAllBikeRequestType, GetAllBikeResponseType, AllBikeType, CreateBikeRequest, BookBikeRequest, RatingBikeRequest, DeleteBikeRequest }