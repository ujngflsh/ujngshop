import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, LayoutGrid, ShoppingBag, User } from 'lucide-react';
import { useCart } from '../context/CartContext';

const BottomNav: React.FC = () => {
  const { cartCount } = useCart();
  const items = [
    { to: '/', label: 'Beranda', icon: Home },
    { to: '/shop', label: 'Kategori', icon: LayoutGrid },
    { to: '/cart', label: 'Keranjang', icon: ShoppingBag },
    { to: '/contact', label: 'Akun', icon: User },
  ];
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-ivory border-t border-blush grid grid-cols-4">
      {items.map(({ to, label, icon: Icon }) => (
        <NavLink key={to} to={to} end className={({ isActive }) => `relative flex flex-col items-center gap-0.5 py-2 text-[11px] ${isActive ? 'text-maroon font-semibold' : 'text-cokelat'}`}>
          <Icon size={20} />
          {label}
          {to === '/cart' && cartCount > 0 && <span className="absolute top-1 right-[28%] w-2 h-2 bg-maroon rounded-full" />}
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNav;
