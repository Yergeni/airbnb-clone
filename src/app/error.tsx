'use client';

import { useEffect } from 'react';
import NoDataState from './components/NoDataState';

type ErrorProps = {
  error: Error;
};

export default function Error({ error }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <NoDataState title="Oops!" subTitle="Something went wrong!" />;
}
