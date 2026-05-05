# Blog architecture reference audit

This note records what the strongest Next.js and MDX blog references bring to
the table for Doow. The goal is not to copy their UI. Doow already has a site
visual system. The useful parts are content architecture, routing, metadata,
feeds, authoring flow, and the amount of machinery each approach requires.

## References reviewed

These are the repos and templates reviewed for architecture patterns.

- Vercel Portfolio Blog Starter:
  https://github.com/vercel/examples/tree/main/solutions/blog
- Lee Robinson `next-mdx-blog`:
  https://github.com/leerob/next-mdx-blog
- Tim Rux `timlrx.com` / Tailwind Next.js Starter Blog:
  https://github.com/timlrx/timlrx.com
- ChangoMan `nextjs-mdx-blog`:
  https://github.com/ChangoMan/nextjs-mdx-blog
- Alex Chan `next-mdx-blog-example`:
  https://github.com/alexchantastic/next-mdx-blog-example
- Clerk public docs repo:
  https://github.com/clerk/clerk-docs
- Ayodele portfolio blog:
  `/home/ayodele/Desktop/portfolio-site`

## Clerk public docs repo

Clerk is the best reference for production MDX authoring discipline, with one
important boundary: the public repo exposes docs content, authoring guidance,
and validation scripts, but not the full private React renderer for the docs
website. We should copy the public contracts and validation ideas, not assume
private implementation details.

- Docs content lives as `.mdx` files with frontmatter and rich reusable MDX
  components.
- The public content uses components such as `Cards`, `Tabs`,
  `CodeBlockTabs`, `Steps`, `Include`, `Accordion`, and typed/API-oriented
  helpers.
- Code blocks support metadata-heavy authoring patterns such as tabs, labels,
  framework or package-manager variants, and highlighted snippets.
- Authoring docs explain how screenshots, images, annotations, and component
  usage should be handled.
- Scripts parse Markdown/MDX ASTs to validate links, images, partials, and
  framework-specific content.
- Image governance is explicit: referenced images are checked, unused images
  can be detected, and image paths are treated as part of content quality.
- Shared partials are supported for repeated content, but the repo also shows
  the cost: validation must understand includes and authoring conventions.

What Doow should copy:

- Define an approved MDX component contract and fail validation when content
  uses unsupported components.
- Use AST-based parsing for headings, images, and MDX component validation
  instead of regex.
- Treat code block metadata as a first-class authoring surface: filenames,
  marked lines, inserted/deleted lines, and collapsible sections.
- Add image validation: missing files, raw `/public` references, hardcoded CDN
  base URLs, and missing alt text should be caught before launch.
- Add a sample article that exercises the full component contract, so the blog
  has a regression fixture.

What Doow should adapt:

- Keep the Clerk authoring rigor, but scope the component set to a company
  marketing blog rather than API docs.
- Add `Cards`, `Tabs`, and `CodeBlockTabs` when the launch/sample content needs
  them; do not inherit Clerk's SDK selector, Typedoc, or multi-framework docs
  machinery by default.
- Use shared partials only after the compiler/validator understands them.

What Doow should avoid:

- Do not copy Clerk's docs-site assumptions that live in the private renderer.
- Do not introduce SDK-language switching, Typedoc, or conditional docs
  content unless Doow starts publishing product documentation, not blog posts.
- Do not allow rich MDX components without build-time validation.

## Vercel Portfolio Blog Starter

Vercel is the best company-grade baseline. It is small enough to understand,
but complete enough to show the key surfaces a serious blog needs.

- Content lives as local MDX in `app/blog/posts/*.mdx`.
- The blog index route is `app/blog/page.tsx`.
- The article route is `app/blog/[slug]/page.tsx`.
- `app/blog/utils.ts` reads MDX files from disk, parses frontmatter, creates
  slugs from filenames, and returns sorted post data.
- `generateStaticParams` prebuilds one route per post.
- `generateMetadata` builds article metadata from frontmatter.
- Article pages emit JSON-LD `BlogPosting` structured data.
- `app/components/mdx.tsx` defines custom MDX components for links, images,
  tables, heading anchors, and code highlighting.
- `app/rss/route.ts` builds RSS from the same post data.
- `app/sitemap.ts` includes both static routes and blog posts.
- `app/og/route.tsx` creates dynamic Open Graph images from a title query.
- It does not include tags, authors, pagination, related posts, or search.

What Doow should copy:

- Use local MDX as the source of truth, not a CMS.
- Keep a single server-side blog data module that owns reading, sorting, and
  filtering posts.
- Generate `generateStaticParams`, `generateMetadata`, JSON-LD, RSS, sitemap,
  and OG images from the same normalized post model.
- Use a custom MDX component map so articles can use Doow-native links, images,
  code blocks, callouts, and tables.

What Doow should adapt:

- Put content under a clearer content folder such as `content/blog` or
  `src/content/blog`, instead of colocating posts inside `app/blog/posts`.
- Replace the simple hand-rolled frontmatter parser with a structured parser
  and validation layer, such as `gray-matter` plus `zod`, or the repo's chosen
  equivalent.
- Keep the Vercel simplicity, but add categories or tags only if they serve
  Doow's editorial strategy.

What Doow should avoid:

- Do not copy the starter UI.
- Do not leave frontmatter loosely typed.
- Do not hardcode starter names, base URLs, or author values in route handlers.

## Lee Robinson `next-mdx-blog`

Lee's current repo is now very minimal. It is useful for understanding native
MDX routes, not for a growing company blog engine.

- `@next/mdx` is used in `next.config.ts`.
- `pageExtensions` includes `mdx`, so MDX files can be actual App Router pages.
- Posts are route files such as `app/n/1/page.mdx`.
- `app/page.mdx` is also an MDX page.
- `mdx-components.tsx` globally maps MDX elements to styled React components.
- Code highlighting is handled through `sugar-high`.
- The config enables `experimental.mdxRs` with GitHub-flavored Markdown.
- It has an optional redirects system backed by Postgres.
- It has a sitemap, but no real post index pipeline.

What Doow should copy:

- Keep a global MDX component map so prose uses the product site's components.
- Use native MDX pages for special editorial pages only if needed.
- Keep article rendering simple when the content surface is small.

What Doow should adapt:

- Borrow the component-map idea, not the route model.
- Use the `mdxRs` path only if Doow does not need remark or rehype plugins.
  If we need heading anchors, custom code blocks, excerpts, or transforms, the
  non-Rust MDX pipeline is safer.

What Doow should avoid:

- Do not use numbered routes such as `/n/1`.
- Do not use MDX-as-routes for a scalable company blog index.
- Do not add database-backed redirects just for the blog.

## Tim Rux `timlrx.com`

Tim's repo is the mature publishing-system reference. It has many features and
shows what a full editorial engine can grow into.

- Content lives under `data/blog/*.mdx`.
- Author profiles live under `data/authors/*.mdx`.
- Content is compiled with `contentlayer2` and `next-contentlayer2`.
- `contentlayer.config.ts` defines `Blog` and `Authors` document types.
- Computed fields include `readingTime`, `slug`, `path`, `filePath`, `toc`,
  and `structuredData`.
- Frontmatter supports `title`, `date`, `tags`, `lastmod`, `draft`,
  `summary`, `images`, `authors`, `layout`, `bibliography`, and
  `canonicalUrl`.
- The build writes `app/tag-data.json` for tag counts.
- The build can generate a local search index.
- Blog routes include `/blog`, `/blog/page/[page]`, `/blog/[...slug]`,
  `/tags`, and `/tags/[tag]`.
- Post pages support multiple layouts: `PostSimple`, `PostLayout`, and
  `PostBanner`.
- Article pages include previous and next post navigation.
- MDX supports tables, custom images, newsletter forms, bleed components,
  table of contents, citations, math, code titles, syntax highlighting, and
  GitHub-style alerts.
- RSS is generated after build, including per-tag feeds.

What Doow should copy:

- Use a typed post model with computed fields.
- Include `draft`, `summary`, `publishedAt`, `updatedAt`, `image`, and
  `canonicalUrl` from the beginning.
- Consider `readingTime`, `toc`, and `structuredData` as first-class computed
  values.
- Add tags or categories in a controlled way once Doow has enough posts.
- Keep authors as structured content if multiple people will write.
- Generate RSS and sitemap from the same normalized content model.

What Doow should adapt:

- Treat Tim's repo as a menu, not the default architecture.
- Start with one article layout, then add more only when the editorial program
  needs it.
- Add pagination only when the number of posts makes it useful.
- Add search only when there are enough articles for search to matter.

What Doow should avoid:

- Do not introduce `pliny`, citations, math, newsletter widgets, and per-tag
  feeds unless Doow has a clear near-term need.
- Do not start with three post layouts.
- Do not make the blog implementation feel heavier than the site itself.

## ChangoMan `nextjs-mdx-blog`

ChangoMan is the smaller Contentlayer reference. It is easier to reason about
than Tim's repo but still shows typed MDX processing and post routes.

- Posts live under `posts/*.mdx`.
- `contentlayer.config.ts` defines a `Post` document type.
- Required fields are `title`, `date`, and `description`.
- A computed `url` field maps each post to `/posts/<slug>`.
- The MDX pipeline includes `remark-gfm`, `rehype-slug`,
  `rehype-pretty-code`, and `rehype-autolink-headings`.
- `src/app/page.tsx` imports `allPosts`, sorts by date, and renders cards.
- `src/app/posts/[slug]/page.tsx` uses `generateStaticParams`.
- Post metadata comes from the compiled Contentlayer document.
- The post page maps MDX `a` to `next/link` and `Image` to `next/image`.
- `src/app/sitemap.ts` includes static routes and posts.
- It has no tags, no authors, no RSS route, and no pagination.

What Doow should copy:

- Keep the post schema small at first.
- Use a typed compiled-content layer if Doow chooses Contentlayer.
- Keep MDX plugins focused: GFM, heading slugs, autolinks, and code blocks.
- Keep post cards fed by normalized post data rather than duplicating content
  in JSX.

What Doow should adapt:

- Use `/blog` instead of `/posts`.
- Add RSS and JSON-LD, which this reference does not fully cover.
- Use Doow's design primitives instead of the starter theme system.

What Doow should avoid:

- Do not add dark-mode or theme-provider machinery for this blog if the rest of
  the Doow marketing site does not need it.
- Do not copy the starter homepage copy or component styling.

## Alex Chan `next-mdx-blog-example`

Alex's repo is useful because it shows App Router mechanics without a content
framework. It is a good learning reference for routing, categories, and
pagination.

- Each post is an MDX route under `src/app/(posts)/<slug>/page.mdx`.
- Posts export metadata directly from the MDX module.
- `src/posts.ts` reads route directories with `fs/promises`.
- It imports each MDX module to collect metadata.
- It sorts posts by `publishDate`.
- It implements `getPosts`, `getPostsByCategory`, `getPaginatedPosts`, and
  `getPaginatedPostsByCategory`.
- Categories are centrally defined in `src/categories.ts`.
- The home page renders page one.
- `/page/[page]` handles pagination.
- `/category/[category]` handles category filtering.
- Invalid categories and invalid pages return `notFound`.
- Page one redirects back to `/`.

What Doow should copy:

- Keep category values centralized and typed.
- Use helper functions for post listing, category filtering, and pagination.
- Return `notFound` for invalid content routes.
- Redirect duplicate first-page routes to the canonical index.

What Doow should adapt:

- Use MDX content files instead of route-group MDX files for Doow's main blog.
- Use the pagination and category mechanics only if the content volume
  justifies them.
- Add metadata and RSS patterns from Vercel, because Alex's repo is mostly
  routing mechanics.

What Doow should avoid:

- Do not make every article a route file under `app`.
- Do not import MDX modules dynamically just to read metadata if a structured
  content pipeline already gives us metadata.

## Ayodele portfolio blog

The portfolio blog is a Gatsby and MDX implementation, not a Next.js blog. It
is still useful because it shows a real local-MDX authoring flow with images,
RSS, generated pages, and reusable card components.

- The site uses Gatsby 5, React 18, TypeScript, Tailwind, and MDX.
- Posts live under `src/posts/<year>/<slug>/index.mdx`.
- Each post keeps colocated assets under `assets/`.
- `gatsby-source-filesystem` sources posts from `src/posts`.
- `gatsby-plugin-mdx` compiles `.md` and `.mdx` files.
- `gatsby-remark-images` handles responsive post images.
- `gatsby-remark-images-medium-zoom` adds image zoom behavior.
- `gatsby-remark-autolink-headers` adds heading anchors.
- `gatsby-remark-prismjs` adds syntax highlighting.
- `gatsby-remark-copy-linked-files` copies non-image linked files into public
  build output.
- `gatsby-plugin-feed` generates `/rss.xml`.
- `gatsby-node.ts` creates article slugs using `createFilePath`.
- Article URLs are prefixed with `/articles`.
- `gatsby-node.ts` creates one page per MDX post.
- The articles index is `src/pages/articles.tsx`.
- The article template is `src/templates/Post.tsx`.
- The articles index queries `allMdx` sorted by `frontmatter.date`.
- Post cards render title, summary, date, reading time, and cover image.
- Generated GraphQL TypeScript files provide typed query results.
- The frontmatter model currently uses `title`, `summary`, `cover`, and
  `date`.
- The shared `SEO` component sets title, description, Open Graph, and Twitter
  metadata.
- The current `Post.tsx` template renders a placeholder `<div>Post</div>`,
  with the real `PostScreen` path commented out.

What Doow should copy:

- Keep article assets close to their MDX files during authoring.
- Treat cover images as first-class metadata.
- Preserve the article card pattern: cover, title, date, reading time, and
  summary.
- Keep reusable SEO helpers instead of spreading metadata logic across pages.
- Keep RSS as a required distribution channel.
- Keep code highlighting and heading anchors as baseline article features.
- Keep type generation or schema validation around content queries.

What Doow should adapt:

- Use Next.js App Router static generation instead of Gatsby page creation.
- Use `next/image` and the Doow asset manifest instead of Gatsby image data.
- Use typed frontmatter validation instead of relying on GraphQL shape alone.
- Use `/blog` instead of `/articles` for the company blog.
- Preserve the colocated-asset authoring feel, but publish production images
  through the blob/asset manifest policy.
- Expand the frontmatter model for company publishing: authors, category, tags,
  draft, featured, canonical URL, image alt text, and related posts.

What Doow should avoid:

- Do not carry over Gatsby-specific plugin architecture.
- Do not ship a placeholder article template.
- Do not keep the taxonomy absent; a company blog needs controlled categories
  and tags.
- Do not rely on page-level SEO only; article pages need full metadata,
  JSON-LD, canonical URLs, and share images.
- Do not make RSS summary-only if the editorial strategy needs richer feeds.

## Recommended Doow architecture

Doow should build the blog as a production-grade company publishing system in
one pass. The right architecture is Vercel's company-blog backbone, Tim Rux's
typed publishing depth, Clerk's authoring and validation discipline, Alex
Chan's route mechanics, and ChangoMan's focused MDX pipeline, expressed through
Doow's own site shell and design system.

This is not an MVP. It is the A-list baseline that avoids CMS dependency while
still giving marketing, product, and engineering a durable editorial platform.

## Production scope

This is the complete system shape Doow should implement.

- `/blog` for the editorial index.
- `/blog/[slug]` for article pages.
- `/blog/category/[category]` for category archive pages.
- `/blog/tag/[tag]` for tag archive pages.
- `/blog/page/[page]` for index pagination.
- `/blog/category/[category]/page/[page]` for category pagination.
- `/blog/tag/[tag]/page/[page]` for tag pagination.
- `/blog/rss.xml` for the primary RSS feed.
- `/blog/category/[category]/rss.xml` for category feeds.
- `/blog/tag/[tag]/rss.xml` for tag feeds.
- `/blog/og` or `/api/og/blog` for branded dynamic Open Graph images.
- `content/blog/*.mdx` or `src/content/blog/*.mdx` for article content.
- `content/blog/authors/*.mdx` or `src/content/blog/authors/*.mdx` for author
  profiles.
- `src/lib/blog/content.ts` as the only module that reads, validates,
  normalizes, sorts, filters, and paginates blog content.
- `src/lib/blog/schema.ts` for strict frontmatter validation.
- `src/lib/blog/seo.ts` for metadata, canonical URLs, JSON-LD, and OG helpers.
- `src/lib/blog/rss.ts` for feed generation.
- `src/lib/blog/search.ts` for generating a local search document index.
- `src/components/blog/mdx-components.tsx` for Doow-native MDX rendering.
- `src/components/blog/article-layout.tsx` for the canonical article layout.
- `src/components/blog/article-card.tsx` and archive components for listings.
- `src/components/blog/table-of-contents.tsx` for long-form posts.
- `src/components/blog/author-card.tsx` for author display.
- `src/components/blog/related-posts.tsx` for editorial continuation.

## Content model

The content model should be strict enough for SEO, sharing, feeds, archives,
and editorial governance without requiring a CMS.

```yaml
---
title: "How finance teams lose track of SaaS spend"
description: "A short summary for cards, metadata, feeds, and search."
publishedAt: "2026-05-02"
updatedAt: "2026-05-02"
authors:
  - "doow-team"
category: "Finance Operations"
tags:
  - SaaS Management
  - Finance
image: "/assets/blog/saas-spend-cover.png"
imageAlt: "Finance dashboard showing software spend by vendor."
draft: false
featured: false
canonicalUrl: "https://www.doow.co/blog/how-finance-teams-lose-track-of-saas-spend"
---
```

Required article fields:

- `title`
- `description`
- `publishedAt`
- `authors`
- `category`
- `tags`
- `draft`

Recommended article fields:

- `updatedAt`
- `image`
- `imageAlt`
- `featured`
- `canonicalUrl`
- `related`
- `readingTime`
- `toc`
- `slug`
- `structuredData`

Author fields:

- `name`
- `role`
- `bio`
- `avatar`
- `linkedin`
- `x`
- `website`

## MDX pipeline

The MDX pipeline should be intentionally powerful, not ornamental. It should
support the editorial formats Doow is likely to publish: product explainers,
finance operations guides, technical integrations, customer-style narratives,
and research-backed posts.

- GitHub-flavored Markdown.
- Heading slugs and heading autolinks.
- Syntax highlighting.
- Code titles.
- Code block metadata for filenames, highlighted lines, inserted/deleted line
  states, and collapsible or folded regions.
- Tables with responsive wrappers.
- Doow callouts such as `Note`, `Warning`, `Insight`, and `Example`.
- Optional `Cards`, `Tabs`, and `CodeBlockTabs` components when launch content
  needs grouped resources or code variants.
- Doow-native `Image`, `Video`, `Chart`, `Quote`, and `CTA` components.
- AST-based table of contents extraction that matches rendered heading IDs.
- Reading-time calculation.
- Markdown image-to-Next-image handling.
- Build-time validation for unsupported MDX components, unsafe tags, duplicate
  explicit heading IDs, and invalid inline images.
- Optional math and citation support only if Doow plans research-heavy posts.

## SEO and distribution

Every article should ship with the full distribution surface expected from a
serious company blog.

- Article-level `generateMetadata`.
- Canonical URLs.
- Open Graph article metadata.
- Twitter card metadata.
- Branded dynamic OG images.
- JSON-LD `BlogPosting`.
- Author JSON-LD.
- Breadcrumb JSON-LD for archive routes.
- Sitemap entries for posts, category pages, and tag pages.
- RSS feeds for all posts, categories, and tags.
- Stable excerpt generation for cards, feeds, and search.
- Draft exclusion from production builds and feeds.
- `noindex` handling for drafts or private previews if preview mode is added.

## Archives and taxonomy

Taxonomy should be deliberate and controlled. The blog should not become a tag
junk drawer.

- Categories should be a small controlled enum.
- Tags should be normalized through a slug helper.
- Each article should have one category and multiple tags.
- Category pages should explain the category and show filtered posts.
- Tag pages should exist for discoverability and SEO long-tail intent.
- Pagination should exist from day one so URL structure does not change later.
- Invalid categories, tags, pages, and slugs should return `notFound`.
- Page one duplicates should redirect to canonical archive URLs.

## Search

Search should be local and generated at build time. Doow does not need a hosted
search service for the first production blog architecture.

- Generate a compact search index from normalized post metadata.
- Include `title`, `description`, `category`, `tags`, `slug`, `publishedAt`,
  and optionally plain-text body excerpts.
- Keep the search UI separate from content generation.
- Do not index drafts.

## Editorial governance

The architecture should make high-quality publishing repeatable.

- Add a documented frontmatter contract.
- Add a sample post that exercises images, links, headings, tables, code, and
  callouts.
- Add lint or validation that fails when required frontmatter is missing.
- Add MDX validation that fails for unsupported components, unsafe tags,
  duplicate explicit heading IDs, raw `/public` image paths, hardcoded CDN
  base URLs, and images without valid alt handling.
- Sort posts by publish date by default.
- Support manual `featured` selection for the blog index.
- Support related posts by explicit slug references.
- Keep author profiles as content, not hardcoded JSX.
- Keep all blob-backed image references in a manifest, not scattered through
  MDX.

## What not to include

These are the pieces that look sophisticated but are not required for Doow's
production-grade baseline unless the content strategy explicitly needs them.

- A CMS dependency.
- Database-backed blog content.
- Comment systems.
- Per-post interactive apps as a default pattern.
- Three or more article layouts before the editorial format demands them.
- Heavy academic citation tooling unless Doow publishes research papers.
- Math rendering unless the editorial calendar needs equations.
- Theme-provider machinery just for the blog.

## Reference contribution map

Each reviewed repo contributes a specific part of the target architecture.

- Copy Vercel's core flow: local MDX, post utilities, static generation,
  metadata, JSON-LD, RSS, sitemap, and OG route.
- Copy Clerk's authoring rigor: approved MDX component contract, AST-based
  validation, image governance, and richer code block metadata.
- Copy Tim's content seriousness: authors, tags, reading time, TOC, structured
  data, search index, feeds, and computed fields.
- Copy ChangoMan's restraint in plugin selection: GFM, slugs, autolinks, and
  high-quality code blocks.
- Copy Alex's archive mechanics: centralized taxonomy, pagination helpers,
  canonical redirects, and `notFound` for invalid content routes.
- Copy Lee's global MDX component-map idea, not his numbered route structure.

## Implementation standard

The blog should be considered complete only when these checks pass.

- The blog index renders published posts in date order.
- Featured posts are supported.
- Article routes are statically generated.
- Missing articles return 404.
- Draft articles are excluded in production.
- Categories and tags have archive pages.
- Archive pages paginate.
- Duplicate first-page archive URLs redirect to canonical URLs.
- Article pages generate complete metadata.
- Article pages emit valid JSON-LD.
- RSS feeds include only published posts.
- Sitemap includes published posts and archive routes.
- MDX renders Doow-native links, images, tables, code blocks, and callouts.
- MDX validation fails for unsupported components, unsafe tags, duplicate
  explicit heading IDs, and invalid inline images.
- Build fails for invalid frontmatter.
- Search index excludes drafts.
- The blog reuses Doow's navbar, footer, spacing shell, asset manifest, and
  typography system.
