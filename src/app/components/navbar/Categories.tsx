"use client";

import { usePathname, useSearchParams } from "next/navigation";

import CategoryBox from "../CategoryBox";
import Container from "../Container";

import { CATEGORIES, SEARCH_PARAMS } from "./constants";

export default function Categories() {
	const params = useSearchParams();
  const pathname = usePathname();

  // Get the category value from the search params
  const category = params?.get(SEARCH_PARAMS.Category);

  // Show the categories only if we are on the main page
  const isMainPage = pathname === '/';
  if (!isMainPage) return null;

	return (
		<Container>
			<div className="pt-4 flex flex-row items-center justify-between overflow-x-auto no-scrollbar">
				{CATEGORIES.map(({ label, icon, description }) => {
					return (
						<CategoryBox
							key={label}
							label={label}
							icon={icon}
							selected={category === label}
						/>
					);
				})}
			</div>
		</Container>
	);
}
