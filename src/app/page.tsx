/* This is a server component */

import getListings from "./actions/getListings";
import getCurrentUser from "./actions/getCurrentUser";

import Container from "./components/Container";
import NoDataState from "./components/NoDataState";
import ListingCard from "./components/listings/ListingCard";
import ListingGrid from "./components/listings/ListingGrid";

export default async function Home() {
	const currentUser = await getCurrentUser();
	const listings = await getListings();

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
