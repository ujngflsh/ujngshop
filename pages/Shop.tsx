import React, { useState, useMemo, useEffect } from 'react';
import { Filter, SlidersHorizontal, Search, X } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { products } from '../data/products';
import { Category } from '../types';
import ProductCard from '../components/ProductCard';
import SectionHeader from '../components/ui/SectionHeader';
import Button from '../components/ui/Button';

const categories: Category[] = ["All Products", "Electronics", "Furniture", "Accessories", "Audio"];

const Shop: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All Products");
  const [showFilters, setShowFilters] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const query = searchParams.get('q') || "";

  // Reset category if search query changes, or keep user preference? 
  // Let's keep category filter independent but useful.
  
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesCategory = selectedCategory === "All Products" || p.category === selectedCategory;
      const searchLower = query.toLowerCase();
      const matchesSearch = query === "" || 
                            p.name.toLowerCase().includes(searchLower) || 
                            p.description.toLowerCase().includes(searchLower) ||
                            p.category.toLowerCase().includes(searchLower);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, query]);

  const clearSearch = () => {
    setSearchParams({});
  };

  return (
    <div>
      <SectionHeader 
        title="Shop All Products" 
        subtitle="Explore our complete collection of premium goods." 
      />

      {query && (
        <div className="mb-8 flex items-center gap-2 bg-brand-lightest/50 p-4 rounded-xl border border-brand-light/20">
            <Search size={18} className="text-brand-main" />
            <span className="text-slate-600">Search results for: <span className="font-bold text-brand-darkest">"{query}"</span></span>
            <button onClick={clearSearch} className="ml-auto p-1 hover:bg-slate-200 rounded-full transition-colors">
                <X size={16} />
            </button>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar / Filter Mobile Toggle */}
        <div className="lg:w-1/4">
          <div className="lg:hidden mb-4">
             <Button 
                variant="outline" 
                fullWidth 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center justify-center gap-2"
             >
                <SlidersHorizontal size={16} /> Filters
             </Button>
          </div>

          <div className={`lg:block ${showFilters ? 'block' : 'hidden'} sticky top-24`}>
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <h3 className="font-bold text-brand-darkest mb-4 flex items-center gap-2">
                    <Filter size={18} /> Categories
                </h3>
                <div className="space-y-2">
                    {categories.map((cat) => (
                        <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                            <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${selectedCategory === cat ? 'bg-brand-main border-brand-main' : 'border-slate-300 group-hover:border-brand-main'}`}>
                                {selectedCategory === cat && <div className="w-2 h-2 bg-white rounded-sm" />}
                            </div>
                            <input 
                                type="radio" 
                                name="category" 
                                className="hidden" 
                                checked={selectedCategory === cat}
                                onChange={() => setSelectedCategory(cat)}
                            />
                            <span className={`text-sm ${selectedCategory === cat ? 'font-medium text-brand-main' : 'text-slate-500 group-hover:text-brand-dark'}`}>
                                {cat}
                            </span>
                        </label>
                    ))}
                </div>

                <div className="mt-8 pt-8 border-t border-slate-100">
                    <h3 className="font-bold text-brand-darkest mb-4">Price Range</h3>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <span className="bg-slate-50 px-3 py-1 rounded-lg border border-slate-200">$0</span>
                        <div className="h-px bg-slate-200 flex-1"></div>
                        <span className="bg-slate-50 px-3 py-1 rounded-lg border border-slate-200">$500+</span>
                    </div>
                </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="lg:w-3/4">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
                ))}
            </div>
          ) : (
             <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                <p className="text-slate-500 text-lg mb-2">No products found.</p>
                <p className="text-sm text-slate-400 mb-6">Try adjusting your search or filter to find what you're looking for.</p>
                <Button variant="outline" onClick={() => {setSelectedCategory("All Products"); clearSearch();}}>
                    Clear All Filters
                </Button>
             </div>
          )}

          {/* Pagination Dummy */}
          {filteredProducts.length > 0 && (
            <div className="mt-12 flex justify-center gap-2">
                <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-brand-main hover:text-brand-main transition-colors">1</button>
                <button className="w-10 h-10 rounded-full bg-brand-main text-white flex items-center justify-center">2</button>
                <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-brand-main hover:text-brand-main transition-colors">3</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;