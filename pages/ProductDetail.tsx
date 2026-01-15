import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star, Check, ArrowLeft } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import ProductCard from '../components/ProductCard';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === Number(id));
  const { addToCart } = useCart();
  
  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <Link to="/shop" className="text-blue-600 hover:underline mt-4 inline-block">Back to Shop</Link>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div>
        <Link to="/shop" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-8 text-sm font-medium">
            <ArrowLeft size={16} /> Back to Shop
        </Link>
        
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Image Gallery */}
                <div className="space-y-4">
                    <div className="aspect-square bg-slate-50 rounded-2xl overflow-hidden relative">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        {product.isNew && (
                            <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">NEW</span>
                        )}
                    </div>
                </div>

                {/* Product Info */}
                <div className="flex flex-col justify-center">
                    <div className="mb-4">
                         <Badge variant="neutral" className="mb-2 uppercase tracking-wide">{product.category}</Badge>
                         <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">{product.name}</h1>
                         <div className="flex items-center gap-4">
                             <div className="flex text-amber-400">
                                 {[...Array(5)].map((_, i) => (
                                     <Star key={i} size={18} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} className={i < Math.floor(product.rating) ? "" : "text-slate-300"} />
                                 ))}
                             </div>
                             <span className="text-sm text-slate-500">({product.reviews} Reviews)</span>
                         </div>
                    </div>

                    <div className="text-3xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-6">
                        ${product.price.toFixed(2)}
                    </div>

                    <p className="text-slate-600 leading-relaxed mb-8">
                        {product.description}
                        <br /><br />
                        Engineered for durability and style, this product seamlessly integrates into your daily life.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 mb-8">
                        <Button onClick={() => addToCart(product)} size="lg" className="flex-1 flex items-center justify-center gap-2">
                             <ShoppingCart size={20} /> Add to Cart
                        </Button>
                         <Button variant="outline" size="lg" className="flex items-center justify-center gap-2 px-4">
                             <Heart size={20} />
                        </Button>
                    </div>

                    <div className="space-y-3">
                         <div className="flex items-center gap-3 text-sm text-slate-600">
                             <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center"><Check size={12} strokeWidth={4} /></div>
                             In stock and ready to ship
                         </div>
                         <div className="flex items-center gap-3 text-sm text-slate-600">
                             <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center"><Check size={12} strokeWidth={4} /></div>
                             Free shipping on orders over $150
                         </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
            <section>
                <h3 className="text-2xl font-bold text-slate-900 mb-8">You might also like</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {relatedProducts.map(p => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            </section>
        )}
    </div>
  );
};

export default ProductDetail;