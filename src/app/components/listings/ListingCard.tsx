"use client";

import { format } from "date-fns";

import { useCallback, useMemo } from "react";
import Image from "next/image";
import useCountries from "@/hooks/useCountries";

/* Constants */
import { ROUTES } from "../common/constants";

/* Types */
import type { Listing, Reservation, User } from "@prisma/client";

/* Custom Hooks */
import { useRouter } from "next/navigation";
import HeartButton from "../HeartButton";
import Button from "../Button";
import getCurrentUser from "@/app/actions/getCurrentUser";

type ListingCardProps = {
	data: Listing;
	currentUser?: User | null;
	reservation?: Reservation;
	disabled?: boolean;
	actionLabel?: string;
	actionId?: string;
	onAction?: (id: string) => void;
};

export default function ListingCard({
	currentUser,
	data,
	reservation,
	disabled,
	actionLabel,
	actionId = "",
	onAction,
}: ListingCardProps) {
	const router = useRouter();
	const { getByValue } = useCountries();

	// Get the country information
	const location = getByValue(data.locationValue);
	// Price from reservation otherwise the rent price
	const price = useMemo(() => {
		if (reservation) {
			return reservation.totalPrice;
		}

		return data.price;
	}, [reservation, data.price]);

	const reservationDate = useMemo(() => {
		if (!reservation) {
			return null;
		}

		const start = new Date(reservation.startDate);
		const end = new Date(reservation.endDate);

		return `${format(start, "PP")} - ${format(end, "PP")}`;
	}, [reservation]);

	const handleCancelReservation = useCallback(
		(event: React.MouseEvent<HTMLButtonElement>) => {
			event.stopPropagation();

			if (disabled) return;

			onAction?.(actionId);
		},
		[actionId, disabled, onAction]
	);

	return (
		<div
			role="button"
			onClick={() => router.push(`${ROUTES.LISTINGS}/${data.id}`)}
			className="col-span-1 cursor-pointer group"
		>
			<div className="flex flex-col gap2 w-full">
				<div className="aspect-square w-full relative overflow-hidden rounded-xl">
					<Image
						priority
						fill
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						alt="listing"
						src={data.imageSrc}
						className="object-cover h-full w-full sm:group-hover:scale-105 transition"
					/>
					{/* Favorite Icon */}
					<div className="absolute top-3 right-3">
						<HeartButton listingId={data.id} currentUser={currentUser} />
					</div>
				</div>
				{/* Location Info */}
				<p className="font-semibold text-lg">
					{location?.region}, {location?.label}
				</p>
				{/* Reservation date OR Category */}
				<p className="font-light text-neutral-500">
					{reservationDate || data.category}
				</p>
				{/* Price */}
				<div className="flex flex-row items-center gap-1">
					<p className="font-semibold">${price}</p>
					{!reservation && <span className="font-light">night</span>}
				</div>
				{/* Reservation Button */}
				{onAction && actionLabel && (
					<Button small disabled={disabled} onClick={handleCancelReservation}>
						{actionLabel}
					</Button>
				)}
			</div>
		</div>
	);
}
