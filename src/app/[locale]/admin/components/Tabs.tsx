'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const Tabs = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-gray-100 flex justify-around p-4">
      <Link href="/admin/users">
        <button
          className={`py-2 px-4 rounded ${
            pathname.includes('/admin/users')
              ? 'bg-blue-500 text-white-100'
              : 'bg-gray-200'
          }`}
        >
          Users
        </button>
      </Link>
      <Link href="/admin/tours">
        <button
          className={`py-2 px-4 rounded ${
            pathname.includes('/admin/tours')
              ? 'bg-blue-500 text-white-100'
              : 'bg-gray-200'
          }`}
        >
          Tours
        </button>
      </Link>
      <Link href="/admin/bookings">
        <button
          className={`py-2 px-4 rounded ${
            pathname.includes('/admin/bookings')
              ? 'bg-blue-500 text-white-100'
              : 'bg-gray-200'
          }`}
        >
          Bookings
        </button>
      </Link>
    </nav>
  );
};

export default Tabs;
