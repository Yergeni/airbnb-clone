"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

/* Components */
import Heading from "../components/Heading";
import Container from "../components/Container";
import ListingCard from "../components/listings/ListingCard";

/* Types */
import type { Listing, Reservation, User } from "@prisma/client";

/* Constants */
import { API_ROUTES } from "../components/common/constants";

export type ReservationsWithListing = Reservation & { listing: Listing };

type TripsClientProps = {
	reservations: ReservationsWithListing[];
	currentUser?: User | null;
};

export default function TripsClient({
	reservations,
	currentUser,
}: TripsClientProps) {
	const router = useRouter();

	const [deletingId, setDeletingId] = useState<string>("");
	const [isLoading, setIsLoading] = useState(false);

	const onCancelReservation = useCallback(
		(id: string) => {
			setIsLoading(true);
			axios
				.delete(`${API_ROUTES.RESERVATION}/${id}`)
				.then(() => {
					toast.success("Reservation cancelled!");
					router.refresh();
				})
				.catch((error) => {
					toast.error(error?.response?.data?.error);
				})
				.finally(() => {
					setDeletingId("");
					setIsLoading(false);
				});
		},
		[router]
	);

	return (
		<Container>
			<Heading
				title="Trips"
				subtitle="Where you've been and where you're going."
			/>
			<section
				id="trips"
				className="
          mt-10 grid grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4 
          xl:grid-cols-5 
          2xl:grid-cols-6 
          gap-8
        "
			>
				{reservations.map((reservation) => (
					<ListingCard
						key={reservation.id}
						data={reservation.listing}
						reservation={reservation}
						actionId={reservation.id}
						actionLoading={isLoading}
						actionDisabled={deletingId === reservation.id || isLoading}
						onAction={onCancelReservation}
						actionLabel="Cancel reservation"
						currentUser={currentUser}
					/>
				))}
			</section>
		</Container>
	);
}
