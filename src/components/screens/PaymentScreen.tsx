import { useState } from 'react';
import { useCheckoutStore } from '@/store/useCheckoutStore';
import { ArrowLeft, CreditCard, Lock, CheckCircle2, Smartphone, Banknote } from 'lucide-react';
import Image from 'next/image';

const PAYMENT_METHODS = [
    { id: 'card', name: 'Credit / Debit Card', icon: CreditCard, description: 'Simulated Card Payment' },
    { id: 'upi', name: 'UPI', icon: Smartphone, description: 'Google Pay, PhonePe, Paytm' },
    { id: 'cod', name: 'Cash on Delivery', icon: Banknote, description: 'Pay when your order arrives' },
];

export default function PaymentScreen() {
    const { cartItems, shipping_fee, discount_applied, addresses, selectedAddressId, prevStep, nextStep } = useCheckoutStore();
    const [isProcessing, setIsProcessing] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState('card');

    // Compute active address
    const activeAddress = addresses.find(a => a.id === selectedAddressId) || addresses[0];

    const subtotal = cartItems.reduce((acc, item) => acc + (item.product_price * item.quantity), 0);
    const total = subtotal + shipping_fee - discount_applied;

    const handlePayment = () => {
        setIsProcessing(true);
        // Simulate API payment call
        setTimeout(() => {
            setIsProcessing(false);
            nextStep();
        }, 2000);
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8 mb-20">
            {/* Payment Details */}
            <div className="flex-grow space-y-8">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                    <div className="mb-6 flex items-center gap-4">
                        <h2 className="text-2xl font-bold text-gray-900">Payment Method</h2>
                    </div>

                    <div className="space-y-4">
                        {PAYMENT_METHODS.map((method) => {
                            const isSelected = selectedMethod === method.id;
                            const Icon = method.icon;
                            return (
                                <div 
                                    key={method.id}
                                    onClick={() => setSelectedMethod(method.id)}
                                    className={`p-4 sm:p-5 rounded-xl border-2 cursor-pointer transition-all relative flex items-center gap-4 ${
                                        isSelected 
                                        ? 'border-emerald-500 bg-emerald-50/30' 
                                        : 'border-gray-100 hover:border-emerald-200 hover:bg-emerald-50/10'
                                    }`}
                                >
                                    {isSelected && (
                                        <div className="absolute top-1/2 -translate-y-1/2 right-4 sm:right-5">
                                            <CheckCircle2 className="text-emerald-500" size={24} />
                                        </div>
                                    )}
                                    <div className={`w-12 h-12 rounded-full shadow-sm flex items-center justify-center shrink-0 ${
                                        isSelected ? 'bg-white text-emerald-600' : 'bg-gray-100 text-gray-500'
                                    }`}>
                                        <Icon size={20} />
                                    </div>
                                    <div className="pr-10">
                                        <h3 className="font-bold text-gray-900">{method.name}</h3>
                                        <p className="text-sm text-gray-500 mt-0.5">{method.description}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-6 flex items-center gap-2 text-sm text-emerald-700 bg-emerald-100/50 p-3 rounded-lg w-fit">
                        <Lock size={16} />
                        <span>All payments are secure and encrypted</span>
                    </div>
                </div>

                {/* Shipping Summary block */}
                {activeAddress && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                        <h3 className="font-bold text-gray-900 mb-4">Shipping To</h3>
                        <div className="text-gray-600 text-sm space-y-1">
                            <p className="font-medium text-gray-900">{activeAddress.fullName}</p>
                            <p>{activeAddress.phone}</p>
                            <p>{activeAddress.email}</p>
                            <p className="mt-2 text-gray-500">{activeAddress.houseNumber}, {activeAddress.exactLocation}</p>
                            <p className="text-gray-500">{activeAddress.city}, {activeAddress.state} {activeAddress.pinCode}</p>
                        </div>
                    </div>
                )}
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
                                    ${item.product_price * item.quantity}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="h-px bg-gray-100 my-6" />

                    <div className="space-y-4 text-sm mb-2">
                        <div className="flex justify-between text-gray-500">
                            <span>Subtotal</span>
                            <span className="text-gray-900 font-medium">${subtotal}</span>
                        </div>
                        <div className="flex justify-between text-gray-500">
                            <span>Shipping</span>
                            <span className="text-gray-900 font-medium">${shipping_fee}</span>
                        </div>
                        {discount_applied > 0 && (
                            <div className="flex justify-between text-emerald-600">
                                <span>Discount</span>
                                <span className="font-medium">-${discount_applied}</span>
                            </div>
                        )}
                        <div className="h-px bg-gray-100 my-4" />
                        <div className="flex justify-between text-xl font-bold text-gray-900">
                            <span>Total Pay</span>
                            <span>${total}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sticky Action Footer */}
            <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-200 p-3 sm:px-6 sm:py-3.5 z-[60] shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.1)]">
                <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
                    <button
                        onClick={prevStep}
                        disabled={isProcessing}
                        className="h-11 px-5 sm:px-6 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-200 disabled:opacity-50 transition-colors font-semibold"
                        aria-label="Go back to Address"
                    >
                        <ArrowLeft size={18} className="sm:mr-2" />
                        <span className="hidden sm:inline">Back</span>
                    </button>
                    
                    <button
                        onClick={handlePayment}
                        disabled={isProcessing}
                        className="flex-grow sm:flex-grow-0 sm:w-72 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white px-6 py-3 rounded-xl font-bold shadow-md shadow-emerald-200 transition-all flex items-center justify-center gap-3 relative overflow-hidden text-base"
                    >
                        {isProcessing ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Processing...
                            </>
                        ) : (
                            <>
                                {selectedMethod === 'cod' ? (
                                    <>
                                        <CheckCircle2 size={18} />
                                        Place Order (COD)
                                    </>
                                ) : (
                                    <>
                                        <Lock size={18} />
                                        Pay ${total} Securely
                                    </>
                                )}
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
