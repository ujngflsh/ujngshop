import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, Menu, X, Search, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const navLinks = [
  { name: 'Beranda', path: '/' },
  { name: 'Kategori', path: '/shop' },
  { name: 'Koleksi', path: '/shop?sort=new' },
  { name: 'Promo', path: '/shop?promo=1' },
  { name: 'Tentang Kami', path: '/about' },
  { name: 'Blog', path: '/blog' },
  { name: 'Kontak', path: '/contact' },
];

const Badge: React.FC<{ n: number }> = ({ n }) =>
  n > 0 ? <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 bg-maroon text-white text-[10px] font-bold flex items-center justify-center rounded-full">{n}</span> : null;

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const { cartCount } = useCart();
  const { ids } = useWishlist();
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (q.trim()) { navigate(`/shop?q=${encodeURIComponent(q.trim())}`); setOpen(false); }
  };

  return (
    <>
      <div className="bg-blush/70 text-maroon text-[11px] hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-7 flex items-center justify-between">
          <span>🚚 Gratis ongkir minimal pembelian Rp300rb</span>
          <div className="flex gap-4">
            <Link to="/about" className="hover:underline">Tentang Kami</Link>
            <Link to="/blog" className="hover:underline">Blog</Link>
            <Link to="/contact" className="hover:underline">Kontak</Link>
          </div>
        </div>
      </div>
      <header className="sticky top-0 z-50 bg-ivory/95 backdrop-blur border-b border-blush">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-6">
          <button className="lg:hidden text-maroon" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X size={22} /> : <Menu size={22} />}</button>
          <Link to="/" className="font-serif text-2xl font-semibold text-maroon">UjngShop</Link>
          <nav className="hidden lg:flex items-center gap-5 text-[13px]">
            {navLinks.slice(0, 5).map(l => (
              <NavLink key={l.name} to={l.path} end
                className={({ isActive }) => `font-medium transition-colors ${isActive && l.path === '/' ? 'text-maroon' : 'text-cokelat hover:text-maroon'}`}>
                {l.name}
              </NavLink>
            ))}
          </nav>
          <form onSubmit={submit} className="hidden md:block relative ml-auto w-64">
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Cari produk favoritmu..."
              className="w-full pl-4 pr-10 py-2 text-xs rounded-full bg-white border border-blush focus:outline-none focus:border-rose" />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-maroon" aria-label="Cari"><Search size={15} /></button>
          </form>
          <div className="flex items-center gap-3 ml-auto md:ml-0 text-maroon">
            <button className="md:hidden" onClick={() => setOpen(true)} aria-label="Cari"><Search size={20} /></button>
            <Link to="/wishlist" className="relative hidden sm:block" aria-label="Favorit"><Heart size={20} /><Badge n={ids.length} /></Link>
            <Link to="/cart" className="relative" aria-label="Keranjang"><ShoppingBag size={20} /><Badge n={cartCount} /></Link>
            <Link to="/contact" className="hidden sm:block" aria-label="Akun"><User size={20} /></Link>
          </div>
        </div>
        {open && (
          <div className="lg:hidden bg-ivory border-t border-blush px-4 py-5 animate-fade-in">
            <form onSubmit={submit} className="relative mb-4">
              <input value={q} onChange={e => setQ(e.target.value)} placeholder="Cari produk..." className="w-full pl-4 pr-10 py-2.5 text-sm rounded-full bg-white border border-blush focus:outline-none focus:border-rose" />
              <Search size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-maroon" />
            </form>
            <div className="flex flex-col gap-3">
              {navLinks.map(l => <Link key={l.name} to={l.path} onClick={() => setOpen(false)} className="text-cokelat font-medium">{l.name}</Link>)}
              <Link to="/wishlist" onClick={() => setOpen(false)} className="text-cokelat font-medium">Favorit ({ids.length})</Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
