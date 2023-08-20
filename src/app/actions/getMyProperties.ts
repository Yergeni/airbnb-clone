import prisma from '@/app/libs/prismadb';
import getCurrentUser from './getCurrentUser';

export default async function getMyProperties() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return [];

    const properties = await prisma.listing.findMany({
      where: {
        userId: currentUser.id,
      },
    });

    return properties;
  } catch (error: any) {
    throw new Error(error);
  }
}
