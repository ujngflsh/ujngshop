import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Truck, BadgeCheck, CreditCard, Headphones } from 'lucide-react';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';
import Button from '../components/ui/Button';
import SectionHeader from '../components/ui/SectionHeader';

const slides = [
  { eyebrow: 'KOLEKSI TERBARU', title: 'Tampil Anggun\nSetiap Hari', text: 'Pilihan busana muslim modern, nyaman dipakai, dengan sentuhan budaya Indonesia.', to: '/shop?sort=new' },
  { eyebrow: 'BATIK MODERN', title: 'Pesona Budaya\ndalam Gaya Kini', text: 'Batik dengan potongan kontemporer untuk tampilan formal maupun santai.', to: '/shop?cat=Batik%20Modern' },
  { eyebrow: 'DISKON SPESIAL', title: 'Hingga 50% OFF\nKoleksi Pilihan', text: 'Dapatkan harga terbaik untuk busana favoritmu. Stok terbatas!', to: '/shop?promo=1' },
];

const testimonials = [
  { name: 'Siti Nurhaliza', city: 'Jakarta', img: '/images/av1.jpg', text: 'Modelnya cantik dan bahannya adem. Pengirimannya juga cepat. Suka banget!' },
  { name: 'Rani Anggraini', city: 'Bandung', img: '/images/av2.jpg', text: 'Koleksi batiknya keren, modern dan tetap sopan. Recommended!' },
  { name: 'Dewi Lestari', city: 'Surabaya', img: '/images/av3.jpg', text: 'Harga sesuai kualitas. Pasti akan belanja lagi di UjngShop.' },
];

const features = [
  { icon: Truck, title: 'Pengiriman Cepat', sub: 'Seluruh Indonesia' },
  { icon: BadgeCheck, title: 'Produk Original', sub: 'Jaminan kualitas' },
  { icon: CreditCard, title: 'Pembayaran Aman', sub: 'Beragam metode' },
  { icon: Headphones, title: 'Customer Service', sub: 'Siap membantu' },
];

const Home: React.FC = () => {
  const [idx, setIdx] = useState(0);
  const [tIdx, setTIdx] = useState(0);
  const bestSellers = [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 5);

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, []);

  const s = slides[idx];
  const go = (d: number) => setIdx(i => (i + d + slides.length) % slides.length);

  return (
    <div className="space-y-14 md:space-y-20">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blush/60 via-ivory to-ivory">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center">
          <div className="px-4 sm:px-6 lg:px-8 py-10 md:py-20 order-2 md:order-1 animate-fade-in" key={idx}>
            <p className="text-[11px] tracking-[0.2em] text-cokelat mb-3">{s.eyebrow}</p>
            <h1 className="font-serif text-4xl lg:text-5xl text-maroon-dark leading-tight whitespace-pre-line mb-4">{s.title}</h1>
            <p className="text-sm text-cokelat/80 max-w-sm mb-6">{s.text}</p>
            <Link to={s.to}><Button size="lg">Belanja Sekarang <ArrowRight size={16} /></Button></Link>
            <div className="flex items-center gap-4 mt-8 text-xs text-cokelat">
              <span>{idx + 1} / {slides.length}</span>
              <button onClick={() => go(-1)} aria-label="Sebelumnya" className="hover:text-maroon"><ChevronLeft size={18} /></button>
              <button onClick={() => go(1)} aria-label="Berikutnya" className="hover:text-maroon"><ChevronRight size={18} /></button>
            </div>
          </div>
          <div className="order-1 md:order-2 h-72 md:h-[460px] relative">
            <img src="/images/hero.jpg" alt="Koleksi UjngShop" className="w-full h-full object-cover object-top" />
            <div className="absolute inset-0 bg-gradient-to-r from-ivory/70 via-transparent to-transparent md:from-ivory/40" />
          </div>
        </div>
      </section>

      {/* Kategori */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader align="center" title="Belanja Berdasarkan Kategori" subtitle="Temukan gaya terbaik untuk setiap momenmu" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map(c => (
            <Link key={c.name} to={`/shop?cat=${encodeURIComponent(c.name)}`} className="group bg-white rounded-2xl overflow-hidden border border-blush hover:shadow-lg transition-shadow">
              <div className="aspect-[4/3] overflow-hidden"><img src={c.image} alt={c.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /></div>
              <div className="p-3 text-center">
                <p className="text-sm font-medium text-maroon-dark">{c.name}</p>
                <p className="text-[11px] text-rose mt-0.5">Lihat Koleksi →</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Banner Batik */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl overflow-hidden bg-gradient-to-r from-rose to-maroon grid grid-cols-5 text-white">
          <img src="/images/banner-batik.jpg" alt="Koleksi Batik Modern" className="col-span-2 w-full h-full object-cover min-h-[180px]" />
          <div className="col-span-3 p-6 md:p-12 flex flex-col justify-center items-start">
            <h3 className="font-serif text-2xl md:text-4xl mb-2">Koleksi Batik Modern</h3>
            <p className="text-sm text-white/85 mb-5">Pesona budaya dalam gaya masa kini</p>
            <Link to="/shop?cat=Batik%20Modern"><Button variant="secondary" size="sm" className="!bg-white">Jelajahi Koleksi <ArrowRight size={14} /></Button></Link>
          </div>
        </div>
      </section>

      {/* Best Seller */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6">
          <SectionHeader className="!mb-0" title="Best Seller" subtitle="Produk pilihan yang paling diminati" />
          <Link to="/shop" className="text-xs text-maroon font-medium hover:underline">Lihat Semua →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
          {bestSellers.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Promo */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl overflow-hidden bg-gradient-to-r from-maroon to-rose grid grid-cols-5 text-white">
          <div className="col-span-3 p-6 md:p-12 flex flex-col justify-center items-start">
            <p className="text-xs text-white/80 mb-1">Diskon Spesial</p>
            <h3 className="font-serif text-3xl md:text-5xl mb-5">Hingga 50% OFF</h3>
            <Link to="/shop?promo=1"><Button variant="secondary" size="sm" className="!bg-white">Belanja Sekarang <ArrowRight size={14} /></Button></Link>
          </div>
          <img src="/images/banner-promo.jpg" alt="Promo" className="col-span-2 w-full h-full object-cover min-h-[180px]" />
        </div>
      </section>

      {/* Fitur */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map(({ icon: I, title, sub }) => (
          <div key={title} className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-blush text-maroon flex items-center justify-center shrink-0"><I size={20} /></div>
            <div><p className="text-sm font-semibold text-maroon-dark">{title}</p><p className="text-[11px] text-cokelat/70">{sub}</p></div>
          </div>
        ))}
      </section>

      {/* Testimoni */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader align="center" title="Apa Kata Mereka?" subtitle="Kepuasan pelanggan adalah prioritas kami" />
        <div className="hidden md:grid grid-cols-3 gap-5">
          {testimonials.map(t => <Testi key={t.name} t={t} />)}
        </div>
        <div className="md:hidden">
          <Testi t={testimonials[tIdx]} />
          <div className="flex justify-center gap-2 mt-4">
            {testimonials.map((_, i) => <button key={i} aria-label={`Testimoni ${i + 1}`} onClick={() => setTIdx(i)} className={`w-2 h-2 rounded-full ${i === tIdx ? 'bg-maroon' : 'bg-rose/40'}`} />)}
          </div>
        </div>
      </section>
    </div>
  );
};

const Testi: React.FC<{ t: (typeof testimonials)[number] }> = ({ t }) => (
  <div className="bg-white border border-blush rounded-2xl p-5 shadow-sm">
    <p className="text-sm text-cokelat leading-relaxed mb-4">“{t.text}”</p>
    <div className="flex items-center gap-3">
      <img src={t.img} alt={t.name} className="w-10 h-10 rounded-full object-cover bg-blush" />
      <div><p className="text-sm font-semibold text-maroon-dark">{t.name}</p><p className="text-[11px] text-cokelat/60">{t.city}</p></div>
    </div>
  </div>
);

export default Home;
