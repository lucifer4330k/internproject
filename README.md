# Ecoyaan Checkout Flow

A modern, responsive checkout flow built for the Ecoyaan frontend engineering assignment. This application demonstrates Best-in-Class UI/UX, Next.js Server-Side Rendering (SSR), and clean global state management.

## Flow & Features
1. **Cart/Order Summary**: Real-time quantity adjustments, simulated Server-Side data hydration.
2. **Shipping Address**: Comprehensive Zod schema validation using React Hook Form.
3. **Payment Method**: Final order summary with a simulated secure payment workflow.
4. **Success Screen**: A delightful confirmation animation upon successful flow completion.

## Architectural Choices 🏗️

- **Next.js 15 (App Router)**: Leveraged for its powerful Server Components. The root `page.tsx` simulates data fetching on the server, ensuring rapid First Contentful Paint.
- **Tailwind CSS v4 & Framer Motion**: Utilized for a premium, highly responsive, and micro-animated aesthetic that doesn't feel like a standard "MVP" template but a high-end consumer product.
- **Zustand**: Chosen over Redux/Context for state management due to its zero-boilerplate, easy-to-use hooks. It handles everything centrally (`Cart`, `Pricing`, `Address`, `Current Step`) preventing prop-drilling across screens.
- **React Hook Form + Zod**: The optimal choice for performant, type-safe form validation without unnecessary re-renders during user keyboard input.

## Getting Started Locally 🚀

### Prerequisites
- Node.js 18+

### Setup Instructions
1. Clone the repository and navigate to the project directory:
   ```bash
   git clone <repository-url>
   cd ecoyaan-assignment
   ```

2. Install the necessary dependencies:
   ```bash
   npm install --legacy-peer-deps
   # or
   yarn install
   # or
   pnpm install
   ```
   *(Note: The `--legacy-peer-deps` flag may be required due to bleeding-edge React 19 peer dependency constraints in framer-motion/react-hook-form).*

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   [http://localhost:3000](http://localhost:3000)

Enjoy an ultra-smooth checking out experience! 🌱
