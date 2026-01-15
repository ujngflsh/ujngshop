import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Menu, X, Search, User, LogIn, UserPlus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Button from './ui/Button';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const { cartCount } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery)}`);
      setIsOpen(false); // Close mobile menu if open
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-brand-light/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold tracking-tighter text-brand-darkest flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-darkest rounded-lg flex items-center justify-center text-brand-lightest text-lg">U</div>
            UjngShop
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.path) ? 'text-brand-main font-bold' : 'text-slate-500 hover:text-brand-main'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
             <form onSubmit={handleSearch} className="relative group">
                <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..." 
                    className="pl-9 pr-4 py-2 bg-brand-lightest/30 border border-transparent rounded-full text-sm text-brand-darkest focus:bg-white focus:border-brand-light focus:outline-none focus:ring-2 focus:ring-brand-light/20 transition-all w-40 focus:w-64 placeholder:text-slate-400"
                />
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
             </form>

            <Link to="/cart" className="relative p-2 text-slate-600 hover:text-brand-main transition-colors">
              <ShoppingBag size={22} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-brand-main text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            
            <div className="relative">
              <button 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="p-2 text-slate-600 hover:text-brand-main transition-colors focus:outline-none"
              >
                  <User size={22} />
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-2 animate-fade-in">
                  <div className="px-4 py-2 border-b border-slate-100 mb-2">
                    <p className="text-xs text-slate-500 font-medium uppercase">Account</p>
                  </div>
                  <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-brand-lightest hover:text-brand-darkest flex items-center gap-2">
                    <LogIn size={16} /> Log In
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-brand-lightest hover:text-brand-darkest flex items-center gap-2">
                    <UserPlus size={16} /> Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
             <Link to="/cart" className="relative text-slate-600">
              <ShoppingBag size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-main text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            <button onClick={() => setIsOpen(!isOpen)} className="text-brand-darkest">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 absolute w-full px-4 py-6 shadow-xl animate-fade-in">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-lg font-medium ${
                  isActive(link.path) ? 'text-brand-main' : 'text-slate-500'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
             <div className="pt-4 border-t border-slate-100">
                <form onSubmit={handleSearch} className="relative mb-4">
                    <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search products..." 
                        className="w-full pl-10 pr-4 py-3 bg-brand-lightest/30 rounded-xl text-sm outline-none border border-transparent focus:border-brand-light"
                    />
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                </form>
                <div className="grid grid-cols-2 gap-3">
                   <Button variant="outline" fullWidth className="justify-center">Log In</Button>
                   <Button variant="primary" fullWidth className="justify-center">Sign Up</Button>
                </div>
             </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;