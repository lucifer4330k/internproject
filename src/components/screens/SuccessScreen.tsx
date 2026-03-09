import { useCheckoutStore } from '@/store/useCheckoutStore';
import { CheckCircle, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SuccessScreen() {
    const { address, setCartData, setStep } = useCheckoutStore();

    const handleReturnHome = () => {
        // Reset flow entirely
        setCartData([], 0, 0);
        setStep(1);
        // In a real app this would navigate to '/'
        window.location.reload();
    };

    return (
        <div className="flex flex-col items-center justify-center text-center py-12 px-4">
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="w-24 h-24 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mb-8"
            >
                <CheckCircle size={48} strokeWidth={2.5} />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Order Successful!</h1>
                <p className="text-lg text-gray-500 mb-8 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="font-medium text-gray-900">{address?.fullName?.split(' ')[0]}</span>. Your eco-friendly products are being prepared and will be shipped to {address?.city} shortly.
                </p>

                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm mb-10 text-left inline-block max-w-sm w-full">
                    <p className="text-sm font-medium text-gray-500 mb-1">Order Reference</p>
                    <p className="text-lg font-mono font-semibold text-gray-900 uppercase">
                        ECO-{Math.random().toString(36).substr(2, 8)}
                    </p>
                </div>

                <button
                    onClick={handleReturnHome}
                    className="mx-auto flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-8 py-3.5 rounded-xl font-semibold shadow-sm transition-all"
                >
                    <ShoppingBag size={18} />
                    Continue Shopping
                </button>
            </motion.div>
        </div>
    );
}
