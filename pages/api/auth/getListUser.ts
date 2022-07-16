import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../utils/prisma';


const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await prisma.user.findMany({
    include: {
      RentedBike: {
        include: {
          bike: true
        }
      }
    }
  });
  return res.json(user);
}

export default getUser;