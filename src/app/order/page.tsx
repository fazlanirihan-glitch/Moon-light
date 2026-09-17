import { restaurants } from '@/data';
import RestaurantCard from '@/components/restaurant/RestaurantCard';
import ZenCroFooter from '@/components/shared/ZenCroFooter';

export const metadata = {
  title: 'Choose Restaurant | Chiplun Digital Ordering',
  description: 'Order food online from Moonlight Cafe, Fakta Biriyani, and Shalimar Cloud Restaurant in Chiplun via WhatsApp.',
};

export default function OrderPage() {
  return (
    <main className="min-h-screen px-4 py-8 max-w-lg mx-auto flex flex-col justify-between">
      <div>
        {/* Welcome Header */}
        <div className="text-center mb-8">
          <span className="inline-block px-3 py-1 bg-amber-100/80 text-amber-900 rounded-full text-xs font-bold tracking-wider uppercase mb-3">
            📍 Chiplun, Maharashtra
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
            Welcome 👋
          </h1>
          <p className="text-stone-600 text-base font-medium mt-1.5">
            Choose a restaurant to order from
          </p>
        </div>

        {/* 3 Large Touch-Friendly Restaurant Cards */}
        <div className="space-y-4">
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>

        {/* How it works info strip */}
        <div className="mt-8 p-4 bg-white/70 backdrop-blur-xs rounded-2xl border border-stone-200/80 text-center">
          <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
            Simple 3-Step Ordering
          </p>
          <div className="flex items-center justify-around text-xs font-bold text-stone-800">
            <span>1. Choose Food</span>
            <span>→</span>
            <span>2. Enter Details</span>
            <span>→</span>
            <span>3. Order on WhatsApp</span>
          </div>
        </div>
      </div>

      <ZenCroFooter />
    </main>
  );
}
