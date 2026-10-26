import React, { createContext, useContext, ReactNode } from 'react';
import { Product, CartItem } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { finalPrice } from '../utils/format';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, opts?: { size?: string; color?: string; quantity?: number }) => void;
  removeFromCart: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('ujng-cart', []);

  const addToCart: CartContextType['addToCart'] = (product, opts = {}) => {
    const size = opts.size ?? product.sizes[1] ?? product.sizes[0];
    const color = opts.color ?? product.colors[0].name;
    const qty = opts.quantity ?? 1;
    const key = `${product.id}-${size}-${color}`;
    setCartItems(prev => {
      const existing = prev.find(i => i.key === key);
      if (existing) return prev.map(i => (i.key === key ? { ...i, quantity: i.quantity + qty } : i));
      return [...prev, { ...product, quantity: qty, size, color, key }];
    });
  };

  const removeFromCart = (key: string) => setCartItems(prev => prev.filter(i => i.key !== key));
  const updateQuantity = (key: string, quantity: number) => {
    if (quantity < 1) return;
    setCartItems(prev => prev.map(i => (i.key === key ? { ...i, quantity } : i)));
  };
  const clearCart = () => setCartItems([]);

  const cartCount = cartItems.reduce((a, i) => a + i.quantity, 0);
  const cartTotal = cartItems.reduce((a, i) => a + finalPrice(i.price, i.discount) * i.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
};
