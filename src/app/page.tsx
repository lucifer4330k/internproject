import CheckoutFlow from '@/components/CheckoutFlow';

// Simulate SSR data fetching
async function getCheckoutData() {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  return {
    cartItems: [
      {
        product_id: 101,
        product_name: "Bamboo Toothbrush (Pack of 4)",
        product_price: 299,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1626897505254-e0f811aa9bf8?q=80&w=2940&auto=format&fit=crop"
      },
      {
        product_id: 102,
        product_name: "Reusable Cotton Produce Bags",
        product_price: 450,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1610419993549-743fb3f478a8?q=80&w=2864&auto=format&fit=crop"
      }
    ],
    pricing: {
      shipping_fee: 50,
      discount_applied: 0
    }
  };
}

export default async function Home() {
  const data = await getCheckoutData();

  return (
    <main className="min-h-screen bg-neutral-50 flex flex-col font-sans">
      <CheckoutFlow initialData={data} />
    </main>
  );
}
