import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const toast = useToast();

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) { toast('Masukkan email yang valid'); return; }
    toast('Terima kasih sudah berlangganan!');
    setEmail('');
  };

  return (
    <footer className="mt-16">
      <section className="relative bg-gradient-to-r from-maroon-dark to-maroon text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row md:items-center gap-6 justify-between">
          <div>
            <h3 className="font-serif text-xl">Dapatkan Update Koleksi Terbaru</h3>
            <p className="text-xs text-white/70 mt-1">Jadilah yang pertama tahu koleksi baru, promo, dan penawaran spesial dari UjngShop.</p>
          </div>
          <form onSubmit={subscribe} className="flex w-full md:w-[420px]">
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Masukkan alamat email kamu..."
              className="flex-1 px-4 py-2.5 text-sm rounded-l-full text-maroon-dark outline-none" />
            <button className="bg-rose hover:bg-rose/80 px-5 text-sm font-medium rounded-r-full transition-colors">Berlangganan</button>
          </form>
        </div>
      </section>
      <div className="bg-maroon-dark text-white/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-serif text-2xl text-white">UjngShop</h3>
            <p className="text-xs mt-2 text-white/60">Indonesian Modest Fashion</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Menu</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/" className="hover:text-white">Beranda</Link></li>
              <li><Link to="/shop" className="hover:text-white">Kategori</Link></li>
              <li><Link to="/shop?sort=new" className="hover:text-white">Koleksi</Link></li>
              <li><Link to="/shop?promo=1" className="hover:text-white">Promo</Link></li>
              <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-white">Kontak</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Layanan</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/about" className="hover:text-white">Pengiriman</Link></li>
              <li><Link to="/about" className="hover:text-white">Pembayaran</Link></li>
              <li><Link to="/about" className="hover:text-white">Retur & Refund</Link></li>
              <li><Link to="/about" className="hover:text-white">Panduan Ukuran</Link></li>
              <li><Link to="/about" className="hover:text-white">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Ikuti Kami</h4>
            <div className="flex gap-3">
              {[Instagram, Facebook, Youtube].map((I, i) => <a key={i} href="#" onClick={e => e.preventDefault()} className="hover:text-white"><I size={18} /></a>)}
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 py-4 px-4 text-[11px] text-white/50 flex flex-col sm:flex-row gap-1 justify-between max-w-7xl mx-auto sm:px-6 lg:px-8 mb-14 md:mb-0">
          <span>© 2025 UjngShop. Semua hak dilindungi.</span>
          <span>Made with ♥ in Indonesia 🇮🇩</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
