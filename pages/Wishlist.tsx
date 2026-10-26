import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import Button from '../components/ui/Button';

const Wishlist: React.FC = () => {
  const { ids } = useWishlist();
  const list = products.filter(p => ids.includes(p.id));
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="font-serif text-3xl text-maroon-dark mb-6">Favorit Saya</h1>
      {list.length ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">{list.map(p => <ProductCard key={p.id} product={p} />)}</div>
      ) : (
        <div className="text-center py-20">
          <p className="text-cokelat/70 mb-5">Belum ada produk favorit. Tekan ikon hati pada produk yang kamu suka.</p>
          <Link to="/shop"><Button>Jelajahi Produk</Button></Link>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
