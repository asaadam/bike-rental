import type { NextApiRequest, NextApiResponse } from 'next'
import { checkValidToken } from '../../../utils/auth';
import { prisma } from '../../../utils/prisma';


const getOwnData = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const currentUser = await checkValidToken(req);
    const user = await prisma.user.findFirst({
      include: {
        RentedBike: {
          include: {
            bike: true
          }
        }
      },
      where: {
        id: currentUser.user.id
      }
    });
    return res.json(user);
  }
  catch (e) {
    return res.status(401).json(e);
  }

}

export default getOwnData;