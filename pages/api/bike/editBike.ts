import { NextApiRequest, NextApiResponse } from "next";
import { checkValidToken } from "../../../utils/auth";
import { prisma } from "../../../utils/prisma";

const EditBike = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await checkValidToken(req);
    const { color, location, model, id } = req.body;
    if (id) {
      try {
        const bike = await prisma.bike.update({
          where: {
            id
          },
          data: {
            color,
            location,
            model
          }
        });
        return res.json({ message: 'edit bike success', bike });
      }
      catch (e) {
        return res.status(500).send({ message: e });
      }
    }
    return res.status(400).json({ message: 'id is required' });
  }
  catch (e) {
    return res.status(401).json(e);
  }
}

export default EditBike;