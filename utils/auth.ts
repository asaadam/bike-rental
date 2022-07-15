import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

async function hashPassword(password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
}

async function compareHash(hashA: string, hashB: string) {
  return await bcrypt.compare(hashA, hashB);
}

async function checkValidToken(req: NextApiRequest) {
  return new Promise((resolve, reject) => {
    const token = req.headers.authorization;

    if (!token) {
      reject({ message: "Unauthorized" });
    }
    else {
      try {
        const decode = jwt.verify(token, publicRuntimeConfig.JWT_SECRET);
        resolve(decode)
      }
      catch (e) {
        reject({ message: "Token Invalid" })
      }
    }
  })
}

export { hashPassword, compareHash, checkValidToken }