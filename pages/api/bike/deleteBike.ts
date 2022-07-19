import { NextApiRequest, NextApiResponse } from "next";
import { checkValidToken } from "../../../utils/auth";
import { prisma } from "../../../utils/prisma";

const DeleteBike = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await checkValidToken(req);
    const { bikeId } = req.body;
    if (bikeId) {
      try {
        const bike = await prisma.bike.delete({
          where: {
            id: bikeId,
          }
        });
        return res.json({ message: 'delete bike success', bike });
      }
      catch (e) {
        return res.status(500).send({ message: e });
      }
    }
    return res.status(400).send({ message: 'id is required' });
  }
  catch (e) {
    return res.status(401).json(e);
  }
};

export default DeleteBike
