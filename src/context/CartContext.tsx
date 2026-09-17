'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { CartItem, MenuItem, MenuVariant } from '@/types';

interface CartConflict {
  existingRestaurantId: string;
  existingRestaurantName: string;
  itemCount: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: MenuItem, variant?: MenuVariant) => void;
  removeItem: (itemId: string, variantId?: string) => void;
  updateQuantity: (itemId: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalAmount: number;
  conflict: CartConflict | null;
  resolveConflictStartNew: () => void;
  resolveConflictKeepExisting: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const ACTIVE_RESTAURANT_ID_KEY = 'chiplun_cart_restaurant_id';
const ACTIVE_RESTAURANT_NAME_KEY = 'chiplun_cart_restaurant_name';
const CART_ITEMS_KEY = 'chiplun_cart_items';

export function CartProvider({
  children,
  restaurantId,
  restaurantName,
}: {
  children: ReactNode;
  restaurantId: string;
  restaurantName: string;
}) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [conflict, setConflict] = useState<CartConflict | null>(null);

  // Initialize cart state and detect restaurant conflicts
  useEffect(() => {
    try {
      const storedRestaurantId = localStorage.getItem(ACTIVE_RESTAURANT_ID_KEY);
      const storedRestaurantName = localStorage.getItem(ACTIVE_RESTAURANT_NAME_KEY) || 'another restaurant';
      const storedItemsRaw = localStorage.getItem(CART_ITEMS_KEY);
      const parsedItems: CartItem[] = storedItemsRaw ? JSON.parse(storedItemsRaw) : [];

      if (storedRestaurantId && storedRestaurantId !== restaurantId && parsedItems.length > 0) {
        // Conflict detected: User has active items from a different restaurant
        setConflict({
          existingRestaurantId: storedRestaurantId,
          existingRestaurantName: storedRestaurantName,
          itemCount: parsedItems.reduce((acc, it) => acc + it.quantity, 0),
        });
        setItems([]);
      } else {
        // No conflict: Load or initialize cart for this restaurant
        setConflict(null);
        if (storedRestaurantId === restaurantId && parsedItems.length > 0) {
          setItems(parsedItems);
        } else {
          setItems([]);
        }
      }
    } catch {
      setItems([]);
    }
    setIsLoaded(true);
  }, [restaurantId, restaurantName]);

  // Persist items to localStorage whenever they change
  useEffect(() => {
    if (!isLoaded || conflict) return;

    try {
      if (items.length > 0) {
        localStorage.setItem(ACTIVE_RESTAURANT_ID_KEY, restaurantId);
        localStorage.setItem(ACTIVE_RESTAURANT_NAME_KEY, restaurantName);
        localStorage.setItem(CART_ITEMS_KEY, JSON.stringify(items));
      } else {
        // If items became 0, we can clear active restaurant
        localStorage.removeItem(ACTIVE_RESTAURANT_ID_KEY);
        localStorage.removeItem(ACTIVE_RESTAURANT_NAME_KEY);
        localStorage.removeItem(CART_ITEMS_KEY);
      }
    } catch {
      // Ignore quota errors
    }
  }, [items, restaurantId, restaurantName, isLoaded, conflict]);

  const resolveConflictStartNew = useCallback(() => {
    try {
      localStorage.setItem(ACTIVE_RESTAURANT_ID_KEY, restaurantId);
      localStorage.setItem(ACTIVE_RESTAURANT_NAME_KEY, restaurantName);
      localStorage.setItem(CART_ITEMS_KEY, JSON.stringify([]));
    } catch {
      // Ignore
    }
    setItems([]);
    setConflict(null);
  }, [restaurantId, restaurantName]);

  const resolveConflictKeepExisting = useCallback(() => {
    // Navigate back to the restaurant with the existing cart
    if (conflict) {
      window.location.href = `/order/${conflict.existingRestaurantId}`;
    } else {
      window.location.href = '/order';
    }
  }, [conflict]);

  const addItem = useCallback(
    (menuItem: MenuItem, variant?: MenuVariant) => {
      setItems((prev) => {
        const existingIndex = prev.findIndex(
          (ci) =>
            ci.menuItem.id === menuItem.id &&
            (variant ? ci.selectedVariant?.id === variant.id : !ci.selectedVariant)
        );

        if (existingIndex >= 0) {
          const updated = [...prev];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + 1,
          };
          return updated;
        }

        return [
          ...prev,
          {
            menuItem,
            selectedVariant: variant,
            quantity: 1,
            unitPrice: variant ? variant.price : menuItem.price,
          },
        ];
      });
    },
    []
  );

  const removeItem = useCallback((itemId: string, variantId?: string) => {
    setItems((prev) =>
      prev.filter(
        (ci) =>
          !(
            ci.menuItem.id === itemId &&
            (variantId ? ci.selectedVariant?.id === variantId : !ci.selectedVariant)
          )
      )
    );
  }, []);

  const updateQuantity = useCallback(
    (itemId: string, quantity: number, variantId?: string) => {
      if (quantity <= 0) {
        removeItem(itemId, variantId);
        return;
      }
      setItems((prev) =>
        prev.map((ci) => {
          if (
            ci.menuItem.id === itemId &&
            (variantId ? ci.selectedVariant?.id === variantId : !ci.selectedVariant)
          ) {
            return { ...ci, quantity };
          }
          return ci;
        })
      );
    },
    [removeItem]
  );

  const clearCart = useCallback(() => {
    setItems([]);
    try {
      localStorage.removeItem(ACTIVE_RESTAURANT_ID_KEY);
      localStorage.removeItem(ACTIVE_RESTAURANT_NAME_KEY);
      localStorage.removeItem(CART_ITEMS_KEY);
    } catch {
      // Ignore
    }
  }, []);

  const totalItems = items.reduce((sum, ci) => sum + ci.quantity, 0);
  const totalAmount = items.reduce((sum, ci) => sum + ci.unitPrice * ci.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalAmount,
        conflict,
        resolveConflictStartNew,
        resolveConflictKeepExisting,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
