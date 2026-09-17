'use client';

import Link from 'next/link';

export default function BackButton() {
  return (
    <Link
      href="/order"
      className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-900 transition-colors py-2 text-base font-medium"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m15 18-6-6 6-6" />
      </svg>
      Back to Restaurants
    </Link>
  );
}
