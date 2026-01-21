This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## PostHog Analytics Setup

This project includes PostHog for tracking user activities and visits. To set it up:

1. Get your PostHog project API key from [PostHog Settings](https://posthog.com/settings/project)
2. Create a `.env.local` file in the root directory (if it doesn't exist)
3. Add the following environment variables:

```bash
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_project_api_key_here
# Optional: Custom PostHog host (defaults to https://us.i.posthog.com)
# NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

4. Restart your development server

### Usage

Use the `usePostHogTracking` hook in any client component to track events:

```tsx
'use client'
import { usePostHogTracking } from '@/lib/hooks/usePostHog'

export function MyComponent() {
  const { trackEvent, identifyUser } = usePostHogTracking()

  const handleButtonClick = () => {
    trackEvent('button_clicked', { button_name: 'signup' })
  }

  const handleLogin = (userId: string) => {
    identifyUser(userId, { email: 'user@example.com' })
  }

  return <button onClick={handleButtonClick}>Click me</button>
}
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
