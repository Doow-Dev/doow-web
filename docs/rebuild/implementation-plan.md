# Implementation Plan

This file captures the working rebuild plan for the Doow landing page so future sessions do not depend on chat history.

## Primary Goal

Rebuild the Doow landing page as a clean, modern, mobile-first Next.js codebase with a Figma-driven design system, CDN-backed assets, strong AI-assistant support, and gated section-by-section delivery.

## Delivery Model

- The rebuild is batched, not one-shot.
- Every batch ends with a review checkpoint.
- Every section ends with a review checkpoint.
- Shared foundations are built once and reused.
- We do not pause to inventory the full design system across the whole file before section work.
- Instead, each active section extracts only the primitives and assets it needs, promotes reusable pieces into the system layer, implements the section, and then pauses for review.
- No section moves forward until it passes design, responsiveness, accessibility, and performance or SEO review.

## Default Review Widths

- `360`
- `390`
- `768`
- `1024`
- `1280`
- `1440+`

## Section Acceptance Gates

### Design
- Match the target Figma node closely in spacing, typography, color, radius, shadow, and interaction states.

### Performance
- Avoid unnecessary client JavaScript.
- Avoid oversized media and layout shifts.
- Prefer optimized, CDN-backed media delivery.

### Accessibility
- Use semantic structure.
- Support keyboard navigation.
- Preserve visible focus styles.
- Respect contrast and reduced-motion requirements.
- Use correct accessible names and alt text.

### SEO
- Use correct heading structure.
- Keep important content crawlable in markup.
- Use descriptive links and metadata where relevant.

## Batch Sequence

### Batch 0. Preflight and standards lock

- Freeze workflow, breakpoint matrix, review gates, route policy, and baseline facts in repo docs.
- Capture section order and Figma references.
- Status: completed

### Batch 1. AI agent and repo guidance files

- Rewrite `SKILL.md` into a repo-specific rebuild skill.
- Add assistant guidance for Codex, Cursor, Claude, and Copilot.
- Add rebuild docs for architecture, Figma workflow, tokens, content, and CDN policy.
- Status: completed

### Batch 2. Legacy cleanup and route pruning

- Remove the old landing-page implementation and old asset assumptions.
- Prune `/about_us` and `/contact_us` with redirects.
- Keep `/signin`, `/privacy_policy`, and `/terms_of_use` on a neutral rebuild shell.
- Status: completed

### Batch 3. Figma extraction and design-system foundation

- Use Figma as the design input layer.
- Snapshot raw Figma variables and selected key component instances.
- Normalize raw Figma values into semantic tokens.
- Build the first shared primitives and recipes:
  - button
  - nav link
  - CTA group
  - badge or pill
  - card
  - section heading
  - form field
  - footer list
  - media frame
- Capture only section-critical Figma nodes when tool-call limits are a concern.
- Status: foundation landed, with ongoing refinements as sections continue to ship
- Current note:
  - the local desktop bridge can complete MCP `initialize` but currently hangs on `tools/list`
  - targeted direct extraction for exact nodes is now working through the local desktop bridge
  - hosted Figma app tools are rate-limited on the current View seat
  - the repo foundation now includes shared primitives that are upgraded section by section from exact extraction
  - the first hero implementation slice uses this section-first foundation model

### Batch 4. CDN and asset pipeline

- Define the Azure Blob Storage plus Front Door asset contract.
- Introduce environment variables for asset delivery.
- Define the typed asset manifest layer.
- Stop treating `public/` as the long-term home of landing-page media.
- Prepare `next/image` and media delivery for the Front Door hostname.
- Status: in progress

### Batch 5. Shared app shell, metadata, and quality harness

- Build and harden the new shared shell while section work continues.
- Set up global styles, token wiring, metadata, and route structure.
- Add quality gates:
  - lint
  - typecheck
  - unit coverage for reusable logic
  - Playwright smoke coverage
  - visual screenshot checks
- Add a component review surface such as Storybook for shared system work.
- Lock container and spacing rules before section implementation begins.
- Status: in progress

### Batch 6 onward. Section-by-section implementation

Sections are implemented in Figma order from top to bottom.

Initial section order:

1. Navbar or header
2. Hero
3. Demo or video section
4. Feature split
5. Finance control feature section
6. Alternative apps comparison
7. Doow AI spotlight
8. Pricing
9. FAQ
10. Remaining product-story sections in Figma order
11. Integrations
12. Footer

Each section follows this loop:

1. Pull the exact Figma node context and screenshot.
2. Pull only the variables, component instances, and assets needed for that section.
3. Promote any repeatable values or variants into shared tokens and primitives.
   - Do not leave repeated heading typography differences in section styles when they can be represented by a shared `SectionHeading` variant.
4. Implement the section using shared tokens and primitives only.
5. Validate at all target breakpoints.
6. Run accessibility, SEO, and performance checks.
7. Pause for review and sign-off before the next section.

If a section fails review, iterate on that section only.

### Final batch. Cross-page polish and launch prep

- Run a final whole-page consistency pass.
- Validate metadata, OG, sitemap, robots, redirects, analytics wiring, CDN behavior, and image handling.
- Validate retained supporting routes on the new shell.
- Create a launch checklist and a list of deferred non-blocking items.
- Status: pending

## Route Policy

Keep:

- `/`
- `/applications`
- `/doow-ai`
- `/signin`
- `/privacy_policy`
- `/terms_of_use`

Prune:

- `/about_us`
- `/contact_us`

## Architecture Direction

- Single Next.js app
- App Router
- Mobile-first implementation
- Static rendering by default
- Minimal client islands
- Figma-driven token system
- Typed content
- Typed asset manifest
- CDN-first media delivery
- AI-assistant-friendly repo structure and docs

## Figma Source Of Truth

- Root file key: `aUt2nki2FMqr6qKZ10GRR6`
- Root landing frame: `580:1110`

Known section anchors:

- Hero: `580:1111`
- Demo or video: `580:1167`
- Feature split: `580:2094`
- Finance control feature section: `580:2482`
- Alternative apps comparison: `581:2611`
- Doow AI spotlight: `1056:1823`
- Pricing: `582:3087`
- FAQ: `583:3321`
- Integrations: `583:3592`
- Footer: `583:3998`

## Current Status Snapshot

- Batches 0 to 2 are complete.
- Batch 3 foundation is landed and is now refined alongside section work.
- Batch 4 asset-pipeline work is in progress, with several sections still using temporary local fallbacks.
- Batch 5 shared shell and quality-harness work is in progress.
- Batch 6 section implementation is active across the landing page.
- The Doow AI spotlight implementation exists in code, but it is currently commented out on the home route.
- `npm run typecheck` passes, `npm run test:unit` passes, `npm run lint` passes with warnings, and `npm run build` currently depends on live Google Fonts access because `src/app/layout.tsx` uses `next/font/google`.
- The local desktop-backed Figma MCP bridge is configured for Codex and remains useful for targeted node extraction even though `tools/list` still hangs.
