/**
 * NOTE: Reservations made by other users to my listings
 */

/* Server actions */
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";

/* Client Components */
import NoDataState from "../components/NoDataState";
import ReservationClient from "./ReservationClient";

export default async function ReservationPage() {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return (
			<NoDataState
				title="Unauthorized"
				subTitle="Please, login to see your reservations."
			/>
		);
	}

	const reservations = await getReservations({ authorId: currentUser.id });

	if (!reservations || reservations?.length === 0) {
		return (
			<NoDataState
				title="No reservations found."
				subTitle="It looks like you don't have any reservations on your properties."
			/>
		);
	}

	return (
		<ReservationClient reservations={reservations} currentUser={currentUser} />
	);
}
