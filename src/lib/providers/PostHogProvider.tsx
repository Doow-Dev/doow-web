'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { useEffect, useState } from 'react'

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const [posthogClient, setPosthogClient] = useState<typeof posthog | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
      const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com'

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
      }
    }
  }, [posthogClient])

  if (!posthogClient) {
    return <>{children}</>
  }

  return <PHProvider client={posthogClient}>{children}</PHProvider>
}
