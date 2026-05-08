# Add a blog post

Use this runbook when adding editorial content to `www.doow.co/blog`.

## Steps

1. Create `apps/web/content/blog/<slug>.mdx`.
2. Add blog frontmatter with title, description, publish dates, authors,
   category, tags, draft state, featured state, and related posts.
3. Keep article content in MDX. Do not embed large content blocks directly in
   JSX routes.
4. Use blog-approved components and content patterns from the existing posts and
   `apps/web/src/lib/blog`.
5. Run `pnpm --filter @doow/web check:content`.
6. Run the launch check if the post affects production readiness:

```bash
pnpm check:blog:launch
```

7. Run `pnpm --filter @doow/web build`.

## Frontmatter template

```mdx
---
title: "Post title"
description: "Search and social description."
publishedAt: "2026-05-08"
updatedAt: "2026-05-08"
authors:
  - "doow-team"
category: "engineering"
tags:
  - "finance-operations"
draft: false
featured: false
related: []
---
```

## Launch gating

Blog routes remain `noindex, nofollow` until `BLOG_LIVE=true` is set in the web
production environment. Do not change that gate from a post PR.
