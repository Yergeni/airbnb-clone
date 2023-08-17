import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingGrid from "../components/listings/ListingGrid";
import ListingCard from "../components/listings/ListingCard";

import type { Listing, User } from "@prisma/client";

type FavoritesClientProps = {
	favorites: Listing[];
	currentUser?: User | null;
};

export default function FavoritesClient({
	favorites,
	currentUser,
}: FavoritesClientProps) {
	return (
		<Container>
			<Heading title="Favorites" subtitle="These are you favorite places." />
			<ListingGrid sectionId="favorite-listings">
				{favorites.map((fav) => (
					<ListingCard key={fav.id} data={fav} currentUser={currentUser} />
				))}
			</ListingGrid>
		</Container>
	);
}
