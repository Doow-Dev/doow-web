# Blog authoring guide

Use this guide when you add or edit Doow blog content. The blog is local MDX
content inside the existing landing site, and the build validates frontmatter,
authors, taxonomy, assets, and approved MDX usage.

## Post frontmatter

Every post lives in `content/blog/*.mdx`. The filename becomes the public slug,
so `content/blog/sample-post.mdx` renders at `/blog/sample-post`.

Required fields:

- `title`: Article title.
- `description`: Summary for cards, metadata, feeds, and search.
- `publishedAt`: Date in `YYYY-MM-DD` format.
- `authors`: One or more author slugs from `content/blog/authors/*.mdx`.
- `category`: One approved category slug.
- `tags`: One or more content tags.
- `draft`: Boolean publish flag.

Optional fields:

- `updatedAt`: Date in `YYYY-MM-DD` format.
- `featured`: Boolean featured flag.
- `image`: CDN-relative cover image path.
- `imageAlt`: Required when `image` is present.
- `canonicalUrl`: External canonical URL when content is syndicated.
- `related`: Related post slugs.

Use this shape for new posts:

```yaml
---
title: "How finance teams lose track of SaaS spend"
description: "A short summary for cards, metadata, feeds, and search."
publishedAt: "2026-05-03"
updatedAt: "2026-05-03"
authors:
  - "doow-team"
category: "finance-operations"
tags:
  - "saas-management"
draft: false
featured: false
image: "blog/covers/saas-spend.jpg"
imageAlt: "Finance dashboard showing software spend by vendor."
related: []
---
```

## Authors

Author profiles live in `content/blog/authors/*.mdx`. The filename becomes the
author slug and must match any post `authors` references.

Author frontmatter uses this shape:

```yaml
---
name: "Doow Team"
role: "Editorial"
bio: "Product, engineering, and finance operations notes from the Doow team."
avatar: "blog/authors/doow-team.jpg"
avatarAlt: "Doow editorial team avatar."
---
```

## Taxonomy and slugs

Only these category slugs are valid:

- `finance-operations`
- `product`
- `engineering`
- `company`

Tags must be lowercase and hyphenated. Use `saas-management`, not
`SaaS Management`.

Post slugs come from filenames. Do not change a filename after publish unless
you also add a redirect in `src/lib/blog/redirects.ts`.

## Asset policy

Blog media must use CDN-relative paths that pass through the shared asset
helpers.

- Cover images use paths like `blog/covers/sample-post.jpg`.
- Author avatars use paths like `blog/authors/doow-team.jpg`.
- Inline MDX images use paths like `blog/inline/sample-proof.jpg`.
- Do not use `/public` paths for blog media.
- Do not hardcode Azure Blob Storage URLs in MDX or components.
- Always write descriptive alt text.

## MDX trust policy

Blog MDX is trusted content written and reviewed by Doow contributors, but the
component surface stays intentionally small.

Approved custom components:

- `Callout`
- `Quote`
- `CTA`

Use `Callout` for contextual notes. Sprint 3 supports four variants:

```mdx
<Callout type="note" title="Pipeline checkpoint">
Use this for neutral implementation notes.
</Callout>

<Callout type="warning" title="Before publishing">
Use this for risks, deadlines, or constraints.
</Callout>

<Callout type="insight" title="Operator insight">
Use this for decision-making context.
</Callout>

<Callout type="example" title="Example">
Use this for concrete patterns or sample workflows.
</Callout>
```

Use `Quote` for named editorial pull quotes:

```mdx
<Quote author="Doow Editorial">
Clear content systems are product systems.
</Quote>
```

Use `CTA` for internal calls to action. CTA clicks are tracked with the
`blog_cta_clicked` event.

```mdx
<CTA href="/subscriptions" label="Explore subscription visibility">
Turn scattered software spend into a clearer operating record.
</CTA>
```

Approved Markdown and HTML surface:

- Headings, paragraphs, ordered lists, unordered lists, tables, blockquotes,
  inline code, and fenced code blocks.
- Markdown links. External links render with `target="_blank"` and
  `rel="noopener noreferrer"`.
- Markdown images with non-empty alt text and CDN-relative paths.

Do not add raw `<script>` tags, inline event handlers, arbitrary embeds, or
unapproved custom components. The content pipeline fails the build when these
appear.

Deferred components:

- `Cards`
- `Tabs`
- `CodeBlockTabs`
- `Video`

Do not use deferred components in launch content until the validator and
renderer explicitly support them.

## Review checklist

Before merging blog content, run these commands:

```bash
npm run typecheck
npm run build
BASE_URL=http://localhost:3000 npm run check:blog:s2
```

Use the latest staged blog check that exists for the current sprint. For
example, use `check:blog:s4` once RSS ships.
