'use client';

import { VscLoading } from 'react-icons/vsc';

type LoadingProps = {
  small?: boolean;
  text?: string;
};

export default function Loading({ small, text }: LoadingProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <VscLoading size={small ? 18 : 32} className="fill-rose-500 animate-spin" />
      {text && <p className="text-neutral-500">{text}</p>}
    </div>
  );
}
