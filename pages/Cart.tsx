import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Button from '../components/ui/Button';
import SectionHeader from '../components/ui/SectionHeader';

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-24 bg-white rounded-3xl border border-slate-100 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Your cart is empty</h2>
        <p className="text-slate-500 mb-8">Looks like you haven't added anything yet.</p>
        <Link to="/shop">
          <Button>Start Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <SectionHeader title="Shopping Cart" />
      
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Cart Items List */}
        <div className="lg:w-2/3 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
             <div className="p-6 md:p-8 space-y-8">
                {cartItems.map((item) => (
                    <div key={item.id} className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-100 last:border-0 last:pb-0">
                    <div className="w-24 h-24 bg-slate-50 rounded-xl overflow-hidden shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    
                    <div className="flex-1 text-center sm:text-left">
                        <h3 className="font-semibold text-slate-900 text-lg">{item.name}</h3>
                        <p className="text-slate-500 text-sm mb-2">{item.category}</p>
                        <p className="font-bold text-slate-900">${item.price.toFixed(2)}</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center border border-slate-200 rounded-full px-2 py-1">
                            <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-900"
                            >
                                <Minus size={14} />
                            </button>
                            <span className="w-8 text-center font-medium text-sm">{item.quantity}</span>
                            <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-900"
                            >
                                <Plus size={14} />
                            </button>
                        </div>
                        <button 
                            onClick={() => removeFromCart(item.id)}
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                    </div>
                ))}
             </div>
             <div className="bg-slate-50 px-8 py-4 flex justify-between items-center">
                 <button onClick={clearCart} className="text-red-500 text-sm font-medium hover:underline">Clear Cart</button>
                 <Link to="/shop" className="text-slate-900 text-sm font-medium hover:underline">Continue Shopping</Link>
             </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm sticky top-24">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Tax (Estimated)</span>
                <span>${(cartTotal * 0.08).toFixed(2)}</span>
              </div>
              <div className="border-t border-slate-100 pt-4 flex justify-between text-lg font-bold text-slate-900">
                <span>Total</span>
                <span>${(cartTotal * 1.08).toFixed(2)}</span>
              </div>
            </div>

            <Button fullWidth className="flex items-center justify-center gap-2 py-4 text-base">
              Checkout <ArrowRight size={18} />
            </Button>
            
            <p className="text-xs text-center text-slate-400 mt-4">
               Secure checkout powered by Stripe.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;