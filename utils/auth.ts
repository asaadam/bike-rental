import bcrypt from "bcrypt";

async function hashPassword(password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
}

async function compareHash(hashA: string, hashB: string) {
  return await bcrypt.compare(hashA, hashB);
}

export { hashPassword, compareHash }