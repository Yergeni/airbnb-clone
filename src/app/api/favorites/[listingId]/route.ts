import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
	listingId?: string;
}

/**
 * Updates the list of favorite listing for the current user
 */
export async function POST(request: Request, { params }: { params: IParams }) {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return NextResponse.error();
	}

	const { listingId } = params;

	if (!listingId || typeof listingId !== "string") {
		throw new Error("Invalid listing ID");
	}

	const user = await prisma.user.update({
		where: { id: currentUser.id },
		data: {
			favoriteIds: [...(currentUser.favoriteIds || []), listingId],
		},
	});

	return NextResponse.json(user);
}

/**
 * Remove a specific listing ID from the current user favorite listings
 */
export async function DELETE(
	request: Request,
	{ params }: { params: IParams }
) {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return NextResponse.error();
	}

	const { listingId } = params;

	if (!listingId || typeof listingId !== "string") {
		throw new Error("Invalid ID");
	}

	const user = await prisma.user.update({
		where: { id: currentUser.id },
		data: {
			favoriteIds: [
				...currentUser.favoriteIds.filter((id) => listingId !== id),
			],
		},
	});

	return NextResponse.json(user);
}
