import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
	reservationId: string;
}

/**
 * Remove a reservation
 */
export async function DELETE(
	request: Request,
	{ params }: { params: IParams }
) {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return NextResponse.error();
	}

	const { reservationId } = params;

	if (!reservationId || typeof reservationId !== "string") {
		throw new Error("Invalid reservation ID");
	}

	const remainingReservations = await prisma.reservation.deleteMany({
		where: {
			id: reservationId,
			// To ensure that the user that will be able to delete the reservation is:
			// Either the creator of the reservation
			// OR the creator of the listing rent owner of the listing
			OR: [{ userId: currentUser.id }, { listing: { userId: currentUser.id } }],
		},
	});

	return NextResponse.json(remainingReservations);
}
