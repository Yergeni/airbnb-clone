import prisma from '@/app/libs/prismadb';

export interface IListingParams {
  locationValue?: string;
  guestCount?: string;
  roomCount?: string;
  bathroomCount?: string;
  minPrice?: string;
  maxPrice?: string;
  startDate?: string;
  endDate?: string;
  category?: string;
}

export default async function getListings(params: IListingParams) {
  try {
    const {
      locationValue,
      guestCount,
      roomCount,
      bathroomCount,
      minPrice,
      maxPrice,
      startDate,
      endDate,
      category,
    } = params;
    let query: Record<string, unknown> = {};

    if (category) query.category = category;
    if (locationValue) query.locationValue = locationValue;

    if (guestCount) {
      query.guestCount = {
        gte: +guestCount,
      };
    }

    if (roomCount) {
      query.roomCount = {
        gte: +roomCount,
      };
    }

    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount,
      };
    }

    if (minPrice) {
      query.price = {
        gte: +minPrice,
      };
    }

    if (maxPrice) {
      query.price = {
        lte: +maxPrice,
      };
    }

    // Filter out any date that is not in the specified date range
    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: new Date(startDate) },
                startDate: { lte: new Date(startDate) },
              },
              {
                startDate: { lte: new Date(endDate) },
                endDate: { gte: new Date(endDate) },
              },
            ],
          },
        },
      };
    }

    const listings = await prisma?.listing.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc',
      },
    });
    return listings;
  } catch (error: any) {
    throw new Error(error);
  }
}
