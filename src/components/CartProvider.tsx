"use client";
import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export interface CartItem {
  planId: string;
  title: string;
  destination: string;
  imageUrl: string;
  price: number;
  duration: number;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  add: (item: Omit<CartItem, "quantity">) => void;
  remove: (planId: string) => void;
  update: (planId: string, quantity: number) => void;
  clear: () => void;
  total: number;
  count: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const add = useCallback((item: Omit<CartItem, "quantity">) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.planId === item.planId);
      if (existing) return prev.map((i) => i.planId === item.planId ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...item, quantity: 1 }];
    });
  }, []);

  const remove = useCallback((planId: string) => {
    setItems((prev) => prev.filter((i) => i.planId !== planId));
  }, []);

  const update = useCallback((planId: string, quantity: number) => {
    if (quantity <= 0) { remove(planId); return; }
    setItems((prev) => prev.map((i) => i.planId === planId ? { ...i, quantity } : i));
  }, [remove]);

  const clear = useCallback(() => setItems([]), []);

  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const count = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, add, remove, update, clear, total, count }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
