import { NextResponse } from 'next/server';

export async function GET() {
    const data = {
        cartItems: [
            {
                product_id: 101,
                product_name: "Bamboo Toothbrush (Pack of 4)",
                product_price: 299,
                quantity: 2,
                image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=300&h=300"
            },
            {
                product_id: 102,
                product_name: "Reusable Cotton Produce Bags",
                product_price: 450,
                quantity: 1,
                image: "https://images.unsplash.com/photo-1610419993549-743fb3f478a8?auto=format&fit=crop&q=80&w=300&h=300"
            }
        ],
        shipping_fee: 50,
        discount_applied: 0
    };

    return NextResponse.json(data);
}
