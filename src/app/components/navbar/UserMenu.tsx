"use client";

import { useCallback, useRef, useState } from "react";
import { signOut } from "next-auth/react"; // https://next-auth.js.org/getting-started/client#signout
import { useRouter } from "next/navigation";

import Avatar from "../Avatar";
import MenuItem from "./MenuItem";

import { AiOutlineMenu } from "react-icons/ai";

/* Hooks */
import { useOutsideEvents } from "@/hooks/useOutsideEvents";
import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";
import useRentModal from "@/hooks/useRentModal";

/* Types */
import type { User } from "@prisma/client";

/* Constants */
import { ROUTES } from "../common/constants";

type UserMenuProps = {
	currentUser?: User | null;
};

export default function UserMenu({ currentUser }: UserMenuProps) {
	const router = useRouter();

	const registerModal = useRegisterModal();
	const loginModal = useLoginModal();
	const rentModal = useRentModal();

	const [isOpen, setIsOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);

	const toggleMenu = useCallback(
		() => setIsOpen((prevValue) => !prevValue),
		[]
	);

	useOutsideEvents(menuRef, toggleMenu);

	const handleYourRents = () => {
		if (!currentUser) {
			return loginModal.onOpen();
		}

		rentModal.onOpen();
	};

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
	};

	const handleMenuItemClick = (executeFn: () => void) => {
		executeFn();
		toggleMenu();
	};

	return (
		<div className="relative">
			<div className="flex flex-row items-center gap-3">
				<button
					onClick={handleYourRents}
					className="hidden md:block py-3 px-4 rounded-full hover:bg-neutral-100 transition"
				>
					New property
				</button>
				<button
					onClick={toggleMenu}
					className="flex flex-row items-center gap-3 p-4 md:py-1 md:px-2 border border-neutral-200 rounded-full hover:shadow-md transition"
				>
					<AiOutlineMenu />
					<div className="hidden md:block">
						<Avatar imgUrl={currentUser?.image} />
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
							<MenuItem
								label="My trips"
								onClick={() =>
									handleMenuItemClick(() => router.push(ROUTES.TRIPS))
								}
							/>
							<MenuItem
								label="My favorites"
								onClick={() =>
									handleMenuItemClick(() => router.push(ROUTES.FAVORITES))
								}
							/>
							<MenuItem
								label="My reservations"
								onClick={() =>
									handleMenuItemClick(() => router.push(ROUTES.RESERVATIONS))
								}
							/>
							<MenuItem
								label="My properties"
								onClick={() =>
									handleMenuItemClick(() => router.push(ROUTES.MY_PROPERTIES))
								}
							/>
							<MenuItem
								label="New property"
								onClick={() => handleMenuItemClick(rentModal.onOpen)}
							/>
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
