import React from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '../components/ui/SectionHeader';

const posts = [
  { img: '/images/p3.jpg', tag: 'Gaya Hidup', title: 'Padu Padan Batik Modern untuk Ke Kantor', excerpt: 'Tips memadukan outer batik dengan inner polos dan hijab senada agar tampil profesional tapi tetap nyaman seharian.', date: '12 Okt 2025' },
  { img: '/images/p1.jpg', tag: 'Tips', title: 'Merawat Pakaian Linen Agar Awet', excerpt: 'Linen memang mudah kusut, tapi dengan cara mencuci dan menjemur yang tepat tampilannya tetap rapi dan awet.', date: '28 Sep 2025' },
  { img: '/images/p2.jpg', tag: 'Tren', title: 'Tren Warna Dusty Rose untuk Musim Ini', excerpt: 'Warna lembut dusty rose cocok untuk berbagai warna kulit dan mudah dipadukan dengan netral maupun earth tone.', date: '15 Sep 2025' },
];

const Blog: React.FC = () => (
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <SectionHeader title="Blog UjngShop" subtitle="Inspirasi gaya, tips perawatan, dan cerita di balik koleksi kami." />
    <div className="grid gap-6">
      {posts.map(p => (
        <article key={p.title} className="bg-white rounded-3xl overflow-hidden border border-blush flex flex-col md:flex-row hover:shadow-lg transition-shadow group">
          <div className="md:w-1/3 aspect-video md:aspect-auto overflow-hidden"><img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /></div>
          <div className="p-6 md:p-8 md:w-2/3">
            <span className="text-[11px] font-bold text-rose uppercase tracking-wider">{p.tag} · {p.date}</span>
            <h3 className="font-serif text-xl md:text-2xl text-maroon-dark my-2">{p.title}</h3>
            <p className="text-sm text-cokelat/80 mb-4">{p.excerpt}</p>
            <Link to="/shop" className="text-sm text-maroon font-medium hover:underline">Belanja koleksinya →</Link>
          </div>
        </article>
      ))}
    </div>
  </div>
);

export default Blog;
