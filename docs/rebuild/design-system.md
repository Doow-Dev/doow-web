# Design System Plan

## Source of Truth

The design system comes from Figma. The repo will hold the normalized implementation form of that design system.

## Token Layers

### 1. Raw tokens
- direct Figma values and naming snapshots
- used for traceability back to design

### 2. Semantic tokens
- background, foreground, muted, accent, border, success, warning, etc.
- type scale, spacing scale, radii, elevation, container widths

### 3. Recipes and primitives
- button
- nav item
- CTA group
- badge or pill
- section heading
- card
- container
- form field
- footer list
- media frame

## Styling Direction

- Tailwind v4 CSS-first
- CSS custom properties for tokens
- Tailwind `@theme` for token exposure
- shared recipes before section-specific overrides
- route layouts should consume semantic container variants instead of re-declaring max-width and gutter rules

## Current Figma Evidence

The connected Figma file already exposes:

- typography tokens based on `Inter`
- foreground and background tokens
- radius tokens
- elevation and shadow values
- button instance styling with the primary green surface

These are enough to begin the token and primitive layer before section implementation starts.

## Current Implementation Notes

- `SectionHeading` now has two intended modes:
  - `scale="hero"` for hero-only display styling
  - default landing-section styling based on the demo-section typography tokens
- The default landing section-heading typography is now:
  - title: `34/38` on mobile, `36/42` on desktop, `600`, `-2px`
  - description: `16/21`, `400`, `-0.05px`
- The subtle dashed treatment used in the demo section heading band is now modeled as reusable system utilities:
  - `surface-subtle`
  - `border-dashed-sides`
- `MediaFrame` is now a layered primitive that can accept:
  - a custom aspect ratio
  - a decorative frame layer
  - a separate media content layer
- `Container` is the only shared primitive allowed to own outer width and horizontal gutters.
- Landing and utility shells should bind to semantic `Container` variants rather than section-level max-width wrappers.
- The `landing` container variant is now the standard `1024px` landing shell and keeps horizontal gutters until `70rem` so `1024`-class viewports still retain breathing room.
- The `landingWide` container variant keeps horizontal gutters until `80rem` so `1024`-class desktop widths do not pin navbar or hero content to the viewport edge.
- Sections using a shared `Container` variant must not declare a second outer width or horizontal recentering layer inside that shell unless an explicit exception has been approved.
- `Badge` is now the shared primitive for the landing eyebrow and comparison-status pills, with dedicated variants for the SaaS Intelligence eyebrow, `Current`, and `Best fit` treatments extracted from Figma.
- New landing sections should keep section-specific selectors in `src/app/(landing)/_components/<section>/styles/`, with route layouts importing those section styles explicitly instead of growing `styles/recipes/site.css`.
