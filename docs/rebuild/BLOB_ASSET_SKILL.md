---
name: azure-blob-asset-handling
description: Use this skill whenever image or video asset URLs come directly from Azure Blob Storage (URLs matching *.blob.core.windows.net/*) and need to be used in the landing page codebase. Covers the complete strategy for centralizing blob URLs, rendering hero background images with maximum performance and LCP scores, handling click-to-play demo videos, next/image configuration for remote blob patterns, caching at every layer (server, browser, CDN), preloading above-fold assets, quality settings by asset type, and the exact component implementations to use. Trigger on any request involving blob URLs, hero background images, demo videos, or asset delivery performance from Azure Blob Storage.
---

You are handling Azure Blob Storage asset URLs in a Next.js/React landing page. Assets arrive as raw blob URLs from the admin (e.g. `https://landingpageassests.blob.core.windows.net/images/hero-bg.jpg`). Your job is to ensure every asset is delivered at maximum quality, loads as fast as possible, achieves excellent Core Web Vitals scores, and is cached correctly at every layer. Follow every rule in this skill without exception.

---

## Guiding Principle

**Never let a raw blob URL reach a component directly.** Raw blob URLs point to a single-region Azure storage endpoint with no CDN, no compression, and no optimization. All blob URLs must be centralized into one environment variable and one helper function. Components always call the helper — never hardcode or inline blob URLs anywhere in JSX or logic files.

When Front Door is added later, only the environment variable changes. Every component stays untouched.

---

## 1. Environment Setup

### Environment Variables

```bash
# .env.local  (gitignored — contains the raw blob base URL)
NEXT_PUBLIC_BLOB_BASE_URL=https://landingpageassests.blob.core.windows.net/images

# .env.production  (committed — no secrets, safe to version control)
NEXT_PUBLIC_BLOB_BASE_URL=https://landingpageassests.blob.core.windows.net/images
# Later when Front Door is configured, this becomes:
# NEXT_PUBLIC_BLOB_BASE_URL=https://yourapp.com/assets
```

The value of `NEXT_PUBLIC_BLOB_BASE_URL` is the only thing that changes when infrastructure improves. All component code remains identical.

### `next.config.js` — Allow Blob Hostname

`next/image` rejects remote URLs from unknown hostnames unless explicitly allowed. Add the blob hostname to `remotePatterns`:

```js
// next.config.js
/** @type {import('next').NextConfig} */
module.exports = {
  output: 'standalone',
  reactStrictMode: true,

  images: {
    // Prefer modern formats — reduces file size significantly vs PNG/JPG
    formats: ['image/avif', 'image/webp'],

    // Cache optimized images on the Next.js server for 24 hours
    // After the first request, the processed WebP is served from server cache
    // without hitting Blob Storage again
    minimumCacheTTL: 86400,

    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'landingpageassests.blob.core.windows.net',
        pathname: '/images/**',
      },
    ],
  },

  async headers() {
    return [
      {
        // Processed images cached in browser for 24hrs, stale-while-revalidate
        // for seamless background refresh without user-visible delay
        source: '/_next/image(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=3600',
          },
        ],
      },
      {
        // JS/CSS chunks — immutable, content-hashed filenames
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // HTML pages — browsers always revalidate, CDN edge caches for 5 min
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, s-maxage=300, stale-while-revalidate=60',
          },
        ],
      },
    ];
  },
};
```

---

## 2. Blob URL Helper

Create this file once. Every component in the codebase imports from here — never constructs blob URLs manually.

```ts
// lib/azure/blob.ts

const BASE = process.env.NEXT_PUBLIC_BLOB_BASE_URL;

if (!BASE && typeof window === 'undefined') {
  // Warn at build time if env var is missing — surfaces config errors early
  console.warn('[blob] NEXT_PUBLIC_BLOB_BASE_URL is not set');
}

/**
 * Returns a CDN-ready URL for a blob asset.
 * All asset URLs in the codebase must go through this function.
 *
 * @example
 * assetUrl('hero-bg.jpg')
 * → https://landingpageassests.blob.core.windows.net/images/hero-bg.jpg
 *
 * @example
 * assetUrl('demo-placeholder-vid.mp4')
 * → https://landingpageassests.blob.core.windows.net/images/demo-placeholder-vid.mp4
 */
export function assetUrl(path: string): string {
  const clean = path.startsWith('/') ? path.slice(1) : path;
  return `${BASE}/${clean}`;
}

/**
 * Returns src and poster URLs for a demo video.
 * Poster is the thumbnail shown before the user clicks play.
 *
 * @example
 * videoAsset('demo-placeholder-vid.mp4', 'demo-poster.jpg')
 */
export function videoAsset(videoFile: string, posterFile: string) {
  return {
    src: assetUrl(videoFile),
    poster: assetUrl(posterFile),
  };
}
```

---

## 3. Hero Background Image

The hero background image is the **most performance-critical asset on the entire page**. It is almost always the LCP (Largest Contentful Paint) element. Every implementation decision here directly impacts your Lighthouse score.

### Why Hero Background Images Are Tricky

A CSS `background-image` is invisible to the browser's preload scanner — the browser cannot discover it until CSS is parsed, which is too late for LCP. This is why hero backgrounds must be implemented as `next/image` with `priority`, not as a CSS background. `next/image` with `priority` generates a `<link rel="preload">` in `<head>` which the browser discovers immediately on HTML parse — before any JS runs.

### The Correct Implementation

```tsx
// components/landing/Hero.tsx
import Image from 'next/image';
import { assetUrl } from '@/lib/azure/blob';

export function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">

      {/*
        Hero background image — ALWAYS next/image with priority.
        Never CSS background-image for the LCP element.

        priority:
          Generates <link rel="preload"> in <head>.
          Browser discovers and fetches this before any JS runs.
          Single most impactful LCP optimization.

        fill:
          Makes the image cover the full parent container.
          Parent must be position: relative with explicit height.

        quality={90}:
          Higher than default for hero — this is the first thing users see.
          The visual quality difference between 85 and 90 is visible on large screens.

        sizes="100vw":
          Image is always full viewport width — tells browser to fetch
          the full-width variant rather than a smaller one.

        placeholder="blur" + blurDataURL:
          Shows a low-quality blurred placeholder while the real image loads.
          Prevents the hero from appearing blank during load.
          Dramatically improves perceived performance.
      -->
      <Image
        src={assetUrl('hero-bg.jpg')}
        alt=""                              // decorative background — empty alt is correct
        fill
        priority                            // NEVER omit this on the hero background
        quality={90}
        sizes="100vw"
        className="object-cover object-center"
        placeholder="blur"
        blurDataURL={HERO_BLUR_DATA_URL}    // see blur placeholder section below
      />

      {/* Dark overlay for text readability — pure CSS, zero cost */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Hero content sits above the image via z-index */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-display font-bold text-white tracking-tight">
          Your Hero Headline
        </h1>
        <p className="mt-6 text-xl text-white/80 max-w-2xl">
          Your subheadline copy here.
        </p>
        <a
          href="/signup"
          className="mt-10 px-8 py-4 bg-brand-500 text-white rounded-lg font-semibold text-lg hover:bg-brand-600 transition-colors"
        >
          Get Started Free
        </a>
      </div>

    </section>
  );
}
```

### Generating the Blur Placeholder

The `blurDataURL` must be a base64-encoded tiny version of the image (typically 8x8 or 10x10 pixels). Generate it once at build time and store it as a constant — never compute it at runtime.

**Method 1 — Generate with sharp (recommended, run once locally):**

```ts
// scripts/generate-blur.ts
// Run: npx ts-node scripts/generate-blur.ts
import sharp from 'sharp';
import { readFileSync } from 'fs';

async function generateBlur(imagePath: string) {
  const buffer = readFileSync(imagePath);
  const resized = await sharp(buffer)
    .resize(10, 10, { fit: 'cover' })
    .webp({ quality: 20 })
    .toBuffer();
  
  const base64 = `data:image/webp;base64,${resized.toString('base64')}`;

}

generateBlur('./public/images/hero-bg.jpg');
```

**Method 2 — Generate with plaiceholder package:**

```bash
npm install plaiceholder sharp
```

```ts
// Run at build time in a Server Component or in a build script
import { getPlaiceholder } from 'plaiceholder';
import { readFileSync } from 'fs';

const buffer = readFileSync('./public/images/hero-bg.jpg');
const { base64 } = await getPlaiceholder(buffer);
// Store the output as HERO_BLUR_DATA_URL constant
```

**Store the result as a constant:**

```ts
// lib/blur-placeholders.ts
// Generated once — paste the base64 output here
// This is a tiny 10px version of the image, safe to inline

export const HERO_BLUR_DATA_URL =
  'data:image/webp;base64,UklGRlQAAABXRUJQVlA4IEgAAADQAQCdASoKAAoAAUAmJYgCdAEO/gHOAAA=';
  // ↑ Replace with your actual generated base64 string
```

Then import and use it in the Hero component:

```tsx
import { HERO_BLUR_DATA_URL } from '@/lib/blur-placeholders';

<Image
  src={assetUrl('hero-bg.jpg')}
  alt=""
  fill
  priority
  quality={90}
  sizes="100vw"
  className="object-cover object-center"
  placeholder="blur"
  blurDataURL={HERO_BLUR_DATA_URL}
/>
```

### Additional Preload in `app/layout.tsx`

For maximum LCP performance, add a manual DNS prefetch for the blob hostname so the browser opens the TCP connection before it even starts rendering the page:

```tsx
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Pre-open connection to blob storage — shaves ~100-300ms off first blob request */}
        <link rel="preconnect" href="https://landingpageassests.blob.core.windows.net" />
        <link rel="dns-prefetch" href="https://landingpageassests.blob.core.windows.net" />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

Note: `next/image` with `priority` also generates a `<link rel="preload">` automatically — you do not need to add that manually. The preconnect above is in addition to that, not a replacement.

---

## 4. Caching Layers for the Hero Background Image

The hero background image passes through three caching layers. Each one serves a different purpose:

### Layer 1 — Next.js Server Cache (`minimumCacheTTL`)

On the **first ever request** for the hero image, `next/image` fetches the raw JPG/PNG from Blob Storage, converts it to WebP/AVIF, resizes it for the requested breakpoint, and stores the result on the server's filesystem.

On every **subsequent request** for the same image at the same size, the server returns the cached processed file without touching Blob Storage. `minimumCacheTTL: 86400` means this cache lives for 24 hours.

This is the optimization that prevents your App Service from hammering Blob Storage on every page load.

### Layer 2 — Browser Cache

The `Cache-Control: public, max-age=86400, stale-while-revalidate=3600` header on `/_next/image` means:
- Browser caches the processed image for 24 hours
- After 24 hours, it serves the stale version immediately while fetching a fresh one in the background
- Users on repeat visits pay zero cost — the image loads from disk cache instantly

### Layer 3 — CDN Edge Cache (when Front Door is configured)

When Azure Front Door is in front of the app, it caches the optimized `/_next/image` response at the edge closest to the user. The `s-maxage` directive in your headers tells Front Door how long to cache it. Add `s-maxage` to the `/_next/image` header when Front Door is configured:

```js
// next.config.js — update this header when Front Door is added
{
  source: '/_next/image(.*)',
  headers: [
    {
      key: 'Cache-Control',
      // s-maxage=86400: Front Door edge caches for 24hrs
      // max-age=86400:  Browser also caches for 24hrs
      value: 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=3600',
    },
  ],
},
```

### Full Cache Flow for Hero Image

```
First user visits the page:
  Browser → Next.js server (/_next/image)
    → Server fetches raw JPG from Blob Storage
    → Converts to WebP, resizes to viewport width
    → Stores result in server cache (24hrs)
    → Returns WebP to browser
    → Browser caches for 24hrs

Second user (same server, different browser):
  Browser → Next.js server (/_next/image)
    → Cache HIT — returns stored WebP instantly
    → Blob Storage never touched again

Same user returns within 24hrs:
  Browser → Disk cache HIT
    → Image loads from local disk, zero network request
    → Instant render, LCP is effectively 0ms for cached users

With Front Door added:
  Browser → Front Door edge (nearest PoP)
    → Edge cache HIT after first user warms it
    → Next.js server never involved
```

---

## 5. Demo Video (Click to Play)

The demo video is `demo-placeholder-vid.mp4`. It must never download until the user explicitly clicks play. The pattern below ensures zero video bytes are loaded on page init.

### The Poster Image

You need a poster image — a static JPEG thumbnail of the video's first frame or a designed preview image. The poster loads via `next/image` (optimized, lazy, correct size) and is all the user sees until they click play. The video file is never touched until that click.

If admin provides a separate poster image, use it. If not, extract the first frame using FFmpeg:

```bash
ffmpeg -i demo-placeholder-vid.mp4 -vframes 1 -q:v 2 demo-poster.jpg
```

Upload the poster image to Blob Storage alongside the video.

### Component Implementation

```tsx
// components/landing/DemoVideo.tsx
'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { assetUrl, videoAsset } from '@/lib/azure/blob';

export function DemoVideo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { src, poster } = videoAsset(
    'demo-placeholder-vid.mp4',
    'demo-poster.jpg'
  );

  const handlePlay = useCallback(() => {
    setIsPlaying(true);
    // Small timeout allows the video element to mount before calling play()
    setTimeout(() => {
      videoRef.current?.play().catch(() => {
        // Autoplay blocked by browser — controls are visible, user can click manually
      });
    }, 50);
  }, []);

  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-gray-900">

      {/* ─── POSTER STATE (default) ─────────────────────────────────────────── */}
      {!isPlaying && (
        <div
          className="absolute inset-0 cursor-pointer group"
          onClick={handlePlay}
          role="button"
          aria-label="Play product demo video"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handlePlay()}
        >
          {/*
            Poster image via next/image:
            - Lazy loaded (below fold — no priority)
            - Converted to WebP automatically
            - Correct breakpoint size delivered
            - Zero video bytes downloaded at this point
          */}
          <Image
            src={poster}
            alt="Product demo preview — click to play"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 80vw"
            quality={85}
          />

          {/* Overlay gradient for play button visibility */}
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-200" />

          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="
              w-20 h-20 rounded-full bg-white/95 shadow-xl
              flex items-center justify-center
              group-hover:scale-110 group-hover:bg-white
              transition-transform duration-200
            ">
              <svg
                className="w-8 h-8 text-gray-900 ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>

          {/* Optional: video duration badge */}
          <div className="absolute bottom-4 right-4 bg-black/70 text-white text-sm px-2 py-1 rounded">
            2:34
          </div>
        </div>
      )}

      {/* ─── VIDEO STATE (after click) ───────────────────────────────────────── */}
      {isPlaying && (
        <video
          ref={videoRef}
          src={src}
          controls
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          /*
            preload="auto": user clicked play — load the full video now.
            This is the ONLY place preload="auto" is acceptable.
            Never use preload="auto" before the user has initiated playback.
          */
          preload="auto"
          onEnded={() => setIsPlaying(false)} // return to poster state when video ends
        />
      )}

    </div>
  );
}
```

### Critical `preload` Rules

| Scenario | `preload` value | Reason |
|---|---|---|
| Video not yet clicked (poster showing) | — (element not rendered) | Zero bytes loaded |
| Background loop video, above fold | `"metadata"` | Only fetches dimensions/duration, not video data |
| Background loop video, below fold | `"none"` | Nothing loaded until IntersectionObserver triggers |
| Demo video after user clicks play | `"auto"` | User has signalled intent — load fully |

Never render the `<video>` element at all until the user clicks play for a demo video. Rendering it with `preload="none"` still causes the browser to establish a connection to the video origin. Conditional rendering (`{isPlaying && <video .../>}`) is the cleanest approach.

---

## 6. Image Quality Settings by Asset Type

Use these quality values consistently. Never use `quality={100}` — the file size increase is dramatic while the visual difference is imperceptible on screen.

```tsx
// Hero background — first thing user sees, full screen, high stakes
quality={90}

// Feature screenshots, product UI images — prominent, user scrutinises
quality={85}

// Team photos, testimonial headshots — medium prominence
quality={80}

// Customer logos, partner logos — simple graphics, low colour complexity
quality={75}

// Background decorative images — user isn't scrutinising
quality={70}

// Video poster / thumbnail — small, shown briefly
quality={80}
```

---

## 7. `sizes` Prop — Critical for Performance

The `sizes` prop tells the browser which image resolution to download at each viewport width. Getting this wrong means mobile users download a 1200px image when they only need 390px — a 9x file size penalty.

Always match `sizes` exactly to your CSS layout:

```tsx
// Full viewport width (hero background, full-bleed sections)
sizes="100vw"

// Full width on mobile, 80% on desktop (demo video area)
sizes="(max-width: 768px) 100vw, 80vw"

// Full width on mobile, half on tablet, third on desktop (feature grid)
sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"

// Fixed-width component regardless of viewport (logo, avatar)
sizes="120px"

// Full width on mobile, fixed width on desktop
sizes="(max-width: 768px) 100vw, 600px"
```

---

## 8. Complete File Structure

```
/lib
  /azure
    blob.ts              ← assetUrl() and videoAsset() helpers
  blur-placeholders.ts   ← generated blur base64 constants

/components
  /landing
    Hero.tsx             ← uses next/image with priority + blur placeholder
    DemoVideo.tsx        ← click-to-play with poster via next/image

/scripts
  generate-blur.ts       ← run once to generate blur placeholder base64

/.env.local              ← NEXT_PUBLIC_BLOB_BASE_URL (gitignored)
/.env.production         ← NEXT_PUBLIC_BLOB_BASE_URL (committed, no secrets)
```

---

## 9. What the Coding Agent Must Never Do

These are hard rules. Violating any of them creates performance regressions, cache misses, or security issues:

- **Never hardcode a blob URL** (`blob.core.windows.net`) in any component file — always use `assetUrl()`
- **Never use `<img>` tags** for any blob asset — always `next/image`
- **Never use CSS `background-image`** for the hero — always `next/image` with `fill` and `priority`
- **Never omit `priority`** on the hero background image — it is the LCP element
- **Never omit `sizes` prop** on any `next/image` — wrong sizes causes massive over-fetching on mobile
- **Never render `<video>` on page load** for a demo video — conditional render only after user click
- **Never use `preload="auto"`** on any video element until the user has clicked play
- **Never use `quality={100}`** — use the quality table in section 6
- **Never use `placeholder="blur"` without a `blurDataURL`** — it falls back to a grey box which looks broken

---

## 10. Deployment Checklist for Blob Assets

Before shipping, verify every item:

- [ ] `NEXT_PUBLIC_BLOB_BASE_URL` set correctly in all environments
- [ ] Blob hostname added to `remotePatterns` in `next.config.js`
- [ ] `minimumCacheTTL: 86400` set in images config
- [ ] `/_next/image` route has correct `Cache-Control` header in `next.config.js`
- [ ] Hero `<Image>` has `priority` prop — confirm in rendered HTML that `<link rel="preload">` appears in `<head>`
- [ ] Hero `<Image>` has `placeholder="blur"` and valid `blurDataURL`
- [ ] Hero `<Image>` uses `fill` + parent has `position: relative` and explicit height
- [ ] Hero `<Image>` has `sizes="100vw"`
- [ ] Hero `<Image>` has `quality={90}`
- [ ] Blob hostname has `<link rel="preconnect">` in `app/layout.tsx`
- [ ] Demo video renders only poster on page load — confirm in Network tab that MP4 is not requested until play click
- [ ] Demo video poster uses `next/image` (not `<img>`)
- [ ] Demo video `<video>` element has `preload="auto"` (only rendered after click)
- [ ] Run Lighthouse on production build — LCP target < 2.5s
- [ ] Check Network tab on mobile throttling (Slow 3G) — hero image loads progressively with blur placeholder visible
