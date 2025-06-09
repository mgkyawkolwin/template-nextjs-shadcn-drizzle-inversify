'use client';

import Link from 'next/link';

export function MainMenu() {

  return (
    <>
      <Link
        href="/"
        className="text-xl font-medium text-gray-700 hover:text-blue-600"
      >
        Dashboard
      </Link>
      <Link
        href="/products"
        className="text-xl font-medium text-gray-700 hover:text-blue-600"
      >
        New Reservation
      </Link>
      <Link
        href="/services"
        className="text-xl font-medium text-gray-700 hover:text-blue-600"
      >
        Reservations
      </Link>
      <Link
        href="/contact"
        className="text-xl font-medium text-gray-700 hover:text-blue-600"
      >
        Check In
      </Link>
    </>
  );
}
