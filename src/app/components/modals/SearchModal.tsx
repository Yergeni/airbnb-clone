'use client';

import dynamic from 'next/dynamic';
import queryString from 'query-string';
import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FieldValues, SubmitHandler, UseFormRegister, useForm } from 'react-hook-form';

/* Components */
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import CounterInput from '../inputs/CounterInput';
import CalendarInput from '../inputs/CalendarInput';
import CountrySelect from '../inputs/CountrySelect';

/* Types */
import { SearchFormValue } from './types';

/* Hooks */
import useSearchModal from '@/hooks/useSearchModal';
import { formatISO } from 'date-fns';
import useCountries from '@/hooks/useCountries';
import { Range } from 'react-date-range';

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
  PRICE = 3,
}

const DEFAULT_SEARCH_VALUES: SearchFormValue = {
  locationValue: null,
  guestCount: 1,
  roomCount: 1,
  bathroomCount: 1,
  dateRange: {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  },
  minPrice: 0,
  maxPrice: null,
};

export default function SearchModal() {
  const router = useRouter();
  const params = useSearchParams();
  const searchModal = useSearchModal();
  const { getByValue } = useCountries();

  const [step, setStep] = useState(STEPS.LOCATION);

  const { register, handleSubmit, setValue, watch } = useForm<SearchFormValue>({
    defaultValues: DEFAULT_SEARCH_VALUES,
  });

  // Set default values if already in the URL
  useEffect(() => {
    if (params) {
      const searchValues = queryString.parse(params.toString());
      console.log('PARAMS: ', searchValues);
      if (searchValues.locationValue && typeof searchValues.locationValue === 'string') {
        const location = getByValue(searchValues.locationValue) || null;
        setValue('locationValue', location);
      }

      if (searchValues.bathroomCount) {
        setValue('bathroomCount', +searchValues.bathroomCount);
      }

      if (searchValues.guestCount) {
        setValue('guestCount', +searchValues.guestCount);
      }

      if (searchValues.roomCount) {
        setValue('roomCount', +searchValues.roomCount);
      }

      if (searchValues.minPrice) {
        setValue('minPrice', +searchValues.minPrice);
      }

      if (searchValues.maxPrice) {
        setValue('maxPrice', +searchValues.maxPrice);
      }

      if (
        searchValues.startDate &&
        searchValues.endDate &&
        typeof searchValues.startDate === 'string' &&
        typeof searchValues.endDate === 'string'
      ) {
        const dateRangeSearchedValue: Range = {
          ...DEFAULT_SEARCH_VALUES.dateRange,
          startDate: new Date(searchValues.startDate),
          endDate: new Date(searchValues.endDate),
        };

        setValue('dateRange', dateRangeSearchedValue);
      }
    }
  }, [getByValue, params, setValue]);

  const minPriceValue = watch('minPrice');
  const maxPriceValue = watch('maxPrice');
  const locationValue = watch('locationValue');
  const dateRangeValue = watch('dateRange');
  const roomCountValue = watch('roomCount');
  const guestCountValue = watch('guestCount');
  const bathroomCountValue = watch('bathroomCount');

  // Dynamic import of the Map to make it work in NextJS and load it everytime location changes
  const DynamicMap = useMemo(
    () => dynamic(() => import('../Map'), { ssr: false }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [locationValue]
  );

  const onNext = () => setStep((value) => value + 1);
  const onBack = () => setStep((value) => value - 1);

  const actionLabel = useMemo(() => {
    if (step !== STEPS.PRICE) return 'Next';
    return 'Search';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) return undefined;
    return 'Back';
  }, [step]);

  const onSubmit: SubmitHandler<SearchFormValue> = (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }

    console.log(data);
    let currentQuery: Record<string, unknown> = {};

    if (params) {
      currentQuery = queryString.parse(params.toString());
    }

    const updatedQuery: Record<string, unknown> = {
      ...currentQuery,
      locationValue: locationValue?.value,
      guestCount: guestCountValue,
      roomCount: roomCountValue,
      bathroomCount: bathroomCountValue,
      minPrice: minPriceValue,
    };

    if (dateRangeValue.startDate) {
      updatedQuery.startDate = formatISO(dateRangeValue.startDate, {
        representation: 'date',
      });
    }

    if (dateRangeValue.endDate) {
      updatedQuery.endDate = formatISO(dateRangeValue.endDate, {
        representation: 'date',
      });
    }

    if (maxPriceValue) {
      updatedQuery.maxPrice = maxPriceValue;
    }

    const url = queryString.stringifyUrl(
      {
        url: '/',
        query: updatedQuery as Record<string, string>,
      },
      { skipNull: true }
    );

    setStep(STEPS.LOCATION);
    searchModal.onClose();
    router.push(url);
  };

  // Modal body content
  let bodyContent = (
    <section className="flex flex-col gap-8">
      <Heading title="Where is your place located?" subtitle="Help guests find you!" />
      <CountrySelect value={locationValue} onChange={(value) => setValue('locationValue', value)} />
      <DynamicMap center={locationValue?.latlng} />
    </section>
  );

  if (step === STEPS.DATE) {
    bodyContent = (
      <section className="flex flex-col gap-8">
        <Heading title="When do you want to go?" subtitle="Make sure dates are available!" />
        <CalendarInput
          rangeValue={[dateRangeValue]}
          onChangeDate={(value) => setValue('dateRange', value.selection)}
        />
      </section>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <section className="flex flex-col gap-8">
        <Heading title="More Information" subtitle="Find your perfect place!" />
        <CounterInput
          title="Guests"
          subtitle="How many guests are coming?"
          value={guestCountValue}
          onChange={(value) => setValue('guestCount', value)}
        />
        <hr />
        <CounterInput
          title="Rooms"
          subtitle="How many rooms do you need?"
          value={roomCountValue}
          onChange={(value) => setValue('roomCount', value)}
        />
        <hr />
        <CounterInput
          title="Bathrooms"
          subtitle="How many bathrooms do you need?"
          value={bathroomCountValue}
          onChange={(value) => setValue('bathroomCount', value)}
        />
      </section>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <section className="flex flex-col gap-8">
        <Heading title="Price" subtitle="Find the perfect place for your budget" />
        <div className="flex flex-row items-center justify-between gap-8">
          <Input
            key="minPrice"
            id="minPrice"
            label="Minimum price"
            type="number"
            register={register as unknown as UseFormRegister<FieldValues>}
          />
          <Input
            key="maxPrice"
            id="maxPrice"
            label="Maximum price"
            type="number"
            register={register as unknown as UseFormRegister<FieldValues>}
          />
        </div>
      </section>
    );
  }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onConfirm={handleSubmit(onSubmit)}
      title="Filters"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      body={bodyContent}
    />
  );
}
