'use client';

import React from 'react';
import dynamic from 'next/dynamic';

/* Components */
import Avatar from '../Avatar';
import InnerLoading from '../InnerLoading';
import ListingCategory from './ListingCategory';

/* Types */
import type { Listing, User } from '@prisma/client';
import { CategoryType } from '../navbar/types';

/* Hooks */
import useCountries from '@/hooks/useCountries';

const Map = React.memo(
  dynamic(() => import('../Map'), {
    ssr: false,
    loading: () => <InnerLoading text="Retrieving location..." />,
  })
);

type ListingInfoType = Pick<
  Listing,
  'description' | 'guestCount' | 'roomCount' | 'bathroomCount' | 'locationValue'
>;

type ListingInfoProps = ListingInfoType & { user: User } & {
  category?: CategoryType;
  isCurrentUserOwner?: boolean;
};

export default function ListingInfo({
  description,
  guestCount,
  roomCount,
  bathroomCount,
  locationValue,
  user,
  category,
  isCurrentUserOwner,
}: ListingInfoProps) {
  const { getByValue } = useCountries();

  const coordinates = getByValue(locationValue)?.latlng;

  return (
    <section
      id="listing-info"
      className={`${!isCurrentUserOwner ? 'col-span-4' : ''} flex flex-col gap-8`}
    >
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex flex-row items-center gap-2">
          <p>Hosted by {user.name}</p>
          <Avatar imgUrl={user.image} />
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
          <p>{guestCount} guests</p>
          <p>{roomCount} rooms</p>
          <p>{bathroomCount} bathrooms</p>
        </div>
      </div>
      <hr />
      {category && <ListingCategory {...category} />}
      <hr />
      <p className="text-lg font-light text-neutral-500">{description}</p>
      <hr />
      <Map center={coordinates} />
    </section>
  );
}
