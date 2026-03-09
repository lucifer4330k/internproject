import CheckoutFlow from '@/components/CheckoutFlow';

async function getCheckoutData() {
  // Dynamically resolve the absolute URL for the API route.
  // In production on Vercel, process.env.VERCEL_URL is automatically populated.
  // We fall back to localhost:3000 for local development.
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';

  const res = await fetch(`${baseUrl}/api/checkout`, {
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
