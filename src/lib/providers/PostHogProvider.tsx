'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { useEffect, useState } from 'react'

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const [posthogClient, setPosthogClient] = useState<typeof posthog | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Next.js replaces process.env.NEXT_PUBLIC_* at build time
      const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
      const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com'

      // Debug logging (only in production to help troubleshoot)
      if (process.env.NODE_ENV === 'production') {
        console.log('[PostHog Debug] Key exists:', !!posthogKey)
        console.log('[PostHog Debug] Key length:', posthogKey?.length || 0)
        console.log('[PostHog Debug] Host:', posthogHost)
      }

      if (posthogKey && !posthogClient) {
        posthog.init(posthogKey, {
          api_host: posthogHost,
          person_profiles: 'identified_only',
          autocapture: true,
          capture_pageview: true,
          capture_pageleave: true,
          loaded: () => {
            if (process.env.NODE_ENV === 'development') {
              console.log('PostHog initialized')
            }
            setPosthogClient(posthog)
          },
        })
      } else if (!posthogKey) {
        console.warn('PostHog key not found. Analytics will not be tracked.')
        console.warn('[PostHog Debug] process.env.NEXT_PUBLIC_POSTHOG_KEY:', process.env.NEXT_PUBLIC_POSTHOG_KEY)
      }
    }
  }, [posthogClient])

  if (!posthogClient) {
    return <>{children}</>
  }

  return <PHProvider client={posthogClient}>{children}</PHProvider>
}
