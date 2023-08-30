import { ROUTES } from '@/app/components/common/constants';

export { default } from 'next-auth/middleware';

export const config = {
  matcher: [ROUTES.TRIPS, ROUTES.RESERVATIONS, ROUTES.MY_PROPERTIES, ROUTES.FAVORITES],
};
