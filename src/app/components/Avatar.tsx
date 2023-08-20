'use client';

import Image from 'next/image';

type AvatarProps = {
  imgUrl?: string | null;
};

export default function Avatar({ imgUrl }: AvatarProps) {
  return (
    <Image
      src={imgUrl || '/images/placeholder.png'}
      alt="Avatar"
      className="rounded-full"
      height="30"
      width="30"
    />
  );
}
