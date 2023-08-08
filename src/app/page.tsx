/* This is a server component */

import getListings from "./actions/getListings";
import getCurrentUser from "./actions/getCurrentUser";

import Container from "./components/Container";
import NoDataState from "./components/NoDataState";
import ListingCard from "./components/listings/ListingCard";

export default async function Home() {
	const currentUser = await getCurrentUser();
	const listings = await getListings();

	if (listings.length === 0) {
		return <NoDataState showReset />;
	}

	return (
		<Container>
			<section
				className="pt-24 grid 
        grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8"
			>
				{listings.map((listing) => {
					return (
						<ListingCard
							key={listing.id}
							currentUser={currentUser}
							data={listing}
						/>
					);
				})}
			</section>
		</Container>
	);
}
