'use client';

import React from 'react';

type MenuItemProps = {
  label: string;
  onClick: () => void;
};

export default function MenuItem({ label, onClick }: MenuItemProps) {
  return (
    <li
      onClick={onClick}
      className="px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer"
    >
      {label}
    </li>
  );
}
