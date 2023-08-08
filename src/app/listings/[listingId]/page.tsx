/* Server Actions */
import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";

/* Client Components */
import ListingClient from "./ListingClient";
import NoDataState from "@/app/components/NoDataState";

interface IParams {
	listingId: string;
}

export default async function ListingPage({ params }: { params: IParams }) {
	const currentUser = await getCurrentUser();
	const listing = await getListingById(params.listingId);

	if (!listing) {
		return <NoDataState subTitle="Check the URL you are trying to access." />;
	}

	return <ListingClient listingWithUser={listing} currentUser={currentUser} />;
}
