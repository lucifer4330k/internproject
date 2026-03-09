import { create } from 'zustand';

export type CartItem = {
    product_id: number;
    product_name: string;
    product_price: number;
    quantity: number;
    image: string;
};

export type Pricing = {
    shipping_fee: number;
    discount_applied: number;
};

export type Address = {
    fullName: string;
    email: string;
    phone: string;
    pinCode: string;
    city: string;
    state: string;
};

interface CheckoutState {
    cartItems: CartItem[];
    pricing: Pricing;
    address: Address | null;
    currentStep: number;
    setCartData: (items: CartItem[], pricing: Pricing) => void;
    updateQuantity: (id: number, delta: number) => void;
    setAddress: (address: Address) => void;
    setStep: (step: number) => void;
    nextStep: () => void;
    prevStep: () => void;
}

export const useCheckoutStore = create<CheckoutState>((set) => ({
    cartItems: [],
    pricing: { shipping_fee: 0, discount_applied: 0 },
    address: null,
    currentStep: 1, // 1: Cart, 2: Address, 3: Payment, 4: Success
    setCartData: (items, pricing) => set({ cartItems: items, pricing }),
    updateQuantity: (id, delta) => set((state) => ({
        cartItems: state.cartItems.map(item =>
            item.product_id === id
                ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                : item
        )
    })),
    setAddress: (address) => set({ address }),
    setStep: (step) => set({ currentStep: step }),
    nextStep: () => set((state) => ({ currentStep: Math.min(4, state.currentStep + 1) })),
    prevStep: () => set((state) => ({ currentStep: Math.max(1, state.currentStep - 1) })),
}));
