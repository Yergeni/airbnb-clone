import prisma from '@/app/libs/prismadb';

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

/**
 * Gets a list of reservation by listing ID, User ID, or the reservation made to an specific author
 * @params the listing id to search for
 * @returns a Listing object or null
 */
export default async function getReservations({ listingId, userId, authorId }: IParams) {
  try {
    const query: any = {};

    // get the reservations for an specific listing ID
    if (listingId) {
      query.listingId = listingId;
    }
    // get the trips the current user has
    if (userId) {
      query.userId = userId;
    }
    // get the reservations made by other users
    if (authorId) {
      query.listing = { userId: authorId };
    }
    const reservations = await prisma.reservation.findMany({
      where: query,
      include: { listing: true },
      orderBy: { createdAt: 'asc' },
    });

    if (!reservations) return null;

    return reservations;
  } catch (error: any) {
    throw new Error(error);
  }
}
