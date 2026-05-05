# Blog S0B extraction

This document records the Sprint 0B design-spec gate for the first Sprint 3
implementation pass. The initial pass used the existing Doow token system,
shared primitives, and proof routes. On May 3, 2026, the dedicated blog-index
Figma nodes were provided and became the source of truth for the `/blog` index
UI.

## Source status

Sprint 3 depends on written design decisions for the blog index and article
page. During the preflight pass, the existing rebuild docs showed Figma
extraction coverage for the landing page, header, hero, navbar, and shared
tokens, but no blog-specific component node or extracted blog layout spec.

The blog index now uses these Figma nodes:

- `1601:2420` for the full `/blog` index page.
- `1605:3143` for the hero and latest-article section.
- `1605:3168` for the category strip, article grid, and pagination section.
- `1601:2647` for the green Doow AI CTA block.

The implementation still uses these existing repo sources:

- `src/styles/tokens/foundation.css` for color, typography, radius, elevation,
  spacing, and layout tokens.
- Shared primitives from `src/components/system/`, especially `Badge` and
  `Button`.
- The Sprint 1 and Sprint 2 blog pipeline, metadata, and route contracts.
- The proof `/blog` and `/blog/sample-post` routes as the structural baseline.

## Blog-index token mapping

Sprint 3 maps blog-index UI decisions to semantic blog tokens. Blog component
CSS must consume these tokens or existing shared Doow tokens rather than raw
colors or pixel values.

- Page surfaces use `--blog-surface-page`, `--blog-surface-card`, and
  `--blog-surface-elevated`.
- Text uses `--blog-ink-heading`, `--blog-ink-body`, `--blog-ink-muted`, and
  `--blog-ink-link`.
- Borders, focus, and shadows use `--blog-border-subtle`,
  `--blog-border-strong`, `--blog-focus-ring`, `--blog-elevation-card`, and
  `--blog-elevation-card-hover`.
- Layout uses `--blog-shell-max`, `--blog-article-measure`,
  `--blog-sidebar-width`, and `--blog-card-image-aspect`.
- Callout variants use `--blog-callout-*` tokens for note, warning, insight,
  and example states.
- Code, tables, and media use `--blog-code-surface`,
  `--blog-table-header-surface`, and `--blog-media-surface`.
- The Figma blog index adds `--blog-index-*` tokens for the exact page max
  widths, card shadows, and the `#00140a`, `#666b69`, and `#e5e6e5` color
  values.

## Component contract

The blog index renders the Figma hero, latest-article feature card, category
strip, article grid, and pagination row. The green Doow AI CTA uses the shared
`SiteFooterPromoSection` with `siteFooterPromoPresets.doowAiQuestions`, matching
the reusable footer promo pattern used by the other site pages. Cards use a
full-card link, optional cover image, category badge, title, description,
author identity, and date.

The article page renders breadcrumbs, category, title, description, optional
cover image, author identity, date, reading time, MDX body, and the current
simple table of contents. The TOC stays desktop-sticky only in Sprint 3.
Active-heading state, mobile collapse, related posts, and author card polish
belong to later blog sprints.

## Core MDX surface

Sprint 3 supports the core authoring surface only:

- Markdown links, images, headings, lists, tables, blockquotes, inline code,
  and fenced code blocks.
- `Callout` with `type="note"`, `type="warning"`, `type="insight"`, or
  `type="example"`.
- `Quote` for editorial pull quotes.
- `CTA` for tracked internal calls to action.

`Cards`, `Tabs`, `CodeBlockTabs`, and `Video` remain deferred until launch
content requires them.

## Acceptance notes

The Sprint 3 implementation must pass build, typecheck, lint, and the current
blog runtime check. Manual visual review must cover `/blog` and
`/blog/sample-post` at `360`, `390`, `768`, `1024`, `1280`, and `1440` widths.
The `/blog` index is now eligible for direct Figma matching against the four
blog-index nodes listed above. The article page remains on the existing
transitional Sprint 3 support styles until its dedicated Figma nodes are
provided and implemented.
