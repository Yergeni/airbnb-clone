'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { ROUTES } from '../common/constants';

export default function Logo() {
  const router = useRouter();

  return (
    <Image
      src="/images/logo.png"
      priority // https://nextjs.org/docs/pages/api-reference/components/image#priority
      alt="Logo"
      height="100"
      width="100"
      className="hidden md:block cursor-pointer w-auto h-auto"
      onClick={() => router.push(ROUTES.HOME)}
    />
  );
}
