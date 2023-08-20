import { Range } from 'react-date-range';
import { CountryValue } from '../inputs/types';

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

export type SearchFormValue = {
  locationValue: CountryValue | null;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  dateRange: Range;
  minPrice: number;
  maxPrice: number | null;
};
