'use client';

import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/utils/formatters';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
  restaurantName?: string;
}

export default function CartDrawer({
  isOpen,
  onClose,
  onCheckout,
  restaurantName,
}: CartDrawerProps) {
  const { items, updateQuantity, removeItem, totalAmount, clearCart } = useCart();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl max-h-[85vh] flex flex-col shadow-2xl animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle for mobile */}
        <div className="w-12 h-1.5 bg-stone-300 rounded-full mx-auto mt-3 sm:hidden" />

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-stone-100">
          <div>
            <h2 className="text-xl font-bold text-stone-900 leading-tight">YOUR CART</h2>
            {restaurantName && (
              <p className="text-xs font-semibold text-amber-700 mt-0.5">{restaurantName}</p>
            )}
          </div>
          <div className="flex items-center gap-3">
            {items.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs font-bold text-rose-600 hover:text-rose-700 transition-colors px-2 py-1 bg-rose-50 rounded-lg"
              >
                Clear All
              </button>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:text-stone-800"
              aria-label="Close cart"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="text-center py-12 px-4">
              <span className="text-5xl block mb-3" role="img" aria-label="Empty cart">
                🛒
              </span>
              <p className="text-stone-800 font-bold text-lg">Your cart is empty</p>
              <p className="text-stone-500 text-sm mt-1 mb-6">
                Add something delicious to get started.
              </p>
              <button
                onClick={onClose}
                className="bg-stone-900 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-stone-800 transition-all shadow-md"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((cartItem, index) => (
                <div
                  key={`${cartItem.menuItem.id}-${cartItem.selectedVariant?.id || 'base'}-${index}`}
                  className="flex items-center justify-between gap-3 bg-stone-50 rounded-2xl p-3.5 border border-stone-100"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-stone-900 text-sm truncate">
                      {cartItem.menuItem.name}
                    </p>
                    {cartItem.selectedVariant && (
                      <span className="inline-block text-xs font-semibold text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded-md mt-0.5">
                        {cartItem.selectedVariant.name}
                      </span>
                    )}
                    <p className="text-sm font-bold text-stone-700 mt-1">
                      {formatPrice(cartItem.unitPrice * cartItem.quantity)}
                    </p>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-2 bg-white rounded-xl border border-stone-200 p-1 shadow-xs">
                    <button
                      onClick={() => {
                        if (cartItem.quantity === 1) {
                          removeItem(cartItem.menuItem.id, cartItem.selectedVariant?.id);
                        } else {
                          updateQuantity(
                            cartItem.menuItem.id,
                            cartItem.quantity - 1,
                            cartItem.selectedVariant?.id
                          );
                        }
                      }}
                      className="w-7 h-7 flex items-center justify-center text-stone-700 hover:bg-stone-100 rounded-lg font-bold text-base transition-colors"
                      aria-label={`Decrease ${cartItem.menuItem.name} quantity`}
                    >
                      −
                    </button>
                    <span className="text-sm font-bold text-stone-900 min-w-[1.25rem] text-center">
                      {cartItem.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(
                          cartItem.menuItem.id,
                          cartItem.quantity + 1,
                          cartItem.selectedVariant?.id
                        )
                      }
                      className="w-7 h-7 flex items-center justify-center text-stone-700 hover:bg-stone-100 rounded-lg font-bold text-base transition-colors"
                      aria-label={`Increase ${cartItem.menuItem.name} quantity`}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-stone-100 p-5 bg-stone-50/50 rounded-b-3xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-stone-600 font-semibold text-sm">Subtotal</span>
              <span className="text-xl font-black text-stone-950">{formatPrice(totalAmount)}</span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full bg-stone-950 text-white py-4 rounded-2xl font-bold text-base hover:bg-stone-800 active:scale-98 transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <span>Continue to Checkout</span>
              <span>→</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
