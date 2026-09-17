import Link from 'next/link';
import { Restaurant } from '@/types';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <Link
      href={`/order/${restaurant.slug}`}
      className="block group focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-3xl"
    >
      <div
        className="relative rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-200 border border-stone-200/60 active:scale-[0.99] p-6"
        style={{
          backgroundColor: restaurant.theme.headerBg,
          color: restaurant.theme.headerText,
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1 min-w-0">
            <span
              className="text-4xl sm:text-5xl p-2 rounded-2xl bg-white/10 flex-shrink-0"
              role="img"
              aria-label={restaurant.name}
            >
              {restaurant.emoji}
            </span>
            <div className="flex-1 min-w-0">
              <span className="text-xs font-semibold tracking-wider uppercase opacity-75">
                {restaurant.id === 'moonlight'
                  ? 'Cafe & Dine'
                  : restaurant.id === 'fakta-biriyani'
                  ? 'Authentic Kitchen'
                  : 'Cloud Kitchen'}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight mt-0.5 leading-snug truncate">
                {restaurant.name}
              </h2>
              <p className="text-sm opacity-85 mt-1 font-medium">
                &ldquo;{restaurant.tagline}&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* View Menu Action Button */}
        <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
          <span className="text-xs sm:text-sm font-medium opacity-75">
            {restaurant.isComingSoon
              ? 'Preview Coming Soon'
              : 'Tap to order on WhatsApp'}
          </span>
          <div
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-semibold text-sm transition-all group-hover:scale-105 shadow-sm"
            style={{
              backgroundColor: restaurant.theme.accent,
              color: '#FFFFFF',
            }}
          >
            <span>View Menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:translate-x-0.5 transition-transform"
              aria-hidden="true"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
