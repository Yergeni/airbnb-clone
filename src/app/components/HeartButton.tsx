"use client";

import type { User } from "@prisma/client";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

type HeartButtonProps = {
	listingId: string;
	currentUser?: User | null;
};

export default function HeartButton({
	listingId,
	currentUser,
}: HeartButtonProps) {
	const isFavorite = false;
	const toggleFavorite = () => {};

	return (
		<button
			onClick={toggleFavorite}
			className="relative hover:opacity-80 transition cursor-pointer"
		>
			<AiOutlineHeart
				size={28}
				className="fill-white absolute -top-[2px] -right-[2px]"
			/>
			<AiFillHeart
				size={24}
				className={isFavorite ? "fill-rose-500" : "fill-neutral-500/70"}
			/>
		</button>
	);
}
