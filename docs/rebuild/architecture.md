# Target Architecture

## Goals

- Clean single-app Next.js architecture
- Figma-driven design system
- mobile-first implementation
- CDN-backed landing-page assets
- repo structure that is easy for humans and AI assistants to navigate

## Proposed Structure

```text
src/
  app/
    (landing)/
      _components/
    (site-pages)/
    (utility)/
  components/
    system/
  styles/
    tokens/
    recipes/
    globals.css
  lib/
    analytics/
    assets/
    content/
    seo/
```

## Rules

- Shared primitives live in `components/system`.
- Landing-page sections live in `app/(landing)/_components/<section>/`.
- Each landing section owns its `components`, `content`, and `styles` folders beside the route that composes it.
- Landing-page content aggregation flows through `app/(landing)/_components/landing-page-content.ts`.
- `styles/recipes/site.css` stays as the shared landing stylesheet for route-shell styles and selectors reused across multiple sections.
- Section-specific styles should be imported by the landing route layout from each section folder instead of being appended to `styles/recipes/site.css`.
- Asset references should flow through a typed manifest rather than hardcoded URLs.
- Global styling should be token-first and Tailwind-v4-compatible.
- Route layouts own shared page shells.
- Site pages under `app/(site-pages)` should share the global navbar and invariant footer body through their route-group layout, while each page layout owns its optional promo surface and section stack.
- `Container` owns outer width and horizontal gutters.
- Section components own only section-specific visuals and internal composition.
- Shared primitives should absorb repeated visual patterns through explicit variants before sections introduce local duplicate styling.
- For heading copy specifically, sections should use `components/system/SectionHeading` as the typography source of truth and only keep section-owned heading CSS when the visuals truly diverge from the shared title system or the shared description variants.

## Rendering Strategy

- React Server Components by default
- client components only for interaction or browser APIs
- static rendering for landing-page routes
- minimal global providers

## Route Direction

- The home page becomes the primary landing-page surface.
- Future product and solution routes such as `/applications` should live in `app/(site-pages)` and reuse the shared non-landing navbar shell.
- Product-detail destinations such as `/doow-ai` should also live in `app/(site-pages)` when a landing CTA requires a stable non-landing route during the rebuild.
- `signin`, `privacy_policy`, and `terms_of_use` remain supported.
- `about_us` and `contact_us` are removed and redirected.
- Utility routes should share a route-group layout instead of re-wrapping shell markup in each page.
