'use client';

import Link from 'next/link';

import {MainMenu} from './mainmenu';

export function Header() {
  return (
    <header className="flex flex-row flex-1 max-h-[50px] justify-between border-bottom border-red-800 bg-gray-600 p-2">
      <div className="w-[50px]">
        <Link href="/">
          <span className="ml-2 text-base !text-4xl font-bold text-white">Mida</span>
        </Link>
      </div>
      <div className="">
          <MainMenu />
      </div>
    </header>
  );
}