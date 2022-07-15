import { prisma } from "../../../utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import getConfig from "next/config";
import { checkValidToken } from "../../../utils/auth";
import Joi from "joi";

const { publicRuntimeConfig } = getConfig()

type Query = {
  page?: string,
  limit?: string
}

const GetAllBike = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await checkValidToken(req);
    const query = req.query as unknown as Query;
    const { page, limit } = query;
    let limitNumber;
    let ofset;
    if (page && limit) {
      const pageNumber = parseInt(page || '0');
      limitNumber = parseInt(limit || '0');
      ofset = (pageNumber - 1) * limitNumber;
    }
    const bikes = await prisma.bike.findMany({
      skip: ofset ?? undefined,
      take: limitNumber ?? undefined,
      orderBy: {
        createdAt: "desc"
      }
    });
    res.json({ message: bikes });
  }
  catch (e) {
    return res.status(401).json(e);
  }
}

export default GetAllBike;