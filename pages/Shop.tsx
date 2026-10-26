import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, Search, X, LayoutGrid, Grid3X3 } from 'lucide-react';
import { products, categories } from '../data/products';
import { Category } from '../types';
import { finalPrice, formatRupiah } from '../utils/format';
import ProductCard from '../components/ProductCard';
import Button from '../components/ui/Button';
import Stars from '../components/Stars';

const MAX_PRICE = 1000000;
type Sort = 'default' | 'low' | 'high' | 'rating' | 'new';

const Shop: React.FC = () => {
  const [params, setParams] = useSearchParams();
  const query = params.get('q') || '';
  const promoOnly = params.get('promo') === '1';
  const catParam = params.get('cat');
  const sortParam = (params.get('sort') as Sort) || 'default';

  const [selected, setSelected] = useState<Category[]>(catParam ? [catParam as Category] : []);
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [minRating, setMinRating] = useState(0);
  const [cols, setCols] = useState<2 | 3>(3);
  const [showFilters, setShowFilters] = useState(false);

  // sinkronkan saat parameter kategori di URL berubah (mis. klik dari beranda)
  React.useEffect(() => { setSelected(catParam ? [catParam as Category] : []); }, [catParam]);

  const setParam = (k: string, v?: string) => {
    const next = new URLSearchParams(params);
    v ? next.set(k, v) : next.delete(k);
    setParams(next);
  };

  const toggleCat = (c: Category) => setSelected(s => (s.includes(c) ? s.filter(x => x !== c) : [...s, c]));
  const reset = () => { setSelected([]); setMaxPrice(MAX_PRICE); setMinRating(0); setParams({}); };

  const list = useMemo(() => {
    const q = query.toLowerCase();
    const out = products.filter(p =>
      (selected.length === 0 || selected.includes(p.category)) &&
      finalPrice(p.price, p.discount) <= maxPrice &&
      p.rating >= minRating &&
      (!promoOnly || !!p.discount) &&
      (!q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)));
    switch (sortParam) {
      case 'low': return out.sort((a, b) => finalPrice(a.price, a.discount) - finalPrice(b.price, b.discount));
      case 'high': return out.sort((a, b) => finalPrice(b.price, b.discount) - finalPrice(a.price, a.discount));
      case 'rating': return out.sort((a, b) => b.rating - a.rating);
      case 'new': return out.sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew));
      default: return out;
    }
  }, [query, selected, maxPrice, minRating, promoOnly, sortParam]);

  const hasFilter = selected.length > 0 || maxPrice < MAX_PRICE || minRating > 0 || !!query || promoOnly;

  return (
    <div>
      <section className="bg-gradient-to-r from-blush to-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="font-serif text-3xl md:text-4xl text-maroon-dark">{promoOnly ? 'Promo Spesial' : 'Semua Koleksi Untuk Kamu'}</h1>
          <p className="text-sm text-cokelat/80 mt-2">Temukan gaya terbaik sesuai kebutuhanmu.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-64 shrink-0">
          <Button variant="outline" fullWidth className="lg:hidden mb-4" onClick={() => setShowFilters(!showFilters)}><SlidersHorizontal size={16} /> Filter</Button>
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block bg-white border border-blush rounded-2xl p-5 space-y-6 lg:sticky lg:top-24`}>
            <div>
              <h3 className="font-semibold text-maroon-dark mb-3 text-sm">Kategori</h3>
              <div className="space-y-2">
                {categories.map(c => (
                  <label key={c.name} className="flex items-center gap-2.5 text-sm text-cokelat cursor-pointer">
                    <input type="checkbox" checked={selected.includes(c.name)} onChange={() => toggleCat(c.name)} className="accent-[#7E2349] w-4 h-4" />
                    {c.name}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-maroon-dark mb-3 text-sm">Harga</h3>
              <input type="range" min={100000} max={MAX_PRICE} step={50000} value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))} className="w-full" />
              <p className="text-xs text-cokelat mt-1">Rp 0 – {formatRupiah(maxPrice)}</p>
            </div>
            <div>
              <h3 className="font-semibold text-maroon-dark mb-3 text-sm">Rating</h3>
              <div className="space-y-1.5">
                {[5, 4, 3].map(r => (
                  <button key={r} onClick={() => setMinRating(minRating === r ? 0 : r)} className={`flex items-center gap-2 text-xs w-full rounded-lg px-2 py-1 ${minRating === r ? 'bg-blush' : 'hover:bg-blush/50'}`}>
                    <Stars rating={r} size={13} /> {r < 5 && '& ke atas'}
                  </button>
                ))}
              </div>
            </div>
            {hasFilter && <Button variant="ghost" size="sm" fullWidth onClick={reset}>Reset Filter</Button>}
          </div>
        </aside>

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <p className="text-sm text-cokelat/80 mr-auto">{list.length} produk</p>
            <select value={sortParam} onChange={e => setParam('sort', e.target.value === 'default' ? undefined : e.target.value)}
              className="text-xs bg-white border border-blush rounded-full px-3 py-2 text-cokelat focus:outline-none">
              <option value="default">Urutkan: Terpopuler</option>
              <option value="new">Terbaru</option>
              <option value="low">Harga Terendah</option>
              <option value="high">Harga Tertinggi</option>
              <option value="rating">Rating Tertinggi</option>
            </select>
            <div className="hidden sm:flex gap-1 text-maroon">
              <button aria-label="3 kolom" onClick={() => setCols(3)} className={`p-1.5 rounded ${cols === 3 ? 'bg-blush' : ''}`}><Grid3X3 size={16} /></button>
              <button aria-label="2 kolom" onClick={() => setCols(2)} className={`p-1.5 rounded ${cols === 2 ? 'bg-blush' : ''}`}><LayoutGrid size={16} /></button>
            </div>
          </div>

          {query && (
            <div className="mb-5 flex items-center gap-2 bg-blush/60 p-3 rounded-xl text-sm text-cokelat">
              <Search size={15} /> Hasil pencarian: <b>“{query}”</b>
              <button onClick={() => setParam('q')} className="ml-auto" aria-label="Hapus pencarian"><X size={15} /></button>
            </div>
          )}

          {list.length > 0 ? (
            <div className={`grid grid-cols-2 ${cols === 3 ? 'lg:grid-cols-3' : ''} gap-4 md:gap-6`}>
              {list.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-blush">
              <p className="font-serif text-xl text-maroon-dark mb-2">Produk tidak ditemukan</p>
              <p className="text-sm text-cokelat/70 mb-5">Coba ubah filter atau kata kunci pencarian.</p>
              <Button onClick={reset}>Reset Filter</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
