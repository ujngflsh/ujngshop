import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, Check, ArrowLeft, Minus, Plus } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { formatRupiah, finalPrice } from '../utils/format';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Stars from '../components/Stars';
import ProductCard from '../components/ProductCard';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === Number(id));
  const { addToCart } = useCart();
  const { toggle, has } = useWishlist();
  const toast = useToast();
  const navigate = useNavigate();
  const [size, setSize] = useState('M');
  const [color, setColor] = useState(product?.colors[0].name ?? '');
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="text-center py-24">
        <h2 className="font-serif text-2xl text-maroon-dark">Produk tidak ditemukan</h2>
        <Link to="/shop" className="text-maroon hover:underline mt-4 inline-block">Kembali ke toko</Link>
      </div>
    );
  }

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const price = finalPrice(product.price, product.discount);
  const liked = has(product.id);

  const add = () => { addToCart(product, { size, color, quantity: qty }); toast('Ditambahkan ke keranjang'); };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/shop" className="inline-flex items-center gap-2 text-cokelat hover:text-maroon mb-6 text-sm"><ArrowLeft size={16} /> Kembali ke toko</Link>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-14 mb-16">
        <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-blush/40 relative">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          {product.isNew && <Badge variant="accent" className="absolute top-4 left-4">Baru</Badge>}
        </div>

        <div className="flex flex-col justify-center">
          <Badge className="self-start mb-3">{product.category}</Badge>
          <h1 className="font-serif text-3xl md:text-4xl text-maroon-dark mb-2">{product.name}</h1>
          <div className="flex items-center gap-3 mb-5">
            <Stars rating={product.rating} size={16} />
            <span className="text-sm text-cokelat/70">{product.rating.toFixed(1)} ({product.reviews} ulasan)</span>
          </div>
          <div className="flex items-baseline gap-3 mb-5 pb-5 border-b border-blush">
            <span className="text-3xl font-bold text-maroon">{formatRupiah(price)}</span>
            {product.discount && <><span className="text-cokelat/50 line-through">{formatRupiah(product.price)}</span><Badge variant="sale">-{product.discount}%</Badge></>}
          </div>
          <p className="text-sm text-cokelat leading-relaxed mb-6">{product.description}</p>

          <p className="text-xs font-semibold text-maroon-dark mb-2">Warna: <span className="font-normal text-cokelat">{color}</span></p>
          <div className="flex gap-2 mb-5">
            {product.colors.map(c => (
              <button key={c.name} aria-label={c.name} onClick={() => setColor(c.name)} style={{ background: c.hex }}
                className={`w-8 h-8 rounded-full border-2 ${color === c.name ? 'border-maroon ring-2 ring-blush' : 'border-white shadow'}`} />
            ))}
          </div>

          <p className="text-xs font-semibold text-maroon-dark mb-2">Ukuran</p>
          <div className="flex gap-2 mb-6">
            {product.sizes.map(s => (
              <button key={s} onClick={() => setSize(s)} className={`w-11 h-11 rounded-full text-sm border transition-colors ${size === s ? 'bg-maroon text-white border-maroon' : 'border-rose/50 text-cokelat hover:bg-blush'}`}>{s}</button>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            <div className="flex items-center border border-rose/50 rounded-full px-2">
              <button aria-label="Kurangi" onClick={() => setQty(q => Math.max(1, q - 1))} className="w-9 h-11 flex items-center justify-center text-cokelat"><Minus size={14} /></button>
              <span className="w-8 text-center text-sm font-medium">{qty}</span>
              <button aria-label="Tambah" onClick={() => setQty(q => q + 1)} className="w-9 h-11 flex items-center justify-center text-cokelat"><Plus size={14} /></button>
            </div>
            <Button size="lg" className="flex-1" onClick={add}><ShoppingBag size={18} /> Tambah ke Keranjang</Button>
            <Button variant="outline" size="lg" aria-label="Favorit" className="!px-4" onClick={() => { toggle(product.id); toast(liked ? 'Dihapus dari favorit' : 'Ditambahkan ke favorit'); }}>
              <Heart size={18} fill={liked ? 'currentColor' : 'none'} />
            </Button>
          </div>
          <Button variant="secondary" size="lg" fullWidth onClick={() => { addToCart(product, { size, color, quantity: qty }); navigate('/cart'); }}>Beli Sekarang</Button>

          <ul className="mt-6 space-y-2 text-sm text-cokelat">
            <li className="flex items-center gap-2"><Check size={16} className="text-maroon" /> Stok tersedia, siap dikirim</li>
            <li className="flex items-center gap-2"><Check size={16} className="text-maroon" /> Gratis ongkir minimal pembelian Rp300.000</li>
          </ul>
        </div>
      </div>

      {related.length > 0 && (
        <section>
          <h3 className="font-serif text-2xl text-maroon-dark mb-6">Kamu Mungkin Suka</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">{related.map(p => <ProductCard key={p.id} product={p} />)}</div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
