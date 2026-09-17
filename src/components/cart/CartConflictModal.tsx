'use client';

import { useCart } from '@/context/CartContext';

interface CartConflictModalProps {
  currentRestaurantName: string;
}

export default function CartConflictModal({ currentRestaurantName }: CartConflictModalProps) {
  const { conflict, resolveConflictStartNew, resolveConflictKeepExisting } = useCart();

  if (!conflict) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200">
        <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center text-2xl mb-4">
          ⚠️
        </div>

        <h3 className="text-xl font-bold text-stone-900 leading-snug">
          Start a new cart?
        </h3>

        <p className="text-stone-600 text-sm mt-2 leading-relaxed">
          Your current cart contains{' '}
          <strong className="text-stone-800 font-semibold">
            {conflict.itemCount} {conflict.itemCount === 1 ? 'item' : 'items'}
          </strong>{' '}
          from{' '}
          <strong className="text-stone-800 font-semibold">
            {conflict.existingRestaurantName}
          </strong>
          .
        </p>

        <p className="text-stone-500 text-xs mt-2">
          A single order can only contain items from one restaurant. Would you like to discard the previous items and start a new cart for{' '}
          <span className="font-semibold text-stone-700">{currentRestaurantName}</span>?
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={resolveConflictKeepExisting}
            className="flex-1 px-4 py-3 rounded-xl border border-stone-300 font-semibold text-sm text-stone-700 hover:bg-stone-50 active:scale-98 transition-all"
          >
            Cancel & Keep Cart
          </button>
          <button
            onClick={resolveConflictStartNew}
            className="flex-1 px-4 py-3 rounded-xl bg-red-600 font-semibold text-sm text-white hover:bg-red-700 active:scale-98 transition-all shadow-sm"
          >
            Start New Cart
          </button>
        </div>
      </div>
    </div>
  );
}
