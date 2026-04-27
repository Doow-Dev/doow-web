# Design System Plan

## Source of Truth

The design system comes from Figma. The repo will hold the normalized implementation form of that design system.

Typography follows a compatibility-first policy:

- existing typography rules already shipping in the codebase remain the source of truth for their current consumers
- new typography rules from the Figma design system should be added alongside the current implementation, not used to silently remap existing landing, header, or button styles
- page-level typography values must stay section-scoped or utility-scoped unless they are intentionally part of the shared system

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
- color-system token groups for backgrounds, foregrounds, borders, buttons, badges, and supporting palette values from Figma node `6:128`

These are enough to begin the token and primitive layer before section implementation starts.

## Current Implementation Notes

- `src/styles/tokens/foundation.css` now keeps the audited color system in two layers:
  - normalized Figma tokens such as `--bg-*`, `--fg-*`, `--border-*`, `--button-*`, and `--tag-*`
  - repo-compatibility aliases such as `--surface-*`, `--ink-*`, `--stroke-*`, `--action-*`, and `--status-*`
- The Tailwind `@theme` layer now points directly at the normalized Figma token groups instead of routing through compatibility aliases first.
- Section and layout styles no longer consume the legacy alias variables directly. Active section files now bind to the normalized Figma token groups, while section-specific overlays use explicit semantic tokens such as `--header-*` and `--global-site-navbar-*`.
- Shared primitives now resolve through the audited Figma color groups instead of provisional values:
  - `Button` primary uses the Figma `button-base` state set
  - `Button` neutral and `Button` secondary both use the Figma neutral button state set
  - `Button` transparent and `Button` ghost now use the audited transparent-button hover and pressed states
  - `Input` uses the Figma field and border tokens
  - `Badge` now exposes the Figma tag families directly through `neutral`, `violet`, `blue`, `green`, `orange`, and `red`
  - `Badge` `current` maps to the neutral tag tokens
  - `Badge` `bestFit` maps to the green tag tokens
- The batch-4 consolidation pass keeps compatibility aliases in place only as a shim for section and route code that has not yet been renamed. Shared theme exposure, primitives, and recipes should prefer the normalized Figma vocabulary directly.
- The section-by-section alias cleanup pass leaves the compatibility aliases in `foundation.css` only as a transitional shim. They are no longer part of the active section or layout styling path and can be retired later without changing rendered values.
- Typography now has two explicit tracks:
  - implementation-owned `--type-*` tokens such as `--type-body-sm-*`, `--type-section-description-*`, and `--type-hero-lead-*` remain authoritative for current landing, header, and button styling
  - additive Figma-native `--type-doow-*` tokens now capture the broader Doow typography system for future work and net-new components
- Shared typography utilities follow the same split:
  - existing utilities such as `text-section-title`, `text-section-description`, `text-body-sm-*`, `text-lead`, and the button sizing utilities keep their current values
  - additive utilities such as `text-doow-*` and `text-weight-*` exist for new design-system rules without changing current consumers

- `SectionHeading` now has two intended modes:
  - `scale="hero"` for hero-only display styling
  - default landing-section styling based on the demo-section typography tokens
- The default landing section-heading typography is now:
  - title: `34/38` on mobile, `36/42` on desktop, `600`, `-2px`
  - description `sm`: `13/21`, `400`, `-0.14px`
  - description `md`: `16/21`, `400`, `-0.05px`
- `SectionHeading` is now the source of truth for repeated heading typography patterns:
  - use the default title styling unless the section genuinely departs from the shared title system
  - use `descriptionVariant="sm"` or `descriptionVariant="md"` for the standard landing description sizes instead of restating those values in section CSS
  - keep `titleClassName` and `descriptionClassName` as escape hatches for one-off visual differences, not as the primary way to restate shared typography
- Do not add section-specific selectors such as `__heading-title` or `__heading-description` when they only duplicate the shared `SectionHeading` default title or one of the shared description variants.
- If a new heading treatment repeats across more than one section, promote it into `SectionHeading` or shared typography utilities first, then consume it from callers.
- If a section only needs layout-level adjustments for a heading, prefer caller-side utility classes such as width, max-width, or `text-shadow-none` rather than re-declaring a full typography block in the section stylesheet.
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
