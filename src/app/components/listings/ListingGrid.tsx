'use client';

import { ReactNode } from 'react';

type ListingGridProps = {
  sectionId: string;
  children: ReactNode;
  isHomePage?: boolean;
};

export default function ListingGrid({ sectionId, children, isHomePage }: ListingGridProps) {
  return (
    <section
      id={sectionId}
      className={`
				${isHomePage ? 'pt-24' : 'mt-10'}
				grid grid-cols-1 
				sm:grid-cols-2 
				md:grid-cols-3 
				lg:grid-cols-4 
				xl:grid-cols-5 
				2xl:grid-cols-6 
				gap-8
			`}
    >
      {children}
    </section>
  );
}
