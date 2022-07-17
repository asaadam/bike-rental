import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import getConfig from "next/config";
import { User } from "@prisma/client";
import Joi from "joi";

const { publicRuntimeConfig } = getConfig();

async function hashPassword(password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
}

async function compareHash(hashA: string, hashB: string) {
  return await bcrypt.compare(hashA, hashB);
}

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required().pattern(/^[a-zA-Z0-9]{3,30}$/),
})


type CustomUser = { user: User }

async function checkValidToken(req: NextApiRequest): Promise<CustomUser> {
  return new Promise((resolve, reject) => {
    const token = req.headers.authorization || req.cookies.token;

    if (!token) {
      reject({ message: "Unauthorized" });
    }
    else {
      try {
        const decode = jwt.verify(token, publicRuntimeConfig.JWT_SECRET);
        resolve(decode as CustomUser);
      }
      catch (e) {
        reject({ message: "Token Invalid" })
      }
    }
  })
}

export { hashPassword, compareHash, checkValidToken, joiSchema }