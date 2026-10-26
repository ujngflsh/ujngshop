import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { formatRupiah, finalPrice } from '../utils/format';
import Badge from './ui/Badge';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart } = useCart();
  const { toggle, has } = useWishlist();
  const toast = useToast();
  const liked = has(product.id);
  const price = finalPrice(product.price, product.discount);

  return (
    <div className="group flex flex-col">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-blush/40">
        <Link to={`/product/${product.id}`}>
          <img src={product.image} alt={product.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        </Link>
        <button
          aria-label={liked ? 'Hapus dari favorit' : 'Tambah ke favorit'}
          onClick={() => { toggle(product.id); toast(liked ? 'Dihapus dari favorit' : 'Ditambahkan ke favorit'); }}
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow hover:scale-110 transition-transform"
        >
          <Heart size={16} className={liked ? 'text-maroon' : 'text-cokelat'} fill={liked ? 'currentColor' : 'none'} />
        </button>
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
          {product.isNew && <Badge variant="accent">Baru</Badge>}
          {product.discount && <Badge variant="sale">-{product.discount}%</Badge>}
        </div>
        <button
          onClick={() => { addToCart(product); toast('Ditambahkan ke keranjang'); }}
          className="absolute bottom-2.5 left-2.5 right-2.5 bg-maroon text-white text-sm py-2 rounded-full flex items-center justify-center gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all"
        >
          <ShoppingBag size={15} /> Tambah ke Keranjang
        </button>
      </div>
      <Link to={`/product/${product.id}`} className="mt-3 text-sm font-medium text-maroon-dark hover:text-maroon line-clamp-1">{product.name}</Link>
      <div className="flex items-baseline gap-2 mt-0.5">
        <span className="text-sm font-bold text-maroon">{formatRupiah(price)}</span>
        {product.discount && <span className="text-xs text-cokelat/50 line-through">{formatRupiah(product.price)}</span>}
      </div>
      <div className="flex items-center gap-1 text-xs text-cokelat/70 mt-0.5">
        <Star size={12} className="text-amber-500" fill="currentColor" /> {product.rating.toFixed(1)} <span>({product.reviews})</span>
      </div>
    </div>
  );
};

export default ProductCard;
