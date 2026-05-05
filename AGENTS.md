# Doow Website Rebuild Instructions

This repository is undergoing a staged rebuild of the Doow landing page and its supporting routes.

Read these in order before making changes:

1. `docs/rebuild/README.md`
2. `docs/rebuild/roadmap.md`
3. `docs/rebuild/acceptance-gates.md`
4. `SKILL.md`

## Core Working Rules

- Work in batches, not as a one-shot rewrite.
- Stop after each batch for review.
- Stop after each section for review.
- Use Figma as the design source of truth.
- Implement mobile-first, even when only desktop Figma exists.
- Prefer static rendering, minimal client JavaScript, and strong accessibility.

## Current Route Policy

Keep:

- `/`
- `/subscriptions`
- `/signin`
- `/privacy_policy`
- `/terms_of_use`

Prune:

- `/about_us`
- `/contact_us`

Blog routes (added per `docs/rebuild/blog-roadmap.md` and
`docs/rebuild/blog-sprints.md`):

- `/blog` — editorial index
- `/blog/[slug]` — article pages
- `/blog/page/[page]` — index pagination
- `/blog?category=[category]` — same-page category filtering
- `/blog/tag/[tag]` — tag archives
- `/blog/tag/[tag]/page/[page]` — tag pagination
- `/blog/rss.xml` — primary RSS feed
- `/api/og/blog` — dynamic OG image route
- `/blog/search.json` — build-time search index (post-launch milestone)
- `/blog/category/[category]/rss.xml` — per-category RSS (post-launch milestone)
- `/blog/tag/[tag]/rss.xml` — per-tag RSS (post-launch milestone)

All blog routes return `noindex, nofollow` until `BLOG_LIVE=true` in
production environment variables.

## What Not To Do

- Do not keep old landing-page sections just because they already exist.
- Do not treat legacy `public` assets as long-term production assets.
- Do not hardcode Azure blob URLs throughout the codebase.
- Do not introduce section-specific styling that should be a shared primitive.
- Do not move to the next section before the current one passes design, responsiveness, accessibility, and performance or SEO review.

## Design-System Direction

The new system is token-first and Figma-driven:

1. Raw Figma values
2. Semantic tokens
3. Shared primitives and recipes
4. Section implementations

The current repo styling is transitional and should not be preserved unless explicitly retained by the rebuild docs.

## AI Collaboration Notes

- Keep changes tightly scoped to the active batch or section.
- Update docs when a batch changes the source of truth.
- Prefer files and structures that are easy for other assistants to follow.
- Use typed content and typed asset manifests instead of embedding large content blocks directly in JSX where possible.
