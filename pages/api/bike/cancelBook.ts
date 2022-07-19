import { NextApiRequest, NextApiResponse } from "next";
import { checkValidToken } from "../../../utils/auth";
import { prisma } from "../../../utils/prisma";

const CancelBook = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await checkValidToken(req);
    const { rentedId } = req.body;
    if (!rentedId) {
      return res.status(400).json({ message: "rentedId is required" });
    }
    try {
      const bike = await prisma.rentedBike.update({
        where: {
          id: rentedId
        },
        data: {
          isCanceled: true
        }
      });
      return res.json({ message: 'cancel book success', bike });
    }
    catch (e) {
      return res.status(500).send({ message: e });
    }
  }
  catch (e) {
    return res.status(401).json(e);
  }
}

export default CancelBook;