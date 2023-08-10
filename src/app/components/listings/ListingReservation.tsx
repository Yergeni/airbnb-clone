"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";
import toast from "react-hot-toast";
import { Range, RangeKeyDict } from "react-date-range";
import { eachDayOfInterval, differenceInCalendarDays } from "date-fns";

/* Components */
import Button from "../Button";
import CalendarInput from "../inputs/CalendarInput";

/* Constants */
import { API_ROUTES } from "@/app/components/common/constants";

/* Types */
import type { Reservation, User } from "@prisma/client";

/* Hooks */
import useLoginModal from "@/hooks/useLoginModal";

type ListingReservationProps = {
	reservations: Reservation[];
	listingId: string;
	listingPrice: number;
	currentUser?: User | null;
};

const INITIAL_DATE_RANGE: Range = {
	startDate: new Date(),
	endDate: new Date(),
	key: "selection",
};

export default function ListingReservation({
	reservations,
	listingPrice,
	listingId,
	currentUser,
}: ListingReservationProps) {
	const router = useRouter();
	const loginModal = useLoginModal();

	// Get the dates already booked for the listing
	const disabledDates = useMemo(() => {
		let dates: Date[] = [];

		reservations.forEach((reservations) => {
			const reservedDates = eachDayOfInterval({
				start: new Date(reservations.startDate),
				end: new Date(reservations.endDate),
			});

			dates = [...dates, ...reservedDates];
		});

		return dates;
	}, [reservations]);

	const [isLoading, setIsLoading] = useState(false);
	const [totalPrice, setTotalPrice] = useState(listingPrice);
	const [dateRange, setDateRange] = useState<Range>(INITIAL_DATE_RANGE);

	const onCreateReservation = useCallback(() => {
		if (!currentUser) {
			return loginModal.onOpen();
		}

		setIsLoading(true);

		axios
			.post(API_ROUTES.RESERVATION, {
				totalPrice,
				startDate: dateRange.startDate,
				endDate: dateRange.endDate,
				listingId,
			})
			.then(() => {
				toast.success("Listing reserved!");
				setDateRange(INITIAL_DATE_RANGE);
				//TODO: Redirect to /trips
				router.refresh();
			})
			.catch(() => toast.error("Something went wrong."))
			.finally(() => setIsLoading(false));
	}, [
		currentUser,
		listingId,
		dateRange.startDate,
		dateRange.endDate,
		loginModal,
		router,
		totalPrice,
	]);

	// Updates the total price
	useEffect(() => {
		if (dateRange.startDate && dateRange.endDate) {
			const dayCount = differenceInCalendarDays(
				dateRange.endDate,
				dateRange.startDate
			);

			if (dayCount && listingPrice) {
				setTotalPrice(dayCount * listingPrice);
			} else {
				setTotalPrice(listingPrice);
			}
		}
	}, [dateRange, listingPrice]);

	return (
		<section
			id="listing-reservation"
			className="order-first mb-10 md:order-last md:col-span-3"
		>
			<div className="bg-white rounded-xl border border-x-neutral-200 overflow-hidden">
				<div className="flex flex-row items-center gap-1 p-4">
					<p className="text-2xl font-semibold">$ {listingPrice}</p>
					<p className="font-light text-neutral-600">per night</p>
				</div>
				<hr />
				<CalendarInput
					rangeValue={[dateRange]}
					onChangeDate={(value: RangeKeyDict) => setDateRange(value.selection)}
					disabledDates={disabledDates}
				/>
				<hr />
				<div className="p-4">
					<Button disabled={isLoading} onClick={onCreateReservation}>
						Reserve
					</Button>
				</div>
				<div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
					<p>Total</p>
					<p>$ {totalPrice}</p>
				</div>
			</div>
		</section>
	);
}
