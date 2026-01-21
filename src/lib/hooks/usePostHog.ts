'use client'

import { usePostHog } from 'posthog-js/react'

export function usePostHogTracking() {
  const posthog = usePostHog()

  const trackEvent = (eventName: string, properties?: Record<string, any>) => {
    if (posthog) {
      posthog.capture(eventName, properties)
    }
  }

  const identifyUser = (userId: string, properties?: Record<string, any>) => {
    if (posthog) {
      posthog.identify(userId, properties)
    }
  }

  const resetUser = () => {
    if (posthog) {
      posthog.reset()
    }
  }

  return {
    trackEvent,
    identifyUser,
    resetUser,
    posthog, // Expose the full posthog instance for advanced usage
  }
}

