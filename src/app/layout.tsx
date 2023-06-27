import "./globals.css";
import { Nunito } from "next/font/google";

import { Toaster } from "react-hot-toast"

import Navbar from "./components/navbar/Navbar";
import RegisterModal from "./components/modals/RegisterModal";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata = {
	title: "Airbnb Clone",
	description: "Airbnb clone app",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={nunito.className}>
        <Toaster />
        <RegisterModal />
				<Navbar />
				{children}
			</body>
		</html>
	);
}
