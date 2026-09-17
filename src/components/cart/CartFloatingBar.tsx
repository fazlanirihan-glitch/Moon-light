'use client';

import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/utils/formatters';

interface CartFloatingBarProps {
  onOpen: () => void;
}

export default function CartFloatingBar({ onOpen }: CartFloatingBarProps) {
  const { totalItems, totalAmount } = useCart();

  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-3 pb-safe">
      <button
        onClick={onOpen}
        className="w-full max-w-lg mx-auto flex items-center justify-between bg-stone-800 text-white rounded-2xl px-5 py-4 shadow-xl hover:bg-stone-700 active:scale-[0.98] transition-all"
        aria-label={`View cart with ${totalItems} items, total ${formatPrice(totalAmount)}`}
      >
        <div className="flex items-center gap-3">
          <span className="text-xl" role="img" aria-hidden="true">🛒</span>
          <span className="font-semibold text-base">
            Cart ({totalItems})
          </span>
        </div>
        <span className="font-bold text-lg">
          {formatPrice(totalAmount)}
        </span>
      </button>
    </div>
  );
}
