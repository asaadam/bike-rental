import { NextApiRequest, NextApiResponse } from "next";
import { checkValidToken } from "../../../utils/auth";
import { prisma } from "../../../utils/prisma";

const DeleteBike = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await checkValidToken(req);
    const { id } = req.body;
    if (id) {
      try {
        const bike = await prisma.bike.delete({
          where: {
            id
          }
        });
        return res.json({ message: 'delete bike success', bike });
      }
      catch (e) {
        return res.status(500).send({ message: e });
      }
    }
  }
  catch (e) {
    return res.status(401).json(e);
  }
};

export default DeleteBike
