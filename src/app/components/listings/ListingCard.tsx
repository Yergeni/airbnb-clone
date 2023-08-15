"use client";

import { useCallback, useMemo } from "react";
import Image from "next/image";
import { format } from "date-fns";

import Button from "../Button";
import HeartButton from "../HeartButton";

/* Constants */
import { ROUTES } from "../common/constants";

/* Types */
import type { Listing, Reservation, User } from "@prisma/client";

/* Custom Hooks */
import { useRouter } from "next/navigation";
import useCountries from "@/hooks/useCountries";

type ListingCardProps = {
	data: Listing;
	currentUser?: User | null;
	reservation?: Reservation;
	actionLabel?: string;
	actionDisabled?: boolean;
	onAction?: () => void;
};

export default function ListingCard({
	currentUser,
	data,
	reservation,
	actionLabel,
	actionDisabled,
	onAction,
}: ListingCardProps) {
	const router = useRouter();
	const { getByValue } = useCountries();

	// Get the country information
	const location = getByValue(data.locationValue);
	const isCurrentUserOwner = data.userId === currentUser?.id;

	// Price from reservation otherwise the rent price
	const price = useMemo(() => {
		if (reservation) {
			return reservation.totalPrice;
		}

		return data.price;
	}, [reservation, data.price]);

	// Formatted reservation date range
	const reservationDate = useMemo(() => {
		if (!reservation) {
			return null;
		}

		const start = new Date(reservation.startDate);
		const end = new Date(reservation.endDate);

		return `${format(start, "PP")} - ${format(end, "PP")}`;
	}, [reservation]);

	const handleCardClick = useCallback(() => {
		if (onAction) return;

		router.push(`${ROUTES.LISTINGS}/${data.id}`);
	}, [data.id, onAction, router]);

	return (
		<div
			role="button"
			onClick={handleCardClick}
			className={`col-span-1 ${
				// No need to to have pointer when action button
				onAction ? "cursor-auto" : "cursor-pointer" 
			} group`}
		>
			<div className="flex flex-col gap-2 w-full">
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
					{!isCurrentUserOwner && (
						<div className="absolute top-3 right-3">
							<HeartButton listingId={data.id} currentUser={currentUser} />
						</div>
					)}
				</div>
				{/* Location Info */}
				<p className="font-semibold text-lg">
					{location?.region}, {location?.label}
				</p>
				{/* Reservation date OR Category */}
				<p className="font-light text-neutral-500">
					{reservationDate || data.category}
				</p>
				{/* Price OR Total price */}
				<div className="flex flex-row items-center gap-1">
					<p className="font-semibold">${price}</p>
					{!reservation && <span className="font-light">night</span>}
				</div>
				{/* Reservation Button */}
				{onAction && actionLabel && (
					<Button small disabled={actionDisabled} onClick={onAction}>
						{actionLabel}
					</Button>
				)}
			</div>
		</div>
	);
}
