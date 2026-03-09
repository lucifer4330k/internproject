import { useCheckoutStore } from '@/store/useCheckoutStore';
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function CartScreen() {
    const { cartItems, pricing, updateQuantity, nextStep } = useCheckoutStore();

    const subtotal = cartItems.reduce((acc, item) => acc + (item.product_price * item.quantity), 0);
    const total = subtotal + pricing.shipping_fee - pricing.discount_applied;

    if (cartItems.length === 0) {
        return (
            <div className="bg-white rounded-2xl shadow-sm p-12 text-center border border-gray-100">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
                <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="flex-grow bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">Your Cart</h2>

                <div className="space-y-6">
                    {cartItems.map((item) => (
                        <div key={item.product_id} className="flex flex-col sm:flex-row gap-6 pb-6 border-b border-gray-50 last:border-0 last:pb-0">
                            <div className="w-full sm:w-24 h-24 rounded-xl overflow-hidden bg-gray-100 relative shrink-0">
                                <Image src={item.image} alt={item.product_name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 96px" />
                            </div>
                            <div className="flex-grow flex flex-col justify-center">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-semibold text-gray-900 text-lg leading-tight pr-4">{item.product_name}</h3>
                                    <button
                                        onClick={() => updateQuantity(item.product_id, -item.quantity)}
                                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                        aria-label="Remove item"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                                <div className="flex items-center justify-between mt-auto">
                                    <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1 border border-gray-200">
                                        <button
                                            onClick={() => updateQuantity(item.product_id, -1)}
                                            className="w-8 h-8 flex items-center justify-center rounded-md bg-white shadow-sm text-gray-600 hover:text-emerald-600 transition-colors"
                                            disabled={item.quantity <= 1}
                                        >
                                            <Minus size={14} />
                                        </button>
                                        <span className="w-4 text-center font-medium text-sm">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.product_id, 1)}
                                            className="w-8 h-8 flex items-center justify-center rounded-md bg-white shadow-sm text-gray-600 hover:text-emerald-600 transition-colors"
                                        >
                                            <Plus size={14} />
                                        </button>
                                    </div>
                                    <span className="font-bold text-lg text-emerald-700">₹{item.product_price * item.quantity}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Order Summary */}
            <div className="w-full lg:w-80 shrink-0">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                    <div className="space-y-4 text-sm mb-6">
                        <div className="flex justify-between text-gray-500">
                            <span>Subtotal</span>
                            <span className="text-gray-900 font-medium">₹{subtotal}</span>
                        </div>
                        <div className="flex justify-between text-gray-500">
                            <span>Shipping</span>
                            <span className="text-gray-900 font-medium">₹{pricing.shipping_fee}</span>
                        </div>
                        {pricing.discount_applied > 0 && (
                            <div className="flex justify-between text-emerald-600">
                                <span>Discount</span>
                                <span className="font-medium">-₹{pricing.discount_applied}</span>
                            </div>
                        )}
                        <div className="h-px bg-gray-100 my-4" />
                        <div className="flex justify-between text-lg font-bold text-gray-900">
                            <span>Total</span>
                            <span>₹{total}</span>
                        </div>
                    </div>

                    <button
                        onClick={nextStep}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-xl font-semibold shadow-sm shadow-emerald-200 transition-all flex items-center justify-center gap-2 group"
                    >
                        Proceed to Checkout
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
}
