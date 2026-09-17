'use client';

import { useState, useMemo } from 'react';
import { notFound } from 'next/navigation';
import { use } from 'react';
import { getRestaurantBySlug } from '@/data';
import { CartProvider, useCart } from '@/context/CartContext';
import BackButton from '@/components/shared/BackButton';
import ZenCroFooter from '@/components/shared/ZenCroFooter';
import CategoryNav from '@/components/restaurant/CategoryNav';
import SearchBar from '@/components/restaurant/SearchBar';
import FoodItemCard from '@/components/restaurant/FoodItemCard';
import CartFloatingBar from '@/components/cart/CartFloatingBar';
import CartDrawer from '@/components/cart/CartDrawer';
import CartConflictModal from '@/components/cart/CartConflictModal';
import CheckoutModal from '@/components/checkout/CheckoutModal';
import { Restaurant } from '@/types';

function RestaurantMenuContent({ restaurant }: { restaurant: Restaurant }) {
  // Default to the first category so customer immediately sees organized items
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    restaurant.categories.length > 0 ? restaurant.categories[0].id : null
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const { totalItems } = useCart();

  // Filter items by category and search
  const filteredItems = useMemo(() => {
    let items = restaurant.menuItems;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      return items.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          (item.description && item.description.toLowerCase().includes(query))
      );
    }

    if (selectedCategory) {
      return items.filter((item) => item.categoryId === selectedCategory);
    }

    return items;
  }, [restaurant.menuItems, selectedCategory, searchQuery]);

  // Active category display title
  const activeCategoryTitle = useMemo(() => {
    if (searchQuery.trim()) {
      return `Results for "${searchQuery}"`;
    }
    if (selectedCategory) {
      return (
        restaurant.categories.find((c) => c.id === selectedCategory)?.name ||
        'Menu'
      );
    }
    return 'All Menu Items';
  }, [searchQuery, selectedCategory, restaurant.categories]);

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen pb-28">
      {/* Sticky Header with Restaurant Identity */}
      <header
        className="sticky top-0 z-30 px-4 py-3 shadow-md backdrop-blur-md"
        style={{
          backgroundColor: restaurant.theme.headerBg,
          color: restaurant.theme.headerText,
        }}
      >
        <div className="max-w-lg mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <span
              className="text-2xl sm:text-3xl p-1.5 rounded-xl bg-white/10 flex-shrink-0"
              role="img"
              aria-label={restaurant.name}
            >
              {restaurant.emoji}
            </span>
            <div className="min-w-0">
              <h1 className="font-extrabold text-base sm:text-lg leading-tight truncate">
                {restaurant.name}
              </h1>
              <p className="text-xs opacity-75 truncate">{restaurant.tagline}</p>
            </div>
          </div>

          {/* Cart Quick Button in Header */}
          {totalItems > 0 && (
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative bg-white/20 hover:bg-white/30 active:scale-95 px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 flex-shrink-0"
              style={{ color: restaurant.theme.headerText }}
              aria-label={`Open cart with ${totalItems} items`}
            >
              <span className="text-lg">🛒</span>
              <span className="font-bold text-xs bg-amber-500 text-stone-950 px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            </button>
          )}
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 pt-3">
        {/* Navigation back */}
        <BackButton />

        {/* Search Food */}
        <div className="mt-2">
          <SearchBar
            value={searchQuery}
            onChange={(val) => {
              setSearchQuery(val);
            }}
          />
        </div>

        {/* Category Navigation Pills */}
        {!searchQuery.trim() && (
          <div className="mt-3">
            <CategoryNav
              categories={restaurant.categories}
              selectedCategoryId={selectedCategory}
              onSelect={(id) => {
                setSelectedCategory(id);
                setSearchQuery('');
              }}
              accentColor={restaurant.theme.primary}
            />
          </div>
        )}

        {/* Section Heading */}
        <div className="mt-4 flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-black text-stone-900 tracking-tight">
            {activeCategoryTitle}
          </h2>
          <span className="text-xs font-semibold text-stone-600">
            {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        {/* Menu Grid */}
        <div className="mt-3">
          {filteredItems.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-stone-200/80 p-6 shadow-xs">
              <span className="text-4xl block mb-2">🔍</span>
              <p className="text-stone-800 font-bold text-base">No items available right now.</p>
              <p className="text-stone-500 text-xs mt-1">
                {searchQuery ? 'Try searching for something else' : 'Check back later'}
              </p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-4 px-4 py-2 bg-stone-900 text-white rounded-xl text-xs font-bold"
                >
                  Clear Search
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {filteredItems.map((item) => (
                <FoodItemCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        <ZenCroFooter />
      </main>

      {/* Floating Sticky Cart Bar */}
      <CartFloatingBar onOpen={() => setIsCartOpen(true)} />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCheckout}
        restaurantName={restaurant.name}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        restaurantName={restaurant.name}
        whatsappNumber={restaurant.whatsappNumber}
      />

      {/* Cross-Restaurant Conflict Dialog */}
      <CartConflictModal currentRestaurantName={restaurant.name} />
    </div>
  );
}

export default function RestaurantPage({
  params,
}: {
  params: Promise<{ restaurantId: string }>;
}) {
  const { restaurantId } = use(params);
  const restaurant = getRestaurantBySlug(restaurantId);

  if (!restaurant) {
    notFound();
  }

  // Shalimar Cloud Restaurant / Placeholder Architecture
  if (restaurant.isComingSoon) {
    return (
      <div className="min-h-screen flex flex-col justify-between bg-[#FAF7F2]">
        {/* Header */}
        <header
          className="sticky top-0 z-30 px-4 py-4 shadow-md"
          style={{
            backgroundColor: restaurant.theme.headerBg,
            color: restaurant.theme.headerText,
          }}
        >
          <div className="max-w-lg mx-auto flex items-center gap-3">
            <span className="text-3xl" role="img" aria-label={restaurant.name}>
              {restaurant.emoji}
            </span>
            <div>
              <h1 className="font-extrabold text-lg leading-tight">
                {restaurant.name}
              </h1>
              <p className="text-xs opacity-80">{restaurant.tagline}</p>
            </div>
          </div>
        </header>

        <main className="max-w-lg w-full mx-auto px-4 py-8 flex-1 flex flex-col justify-center">
          <BackButton />

          <div className="mt-6 bg-white rounded-3xl border border-stone-200 p-8 shadow-sm text-center">
            <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-800 mx-auto flex items-center justify-center text-4xl mb-4 shadow-inner">
              {restaurant.emoji}
            </div>
            <span className="bg-emerald-100 text-emerald-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Cloud Kitchen
            </span>
            <h2 className="text-2xl font-black text-stone-900 mt-3">
              {restaurant.name}
            </h2>
            <p className="text-base font-semibold text-emerald-700 mt-1">
              Menu coming soon
            </p>
            <p className="text-stone-500 text-sm mt-3 leading-relaxed max-w-sm mx-auto">
              We are curating an exquisite cloud dining menu for food lovers in Chiplun.
              Direct WhatsApp digital ordering will be activated here as soon as our kitchen goes live!
            </p>

            <div className="mt-8 pt-6 border-t border-stone-100 flex flex-col gap-3">
              <a
                href="/order"
                className="w-full py-3.5 px-4 bg-stone-900 text-white font-bold rounded-2xl text-sm hover:bg-stone-800 transition-all"
              >
                ← Explore Other Restaurants
              </a>
            </div>
          </div>
        </main>

        <div className="max-w-lg mx-auto w-full px-4">
          <ZenCroFooter />
        </div>
      </div>
    );
  }

  return (
    <CartProvider
      restaurantId={restaurant.id}
      restaurantName={restaurant.name}
    >
      <RestaurantMenuContent restaurant={restaurant} />
    </CartProvider>
  );
}
