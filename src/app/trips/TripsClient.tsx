"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

/* Components */
import Heading from "../components/Heading";
import Modal from "../components/modals/Modal";
import Container from "../components/Container";
import ListingCard from "../components/listings/ListingCard";

/* Types */
import type { Listing, Reservation, User } from "@prisma/client";

/* Constants */
import { API_ROUTES } from "../components/common/constants";

/* Hooks */
import useCancelReservationModal from "@/hooks/useCancelReservationModal";

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
	const confirmModal = useCancelReservationModal();

	const [deletingId, setDeletingId] = useState<string>("");
	const [isLoading, setIsLoading] = useState(false);

	const handleCancelReservationClick = useCallback(
		(id: string) => {
			setDeletingId(id);
			confirmModal.onOpen();
		},
		[confirmModal]
	);

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
					confirmModal.onClose();
				});
		},
		[router, confirmModal]
	);

	const confirmModalBody = (
		<Heading title="Are you sure you want to cancel this reservation?" />
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
						onAction={() => handleCancelReservationClick(reservation.id)}
						actionLabel="Cancel reservation"
						currentUser={currentUser}
					/>
				))}
				{/* Confirm Modal */}
				<Modal
					isOpen={confirmModal.isOpen}
					title="Cancel reservation"
					body={confirmModalBody}
					actionLabel="Confirm"
					isLoading={isLoading}
					disabled={isLoading}
					disabledSecondary={isLoading}
					onConfirm={() => onCancelReservation(deletingId)}
					secondaryAction={confirmModal.onClose}
					onClose={confirmModal.onClose}
				/>
			</section>
		</Container>
	);
}
