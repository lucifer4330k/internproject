import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CartItem = {
    product_id: number;
    product_name: string;
    product_price: number;
    quantity: number;
    image: string;
};

export type Address = {
    id: string; // Unique identifier for the address
    fullName: string;
    email: string;
    phone: string;
    houseNumber: string;
    exactLocation: string;
    pinCode: string;
    city: string;
    state: string;
};

interface CheckoutState {
    cartItems: CartItem[];
    shipping_fee: number;
    discount_applied: number;
    addresses: Address[];
    selectedAddressId: string | null;
    currentStep: number;
    // Setters
    setCartData: (items: CartItem[], shipping: number, discount: number) => void;
    updateQuantity: (id: number, delta: number) => void;
    addAddress: (address: Address) => void;
    setSelectedAddress: (id: string | null) => void;
    setStep: (step: number) => void;
    nextStep: () => void;
    prevStep: () => void;
    resetFlow: () => void;
}

export const useCheckoutStore = create<CheckoutState>()(
    persist(
        (set) => ({
            cartItems: [],
            shipping_fee: 0,
            discount_applied: 0,
            addresses: [],
            selectedAddressId: null,
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

            addAddress: (address) => set((state) => {
                // Determine if this address already exists or is an update (optional, simple push here)
                // For simplicity, we just push it to the list and set it as selected
                return {
                    addresses: [...state.addresses, address],
                    selectedAddressId: address.id
                };
            }),

            setSelectedAddress: (id) => set({ selectedAddressId: id }),

            setStep: (step) => set({ currentStep: step }),
            nextStep: () => set((state) => ({ currentStep: Math.min(4, state.currentStep + 1) })),
            prevStep: () => set((state) => ({ currentStep: Math.max(1, state.currentStep - 1) })),
            
            resetFlow: () => set({
                cartItems: [],
                shipping_fee: 0,
                discount_applied: 0,
                currentStep: 1,
            })
        }),
        {
            name: 'ecoyaan-checkout-storage', // name of item in the storage (must be unique)
            // persist middleware automatically handles saving to localStorage
        }
    )
);
