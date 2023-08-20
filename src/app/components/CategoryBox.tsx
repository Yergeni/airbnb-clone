'use client';

import { useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import queryString from 'query-string';

/* Constants */
import { SEARCH_PARAMS } from './navbar/constants';

/* Types */
import { CategoryType } from './navbar/types';

type CategoryBoxProps = Omit<CategoryType, 'description'> & {
  selected?: boolean;
};

export default function CategoryBox({ label, icon: Icon, selected }: CategoryBoxProps) {
  const router = useRouter();
  const params = useSearchParams();

  const handleUpdateQueryParams = useCallback(() => {
    // TODO: create a type
    let currentQuery: any = {};

    if (params) {
      currentQuery = queryString.parse(params.toString());
    }

    const updatedQuery = {
      ...currentQuery,
      category: label,
    };

    // If the cagory is already in the URL then, remove it
    if (params?.get(SEARCH_PARAMS.Category) === label) {
      delete updatedQuery.category;
    }

    const updatedUrl = queryString.stringifyUrl(
      {
        url: '/',
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(updatedUrl);
  }, [params, label, router]);

  return (
    <button
      onClick={handleUpdateQueryParams}
      className={`
      flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer
      ${selected ? 'border-b-neutral-800 text-neutral-800' : 'border-transparent text-neutral-500'}
    `}
    >
      <Icon size={26} />
      <p className="font-medium text-sm">{label}</p>
    </button>
  );
}
