import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../utils/prisma";
import { hashPassword, joiSchema } from "../../../utils/auth";

const CreateUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, email, password, role } = req.body;

  const validation = joiSchema.validate(req.body);
  if (validation.error) {
    return res.status(400).json(validation.error);
  }
  const findRegisteredUser = await prisma.user.findFirst({
    where: { email },
  });
  if (findRegisteredUser) {
    return res.status(400).json({ message: "user allready registered" })
  }

  let hasedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hasedPassword,
      role: role || "USER"
    },
  })

  return res.status(200).json({ message: "User created", user });
}



export default CreateUser;