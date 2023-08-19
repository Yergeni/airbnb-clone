import "./globals.css";
import { Nunito } from "next/font/google";
import { Toaster } from "react-hot-toast";

/* Components */
import Navbar from "./components/navbar/Navbar";
import RentModal from "./components/modals/RentModal";
import LoginModal from "./components/modals/LoginModal";
import SearchModal from "./components/modals/SearchModal";
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
				<RentModal />
				<SearchModal />
				<Navbar currentUser={currentUser} />
				{/* Listings section */}
				<section className="pb-20 pt-28">{children}</section>
			</body>
		</html>
	);
}
