import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, CheckCircle2, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatRupiah, finalPrice } from '../utils/format';
import Button from '../components/ui/Button';

const FREE_SHIPPING = 300000;
const SHIPPING_FEE = 20000;
const VOUCHERS: Record<string, number> = { UJNG10: 0.1, HEMAT20: 0.2 };

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const [code, setCode] = useState('');
  const [voucher, setVoucher] = useState<string | null>(null);
  const [voucherMsg, setVoucherMsg] = useState('');
  const [checkout, setCheckout] = useState(false);
  const [done, setDone] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', phone: '', address: '', payment: 'Transfer Bank' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const discount = voucher ? cartTotal * VOUCHERS[voucher] : 0;
  const shipping = cartTotal >= FREE_SHIPPING || cartTotal === 0 ? 0 : SHIPPING_FEE;
  const total = cartTotal - discount + shipping;

  const applyVoucher = () => {
    const c = code.trim().toUpperCase();
    if (VOUCHERS[c]) { setVoucher(c); setVoucherMsg(`Voucher ${c} berhasil dipakai`); }
    else { setVoucher(null); setVoucherMsg('Kode voucher tidak valid'); }
  };

  const submitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (form.name.trim().length < 3) err.name = 'Nama minimal 3 karakter';
    if (!/^(\+62|62|0)8\d{7,12}$/.test(form.phone.replace(/\s|-/g, ''))) err.phone = 'Nomor HP tidak valid (contoh: 08123456789)';
    if (form.address.trim().length < 10) err.address = 'Alamat terlalu singkat';
    setErrors(err);
    if (Object.keys(err).length) return;
    setDone('UJG-' + Date.now().toString().slice(-8));
    setCheckout(false);
    clearCart();
    setVoucher(null);
    setCode('');
  };

  if (done) {
    return (
      <div className="max-w-xl mx-auto text-center py-20 px-4">
        <CheckCircle2 size={56} className="mx-auto text-maroon mb-4" />
        <h2 className="font-serif text-3xl text-maroon-dark mb-2">Pesanan Berhasil!</h2>
        <p className="text-cokelat mb-1">Terima kasih sudah berbelanja di UjngShop.</p>
        <p className="text-sm text-cokelat/70 mb-6">Nomor pesanan: <b className="text-maroon">{done}</b></p>
        <p className="text-xs text-cokelat/60 mb-6">(Ini hanya demo front-end — tidak ada transaksi nyata.)</p>
        <Link to="/shop"><Button>Lanjut Belanja</Button></Link>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-24 px-4">
        <h2 className="font-serif text-3xl text-maroon-dark mb-2">Keranjang masih kosong</h2>
        <p className="text-cokelat/70 mb-6">Yuk, temukan busana favoritmu.</p>
        <Link to="/shop"><Button>Mulai Belanja</Button></Link>
      </div>
    );
  }

  const field = 'w-full px-4 py-2.5 text-sm bg-white border border-blush rounded-xl focus:outline-none focus:border-rose';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="font-serif text-3xl text-maroon-dark mb-6">Keranjang Belanja</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3 bg-white border border-blush rounded-3xl overflow-hidden">
          <div className="p-5 md:p-7 space-y-6">
            {cartItems.map(item => (
              <div key={item.key} className="flex gap-4 pb-6 border-b border-blush last:border-0 last:pb-0">
                <Link to={`/product/${item.id}`} className="w-24 h-28 rounded-xl overflow-hidden bg-blush/40 shrink-0"><img src={item.image} alt={item.name} className="w-full h-full object-cover" /></Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${item.id}`} className="font-medium text-maroon-dark hover:text-maroon">{item.name}</Link>
                  <p className="text-xs text-cokelat/70 mt-0.5">{item.color} · Ukuran {item.size}</p>
                  <p className="font-bold text-maroon mt-1">{formatRupiah(finalPrice(item.price, item.discount))}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-rose/50 rounded-full px-1">
                      <button aria-label="Kurangi" onClick={() => updateQuantity(item.key, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center"><Minus size={14} /></button>
                      <span className="w-7 text-center text-sm">{item.quantity}</span>
                      <button aria-label="Tambah" onClick={() => updateQuantity(item.key, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center"><Plus size={14} /></button>
                    </div>
                    <button aria-label="Hapus" onClick={() => removeFromCart(item.key)} className="w-9 h-9 rounded-full bg-blush text-maroon flex items-center justify-center hover:bg-rose/40"><Trash2 size={16} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-blush/40 px-7 py-3 flex justify-between text-sm">
            <button onClick={clearCart} className="text-maroon hover:underline">Kosongkan Keranjang</button>
            <Link to="/shop" className="text-maroon hover:underline">Lanjut Belanja</Link>
          </div>
        </div>

        <div className="lg:w-1/3">
          <div className="bg-white border border-blush rounded-3xl p-6 lg:sticky lg:top-24">
            <h3 className="font-serif text-xl text-maroon-dark mb-4">Ringkasan Pesanan</h3>
            <div className="flex gap-2 mb-1">
              <input value={code} onChange={e => setCode(e.target.value)} placeholder="Kode voucher" className={field + ' !py-2'} />
              <Button variant="outline" size="sm" onClick={applyVoucher}>Pakai</Button>
            </div>
            <p className={`text-xs mb-4 ${voucher ? 'text-green-700' : 'text-maroon'}`}>{voucherMsg || 'Coba: UJNG10 atau HEMAT20'}</p>
            <div className="space-y-2 text-sm text-cokelat mb-4">
              <div className="flex justify-between"><span>Subtotal</span><span>{formatRupiah(cartTotal)}</span></div>
              {voucher && <div className="flex justify-between text-green-700"><span>Diskon voucher</span><span>-{formatRupiah(discount)}</span></div>}
              <div className="flex justify-between"><span>Ongkir</span><span>{shipping === 0 ? 'Gratis' : formatRupiah(shipping)}</span></div>
              <div className="flex justify-between border-t border-blush pt-3 text-base font-bold text-maroon-dark"><span>Total</span><span>{formatRupiah(total)}</span></div>
            </div>
            {cartTotal < FREE_SHIPPING && <p className="text-xs text-cokelat/70 mb-4">Belanja {formatRupiah(FREE_SHIPPING - cartTotal)} lagi untuk gratis ongkir.</p>}
            <Button fullWidth size="lg" onClick={() => setCheckout(true)}>Checkout <ArrowRight size={16} /></Button>
          </div>
        </div>
      </div>

      {checkout && (
        <div className="fixed inset-0 z-[90] bg-black/40 flex items-center justify-center p-4" onClick={() => setCheckout(false)}>
          <form onSubmit={submitOrder} onClick={e => e.stopPropagation()} className="bg-ivory rounded-3xl p-6 w-full max-w-md space-y-3 animate-fade-in max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-serif text-xl text-maroon-dark">Data Pengiriman</h3>
              <button type="button" onClick={() => setCheckout(false)} aria-label="Tutup"><X size={20} /></button>
            </div>
            <div><input className={field} placeholder="Nama lengkap" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />{errors.name && <p className="text-xs text-maroon mt-1">{errors.name}</p>}</div>
            <div><input className={field} placeholder="No. HP (08xxxxxxxxxx)" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />{errors.phone && <p className="text-xs text-maroon mt-1">{errors.phone}</p>}</div>
            <div><textarea rows={3} className={field} placeholder="Alamat lengkap" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />{errors.address && <p className="text-xs text-maroon mt-1">{errors.address}</p>}</div>
            <select className={field} value={form.payment} onChange={e => setForm({ ...form, payment: e.target.value })}>
              {['Transfer Bank', 'E-Wallet', 'COD (Bayar di Tempat)', 'Kartu Kredit'].map(p => <option key={p}>{p}</option>)}
            </select>
            <div className="flex justify-between text-sm font-bold text-maroon-dark pt-1"><span>Total bayar</span><span>{formatRupiah(total)}</span></div>
            <Button fullWidth size="lg" type="submit">Buat Pesanan</Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Cart;
