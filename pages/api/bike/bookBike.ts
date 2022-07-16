import Joi, { date } from "joi";
import { NextApiRequest, NextApiResponse } from "next";
import { checkValidToken } from "../../../utils/auth";
import { prisma } from "../../../utils/prisma";

const BookBike = async (req: NextApiRequest, res: NextApiResponse) => {
  const { bikeId, startDate, endDate } = req.body;
  const validationBody = Joi.object({
    startDate: Joi.date().required(),
    bikeId: Joi.string().required(),
    endDate: Joi.date().greater(Joi.ref("startDate")).required(),
  });
  const validation = validationBody.validate(req.body);
  if (validation.error) {
    return res.status(400).json({ message: validation.error });
  }
  try {
    const decodedUser = await checkValidToken(req);
    try {
      const rentedBike = await prisma.rentedBike.findMany({
        where: {
          id: bikeId,
          isCancled: false,
          OR: [
            {
              AND: [
                {
                  startDate: {
                    lte: startDate
                  }
                },
                {
                  endDate: {
                    gte: startDate
                  }
                },
              ],
            },
            {
              AND: [
                {
                  startDate: {
                    lte: endDate
                  }
                },
                {
                  endDate: {
                    gte: endDate
                  }
                }
              ]
            }
            ,
            {
              AND: [
                {
                  startDate: {
                    gte: startDate
                  }
                },
                {
                  endDate: {
                    lte: endDate
                  }
                }
              ]
            },
          ]

        }
      });
      if (rentedBike.length > 0) {
        return res.status(400).json({ message: "bike is not available" });
      }
      const bike = await prisma.rentedBike.create({
        data: {
          user: {
            connect: {
              id: decodedUser.user.id
            }
          },
          bike: {
            connect: {
              id: bikeId
            }
          },
          startDate: startDate,
          endDate: endDate
        }
      })
      return res.json({ message: 'book bike success', bike });
    }
    catch (e) {
      return res.status(500).send({ message: e });
    }
  }
  catch (e) {
    return res.status(401).json(e);
  }
}

export default BookBike;