'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { useEffect, useState } from 'react'

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const [posthogClient, setPosthogClient] = useState<typeof posthog | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // TEMPORARY: Hardcoded values for debugging
      // TODO: Replace with environment variables after confirming this works
      const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY || 'phc_V6I6bimhG3mzVQpzbmFtiqSaoLuFuTvrASUDNYNJXnC'
      const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com'

      // Debug logging (only in production to help troubleshoot)
      if (process.env.NODE_ENV === 'production') {
        console.log('[PostHog Debug] Key exists:', !!posthogKey)
        console.log('[PostHog Debug] Key length:', posthogKey?.length || 0)
        console.log('[PostHog Debug] Host:', posthogHost)
        console.log('[PostHog Debug] Using hardcoded fallback:', !process.env.NEXT_PUBLIC_POSTHOG_KEY)
      }

      if (posthogKey && !posthogClient) {
        posthog.init(posthogKey, {
          api_host: posthogHost,
          person_profiles: 'identified_only',
          autocapture: true,
          capture_pageview: true,
          capture_pageleave: true,
          loaded: () => {
            console.log('✅ PostHog initialized successfully')
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
