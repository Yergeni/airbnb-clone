'use client';

import { IconType } from 'react-icons';

type CategoryInputProps = {
  icon: IconType;
  label: string;
  onClick: (value: string) => void;
  selected?: boolean;
};

export default function CategoryInput({
  icon: Icon,
  label,
  selected,
  onClick,
}: CategoryInputProps) {
  return (
    <button
      onClick={() => onClick(label)}
      className={`w-full rounded-xl border-2 p-4 flex flex-col items-start gap-3 hover:border-black transition cursor-pointer ${
        selected ? 'border-black' : 'border-neutral-200'
      }`}
    >
      <Icon size={30} />
      <p className="font-semibold">{label}</p>
    </button>
  );
}
