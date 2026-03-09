import { useState } from 'react';
import { useCheckoutStore } from '@/store/useCheckoutStore';
import { ArrowLeft, CreditCard, Lock, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

export default function PaymentScreen() {
    const { cartItems, pricing, address, prevStep, nextStep } = useCheckoutStore();
    const [isProcessing, setIsProcessing] = useState(false);

    const subtotal = cartItems.reduce((acc, item) => acc + (item.product_price * item.quantity), 0);
    const total = subtotal + pricing.shipping_fee - pricing.discount_applied;

    const handlePayment = () => {
        setIsProcessing(true);
        // Simulate API payment call
        setTimeout(() => {
            setIsProcessing(false);
            nextStep();
        }, 2000);
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8">
            {/* Payment Details */}
            <div className="flex-grow space-y-8">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                    <div className="mb-6 flex items-center gap-4">
                        <button
                            onClick={prevStep}
                            className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
                            aria-label="Go back to Address"
                            disabled={isProcessing}
                        >
                            <ArrowLeft size={18} />
                        </button>
                        <h2 className="text-2xl font-bold text-gray-900">Payment Method</h2>
                    </div>

                    <div className="border border-emerald-500 rounded-xl p-6 bg-emerald-50/30 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4">
                            <CheckCircle2 className="text-emerald-500" size={24} />
                        </div>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-emerald-600">
                                <CreditCard size={20} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Simulated Payment</h3>
                                <p className="text-sm text-gray-500">No real charges will be made</p>
                            </div>
                        </div>
                        <div className="mt-6 flex items-center gap-2 text-sm text-emerald-700 bg-emerald-100/50 p-3 rounded-lg w-fit">
                            <Lock size={16} />
                            <span>Payments are secure and encrypted</span>
                        </div>
                    </div>
                </div>

                {/* Shipping Summary block */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                    <h3 className="font-bold text-gray-900 mb-4">Shipping To</h3>
                    <div className="text-gray-600 text-sm space-y-1">
                        <p className="font-medium text-gray-900">{address?.fullName}</p>
                        <p>{address?.phone}</p>
                        <p>{address?.email}</p>
                        <p className="mt-2 text-gray-500">{address?.city}, {address?.state} {address?.pinCode}</p>
                    </div>
                </div>
            </div>

            {/* Final Order Summary */}
            <div className="w-full lg:w-96 shrink-0">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Final Summary</h2>

                    <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
                        {cartItems.map(item => (
                            <div key={item.product_id} className="flex gap-4 items-center">
                                <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden relative shrink-0">
                                    <Image src={item.image} alt={item.product_name} fill sizes="48px" className="object-cover" />
                                </div>
                                <div className="flex-grow">
                                    <h4 className="text-sm font-medium text-gray-900 line-clamp-1">{item.product_name}</h4>
                                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                </div>
                                <div className="text-sm font-semibold text-gray-900">
                                    ₹{item.product_price * item.quantity}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="h-px bg-gray-100 my-6" />

                    <div className="space-y-4 text-sm mb-6">
                        <div className="flex justify-between text-gray-500">
                            <span>Subtotal</span>
                            <span className="text-gray-900 font-medium">₹{subtotal}</span>
                        </div>
                        <div className="flex justify-between text-gray-500">
                            <span>Shipping</span>
                            <span className="text-gray-900 font-medium">₹{pricing.shipping_fee}</span>
                        </div>
                        <div className="h-px bg-gray-100 my-4" />
                        <div className="flex justify-between text-xl font-bold text-gray-900">
                            <span>Total Pay</span>
                            <span>₹{total}</span>
                        </div>
                    </div>

                    <button
                        onClick={handlePayment}
                        disabled={isProcessing}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white py-4 rounded-xl font-semibold shadow-sm shadow-emerald-200 transition-all flex items-center justify-center gap-3 relative overflow-hidden"
                    >
                        {isProcessing ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Processing...
                            </>
                        ) : (
                            <>
                                <Lock size={18} />
                                Pay ₹{total} Securely
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
