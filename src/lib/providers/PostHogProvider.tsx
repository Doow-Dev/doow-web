'use client'

import posthog from "posthog-js"
import { PostHogProvider as PHProvider } from "posthog-js/react"
import { useEffect, useRef } from "react"

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const hasInitialized = useRef(false)
  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY

  useEffect(() => {
    if (!posthogKey || hasInitialized.current) return

    posthog.init(posthogKey, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com",
      person_profiles: "identified_only",
      autocapture: true,
      capture_pageview: true,
      capture_pageleave: true,
    })

    hasInitialized.current = true
  }, [posthogKey])

  if (!posthogKey) {
    return <>{children}</>
  }

  return <PHProvider client={posthog}>{children}</PHProvider>
}
