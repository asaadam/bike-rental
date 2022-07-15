import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../utils/prisma';


const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await prisma.user.findMany();
  res.json(user);
}

export default getUser;