"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import Avatar from "../Avatar";
import MenuItem from "./MenuItem";

import { AiOutlineMenu } from "react-icons/ai";
import { useOutsideEvents } from "@/hooks/useOutsideEvents";

export default function UserMenu() {
	const [isOpen, setIsOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);

	const toggleMenu = useCallback(
		() => setIsOpen((prevValue) => !prevValue),
		[]
	);

	useOutsideEvents(menuRef, toggleMenu);

	return (
		<div className="relative">
			<div className="flex flex-row items-center gap-3">
				<button
					onClick={() => console.log("TODO")}
					className="hidden md:block py-3 px-4 rounded-full hover:bg-neutral-100 transition"
				>
					Airbnb your home
				</button>
				<button
					onClick={toggleMenu}
					className="flex flex-row items-center gap-3 p-4 md:py-1 md:px-2 border border-neutral-200 rounded-full hover:shadow-md transition"
				>
					<AiOutlineMenu />
					<div className="hidden md:block">
						<Avatar />
					</div>
				</button>
			</div>

			{isOpen && (
				<div
					ref={menuRef}
					className="absolute w-[40vw] md:w-3/4 right-0 top-12 bg-white overflow-hidden rounded-xl shadow-md text-sm"
				>
					<ul className="">
						<MenuItem label="Login" onClick={() => {}} />
						<MenuItem label="Register" onClick={() => {}} />
					</ul>
				</div>
			)}
		</div>
	);
}
