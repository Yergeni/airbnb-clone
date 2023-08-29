/* Server Actions */
import getCurrentUser from '@/app/actions/getCurrentUser';
import getListingById from '@/app/actions/getListingById';
import getReservations from '@/app/actions/getReservations';

/* Client Components */
import ListingClient from './ListingClient';
import NoDataState from '@/app/components/NoDataState';
import { Reservation } from '@prisma/client';

interface IParams {
  listingId: string;
}

export default async function ListingPage({ params }: { params: IParams }) {
  const currentUser = await getCurrentUser();
  const listing = await getListingById(params.listingId);

  let reservations: Reservation[] | null = null;

  if (listing?.id) {
    reservations = await getReservations({ listingId: listing.id });
  }

  if (!listing) {
    return <NoDataState subTitle="Check the URL you are trying to access." />;
  }

  return (
    <ListingClient
      listingWithUser={listing}
      currentUser={currentUser}
      reservations={reservations}
    />
  );
}
