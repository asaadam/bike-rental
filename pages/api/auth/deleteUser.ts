import { NextApiRequest, NextApiResponse } from "next";
import { checkValidToken } from "../../../utils/auth";
import { prisma } from "../../../utils/prisma";

const DeleteUser = async (req: NextApiRequest, res: NextApiResponse) => {

  const { id } = req.body;
  if (id) {
    try {
      const result = await checkValidToken(req);
      if (result.user.id === id) {
        return res.status(401).json({ message: 'you can not delete your account' });
      }
      try {
        const user = await prisma.user.delete({
          where: {
            id
          }
        });
        return res.json({ message: 'delete user success', user });
      }
      catch (e) {
        return res.status(500).send({ message: e });
      }
    }
    catch (e) {
      return res.status(401).json(e);
    }
  }
  return res.status(400).json({ message: 'id is required' });
}

export default DeleteUser;