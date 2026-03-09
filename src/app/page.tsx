import CheckoutFlow from '@/components/CheckoutFlow';

async function getCheckoutData() {
  const res = await fetch('http://localhost:3000/api/checkout', {
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Home() {
  const data = await getCheckoutData();

  return (
    <main className="min-h-screen bg-neutral-50 flex flex-col font-sans">
      <CheckoutFlow initialData={data} />
    </main>
  );
}
