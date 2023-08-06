import React, { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

import { API_ROUTES } from "@/app/components/common/constants";

import type { User } from "@prisma/client";

import useLoginModal from "./useLoginModal";

const useFavorite = (listingId: string, currentUser?: User | null) => {
	const router = useRouter();
	const loginModal = useLoginModal();

	const isListinInFavorites = useMemo(() => {
		const favList = currentUser?.favoriteIds || [];
		return favList.includes(listingId);
	}, [currentUser, listingId]);

	const toggleFavorite = useCallback(
		async (event: React.MouseEvent<HTMLButtonElement>) => {
			event.stopPropagation();

			if (!currentUser) {
				return loginModal.onOpen();
			}

			try {
				let request;
				let message = "";

				if (isListinInFavorites) {
					request = () => axios.delete(`${API_ROUTES.FAVORITES}/${listingId}`);
					message = "Listing removed from your favorites.";
				} else {
					request = () => axios.post(`${API_ROUTES.FAVORITES}/${listingId}`);
					message = "Listing added to your favorites!";
				}

				await request();
				router.refresh();
				toast.success(message);
			} catch (error) {
				toast.error("Someting went wrong.");
			}
		},
		[currentUser, isListinInFavorites, loginModal, router, listingId]
	);

	return {
		isListinInFavorites,
		toggleFavorite,
	};
};

export default useFavorite;
