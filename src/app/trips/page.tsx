/* Server actions */
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";

/* Client Components */
import TripsClient from "./TripsClient";
import NoDataState from "../components/NoDataState";

export default async function TripsPage() {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return (
			<NoDataState
				title="Unauthorized"
				subTitle="Please, login to see your trips."
			/>
		);
	}

	const reservations = await getReservations({ userId: currentUser.id });

	if (!reservations || reservations?.length === 0) {
		return (
			<NoDataState
				title="No trips found."
				subTitle="It looks like you haven't reserved any trips."
			/>
		);
	}

	return <TripsClient reservations={reservations} currentUser={currentUser} />;
}
