# MDX and content governance

Doow has two MDX publication systems in the monorepo: blog content in the web
app and docs content in the docs app. They share low-level helpers, not
publication models.

## Blog content

Blog content lives in `apps/web/content/blog`. Blog routes, metadata, RSS,
Open Graph image generation, launch gating, and blog checks stay in `apps/web`.

Use the blog runbook in `docs/runbooks/add-blog-post.md` before adding or
editing posts.

## Docs content

Docs content lives in `apps/docs/content/docs`. Docs routing, navigation,
search, redirects, versioning, and docs schema stay in `apps/docs/src/lib/docs`.

Use the docs runbooks in `docs/runbooks/` before adding, moving, or redirecting
docs pages.

## Shared MDX helpers

Shared helpers live in `packages/mdx` only when they are generic enough for both
apps. Shared schema primitives live in `packages/content-schemas`.

Do not move app-specific frontmatter, route generation, navigation, RSS,
redirect, or search behavior into shared packages.

## Required checks

Run `pnpm check:content` after content changes. It runs blog and docs content
checks through Turborepo.

Run the focused docs check when changing docs content:

```bash
pnpm --filter @doow/docs check:content
```

Run the focused blog launch check when changing blog content:

```bash
pnpm --filter @doow/web check:content
```
