# Hero Implementation

## Status

- Implemented on `2026-04-15`
- Review state: reviewed, changes requested before sign-off
- Landing-page route updated: `/`
- Review guide:
  - `docs/rebuild/hero-nav-review-guide.md`

## Figma Nodes Used

- header frame: `580:1112`
- header nav item: `580:1121`
- header sign-up button: `580:1129`
- hero frame: `580:1111`
- hero text frame: `580:1132`
- hero headline text: `580:1133`
- hero lead copy: `580:1135`
- hero CTA container: `580:1136`
- hero primary CTA: `580:1138`
- hero secondary CTA: `580:1139`

## Repo Files Added Or Updated

- `src/app/(landing)/page.tsx`
- `src/app/(landing)/layout.tsx`
- `src/app/(landing)/_components/header/components/landing-navbar.tsx`
- `src/app/(landing)/_components/hero/components/hero-section.tsx`
- `src/app/(landing)/_components/hero/components/hero-content.tsx`
- `src/app/(landing)/_components/hero/components/hero-animated-accent.tsx`
- `src/app/(landing)/_components/landing-page-content.ts`
- `src/components/custom/icons/hero-sparkle-icon.tsx`
- `src/lib/assets/site.ts`
- `src/components/layout/components/doow_logo.tsx`
- `src/components/system/button.tsx`
- `src/components/system/section-heading.tsx`
- `src/styles/tokens/foundation.css`
- `src/styles/recipes/system.css`
- `src/styles/recipes/site.css`
- `src/app/(landing)/_components/header/styles/index.css`
- `src/app/(landing)/_components/hero/styles/index.css`

## Revision Notes

- Shared primitive cleanup applied on `2026-04-16`
- Hero-specific `ctaSecondary` sizing was removed from the shared `Button` API
- Shared recipes were added or tightened for:
  - buttons
  - nav links
  - container shell
  - footer list
  - input
  - media frame
  - section heading
- New semantic tokens were promoted for:
  - button base spacing
  - input sizing
  - footer heading tracking
  - media-frame gradient
  - hero copy color
  - hero section-heading gap
- Style drift was reduced by moving token-backed values out of JSX and into `system.css`
- The hero accent phrase now uses a phrase-scoped live-text gradient workaround instead of the raw extracted full-line SVG radial fill because the extracted fill coordinates do not map cleanly onto the animated accent substring
- The animated hero word now rotates through `one`, `human`, and `agent` with reduced-motion-safe transitions while keeping a stable accessible reading of the phrase

## Asset Handling

- Hero background now resolves through the shared blob asset helper and the typed manifest entry in `src/lib/assets/site.ts`
- The hero background remains a `next/image` LCP surface with `priority`, remote optimization, and a committed blur placeholder
- The hero secondary CTA thumbnail now uses the demo poster asset instead of reusing the hero background image

## Responsive Notes

- Hero surface is implemented mobile-first
- acceptance widths checked in Surf:
  - `360`
  - `390`
  - `768`
  - `1024`
  - `1280`
  - `1440`
- small screens:
  - logo plus `Login` and the menu trigger stay on the first row
  - primary navigation items collapse into a menu panel instead of wrapping in the header row
  - CTA group stacks vertically by default
- tablet and desktop:
  - header shifts into the extracted three-zone layout
  - hero heading uses the extracted maximum measure
  - CTA group returns to a horizontal row

## Accessibility Notes

- semantic `header`, `nav`, `main`, and `h1` structure is preserved
- background image is treated as decorative with empty alt text
- keyboard focus is preserved on the interactive links and buttons
- mobile navigation uses labeled dialog content
- hero CTA preview image is decorative and hidden from assistive tech

## Performance And SEO Notes

- hero remains a server-rendered route surface
- blob-backed background asset is rendered with `next/image`, `priority`, and a blur placeholder
- hero copy is fully present in the HTML and not gated behind client logic
- page metadata has been updated to match the hero content

## Open Notes

- Header is now a dedicated site component instead of being composed inline inside the hero section
- Hero sparkle highlight now comes from the extracted Figma SVG as a shared icon component
- Hero second-line accent now uses the exact `580:1147` Figma radial fill export instead of the earlier provisional linear gradient
- Header center navigation currently uses temporary in-page anchors until downstream sections and final routing are confirmed
- The `Watch a Demo` CTA currently points at the future `#demo` anchor and should be finalized once the demo section lands
- `react-icons` remains intentional for this slice and is still pending a later system-icon review
- The hero and header are not approved yet; use `docs/rebuild/hero-nav-review-guide.md` as the current implementation brief for the next revision

## Structure Note

- The landing route now owns header and hero composition inside `src/app/(landing)/_components/`.
- Section-specific styles now live in the owning section folders.
- `src/styles/recipes/site.css` remains intentionally reserved for shared landing styles reused across multiple sections.
