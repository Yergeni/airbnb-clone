import type { Listing, Reservation } from "@prisma/client";

export type ReservationsWithListing = Reservation & { listing: Listing };