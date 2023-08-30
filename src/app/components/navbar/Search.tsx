'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

import useCountries from '@/hooks/useCountries';
import useSearchModal from '@/hooks/useSearchModal';

import { BiSearch } from 'react-icons/bi';

import { SEARCH_PARAMS } from './constants';
import { differenceInDays } from 'date-fns';
import { pluralStringHandler } from '@/app/utils/helpers';

export default function Search() {
  const params = useSearchParams();
  const searchModal = useSearchModal();
  const { getByValue } = useCountries();

  const locationValue = params?.get(SEARCH_PARAMS.Location);
  const startDate = params?.get(SEARCH_PARAMS.StartDate);
  const endDate = params?.get(SEARCH_PARAMS.EndDate);
  const guestCount = params?.get(SEARCH_PARAMS.GuestCount);

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue)?.label;
    }
    return 'Anywhere';
  }, [locationValue, getByValue]);

  const durationLabel = useMemo(() => {
    let label = 'Any Week';
    if (startDate && endDate) {
      const diff = differenceInDays(new Date(endDate), new Date(startDate));

      if (diff) {
        label = `${diff} Days`;
      }
    }

    return label;
  }, [startDate, endDate]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return pluralStringHandler(+guestCount, 'Guest', 'Guests');
    }
    return 'Add Guests';
  }, [guestCount]);

  return (
    <button
      onClick={searchModal.onOpen}
      className="border w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer"
    >
      <div className="flex flex-row items-center justify-between">
        <div className="text-sm font-semibold px-6">{locationLabel}</div>
        <div className="hidden sm:block text-sm font-semibold text-center px-6 border-x flex-1">
          {durationLabel}
        </div>
        <div className="flex flex-row items-center gap-3 pl-6 pr-2 text-sm text-gray-600">
          <div className="hidden sm:block">{guestLabel}</div>
          <div className="p-2 bg-rose-500 rounded-full text-white">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </button>
  );
}
