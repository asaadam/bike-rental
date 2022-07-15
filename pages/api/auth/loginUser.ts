import { NextApiRequest, NextApiResponse } from "next";
import { compareHash } from "../../../utils/auth";
import { prisma } from "../../../utils/prisma";
import jwt from "jsonwebtoken";
import getConfig from "next/config";

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()


const login = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;
  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
  if (!user) {
    return res.status(401).send("Email not found");
  } else {
    const validPassword = await compareHash(password, user.password);
    if (!validPassword) {
      res.status(401).send("Invalid  password");
    }
    const token = jwt.sign({ user }, publicRuntimeConfig.JWT_SECRET);
    res.setHeader("Set-Cookie", `token=${token}; httpOnly; path=/`);
    return res.json({ token });

  }

}

export default login;