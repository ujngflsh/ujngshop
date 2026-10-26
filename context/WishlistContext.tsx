import React, { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface WishlistContextType {
  ids: number[];
  toggle: (id: number) => void;
  has: (id: number) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [ids, setIds] = useLocalStorage<number[]>('ujng-wishlist', []);
  const toggle = (id: number) => setIds(p => (p.includes(id) ? p.filter(x => x !== id) : [...p, id]));
  return <WishlistContext.Provider value={{ ids, toggle, has: id => ids.includes(id) }}>{children}</WishlistContext.Provider>;
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within a WishlistProvider');
  return ctx;
};
