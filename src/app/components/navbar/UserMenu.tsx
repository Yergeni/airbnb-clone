"use client";

import { useCallback, useRef, useState } from "react";
import { signOut } from "next-auth/react"; // https://next-auth.js.org/getting-started/client#signout

import Avatar from "../Avatar";
import MenuItem from "./MenuItem";

import { AiOutlineMenu } from "react-icons/ai";

/* Hooks */
import { useOutsideEvents } from "@/hooks/useOutsideEvents";
import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";

/* Entity models */
import { User } from "@prisma/client";

type UserMenuProps = {
	currentUser?: User | null;
};

export default function UserMenu({ currentUser }: UserMenuProps) {
	const registerModal = useRegisterModal();
	const loginModal = useLoginModal();

	const [isOpen, setIsOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);

	const toggleMenu = useCallback(
		() => setIsOpen((prevValue) => !prevValue),
		[]
	);

	useOutsideEvents(menuRef, toggleMenu);

	const handleRegisterMenuClick = () => {
		registerModal.onOpen();
		toggleMenu();
	};

	const handleLoginMenuClick = () => {
		loginModal.onOpen();
		toggleMenu();
	};

	const handleLogoutMenuClick = () => {
		signOut();
		toggleMenu();
	}

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
					{currentUser ? (
						<ul>
							<MenuItem label="My trips" onClick={() => {}} />
							<MenuItem label="My favorites" onClick={() => {}} />
							<MenuItem label="My reservations" onClick={() => {}} />
							<MenuItem label="My properties" onClick={() => {}} />
							<MenuItem label="Aribnb my home" onClick={() => {}} />
							<hr />
							<MenuItem label="logout" onClick={handleLogoutMenuClick} />
						</ul>
					) : (
						<ul>
							<MenuItem label="Login" onClick={handleLoginMenuClick} />
							<MenuItem label="Register" onClick={handleRegisterMenuClick} />
						</ul>
					)}
				</div>
			)}
		</div>
	);
}
