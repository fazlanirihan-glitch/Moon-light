'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MenuItem, MenuVariant } from '@/types';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/utils/formatters';

interface FoodItemCardProps {
  item: MenuItem;
}

export default function FoodItemCard({ item }: FoodItemCardProps) {
  const { addItem, items, updateQuantity, removeItem } = useCart();
  const [showVariants, setShowVariants] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<MenuVariant | null>(
    item.variants && item.variants.length > 0 ? item.variants[0] : null
  );
  const [modalQuantity, setModalQuantity] = useState(1);
  const [imgError, setImgError] = useState(false);

  const isUnavailable = item.available === false;

  // Find existing cart item (for non-variant items)
  const cartItem = !item.hasVariants
    ? items.find((ci) => ci.menuItem.id === item.id && !ci.selectedVariant)
    : null;
  const cartQuantity = cartItem?.quantity || 0;

  // Get total quantity across all variants of this item currently in cart
  const variantTotalQty = item.hasVariants
    ? items
        .filter((ci) => ci.menuItem.id === item.id)
        .reduce((sum, ci) => sum + ci.quantity, 0)
    : 0;

  const handleAddClick = () => {
    if (isUnavailable) return;
    if (item.hasVariants && item.variants && item.variants.length > 0) {
      // Default to first variant or keep previously selected
      if (!selectedVariant) {
        setSelectedVariant(item.variants[0]);
      }
      setModalQuantity(1);
      setShowVariants(true);
    } else {
      addItem(item);
    }
  };

  const handleConfirmVariantAdd = () => {
    if (!selectedVariant) return;
    for (let i = 0; i < modalQuantity; i++) {
      addItem(item, selectedVariant);
    }
    setShowVariants(false);
  };

  return (
    <>
      <div
        className={`bg-white rounded-2xl shadow-sm border border-stone-200/80 overflow-hidden hover:shadow-md transition-all flex flex-col justify-between ${
          isUnavailable ? 'opacity-65' : ''
        }`}
      >
        <div>
          {/* Food Image Container */}
          <div className="relative aspect-[4/3] w-full bg-stone-100 overflow-hidden">
            {!imgError ? (
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 250px"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-stone-100 text-stone-400 p-2 text-center">
                <span className="text-3xl mb-1">🍽️</span>
                <span className="text-[11px] font-medium text-stone-500 line-clamp-1">{item.name}</span>
              </div>
            )}

            {/* Veg / Non-veg Indicator */}
            <div className="absolute top-2 left-2 z-10">
              <span
                className={`inline-flex items-center justify-center w-5 h-5 rounded-md border-2 bg-white/95 backdrop-blur-xs shadow-xs ${
                  item.isVeg ? 'border-emerald-600' : 'border-rose-600'
                }`}
                title={item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    item.isVeg ? 'bg-emerald-600' : 'bg-rose-600'
                  }`}
                />
              </span>
            </div>

            {/* Unavailable Badge */}
            {isUnavailable && (
              <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-2 text-center">
                <span className="bg-stone-800 text-white text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Currently Unavailable
                </span>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="p-3">
            <h3 className="font-bold text-stone-900 text-sm sm:text-base leading-tight line-clamp-2">
              {item.name}
            </h3>
            {item.description && (
              <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">
                {item.description}
              </p>
            )}
          </div>
        </div>

        {/* Pricing & Add Button */}
        <div className="p-3 pt-0 flex items-center justify-between gap-2 mt-auto">
          <div>
            <span className="text-xs text-stone-500 block leading-none">
              {item.hasVariants ? 'From' : 'Price'}
            </span>
            <span className="text-base sm:text-lg font-bold text-stone-900">
              {item.hasVariants && item.variants && item.variants.length > 0
                ? formatPrice(item.variants[0].price)
                : formatPrice(item.price)}
            </span>
          </div>

          {/* Add / Quantity Control */}
          {isUnavailable ? (
            <button
              disabled
              className="bg-stone-200 text-stone-400 text-xs font-semibold px-3 py-2 rounded-xl cursor-not-allowed"
            >
              Unavailable
            </button>
          ) : cartQuantity > 0 && !item.hasVariants ? (
            <div className="flex items-center gap-1.5 bg-stone-900 rounded-xl px-1.5 py-1 shadow-xs">
              <button
                onClick={() =>
                  cartQuantity === 1
                    ? removeItem(item.id)
                    : updateQuantity(item.id, cartQuantity - 1)
                }
                className="w-7 h-7 flex items-center justify-center text-white hover:bg-stone-800 rounded-lg font-bold text-base transition-colors active:scale-95"
                aria-label={`Decrease ${item.name} quantity`}
              >
                −
              </button>
              <span className="text-white font-bold text-sm min-w-[1.25rem] text-center">
                {cartQuantity}
              </span>
              <button
                onClick={() => updateQuantity(item.id, cartQuantity + 1)}
                className="w-7 h-7 flex items-center justify-center text-white hover:bg-stone-800 rounded-lg font-bold text-base transition-colors active:scale-95"
                aria-label={`Increase ${item.name} quantity`}
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddClick}
              className="relative bg-stone-900 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-stone-800 active:scale-95 transition-all shadow-xs flex items-center gap-1"
              aria-label={`Add ${item.name} to cart`}
            >
              <span>+ Add</span>
              {item.hasVariants && variantTotalQty > 0 && (
                <span className="ml-1 bg-amber-500 text-stone-950 text-xs px-1.5 py-0.5 rounded-full font-bold">
                  {variantTotalQty}
                </span>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Variant Selection Modal / Bottom Sheet */}
      {showVariants && item.variants && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4"
          onClick={() => setShowVariants(false)}
        >
          <div
            className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl animate-slide-up max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sheet Handle */}
            <div className="w-12 h-1.5 bg-stone-300 rounded-full mx-auto mb-4 sm:hidden" />

            <div className="flex items-start justify-between pb-3 border-b border-stone-100">
              <div>
                <h3 className="text-lg font-bold text-stone-900 leading-snug">{item.name}</h3>
                <p className="text-xs text-stone-500 mt-0.5">Select your preferred size/serving</p>
              </div>
              <button
                onClick={() => setShowVariants(false)}
                className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:text-stone-800"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Variant Options */}
            <div className="py-4 space-y-2.5 overflow-y-auto flex-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-400 block mb-1">
                Choose Size
              </span>
              {item.variants.map((variant) => {
                const isSelected = selectedVariant?.id === variant.id;
                const existingInCart = items.find(
                  (ci) => ci.menuItem.id === item.id && ci.selectedVariant?.id === variant.id
                );

                return (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className={`w-full flex items-center justify-between p-3.5 rounded-2xl border-2 transition-all text-left ${
                      isSelected
                        ? 'border-amber-600 bg-amber-50/50 shadow-xs'
                        : 'border-stone-200 bg-white hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          isSelected ? 'border-amber-600 bg-amber-600' : 'border-stone-300'
                        }`}
                      >
                        {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                      </span>
                      <div>
                        <span className="font-bold text-stone-800 text-sm block">
                          {variant.name}
                        </span>
                        {existingInCart && (
                          <span className="text-xs text-amber-700 font-medium">
                            {existingInCart.quantity} already in cart
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="font-bold text-stone-900 text-base">
                      {formatPrice(variant.price)}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Quantity Selector & Confirm Button */}
            <div className="pt-4 border-t border-stone-100 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-stone-700">Quantity</span>
                <div className="flex items-center gap-3 bg-stone-100 rounded-xl px-2 py-1">
                  <button
                    onClick={() => setModalQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 rounded-lg bg-white shadow-xs flex items-center justify-center text-stone-800 font-bold hover:bg-stone-50 active:scale-95"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="font-bold text-base min-w-[1.5rem] text-center text-stone-900">
                    {modalQuantity}
                  </span>
                  <button
                    onClick={() => setModalQuantity((q) => q + 1)}
                    className="w-8 h-8 rounded-lg bg-white shadow-xs flex items-center justify-center text-stone-800 font-bold hover:bg-stone-50 active:scale-95"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleConfirmVariantAdd}
                disabled={!selectedVariant}
                className="w-full py-3.5 px-4 rounded-2xl bg-stone-900 text-white font-bold text-base hover:bg-stone-800 active:scale-98 transition-all shadow-md flex items-center justify-between"
              >
                <span>Add to Cart</span>
                <span>
                  {selectedVariant ? formatPrice(selectedVariant.price * modalQuantity) : ''}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
