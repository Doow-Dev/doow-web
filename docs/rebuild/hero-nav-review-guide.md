# Hero And Header Review Guide

This document is the current implementation brief from the reviewing agent for the first hero and header slice.

Use it before making the next revision to:

- `src/app/(landing)/_components/header/components/landing-navbar.tsx`
- `src/app/(landing)/_components/hero/components/hero-section.tsx`
- `src/app/(landing)/_components/hero/components/hero-content.tsx`
- `src/components/system/button.tsx`
- `src/components/system/nav-link.tsx`
- `src/styles/tokens/foundation.css`
- `src/styles/recipes/system.css`
- `src/styles/recipes/site.css`
- `src/app/(landing)/_components/header/styles/index.css`
- `src/app/(landing)/_components/hero/styles/index.css`
- related content, asset manifest, and rebuild docs as needed

Also use:

- `docs/rebuild/style-refactor-checklist.md`

## Review Outcome

- Status: not approved yet
- Section: header and hero
- Batch: Batch 3
- Reason:
  - design-system discipline has drifted
  - responsive behavior is not finished
  - sticky header behavior is not implemented
  - hero animated headline behavior is not implemented
  - section-level design details have leaked into shared primitives

## Important Clarifications

### `react-icons`

- `react-icons` is currently intentional for this slice.
- This is an approved exception for now, not an accidental regression.
- The exception must be documented whenever the slice is revised.
- If `react-icons` remains in use after the next revision, update the relevant rebuild docs to record:
  - why it is being used
  - which icons are still sourced from it
  - whether those icons are temporary until Figma or system-icon replacements land

### Current Approval State

- The current hero and header implementation is only a working draft.
- Do not treat the current mobile nav, hero typography, or CTA sizing as final.
- The next implementing agent should treat this guide as the active source of truth for the revision.

## Architecture Guardrails

These are mandatory for the next pass.

### 1. Keep shared primitives generic

- Shared primitives in `src/components/system` must stay reusable across the whole landing page and utility routes.
- Do not encode section-specific sizes, spacing, or hero-only variants into system primitives.
- The current `Button` primitive should not keep a hero-only `ctaSecondary` size variant.

Required fix:

- remove hero-specific sizing from the shared button API
- keep button sizing generic, for example:
  - `sm`
  - `base`
  - `md`
  - `lg`
- move hero-only button differences into a site recipe or hero-specific class
- keep visual button styles token-driven and variant-driven, but keep section composition outside the primitive

### 2. Promote repeatable values into the design system

- If a new size, spacing rule, color, gradient, or shadow is discovered from Figma and used more than once or is clearly part of the system, promote it.
- Do not solve repeatable design needs with arbitrary inline Tailwind values inside system components.

Required fix:

- whenever a new Figma value is introduced:
  - document the raw evidence
  - add or update the semantic token in `src/styles/tokens/foundation.css`
  - expose or consume it through shared recipes where appropriate

### 3. Prefer recipes and named classes over arbitrary utility drift

- The rebuild direction is token-first and recipe-first.
- Direct utility classes are acceptable for small layout glue, but not as the main styling strategy for shared primitives.

Required fix:

- reduce arbitrary-value styling in shared primitives such as:
  - `px-[9px]`
  - `py-[7px]`
  - `gap-[8px]`
  - `max-w-[var(--copy-measure-hero)]`
- prefer:
  - token-backed utilities
  - semantic recipe classes
  - CSS variables consumed through recipes

## Responsive Revision Requirements

The current implementation is not yet good enough for small screens. The next revision must treat responsiveness as a designed experience, not a fallback.

Target review widths:

- `360`
- `390`
- `768`
- `1024`
- `1280`
- `1440+`

## Mobile And Tablet Navbar Spec

Use Ramp's current small-screen behavior as the interaction reference, not as a visual clone.

Reference observed on April 16, 2026:

- `https://ramp.com/`
- small screens collapse the main nav into a menu trigger instead of wrapping desktop nav items across the header row

### Required small-screen behavior

For mobile and tablet widths below desktop navigation:

- keep only these items visible in the top bar:
  - Doow logo
  - `Login`
  - hamburger menu trigger
- do not keep the full nav visible in wrapped rows on small screens
- do not keep the `Sign Up` button outside the collapsed menu on small screens

When the hamburger opens:

- show the main nav in a dedicated panel or sheet-style block
- stack the nav items vertically
- place the `Sign Up` CTA inside the opened menu
- make the `Sign Up` CTA full width inside the open menu
- keep spacing generous and touch-friendly
- close the menu cleanly on:
  - outside click if applicable
  - `Escape`
  - navigation

### Required animation behavior

- opening and closing the menu should animate smoothly
- keep the animation light:
  - opacity
  - translate
  - subtle height or scale
- avoid heavy spring motion or oversized transform choreography
- honor `prefers-reduced-motion`

### Tablet behavior

- tablet should not just inherit the mobile layout blindly
- ensure the opened menu panel has deliberate width, spacing, and hierarchy on tablet widths
- tablet hero spacing and top-bar spacing should be reviewed independently from phone sizes

## Sticky Header Spec

The header must adopt a sticky scroll behavior.

Required behavior:

- header sticks while scrolling
- before scroll activation, the header can remain visually integrated with the hero
- after the page scroll passes an intentional threshold:
  - the header adopts a background color derived from the current dark hero-background region
  - the header should feel readable and stable over the page content

Required implementation approach:

- do not hardcode an ad hoc scrolled color inline
- create a semantic token for the scrolled header surface
- keep the scroll behavior lightweight
- avoid heavy client-side logic or scroll listeners that repaint excessively
- if client logic is needed, keep it isolated to the smallest header-interaction surface

Recommended treatment:

- subtle surface tint
- optional light blur
- preserved contrast for logo, nav, login, and menu trigger

## Hero Typography Revision Requirements

The current hero typography is not ready for sign-off on smaller breakpoints.

### Required rules

- define explicit hero text sizes by breakpoint instead of relying on a basic fallback feel
- ensure the heading looks intentionally designed at:
  - phone portrait
  - larger phones
  - tablet
  - desktop
- do the same for:
  - lead copy
  - nav text
  - CTA labels

### Recommended breakpoint behavior

Desktop:

- preserve the extracted Figma desktop type values where they are already exact

Tablet:

- use a clearly stepped-down hero display size that still feels premium and spacious
- avoid desktop line lengths or offsets that feel artificially compressed

Mobile:

- hero title should remain visually bold but not dominate the viewport so much that the CTA hierarchy suffers
- copy measure should stay tight and readable
- top spacing should support the sticky header and future hero animation without visual crowding

### Token rule

- if new mobile or tablet type values are introduced, add them as semantic tokens
- do not bury breakpoint-critical type sizes only inside ad hoc section CSS without token coverage

## Hero Animated Word Spec

The phrase in the second hero line must animate as follows:

- `one`
- `human`
- `agent`
- then back to `one`
- loop continuously

Target phrase context:

- `one is using?`

### Required design behavior

- the changing word keeps the same gradient treatment as the rest of the highlighted phrase
- the transition should feel polished and calm, not flashy
- there should be no noticeable layout jump when the word changes

### Required implementation approach

- isolate the animated word into the smallest possible client component
- keep the rest of the hero server-rendered
- default server-rendered word should be `one`
- avoid large re-render surfaces

### Accessibility requirements

- do not cause repeated screen-reader announcements
- do not use an assertive live region
- provide a stable accessible reading experience
- honor `prefers-reduced-motion`
  - if reduced motion is enabled, stop the animation and keep a static word

### Layout requirements

- reserve enough inline space for the longest word so the line does not jump
- keep baseline alignment and gradient treatment consistent during the change

## CTA Composition Rules

### Shared button primitive

- keep the shared button primitive generic
- button padding, radius, type scale, and adornment slots should support reuse
- hero-specific composition belongs in the hero recipe layer

### Hero secondary CTA

This is the specific issue already identified in review:

- the current secondary CTA sizing should not be represented as a dedicated shared button size variant

Required fix:

- remove the hero-only size from `Button`
- compose the hero secondary CTA using:
  - generic button sizing
  - hero recipe class
  - section-level layout treatment for preview thumbnail and trailing icon

## Design-System Usage Rules

The next revision must improve how system styles are used.

### Required standard

- system primitives should consume semantic tokens and shared recipes first
- section components should consume system primitives plus site recipes
- avoid recreating styling decisions in JSX if a recipe class belongs in CSS

### Token update rule

Whenever the implementing agent notices a new token from Figma:

1. capture the raw value or evidence
2. decide whether it is:
   - raw evidence only
   - semantic token
   - recipe-level token
3. update the token layer if it is part of the reusable system
4. keep the section aligned to the updated design system

## Performance, Accessibility, And SEO Requirements

These are non-negotiable for the revision.

### Performance

- keep hero and header server-rendered except for the smallest necessary interaction islands
- do not introduce a heavy animation library for menu or word rotation if lightweight CSS or minimal React state is sufficient
- do not add unnecessary client wrappers around the whole hero
- avoid layout shift during:
  - sticky-header activation
  - menu open or close
  - animated hero word changes

### Accessibility

- menu trigger must be keyboard operable
- menu state must be exposed correctly
- focus management must be intentional when the menu opens and closes
- all interactive controls must preserve visible focus styles
- reduced motion must be respected for:
  - menu transitions
  - animated word changes

### SEO

- keep the hero copy and `h1` in HTML
- do not move critical hero messaging behind client-only rendering
- keep link text descriptive
- do not break heading hierarchy while refining the animated word

## Documentation Updates Required With The Next Revision

When the next hero and header revision is submitted, update docs too.

Required doc updates:

- `docs/rebuild/hero-implementation.md`
  - note what changed
  - note which review blockers were resolved
- `docs/rebuild/README.md`
  - keep repo state metrics and active stage accurate
- token evidence docs or token files
  - document any newly promoted token
- icon usage documentation
  - if `react-icons` remains intentional, record that explicitly

## Definition Of Done For Re-review

The reviewing agent will only consider the next hero and header revision ready for sign-off if all of the following are true:

- shared primitives remain generic
- hero-specific sizing is removed from the shared button API
- small-screen nav is a real collapsed menu, not wrapped desktop links
- menu open and close behavior is smooth and accessible
- sticky header behavior is implemented and tokenized
- hero animated word loop is implemented with reduced-motion safety
- hero typography is intentionally tuned across phone, tablet, and desktop
- token and recipe usage are cleaner than the current draft
- docs are updated to reflect reality

## Review Reminder

This revision should be submitted back for review before moving to the next section.

