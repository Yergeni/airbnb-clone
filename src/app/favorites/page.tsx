/* Server Actions */
import getFavorites from '../actions/getFavorites';
import getCurrentUser from '@/app/actions/getCurrentUser';

/* Client Components */
import NoDataState from '@/app/components/NoDataState';

import FavoritesClient from './FavoritesClient';

export default async function FavoritesPage() {
  const favorites = await getFavorites();
  const currentUser = await getCurrentUser();

  if (!favorites || favorites.length === 0) {
    const subtitle = currentUser
      ? "You haven't added favorite places."
      : 'You need to login to see your favorite places.';
    return <NoDataState title="No favorites places" subTitle={subtitle} />;
  }

  return <FavoritesClient favorites={favorites} currentUser={currentUser} />;
}
