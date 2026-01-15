import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-darkest text-white pt-16 pb-8 border-t border-brand-deep">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <h3 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                <div className="w-6 h-6 bg-brand-light rounded flex items-center justify-center text-brand-darkest text-xs font-bold">U</div>
                UjngShop
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Experience the best in modern e-commerce. Curated products for a minimalist lifestyle.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="text-slate-400 hover:text-brand-light transition-colors">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-brand-light">New Arrivals</a></li>
              <li><a href="#" className="hover:text-brand-light">Best Sellers</a></li>
              <li><a href="#" className="hover:text-brand-light">Electronics</a></li>
              <li><a href="#" className="hover:text-brand-light">Accessories</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-brand-light">Help Center</a></li>
              <li><a href="#" className="hover:text-brand-light">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-brand-light">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-brand-light">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Stay Connected</h4>
            <div className="flex flex-col gap-3">
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="bg-brand-deep/50 border border-brand-deep px-4 py-2 rounded-l-lg text-sm w-full outline-none focus:ring-1 focus:ring-brand-light text-white placeholder:text-slate-500"
                />
                <button className="bg-brand-main text-white px-4 py-2 rounded-r-lg hover:bg-brand-light hover:text-brand-darkest transition-colors">
                   <Mail size={16} />
                </button>
              </div>
              <p className="text-xs text-slate-500">Subscribe to get special offers and updates.</p>
            </div>
          </div>
        </div>

        <div className="border-t border-brand-deep pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">© 2023 UjngShop. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-slate-500">
             <span className="hover:text-brand-light cursor-pointer">Privacy</span>
             <span className="hover:text-brand-light cursor-pointer">Terms</span>
             <span className="hover:text-brand-light cursor-pointer">Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;