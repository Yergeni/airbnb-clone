import getCurrentUser from '../actions/getCurrentUser';
import getMyProperties from '../actions/getMyProperties';

import NoDataState from '../components/NoDataState';
import MyPropertiesClient from './MyPropertiesClient';

export default async function MyPropertiesPage() {
  const currentUser = await getCurrentUser();
  const myProperties = await getMyProperties();

  if (!myProperties || myProperties.length === 0) {
    const title = currentUser ? 'No properties found' : 'Unauthorized';
    const subtitle = currentUser
      ? "You haven't added any properties."
      : 'You need to login to see your properties.';
    return <NoDataState title={title} subTitle={subtitle} />;
  }

  return <MyPropertiesClient myProperties={myProperties} currentUser={currentUser} />;
}
