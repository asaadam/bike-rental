//create bike

import { prisma } from "../../../utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { checkValidToken } from "../../../utils/auth";

const CreateBike = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await checkValidToken(req);
    const { color, location, model } = req.body;
    try {
      const bike = await prisma.bike.create({
        data: {
          color,
          location: location.toLowerCase(),
          model
        }
      });
      res.json({ message: 'create bike success', bike });
    }
    catch (e) {
      return res.status(500).send({ message: e });
    }
  }
  catch (e) {
    return res.status(401).json(e);
  }

}

export default CreateBike;