import { NextApiRequest, NextApiResponse } from "next";
import { checkValidToken, joiSchema } from "../../../utils/auth";
import { prisma } from "../../../utils/prisma";

const EditUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await checkValidToken(req);
    if (result.user.role === 'MANAGER') {
      const { id, name, email, role } = req.body;
      const validation = joiSchema.validate({ name, email, role });
      if (id && validation) {
        try {
          const user = await prisma.user.update({
            where: {
              id
            },
            data: {
              name,
              email,
              role
            }
          });
          return res.json({ message: 'edit user success', user });
        }
        catch (e) {
          return res.status(500).send({ message: "Something went wrong", e });
        }
      }
      return res.status(400).json({ message: 'something went wrong check your input', validation });
    }
    return res.status(401).json({ message: 'you are not manager' });
  }
  catch (e) {
    return res.status(401).json(e);
  }

};


export default EditUser;
