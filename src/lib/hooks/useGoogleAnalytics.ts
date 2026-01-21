'use client'

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, any>
    ) => void
    dataLayer: any[]
  }
}

export function useGoogleAnalytics() {
  const trackEvent = (
    eventName: string,
    parameters?: {
      event_category?: string
      event_label?: string
      value?: number
      [key: string]: any
    }
  ) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, parameters)
    }
  }

  const trackPageView = (url: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'G-Q1X68F95Q2', {
        page_path: url,
      })
    }
  }

  return {
    trackEvent,
    trackPageView,
  }
}

