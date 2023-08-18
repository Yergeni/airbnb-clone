"use client";

import { useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import Container from "../Container";
import CategoryBox from "../CategoryBox";
import { VscChevronLeft, VscChevronRight } from "react-icons/vsc";

import { CATEGORIES, SEARCH_PARAMS } from "./constants";

export default function Categories() {
	const params = useSearchParams();
	const pathname = usePathname();
	const catContainerRef = useRef<HTMLDivElement | null>(null);

	// Get the category value from the search params
	const category = params?.get(SEARCH_PARAMS.Category);

	// Show the categories only if we are on the main page
	const isMainPage = pathname === "/";
	if (!isMainPage) return null;

	const handleScrollLeft = () => {
		if (catContainerRef.current) {
			catContainerRef.current.scrollLeft -= 80;
		}
	};
	const handleScrollRight = () => {
		if (catContainerRef.current) {
			catContainerRef.current.scrollLeft += 80;
		}
	};

	return (
		<Container>
			<div className="relative flex flex-row items-center">
				<button
					className="absolute lg:hidden rounded-full p-1 border top-9 left-0 md:-left-6 hover:bg-neutral-700 hover:text-white transition"
					onClick={handleScrollLeft}
				>
					<VscChevronLeft size={18} />
				</button>
				<button
					className="absolute lg:hidden rounded-full p-1 border top-9 right-0 md:-right-6 hover:bg-neutral-700 hover:text-white transition"
					onClick={handleScrollRight}
				>
					<VscChevronRight size={18} />
				</button>
			</div>
			<div
				ref={catContainerRef}
				className="pt-4 flex flex-row items-center justify-between overflow-x-auto no-scrollbar scroll-smooth"
			>
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
