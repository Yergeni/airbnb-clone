"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

import Heading from "../components/Heading";
import Modal from "../components/modals/Modal";
import Container from "../components/Container";
import ListingCard from "../components/listings/ListingCard";
import ListingGrid from "../components/listings/ListingGrid";

import { API_ROUTES } from "../components/common/constants";

import type { User } from "@prisma/client";
import type { ReservationsWithListing } from "../components/common/types";

/* Hooks */
import useCancelReservationModal from "@/hooks/useCancelReservationModal";

type ReservationClientProps = {
	reservations: ReservationsWithListing[];
	currentUser?: User | null;
};

export default function ReservationClient({
	reservations,
	currentUser,
}: ReservationClientProps) {
	const router = useRouter();
	const confirmModal = useCancelReservationModal();

	const [deletingId, setDeletingId] = useState<string>("");
	const [isLoading, setIsLoading] = useState(false);

	// Open the confirm modal setting the intended id for cancelation
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
		<Heading
			title="Are you sure you want to cancel this reservation?"
			subtitle="A refund will be issued to the client."
		/>
	);

	return (
		<Container>
			<Heading
				title="My Reservations"
				subtitle="Manage bookings on your properties"
			/>
			<ListingGrid sectionId="reservations">
				{reservations.map((reservation) => (
					<ListingCard
						key={reservation.id}
						data={reservation.listing}
						reservation={reservation}
						currentUser={currentUser}
						actionLabel="Cancel reservation"
            onAction={() => handleCancelReservationClick(reservation.id)}
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
			</ListingGrid>
		</Container>
	);
}
