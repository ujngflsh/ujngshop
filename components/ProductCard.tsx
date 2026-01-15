import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import Button from './ui/Button';
import Badge from './ui/Badge';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="group bg-white rounded-3xl p-4 transition-all duration-300 hover:shadow-xl hover:shadow-brand-light/10 hover:-translate-y-1 border border-transparent hover:border-brand-light/30 h-full flex flex-col">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-brand-lightest/20 mb-4">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.isNew && (
          <div className="absolute top-3 left-3">
             <Badge variant="accent">New Arrival</Badge>
          </div>
        )}
        {product.discount && (
          <div className="absolute top-3 right-3">
             <Badge variant="warning">-{product.discount}%</Badge>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="neutral" className="uppercase tracking-wider text-[10px]">
            {product.category}
          </Badge>
          <div className="flex items-center gap-1 text-amber-400 text-sm">
            <Star size={14} fill="currentColor" />
            <span className="text-slate-500 font-medium">{product.rating}</span>
          </div>
        </div>

        <Link to={`/product/${product.id}`} className="block mb-2">
          <h3 className="font-semibold text-brand-darkest text-lg leading-tight group-hover:text-brand-main transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="mt-auto pt-4 flex items-center justify-between gap-3">
          <span className="text-xl font-bold text-brand-darkest">
            ${product.price.toFixed(2)}
          </span>
          <div className="flex gap-2">
            <Button 
              variant="secondary" 
              size="sm" 
              className="!p-2.5 rounded-full hover:bg-brand-main hover:text-white"
              onClick={() => addToCart(product)}
              title="Add to Cart"
            >
              <ShoppingCart size={18} />
            </Button>
            <Link to={`/product/${product.id}`}>
               <Button variant="primary" size="sm">
                Buy Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;