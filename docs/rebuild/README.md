# Rebuild Index

This folder is the source of truth for the Doow landing-page rebuild.

## Current Status

- Active stage: Batch 5 shared app-shell slice in progress for retained non-landing routes
- Latest update: shared non-landing chrome now includes the global navbar plus the invariant site-pages footer body; page-level product routes own only their optional promo surface and section stack, with `/doow-ai` now reserved as a stable CTA destination during the landing rebuild
- Delivery model: gated batch implementation with explicit review after each batch and section
- Design source: Figma landing page `580:1110`
- Responsive rule: mobile-first implementation inferred from desktop design
- Asset direction: Azure Blob Storage plus Front Door
- Figma extraction note: local bridge still hangs on `tools/list`, but targeted `tools/call` extraction is working for exact nodes; section work now extracts only the active section and the primitives it needs

## Current Repo State

- Current source file count under `src/`: `156`
- Current public asset file count: `33`
- Current app routes in the build:
  - `/`
  - `/applications`
  - `/doow-ai`
  - `/privacy_policy`
  - `/signin`
  - `/terms_of_use`
- Current production build status: passes and prerenders the route set above as static content
- Current lint status: passes

## Baseline Snapshot

Captured before structural rebuild work:

- Current source file count under `src/`: `65`
- Current public asset file count: `67`
- Current public asset buckets: `assets`, `demos`, `flags`, `integrations`, `logos`, `profiles`
- Current app routes discovered from `src/app/`:
  - `/`
  - `/about_us`
  - `/contact_us`
  - `/privacy_policy`
  - `/signin`
  - `/terms_of_use`
- Current production build status: passes and prerenders the route set above as static content

## Read Next

1. `handoff.md`
2. `batch-3-foundation.md`
3. `header-nav-extraction.md`
4. `global-site-navbar-extraction.md`
5. `hero-extraction.md`
6. `hero-implementation.md`
7. `hero-nav-review-guide.md`
8. `layout-matrix.md`
9. `style-refactor-checklist.md`
10. `implementation-plan.md`
11. `roadmap.md`
12. `acceptance-gates.md`
13. `section-registry.md`
14. `architecture.md`
15. `design-system.md`
16. `figma-workflow.md`
17. `assets-cdn.md`
18. `content-model.md`

## Important Constraint

Figma MCP access is available, but the current View seat has hit tool-call limits during deeper design-system exploration. The local desktop bridge now works reliably for targeted node extraction. Section work should now follow the active-section loop: targeted extraction, primitive promotion, section implementation, review, then move on.
