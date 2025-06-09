'use client';

import Link from 'next/link';

import {MainMenu} from './mainmenu';

export function Header() {
  return (
    <header className="w-100vw h-10vh border-b border-gray-200 p-4">
      <div className="flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <span className="ml-2 text-base !text-4xl font-bold text-black">Mida</span>
        </Link>
        <div className="flex items-center space-x-5">
          <MainMenu />
        </div>
      </div>
    </header>
  );
}