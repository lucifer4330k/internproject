import { ShoppingBag } from 'lucide-react';
import { useCheckoutStore } from '@/store/useCheckoutStore';

export default function Header() {
    const { currentStep } = useCheckoutStore();

    const steps = [
        { id: 1, name: 'Cart' },
        { id: 2, name: 'Address' },
        { id: 3, name: 'Payment' }
    ];

    return (
        <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="bg-emerald-500 p-2 rounded-lg text-white">
                        <ShoppingBag size={20} />
                    </div>
                    <span className="font-bold text-xl tracking-tight text-emerald-950">Ecoyaan</span>
                </div>

                <nav className="hidden sm:flex items-center gap-4">
                    {steps.map((step, idx) => (
                        <div key={step.id} className="flex items-center gap-4">
                            <div className={`flex items-center gap-2 text-sm font-medium transition-colors ${currentStep >= step.id ? 'text-emerald-600' : 'text-gray-400'}`}>
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${currentStep >= step.id ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-400'}`}>
                                    {step.id}
                                </div>
                                {step.name}
                            </div>
                            {idx < steps.length - 1 && (
                                <div className={`h-[2px] w-8 ${currentStep > step.id ? 'bg-emerald-500' : 'bg-gray-200'}`} />
                            )}
                        </div>
                    ))}
                </nav>
            </div>
        </header>
    );
}
