import "./globals.css";
import { Nunito } from "next/font/google";

import { Toaster } from "react-hot-toast";

import Navbar from "./components/navbar/Navbar";
import LoginModal from "./components/modals/LoginModal";
import RegisterModal from "./components/modals/RegisterModal";

/* Actions */
import getCurrentUser from "./actions/getCurrentUser";

/* Fonts */
const nunito = Nunito({ subsets: ["latin"] });

export const metadata = {
	title: "Airbnb Clone",
	description: "Airbnb clone app",
};

type RootLayoutProps = {
	children: React.ReactNode;
};

export default async function RootLayout({ children }: RootLayoutProps) {
	const currentUser = await getCurrentUser();

	return (
		<html lang="en">
			<body className={nunito.className}>
				<Toaster />
				<RegisterModal />
				<LoginModal />
				<Navbar currentUser={currentUser} />
				{children}
			</body>
		</html>
	);
}
