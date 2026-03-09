'use client';

import { useEffect, useState } from 'react';
import { useCheckoutStore, CartItem } from '@/store/useCheckoutStore';
import { AnimatePresence, motion } from 'framer-motion';

// Screens
import CartScreen from './screens/CartScreen';
import AddressScreen from './screens/AddressScreen';
import PaymentScreen from './screens/PaymentScreen';
import SuccessScreen from './screens/SuccessScreen';

// Layout
import Header from './Header';
import Footer from './Footer';

interface CheckoutFlowProps {
    initialData: {
        cartItems: CartItem[];
        shipping_fee: number;
        discount_applied: number;
    };
}

export default function CheckoutFlow({ initialData }: CheckoutFlowProps) {
    const { setCartData, currentStep } = useCheckoutStore();
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        // Hydrate store with SSR data
        setCartData(initialData.cartItems, {
            shipping_fee: initialData.shipping_fee,
            discount_applied: initialData.discount_applied
        });
        setHydrated(true);
    }, [initialData, setCartData]);

    if (!hydrated) {
        return <div className="min-h-screen w-full flex items-center justify-center bg-neutral-50">
            <div className="w-8 h-8 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin" />
        </div>;
    }

    const renderStep = () => {
        switch (currentStep) {
            case 1: return <CartScreen key="step1" />;
            case 2: return <AddressScreen key="step2" />;
            case 3: return <PaymentScreen key="step3" />;
            case 4: return <SuccessScreen key="step4" />;
            default: return <CartScreen key="default" />;
        }
    };

    return (
        <>
            {currentStep < 4 && <Header />}

            <div className="flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-8">
                <div className="w-full max-w-4xl">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                            {renderStep()}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {currentStep < 4 && <Footer />}
        </>
    );
}
