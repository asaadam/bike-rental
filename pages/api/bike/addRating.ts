import Joi from "joi";
import { NextApiRequest, NextApiResponse } from "next";
import { checkValidToken } from "../../../utils/auth";
import { prisma } from "../../../utils/prisma";


const insertRating = async (rentedId: string, rating: number, bikeId: string) => {
  return await prisma.$transaction(async (prisma) => {
    const ratingResult = await prisma.bikeRating.create({
      data: {
        RentedBike: {
          connect: {
            id: rentedId
          }
        },
        rating: rating
      }
    });

    if (ratingResult.rentedBikeId) {
      const currentRating = await prisma.bikeRating.findFirst({
        where: {
          id: bikeId
        }
      });

      const countRating = await prisma.bikeRating.count({
        where: {
          RentedBike: {
            bikeId: bikeId
          }
        }
      });

      const newRating = ((currentRating?.rating || 0) + rating) / countRating;

      const bike = await prisma.bike.update({
        where: {
          id: bikeId
        },
        data: {
          rating: newRating
        }
      })
      return bike;
    }
  });
}

const AddRating = async (req: NextApiRequest, res: NextApiResponse) => {
  const { rentedId, rating } = req.body;
  const validationBody = Joi.object({
    rentedId: Joi.string().required(),
    rating: Joi.number().required(),
  });
  const validation = validationBody.validate(req.body);
  if (validation.error) {
    return res.status(400).json({ message: validation.error });
  }
  try {
    const decodedUser = await checkValidToken(req);
    //check if user is owner of bike

    try {
      const rentedBike = await prisma.rentedBike.findFirst({
        where: {
          id: rentedId,
          userId: decodedUser.user.id,
          BikeRating: {
            is: null
          }
        }
      });

      if (!rentedBike) {
        return res.status(400).json({ message: "you've allready submit or you never rent this bike" });
      }


      const result = await insertRating(rentedId, rating, rentedBike.bikeId);

      return res.status(200).json({ message: "Rating added successfully", result });
    }
    catch (e) {
      return res.status(500).send({ message: e });
    }
  }
  catch (e) {
    return res.status(401).json(e);
  }
}

export default AddRating;