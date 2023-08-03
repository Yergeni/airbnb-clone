import { CountryValue } from "../inputs/types";

export type RentFormValue = {
	category: string;
	location: CountryValue | null;
	guestCount: number;
	roomCount: number;
	bathroomCount: number;
	imageSrc: string;
	price: number;
	title: string;
	description: string;
};
