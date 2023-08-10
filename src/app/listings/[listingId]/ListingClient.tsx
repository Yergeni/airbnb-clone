"use client";

import { useMemo } from "react";

/* Components */
import Container from "@/app/components/Container";
import ListingHeader from "@/app/components/listings/ListingHeader";
import ListingInfo from "@/app/components/listings/ListingInfo";

/* Constants */
import { CATEGORIES } from "@/app/components/navbar/constants";

/* Types */
import type { Listing, Reservation, User } from "@prisma/client";

/* Hooks */
import ListingReservation from "@/app/components/listings/ListingReservation";

type ListingWithUser = Listing & { user: User };

type ListingClientProps = {
	listingWithUser: ListingWithUser;
	reservations?: Reservation[];
	currentUser?: User | null;
};

export default function ListingClient({
	listingWithUser,
	reservations = [],
	currentUser,
}: ListingClientProps) {
	// get the category info from te listing
	const category = useMemo(() => {
		return CATEGORIES.find((cat) => cat.label === listingWithUser.category);
	}, [listingWithUser.category]);

	return (
		<Container>
			<section id="listing-details" className="max-w-screen-lg mx-auto">
				<div className="flex flex-col gap-6">
					{/* Title, Subtitle, and Image */}
					<ListingHeader
						id={listingWithUser.id}
						title={listingWithUser.title}
						imageSrc={listingWithUser.imageSrc}
						locationValue={listingWithUser.locationValue}
						currentUser={currentUser}
					/>
					<div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
						{/* Section: Listing Information */}
						<ListingInfo
							description={listingWithUser.description}
							guestCount={listingWithUser.guestCount}
							roomCount={listingWithUser.roomCount}
							bathroomCount={listingWithUser.bathroomCount}
							locationValue={listingWithUser.locationValue}
							user={listingWithUser.user}
							category={category}
						/>
						{/* Section: Reservation Section */}
						<ListingReservation
							listingId={listingWithUser.id}
							listingPrice={listingWithUser.price}
							reservations={reservations}
							currentUser={currentUser}
						/>
					</div>
				</div>
			</section>
		</Container>
	);
}
