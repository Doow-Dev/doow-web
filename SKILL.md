---
name: doow-website-rebuild
description: Use this skill when working on the Doow landing-page rebuild. It covers the batched delivery model, Figma-driven implementation flow, mobile-first responsive rules, AI-assistant collaboration, CDN asset policy, design-system extraction, and the quality gates required before any section can be marked complete.
---

# Doow Website Rebuild

This repository is being rebuilt as a modern Doow SaaS landing page with supporting utility routes. The current site is legacy. The new source of truth is the Figma landing-page design and the rebuild docs in `docs/rebuild/`.

Do not treat this repo like a normal incremental UI cleanup. The work is a staged migration with design review after every batch and after every section.

## Primary Rules

1. Work in batches, not as a one-shot implementation.
2. Stop after each batch for review.
3. Stop after each section for review.
4. Use Figma as the design source of truth.
5. Build mobile-first, even when only desktop Figma exists.
6. Prefer static rendering and minimal client JavaScript.
7. Do not keep old landing-page structure or assets unless they are intentionally retained.

## Delivery Model

The rebuild runs in this order:

1. Preflight and standards lock
2. AI agent and repo guidance files
3. Legacy cleanup and route pruning
4. Figma extraction and design-system foundation
5. CDN and asset pipeline
6. Shared app shell, metadata, and quality harness
7. Section-by-section implementation from navbar to footer
8. Final cross-page polish and launch prep

Each batch must leave the repo in a coherent state and document what is now considered the new source of truth.

## Section Completion Gates

A section is not complete until it passes all four gates:

- Design: matches the agreed Figma node and screenshot.
- Performance: no avoidable bundle, media, or layout-shift regressions.
- Accessibility: semantic markup, keyboard behavior, contrast, focus, reduced motion, and alt text all hold up.
- SEO: correct headings, crawlable markup, descriptive links, and no critical content hidden behind client-only rendering.

Default review widths:

- `360`
- `390`
- `768`
- `1024`
- `1280`
- `1440+`

## Figma Workflow

Use the Figma MCP workflow whenever a section or primitive is being implemented from design.

1. Pull the exact node context for the target section or component.
2. Pull the screenshot for the same node.
3. Pull only the variables, components, and assets needed for that slice.
4. Normalize Figma values into the repo token system instead of copy-pasting generated Tailwind output.
5. Publish approved assets to the CDN path used by the app.

Important constraint:

- The current Figma connection works, but the active seat has hit tool-call limits during deeper inspection. Keep extraction targeted and section-specific.

## Responsive Implementation Rules

The available Figma design is desktop-first. Mobile and tablet behavior must be inferred in code.

Use these defaults unless a later review overrides them:

- Start with the mobile layout first.
- Reduce visual complexity on small screens before shrinking everything proportionally.
- Preserve hierarchy, spacing rhythm, and CTA clarity.
- Favor stacked layouts, simplified media framing, and shorter line lengths on small viewports.
- Use motion sparingly and honor `prefers-reduced-motion`.

## Design-System Rules

The new design system comes from Figma, not from the current repo styling.

Build three layers:

1. Raw Figma token snapshots for traceability.
2. Semantic tokens used by code.
3. Component recipes and primitives built on those semantic tokens.

Required early primitives:

- Button
- Nav link
- CTA group
- Badge or pill
- Section heading
- Card
- Form field
- Footer list
- Media frame

Do not add one-off section styles when a reusable recipe should exist.

## Asset and CDN Rules

The new site should not depend on the legacy landing-page assets in `public`.

Rules:

- Keep only minimal local essentials inside the app package.
- Serve landing-page imagery, videos, and exported Figma assets through Azure Blob Storage plus Front Door.
- Reference assets through typed manifest entries, not ad hoc string URLs.
- Avoid hardcoded storage URLs in components.

## Route Policy

Public routes to keep:

- `/`
- `/signin`
- `/privacy_policy`
- `/terms_of_use`

Routes to prune with permanent redirects:

- `/contact_us`

## AI Collaboration Rules

This repo is being prepared for multiple AI assistants.

Guidance priority:

1. `docs/rebuild/`
2. `AGENTS.md`
3. `SKILL.md`
4. Assistant-specific instruction files

All assistants should:

- Follow the batch workflow.
- Reuse the shared design tokens and primitives.
- Avoid reviving legacy structure.
- Keep edits localized and easy to review.
- Leave clear notes about what batch or section changed.

## File Map

- `docs/rebuild/README.md`: rebuild index and current status
- `docs/rebuild/roadmap.md`: batch order and section sequence
- `docs/rebuild/acceptance-gates.md`: review criteria and thresholds
- `docs/rebuild/section-registry.md`: Figma node registry and section status
- `docs/rebuild/architecture.md`: target app structure and implementation rules
- `docs/rebuild/design-system.md`: token and primitive strategy
- `docs/rebuild/figma-workflow.md`: Figma extraction workflow
- `docs/rebuild/assets-cdn.md`: asset-hosting and CDN contract
- `docs/rebuild/content-model.md`: typed content strategy

## Working Style

When implementing:

- Announce the batch or section you are working on.
- Explain what source material you are using.
- Validate before claiming completion.
- Pause for review before moving to the next batch or section.

Do not silently continue into the next section after finishing one.
