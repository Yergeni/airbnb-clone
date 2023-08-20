import countries from 'world-countries';

import { CountryValue } from '@/app/components/inputs/types';

const formattedCountries: CountryValue[] = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latlng: country.latlng,
  region: country.region,
}));

const useCountries = () => {
  const getAll = () => formattedCountries;

  const getByValue = (value: string) => formattedCountries.find((item) => item.value === value);

  return {
    getAll,
    getByValue,
  };
};

export default useCountries;
