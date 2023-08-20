import { NextResponse } from 'next/server';

import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

import type { RentFormValue } from '@/app/components/modals/types';

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  const body: RentFormValue = await request.json();
  const {
    title,
    description,
    imageSrc,
    category,
    price,
    bathroomCount,
    guestCount,
    location,
    roomCount,
  } = body;

  // Object.keys(body).forEach((key: any) => {
  // 	if (!body[key]) {
  // 		return NextResponse.error();
  // 	}
  // });

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      imageSrc,
      category,
      bathroomCount,
      guestCount,
      roomCount,
      price: parseInt(String(price), 10),
      locationValue: location?.value || '',
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
}
