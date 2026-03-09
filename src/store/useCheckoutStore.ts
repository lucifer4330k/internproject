import { create } from 'zustand';

export type CartItem = {
    product_id: number;
    product_name: string;
    product_price: number;
    quantity: number;
    image: string;
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
    shipping_fee: number;
    discount_applied: number;
    address: Address | null;
    currentStep: number;
    // Update the setter to take the flat values
    setCartData: (items: CartItem[], shipping: number, discount: number) => void;
    updateQuantity: (id: number, delta: number) => void;
    setAddress: (address: Address) => void;
    setStep: (step: number) => void;
    nextStep: () => void;
    prevStep: () => void;
}

export const useCheckoutStore = create<CheckoutState>((set) => ({
    cartItems: [],
    shipping_fee: 0,
    discount_applied: 0,
    address: null,
    currentStep: 1,
    setCartData: (items, shipping, discount) => set({
        cartItems: items,
        shipping_fee: shipping,
        discount_applied: discount
    }),
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
