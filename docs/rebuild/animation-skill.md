# SKILL: Feature Showcase Section — Animated Step Sequence (Motion + Next.js)

## PURPOSE

This skill teaches a coding agent how to implement a **scrolling feature showcase section** for a SaaS landing page — the kind with a sticky left sidebar listing 4 feature points, each driving a multi-frame animated UI demonstration in the right content panel.

The section auto-advances through feature points when the user scrolls to it, and allows clicking any point to jump to that feature's animation. Each feature runs a multi-frame animation sequence that mimics product interactions (table population, row selection, detail expansion, etc.).

**Stack:** Next.js (App Router), React, Motion (`motion/react`), Tailwind CSS.

---

## HOW THE SECTION WORKS — MENTAL MODEL

```
┌─────────────────────────────────────────────────────────────┐
│  SECTION (sticky container, full-viewport height)           │
│                                                             │
│  ┌──────────────────┐  ┌──────────────────────────────────┐ │
│  │  LEFT SIDEBAR    │  │  RIGHT CONTENT PANEL             │ │
│  │                  │  │                                  │ │
│  │  1. Feature A ●  │  │  [Animated UI frame for          │ │
│  │  2. Feature B    │  │   currently active feature]      │ │
│  │  3. Feature C    │  │                                  │ │
│  │  4. Feature D    │  │  Frames advance: F1 → F2 → F3   │ │
│  │                  │  │  on auto-timer or user click     │ │
│  └──────────────────┘  └──────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### State machine (per feature point):

```
IDLE → FRAME_1 → FRAME_2 → FRAME_3 → (loop or advance to next feature)
         ↑                               ↑
    Triggered by scroll-into-view    Auto-advance timer or
    or sidebar click                 user clicks sidebar
```

---

## DESIGN ARTIFACT COMPOSITION (Figma → Code)

When the implementing agent reads Figma frames via MCP, each feature point will have **3 frame variants**. Here is how to map them:

### Frame Taxonomy

| Frame | Name in Figma | What it represents |
|-------|---------------|--------------------|
| F1 | `idle / loading` | Near-empty state — skeleton loaders, collapsed nav |
| F2 | `populated / overview` | Data table or content fully loaded, interactive |
| F3 | `detail / selected` | A row/item selected, drilled into detail view |

### Extracting Design Tokens from Figma

From each Figma frame, the agent should extract:

- **Layout dims**: card width, padding, border-radius, shadow
- **Color tokens**: background, surface, border, accent/highlight, badge colors
- **Typography**: font sizes, weights, color for each text role
- **Badge variants**: active (green), inactive (red/gray) — get exact hex
- **Skeleton**: color and shape of loading placeholders
- **Avatar stack**: size, overlap offset, border color
- **Row highlight**: background color and left-border accent on selected state

Store these as a `const DESIGN_TOKENS` object or as Tailwind config extensions, NOT hardcoded per-component.

---

## MOCK DATA STRUCTURE

Define a single data file — **never inline mock data in components**.

```ts
// lib/feature-showcase-data.ts

export type AppStatus = 'Active' | 'Inactive'
export type SeatType = 'Enterprise' | 'Team' | 'Pro'

export interface AppRow {
  id: string
  name: string
  icon: string          // URL or local svg path
  seatType: SeatType
  status: AppStatus
}

export interface Department {
  id: string
  name: string
  color: string         // dot color
  users: number
  appCount: number
  avatarUrls: string[]  // 3 avatar images for the stack
  apps: AppRow[]
}

export interface FeaturePoint {
  id: number
  label: string
  description: string
  departments: Department[]
}

export const FEATURE_DATA: FeaturePoint[] = [
  {
    id: 1,
    label: 'Discover every tool your team is using',
    description: 'Uncover the apps employees are signing up for.',
    departments: [
      {
        id: 'product',
        name: 'Product',
        color: '#6366f1',
        users: 34,
        appCount: 34,
        avatarUrls: ['/avatars/a1.jpg', '/avatars/a2.jpg', '/avatars/a3.jpg'],
        apps: [
          { id: 'notion', name: 'Notion Enterprise', icon: '/icons/notion.svg', seatType: 'Enterprise', status: 'Inactive' },
          { id: 'slack',  name: 'Slack',             icon: '/icons/slack.svg',  seatType: 'Pro',        status: 'Active'   },
        ],
      },
      {
        id: 'engineering',
        name: 'Engineering',
        color: '#10b981',
        users: 67,
        appCount: 67,
        avatarUrls: ['/avatars/b1.jpg', '/avatars/b2.jpg', '/avatars/b3.jpg'],
        apps: [
          { id: 'google',      name: 'Google',      icon: '/icons/google.svg',      seatType: 'Enterprise', status: 'Active'   },
          { id: 'notion-eng',  name: 'Notion Enterprise', icon: '/icons/notion.svg', seatType: 'Team',      status: 'Inactive' },
          { id: 'salesforce',  name: 'Salesforce',  icon: '/icons/salesforce.svg',  seatType: 'Pro',        status: 'Inactive' },
          { id: 'slack-eng',   name: 'Slack',       icon: '/icons/slack.svg',       seatType: 'Pro',        status: 'Active'   },
          { id: 'docusign',    name: 'Docusign',    icon: '/icons/docusign.svg',    seatType: 'Team',       status: 'Active'   },
        ],
      },
      {
        id: 'sales',
        name: 'Sales',
        color: '#f59e0b',
        users: 8,
        appCount: 8,
        avatarUrls: [],
        apps: [],
      },
      // ... add remaining departments
    ],
  },
  // Feature points 2, 3, 4 follow same shape
]

// Timing constants (ms)
export const FRAME_DURATIONS = {
  F1_TO_F2: 1200,   // time F1 plays before advancing to F2
  F2_IDLE: 2000,    // time user sees F2 before row is "clicked"
  F3_IDLE: 2500,    // time user sees F3 before advancing to next feature
  FEATURE_PAUSE: 500, // gap between features
} as const
```

---

## COMPONENT ARCHITECTURE

```
components/
  feature-showcase/
    FeatureShowcase.tsx          ← section root, orchestrates state & timers
    FeatureSidebar.tsx           ← left nav (4 points)
    FeaturePanel.tsx             ← right content, renders active feature's frames
    frames/
      Frame1Skeleton.tsx         ← F1: sidebar icons + empty content skeleton
      Frame2Table.tsx            ← F2: departments table, populated
      Frame3Detail.tsx           ← F3: selected department detail
    shared/
      AvatarStack.tsx
      StatusBadge.tsx
      SkeletonRow.tsx
      CursorDot.tsx              ← animated cursor tap indicator
```

---

## MOTION API USAGE — WHICH APIS TO USE WHERE

### 1. Section scroll trigger — `useInView` + `useEffect`

```tsx
// FeatureShowcase.tsx
import { useInView } from 'motion/react'
import { useRef, useEffect, useState } from 'react'

const sectionRef = useRef<HTMLDivElement>(null)
const isInView = useInView(sectionRef, { once: false, amount: 0.4 })

useEffect(() => {
  if (isInView && activeFeature === null) {
    setActiveFeature(0)  // start feature 1
    setFrame('F1')
  }
}, [isInView])
```

### 2. Frame progression — `useEffect` + `setTimeout` (NOT motion timelines)

Keep frame timing logic completely outside of Motion. Motion handles **how** things animate; React state + timers handle **when** to advance.

```tsx
useEffect(() => {
  if (!isInView) return
  let t: ReturnType<typeof setTimeout>

  if (frame === 'F1') {
    t = setTimeout(() => setFrame('F2'), FRAME_DURATIONS.F1_TO_F2)
  } else if (frame === 'F2') {
    t = setTimeout(() => setFrame('F3'), FRAME_DURATIONS.F2_IDLE)
  } else if (frame === 'F3') {
    t = setTimeout(() => advanceFeature(), FRAME_DURATIONS.F3_IDLE)
  }
  return () => clearTimeout(t)
}, [frame, isInView])

function advanceFeature() {
  const next = (activeFeature + 1) % FEATURE_DATA.length
  setActiveFeature(next)
  setFrame('F1')
}

function handleSidebarClick(index: number) {
  setActiveFeature(index)
  setFrame('F1')
}
```

### 3. Frame transitions — `AnimatePresence` + `motion.div`

Frames swap in/out using `AnimatePresence` with `mode="wait"` so the outgoing frame exits completely before the next enters.

```tsx
// FeaturePanel.tsx
import { AnimatePresence, motion } from 'motion/react'

const FRAME_VARIANTS = {
  initial: { opacity: 0, y: 12, filter: 'blur(4px)' },
  animate: { opacity: 1, y: 0,  filter: 'blur(0px)' },
  exit:    { opacity: 0, y: -8, filter: 'blur(4px)' },
}

const FRAME_TRANSITION = {
  duration: 0.35,
  ease: [0.22, 1, 0.36, 1],  // custom cubic-bezier: fast out, smooth landing
}

export function FeaturePanel({ feature, frame }: Props) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${feature.id}-${frame}`}  // CRITICAL: key must change per frame
        variants={FRAME_VARIANTS}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={FRAME_TRANSITION}
      >
        {frame === 'F1' && <Frame1Skeleton />}
        {frame === 'F2' && <Frame2Table feature={feature} />}
        {frame === 'F3' && <Frame3Detail feature={feature} selectedDept="engineering" />}
      </motion.div>
    </AnimatePresence>
  )
}
```

### 4. Table rows stagger — `variants` with `staggerChildren`

```tsx
// Frame2Table.tsx
const TABLE_CONTAINER_VARIANTS = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
}

const ROW_VARIANTS = {
  hidden: { opacity: 0, x: -8 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' } },
}

<motion.tbody variants={TABLE_CONTAINER_VARIANTS} initial="hidden" animate="show">
  {departments.map(dept => (
    <motion.tr key={dept.id} variants={ROW_VARIANTS}>
      ...
    </motion.tr>
  ))}
</motion.tbody>
```

### 5. Row selection emphasis — `layout` + `layoutId`

When the Engineering row is "selected" in F2 before transitioning to F3, use a layout animation to scale and highlight it:

```tsx
<motion.tr
  layoutId={`row-${dept.id}`}
  animate={isSelected ? { scale: 1.02, backgroundColor: '#f0fdf4' } : { scale: 1 }}
  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
  style={{ originX: 0.5, originY: 0.5 }}
>
```

Then in `Frame3Detail`, the panel appears as if the selected row expanded:

```tsx
// Frame3Detail.tsx — the row "morphs" into the detail panel
<motion.div
  layoutId="row-engineering"   // must match the layoutId in Frame2Table
  layout
  className="detail-panel"
>
```

**⚠️ Important:** Wrap both frames in a `<LayoutGroup>` to enable cross-component `layoutId` matching.

```tsx
import { LayoutGroup } from 'motion/react'

<LayoutGroup>
  <FeaturePanel ... />
</LayoutGroup>
```

### 6. Sidebar active indicator — `layoutId` underline/pill

```tsx
// FeatureSidebar.tsx
{FEATURE_DATA.map((feature, i) => (
  <button key={feature.id} onClick={() => handleSidebarClick(i)}>
    {activeFeature === i && (
      <motion.span
        layoutId="sidebar-active-pill"
        className="absolute inset-0 bg-green-50 rounded-lg border border-green-200"
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      />
    )}
    <span className="relative z-10">{feature.label}</span>
  </button>
))}
```

### 7. Cursor tap animation — `useAnimate` sequence

Show a ghost cursor clicking a UI element to illustrate the action:

```tsx
// CursorDot.tsx
import { useAnimate } from 'motion/react'
import { useEffect } from 'react'

export function CursorDot({ targetX, targetY, trigger }: Props) {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    if (!trigger) return
    animate([
      [scope.current, { opacity: 1, x: targetX - 12, y: targetY - 12 }, { duration: 0 }],
      [scope.current, { scale: 0.8 }, { duration: 0.15 }],
      [scope.current, { scale: 1 },   { duration: 0.15 }],
      [scope.current, { opacity: 0 }, { duration: 0.3, delay: 0.5 }],
    ])
  }, [trigger])

  return (
    <motion.div
      ref={scope}
      className="pointer-events-none absolute z-50 w-6 h-6 rounded-full
                 bg-black/20 border-2 border-white shadow-lg"
      style={{ opacity: 0 }}
    />
  )
}
```

### 8. Skeleton → content transition

In `Frame1Skeleton`, render shimmer placeholders. When `frame` changes to `F2`, `AnimatePresence` exits the skeleton. Use CSS shimmer animation (NOT motion) for the shimmer effect itself to stay off the JS thread:

```tsx
// SkeletonRow.tsx
export function SkeletonRow() {
  return (
    <div className="flex gap-3 items-center py-2.5 px-4">
      <div className="h-3 w-28 rounded bg-gray-100 animate-pulse" />
      <div className="h-3 w-16 rounded bg-gray-100 animate-pulse" />
      <div className="h-3 w-8  rounded bg-gray-100 animate-pulse" />
    </div>
  )
}
```

`animate-pulse` is a Tailwind class that uses a CSS keyframe — **zero JS cost**.

---

## CARD / PANEL DESIGN

### Outer card wrapper

```tsx
// The browser chrome / macOS-style window frame
<div className="relative rounded-2xl border border-gray-200 bg-white shadow-xl
                overflow-hidden w-full max-w-[580px] aspect-[4/3]">
  {/* Window chrome: traffic lights */}
  <div className="flex gap-1.5 px-4 py-3 border-b border-gray-100 bg-gray-50/50">
    <span className="w-3 h-3 rounded-full bg-red-400" />
    <span className="w-3 h-3 rounded-full bg-yellow-400" />
    <span className="w-3 h-3 rounded-full bg-green-400" />
  </div>

  {/* Content area */}
  <div className="flex h-full">
    <InnerSidebar collapsed={frame !== 'F1'} />
    <MainContent frame={frame} />
  </div>
</div>
```

### Inner sidebar collapse (F1 → F2 transition)

The inner sidebar (inside the UI mock) collapses from full-width labels to icon-only. Use a `motion.div` with `layout` prop:

```tsx
<motion.aside
  layout
  animate={{ width: collapsed ? 48 : 160 }}
  transition={{ type: 'spring', stiffness: 280, damping: 28 }}
  className="border-r border-gray-100 bg-gray-50/50 overflow-hidden"
>
  <AnimatePresence>
    {!collapsed && (
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.15 } }}
        exit={{ opacity: 0, transition: { duration: 0.1 } }}
        className="text-sm font-medium text-gray-700"
      >
        Departments
      </motion.span>
    )}
  </AnimatePresence>
</motion.aside>
```

### Status badges

```tsx
type BadgeProps = { status: 'Active' | 'Inactive' }

function StatusBadge({ status }: BadgeProps) {
  return (
    <span className={cn(
      'text-xs font-medium px-2 py-0.5 rounded-full',
      status === 'Active'
        ? 'bg-green-100 text-green-700'
        : 'bg-red-100   text-red-600',
    )}>
      {status}
    </span>
  )
}
```

### Avatar stack

```tsx
function AvatarStack({ urls, count }: { urls: string[]; count: number }) {
  return (
    <div className="flex items-center">
      {urls.slice(0, 3).map((url, i) => (
        <img
          key={i}
          src={url}
          className="w-6 h-6 rounded-full border-2 border-white -ml-1.5 first:ml-0"
          style={{ zIndex: 3 - i }}
        />
      ))}
      {count > 3 && (
        <span className="text-[10px] font-medium text-gray-500 ml-1">
          +{count - 3}
        </span>
      )}
    </div>
  )
}
```

---

## PERFORMANCE GUIDELINES

### GPU-only properties — animate ONLY these with Motion:

| ✅ Safe (GPU, compositor thread) | ❌ Avoid (triggers layout reflow) |
|----------------------------------|-----------------------------------|
| `opacity`                        | `width`, `height` (use `scaleX`/`scaleY` instead) |
| `transform` (x, y, scale, rotate)| `top`, `left`, `margin`, `padding` |
| `filter` (blur) — use sparingly  | `border-width`                   |
| `clipPath`                       | `font-size`                      |

### `will-change`

Apply `will-change: transform` only to elements that **definitely** animate, and only while animating. Motion does this automatically for `animate` props — do not add it manually unless using CSS-only animations alongside Motion.

### LazyMotion for bundle size

In Next.js, use `LazyMotion` with `domAnimation` features to reduce the initial bundle. The showcase section is typically below the fold, so this is safe:

```tsx
// app/layout.tsx or the section component itself
import { LazyMotion, domAnimation } from 'motion/react'

<LazyMotion features={domAnimation} strict>
  <FeatureShowcase />
</LazyMotion>
```

This drops ~15KB from the initial parse cost.

### Timers: always clean up

Every `setTimeout` in frame advancement logic **must** have a cleanup return in `useEffect`. Failing to do this causes stale timers to fire after unmount or when the user leaves the section.

```tsx
useEffect(() => {
  const t = setTimeout(advanceFrame, duration)
  return () => clearTimeout(t)
}, [frame, activeFeature])
```

### `useReducedMotion` — accessibility

```tsx
import { useReducedMotion } from 'motion/react'

const prefersReduced = useReducedMotion()

const transition = prefersReduced
  ? { duration: 0 }
  : { duration: 0.35, ease: [0.22, 1, 0.36, 1] }
```

When reduced motion is preferred, skip all the animated transitions but still advance frames so the content is accessible.

### Avoid animating rows that are off-screen

Only run the stagger animation when the table is mounted and visible. Since frame mounting is tied to the `frame` state, this happens naturally. But add an `initial={false}` guard if you see flash-of-animation on load:

```tsx
<motion.tbody
  variants={TABLE_CONTAINER_VARIANTS}
  initial="hidden"
  animate="show"
>
```

---

## FULL COMPONENT SKELETON

```tsx
// components/feature-showcase/FeatureShowcase.tsx
'use client'

import { useRef, useState, useEffect } from 'react'
import { useInView, LayoutGroup, LazyMotion, domAnimation } from 'motion/react'
import { FEATURE_DATA, FRAME_DURATIONS } from '@/lib/feature-showcase-data'
import { FeatureSidebar } from './FeatureSidebar'
import { FeaturePanel } from './FeaturePanel'

type Frame = 'F1' | 'F2' | 'F3'

export function FeatureShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { amount: 0.4 })

  const [activeFeature, setActiveFeature] = useState(0)
  const [frame, setFrame] = useState<Frame>('F1')
  const [hasStarted, setHasStarted] = useState(false)

  // Trigger on scroll into view
  useEffect(() => {
    if (isInView && !hasStarted) {
      setHasStarted(true)
      setFrame('F1')
    }
    if (!isInView) {
      setHasStarted(false) // reset so it re-triggers on re-entry
    }
  }, [isInView])

  // Frame auto-advance
  useEffect(() => {
    if (!hasStarted) return
    const durations: Record<Frame, number> = {
      F1: FRAME_DURATIONS.F1_TO_F2,
      F2: FRAME_DURATIONS.F2_IDLE,
      F3: FRAME_DURATIONS.F3_IDLE,
    }
    const t = setTimeout(() => {
      if (frame === 'F1') setFrame('F2')
      else if (frame === 'F2') setFrame('F3')
      else {
        const next = (activeFeature + 1) % FEATURE_DATA.length
        setActiveFeature(next)
        setFrame('F1')
      }
    }, durations[frame])
    return () => clearTimeout(t)
  }, [frame, hasStarted, activeFeature])

  function handleSidebarClick(index: number) {
    setActiveFeature(index)
    setFrame('F1')
    if (!hasStarted) setHasStarted(true)
  }

  return (
    <section ref={sectionRef} className="py-24 px-6">
      <div className="max-w-6xl mx-auto flex gap-16 items-center">
        <LazyMotion features={domAnimation}>
          <LayoutGroup>
            <FeatureSidebar
              features={FEATURE_DATA}
              activeIndex={activeFeature}
              onSelect={handleSidebarClick}
            />
            <FeaturePanel
              feature={FEATURE_DATA[activeFeature]}
              frame={frame}
            />
          </LayoutGroup>
        </LazyMotion>
      </div>
    </section>
  )
}
```

---

## OPEN SOURCE REFERENCE IMPLEMENTATIONS

These repos demonstrate patterns directly relevant to this animation:

1. **frontendfyi/scroll-animations-with-framer-motion-codesandbox-projects**
   `https://github.com/frontendfyi/scroll-animations-with-framer-motion-codesandbox-projects`
   — Reverse-engineered CodeSandbox's landing page animations. Directly showcases sticky scroll sections with Motion, including layout transitions and scroll-linked reveals. Start here.

2. **a2rp/framer-motion-demos**
   `https://github.com/a2rp/framer-motion-demos`
   — Production-ready patterns including `grid → detail` transitions, `shared layoutId` for tabs, and `staggered card rise`. The `grid-to-detail` demo is the closest analogy to Frame 2 → Frame 3 in this skill.

3. **motiondivision/motion** (official examples)
   `https://motion.dev/examples?platform=react&search=layout`
   — Official layout animation examples. Look specifically at the "Tabs" and "Shared layout" examples for the sidebar active indicator pattern.

---

## FIGMA-TO-CODE WORKFLOW FOR THE IMPLEMENTING AGENT

When you have MCP access to the Figma file, follow these steps:

1. **Identify the 3 frame variants** per feature point. Look for frame names containing "F1", "idle", "skeleton", "empty" / "F2", "populated", "overview", "table" / "F3", "detail", "selected", "expanded".

2. **Extract the card wrapper dimensions.** Note the exact aspect ratio and whether it uses a drop shadow or inner border. Replicate with Tailwind utility classes.

3. **Read the sidebar color scheme.** Check the active sidebar item's background — is it a green tint, a white card with border, or an underline? Replicate with the `layoutId` pill pattern above.

4. **Check avatar image sizes.** Export the avatar images or use placeholder services (e.g., `https://i.pravatar.cc/24?u={id}`) for mock data.

5. **Check status badge exact colors.** Don't guess — extract the hex from Figma's fill panel. Active ≈ `#16a34a` text on `#f0fdf4` bg. Inactive ≈ `#dc2626` text on `#fef2f2` bg.

6. **Note the column widths.** The table columns (Name / Users / App in Use / Status) have specific flex ratios. Use CSS `table-fixed` with explicit `w-` classes matching Figma.

7. **Check whether the inner sidebar collapses.** If Figma F2 shows only icons, implement the width-collapse animation. If it stays full-width, skip that step.

8. **For each app icon** in the detail view (Frame 3), confirm whether real SVG brand icons are available in the codebase (`/public/icons/`) or if placeholder colored circles should be used.

---

## TRANSITIONS REFERENCE TABLE

| Transition | Type | Settings |
|------------|------|----------|
| Frame enter/exit | Tween | `duration: 0.35, ease: [0.22, 1, 0.36, 1]` |
| Table row stagger | Tween | `duration: 0.3, ease: 'easeOut'`, stagger `0.06s` |
| Sidebar active pill | Spring | `stiffness: 400, damping: 30` |
| Row selection highlight | Spring | `stiffness: 300, damping: 25` |
| Sidebar width collapse | Spring | `stiffness: 280, damping: 28` |
| Detail panel expand (`layoutId`) | Spring | `stiffness: 250, damping: 26` |
| Cursor tap dot | Tween (sequence) | `0.15s` shrink, `0.15s` restore, `0.3s` fade |

**Rule of thumb:** Use `spring` for spatial/layout changes (things that move through space). Use `tween` for opacity, blur, and color changes (things that transform appearance).

---

## COMMON PITFALLS

- **Missing `key` on `AnimatePresence` child.** Without a changing `key`, AnimatePresence cannot detect the component swap. Key must be `{featureId}-{frame}`.
- **`layoutId` not matching across frames.** The `layoutId` string must be **byte-identical** in both Frame2Table and Frame3Detail. A typo silently breaks the shared animation.
- **Timer not cleaned up.** Always `return () => clearTimeout(t)` inside `useEffect`. Missing cleanup causes ghost frame advances when the user scrolls away and back.
- **Animating `width/height` directly.** Use `scaleX`/`scaleY` for size animations that need to be performant. Only use `width` in `layout` prop context where Motion handles the FLIP correction automatically.
- **Multiple `LayoutGroup` wrappers.** Only one `LayoutGroup` should wrap all components that share `layoutId` values. Nested groups break the matching.
- **Using `initial={false}` incorrectly.** `initial={false}` on `AnimatePresence` disables mount animations for all children, including new ones entering the first time. Only use it on the `motion.div` children when you want to skip the very first entry animation.
