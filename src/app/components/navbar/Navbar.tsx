"use client";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";

/* Entity models */
import { User } from "@prisma/client";

type NavbarProps = {
	currentUser?: User | null;
};

export default function Navbar({ currentUser }: NavbarProps) {
	return (
		<nav className="fixed w-full bg-white z-10 shadow-sm">
			<div className="py-4 border-b">
				<Container>
					<div className="flex flex-row items-center justify-between gap-3 md:gap-1">
						<Logo />
						<Search />
						<UserMenu currentUser={currentUser} />
					</div>
				</Container>
			</div>
		</nav>
	);
}
