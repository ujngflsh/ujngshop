import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, ShieldCheck, Clock } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import Button from '../components/ui/Button';
import SectionHeader from '../components/ui/SectionHeader';

const Home: React.FC = () => {
  const featuredProducts = products.filter(p => p.isNew || p.rating > 4.7).slice(0, 4);

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="relative bg-brand-darkest rounded-3xl overflow-hidden text-white pt-20 pb-20 md:pt-32 md:pb-32 px-8 md:px-16 text-center md:text-left shadow-2xl shadow-brand-darkest/20">
         <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center" />
         <div className="relative z-10 max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
               Elevate Your Lifestyle With <span className="text-brand-light">Minimalist Gear</span>.
            </h1>
            <p className="text-slate-300 text-lg mb-8 max-w-lg">
               Discover a curated collection of premium electronics, furniture, and accessories designed for the modern aesthetic.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
               <Link to="/shop">
                  <Button variant="primary" size="lg" className="bg-brand-light text-brand-darkest hover:bg-white border-transparent">
                     Shop Now
                  </Button>
               </Link>
               <Link to="/contact">
                  <Button variant="outline" size="lg" className="border-brand-light/30 text-white hover:bg-brand-light/10 hover:border-brand-light">
                     Contact Us
                  </Button>
               </Link>
            </div>
         </div>
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-brand-lightest shadow-sm">
            <div className="p-3 bg-brand-lightest text-brand-deep rounded-xl">
               <Truck size={24} />
            </div>
            <div>
               <h3 className="font-semibold text-lg mb-1 text-brand-darkest">Free Shipping</h3>
               <p className="text-slate-500 text-sm">On all orders over $150. Global delivery available.</p>
            </div>
         </div>
         <div className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-brand-lightest shadow-sm">
            <div className="p-3 bg-brand-lightest text-brand-deep rounded-xl">
               <ShieldCheck size={24} />
            </div>
            <div>
               <h3 className="font-semibold text-lg mb-1 text-brand-darkest">Secure Payment</h3>
               <p className="text-slate-500 text-sm">100% secure payment methods with buyer protection.</p>
            </div>
         </div>
         <div className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-brand-lightest shadow-sm">
            <div className="p-3 bg-brand-lightest text-brand-deep rounded-xl">
               <Clock size={24} />
            </div>
            <div>
               <h3 className="font-semibold text-lg mb-1 text-brand-darkest">24/7 Support</h3>
               <p className="text-slate-500 text-sm">Dedicated support team ready to help anytime.</p>
            </div>
         </div>
      </section>

      {/* Featured Products */}
      <section>
        <div className="flex justify-between items-end mb-8">
           <SectionHeader 
             title="Featured Collection" 
             subtitle="Handpicked items just for you." 
             className="mb-0"
           />
           <Link to="/shop" className="group flex items-center gap-1 text-sm font-semibold text-brand-dark hover:text-brand-main transition-colors">
              View All <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
           </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-lightest/40 rounded-3xl p-12 text-center border border-brand-lightest">
         <h2 className="text-3xl font-bold mb-4 text-brand-darkest">Ready to upgrade your setup?</h2>
         <p className="text-slate-500 mb-8 max-w-xl mx-auto">Join thousands of satisfied customers who have transformed their workspace and lifestyle with UjngShop.</p>
         <Link to="/shop">
            <Button size="lg" className="px-10">Start Shopping</Button>
         </Link>
      </section>
    </div>
  );
};

export default Home;