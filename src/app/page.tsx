/* This is a server component */

import getListings, { IListingParams } from "./actions/getListings";
import getCurrentUser from "./actions/getCurrentUser";

import Container from "./components/Container";
import NoDataState from "./components/NoDataState";
import ListingCard from "./components/listings/ListingCard";
import ListingGrid from "./components/listings/ListingGrid";

type HomeProps = {
  searchParams: IListingParams;
};

export default async function Home({ searchParams }: HomeProps) {
  const currentUser = await getCurrentUser();
  const listings = await getListings(searchParams);

  if (listings.length === 0) {
    return <NoDataState showReset />;
  }

  return (
    <Container>
      <ListingGrid sectionId="all-listings" isHomePage>
        {listings.map((listing) => {
          return (
            <ListingCard
              key={listing.id}
              currentUser={currentUser}
              data={listing}
            />
          );
        })}
      </ListingGrid>
    </Container>
  );
}
