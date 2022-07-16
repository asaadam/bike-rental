import { prisma } from "../../../utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { checkValidToken } from "../../../utils/auth";
import Joi from "joi";

type Query = {
  page?: string,
  limit?: string,
  startDateQuery: string,
  endDate: string,
}

const GetAllBike = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await checkValidToken(req);
    const query = req.query as unknown as Query;
    const { page, limit, startDateQuery, endDate } = query;
    const validationQuery = Joi.object({
      page: Joi.string().required(),
      limit: Joi.string().required(),
      startDateQuery: Joi.string().optional(),
      endDate: Joi.string().optional(),
    });
    let limitNumber;
    let ofset;
    if (validationQuery.validate(query).error) {
      return res.status(400).json({ message: validationQuery.validate(query).error });
    }
    const pageNumber = parseInt(page || '0');
    limitNumber = parseInt(limit || '0');
    ofset = (pageNumber - 1) * limitNumber;
    try {
      const bikes = await prisma.bike.findMany({
        where: {
          RentedBike: {
            none: {
              isCancled: false,
              OR: [
                {
                  AND: [
                    {
                      startDate: {
                        lte: startDateQuery
                      }
                    },
                    {
                      endDate: {
                        gte: startDateQuery
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
                        gte: startDateQuery
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
            },
          }
        },
        skip: ofset ?? undefined,
        take: limitNumber ?? undefined,
        orderBy: {
          createdAt: "desc"
        }
      });
      return res.json({ message: bikes });
    }
    catch (e) {
      return res.status(500).send({ message: e });

    }
  }
  catch (e) {
    return res.status(401).json(e);
  }
}

export default GetAllBike;