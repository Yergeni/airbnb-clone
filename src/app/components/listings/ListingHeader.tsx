"use client";

import Image from "next/image";
import type { Listing, User } from "@prisma/client";

import Heading from "../Heading";

import useCountries from "@/hooks/useCountries";
import HeartButton from "../HeartButton";

type ListingHeaderInfo = Pick<
	Listing,
	"id" | "title" | "imageSrc" | "locationValue"
>;

type ListingHeaderProps = ListingHeaderInfo & {
	currentUser?: User | null;
};

export default function ListingHeader({
	id,
	title,
	imageSrc,
	locationValue,
	currentUser,
}: ListingHeaderProps) {
	const { getByValue } = useCountries();

	const location = getByValue(locationValue);

	return (
		<>
			<Heading
				title={title}
				subtitle={`${location?.region}, ${location?.label}`}
			/>
			<div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
				<Image
					src={imageSrc}
					alt={title}
					fill
					className="object-cover w-full"
				/>
				{/* Favorite Button */}
				<div className="absolute top-5 right-5">
					<HeartButton listingId={id} currentUser={currentUser} />
				</div>
			</div>
		</>
	);
}
