import CheckoutFlow from '@/components/CheckoutFlow';

import { GET } from './api/checkout/route';

async function getCheckoutData() {
  // In Next.js Server Components, fetching absolute URLs to your own API routes 
  // during build or SSR on Vercel can often cause 500 errors or hangs due to the serverless architecture.
  // Best practice is to directly call the server logic.

  const response = await GET();
  const data = await response.json();
  return data;
}

export default async function Home() {
  const data = await getCheckoutData();

  return (
    <main className="min-h-screen bg-neutral-50 flex flex-col font-sans">
      <CheckoutFlow initialData={data} />
    </main>
  );
}
