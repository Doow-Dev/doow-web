# Doow Blog — Technical Roadmap

**Owners:** Atlas (architecture) · Bob (product scope)
**Source of truth for architecture decisions:** `docs/rebuild/blog-architecture-reference-audit.md`
**Stack baseline:** Next.js 16.2.3 · React 19 · TypeScript 6 · Tailwind 4 · Zod (already installed)

Clerk's public docs repo was reviewed as a production MDX benchmark. The
useful parts are folded into this existing phase order: strict authoring
contracts, AST-based validation, image governance, and richer code/component
handling. There is no separate Clerk sprint.

---

## Diagnosis

Doow has no blog today. The marketing site has a working shell, design system
primitives, Radix UI components, and a CDN asset pipeline. None of the blog
infrastructure exists: no MDX processing, no content pipeline, no routes, no
SEO layer, no feeds, no taxonomy.

The core challenge is building a production-grade company publishing system in
one ordered pass — without a CMS, without over-engineering early phases, and
without breaking the existing site shell or design system.

---

## Success Definition

Within 60 days of launch, the blog drives 500 unique monthly readers and at
least 3 inbound demo requests attributed to blog content via PostHog.

## Category Sign-off

The launch taxonomy is locked to these category slugs:

- `finance-operations`
- `product`
- `engineering`
- `company`

Changing category slugs after this point requires updating the taxonomy module,
frontmatter schema, existing content frontmatter, archive routes, and sitemap
generation.

---

## Guiding Policies

1. **One module owns content.** `src/lib/blog/content.ts` is the only place
   that reads, validates, sorts, filters, and paginates posts. Nothing else
   touches the filesystem or imports raw MDX.

2. **Schema is strict from day one.** Required frontmatter fields fail the
   build if missing. No loosely typed frontmatter anywhere.

3. **Standard kit only.** No new databases, no CMS, no hosted search. The blog
   runs entirely on the existing Next.js stack plus a small set of well-tested
   MDX packages.

4. **Phases are sequential, gates are real.** No phase starts until the
   previous phase passes its acceptance gate. Build must stay green between
   phases.

5. **Doow shell is inherited, not re-implemented.** The blog reuses the
   existing navbar, footer, spacing tokens, typography scale, and CDN asset
   helpers. Zero new design-system infrastructure for blog-only use.

6. **Taxonomy is controlled.** Categories are a typed enum, not freeform
   strings. Tags are normalized through a slug helper. No junk drawer.

7. **SEO surface ships with routes, not after.** Every route that goes live
   ships with `generateMetadata`, canonical URL, JSON-LD, and sitemap entry on
   the same day.

---

## Standard Kit — New Packages Required

Install these once in Phase 0. Nothing else is added later.

| Package | Purpose |
|---|---|
| `next-mdx-remote` | Render MDX from `content/` files in App Router |
| `gray-matter` | Parse frontmatter from MDX files |
| `github-slugger` | Generate heading and taxonomy slugs that match `rehype-slug` behavior |
| `remark-frontmatter` | Parse frontmatter nodes during MDX AST validation |
| `remark-mdx` | Parse MDX JSX/component syntax during validation |
| `remark-gfm` | GitHub-flavored Markdown (tables, strikethrough, task lists) |
| `mdast-util-to-string` | Extract plain heading text for TOC entries |
| `unist-util-visit` | Traverse MDX AST for headings, images, and component validation |
| `rehype-slug` | Auto-generate heading `id` attributes |
| `rehype-autolink-headings` | Anchor links on headings |
| `rehype-pretty-code` | Syntax highlighting |
| `shiki` | Highlighting engine used by rehype-pretty-code |
| `reading-time` | Calculate estimated read time from content |
| `feed` | RSS/Atom/JSON feed generation |
| `@types/mdx` | TypeScript types for MDX modules |

---

## Phase Map

```
Phase 0  → Package setup and next.config
Phase 1  → Content pipeline (schema + content.ts)
Phase 2  → Core routes (/blog, /blog/[slug])
Phase 3  → Article layout and MDX component map
Phase 4  → SEO layer (metadata, JSON-LD, canonical)
Phase 5  → Distribution (RSS, sitemap, OG images)
Phase 6  → Taxonomy (categories and tags)
Phase 7  → Pagination
Phase 8  → Author profiles
Phase 9  → Enhanced article features (TOC, related, reading time)
Phase 10 → Build-time search index
Phase 11 → Per-taxonomy RSS feeds
Phase 12 → Editorial governance (lint, sample post, validation CI)
Phase 13 → Shell integration and cross-site polish
Phase 14 → Final acceptance sweep
```

---

## Phase 0 — Package Setup and Config

**Goal:** Install all required packages and wire MDX into Next.js config.
**Depends on:** Nothing.

### Tasks

- [ ] Install all packages from the Standard Kit table above.
- [ ] Update `next.config.ts` — enable `pageExtensions` to include `mdx` if
      needed, confirm `@next/mdx` is NOT used (we are using `next-mdx-remote`
      which needs no config change).
- [ ] Create `content/blog/` directory with a `.gitkeep` placeholder.
- [ ] Create `content/blog/authors/` directory with a `.gitkeep` placeholder.
- [ ] Confirm TypeScript compiles cleanly with new packages (`npm run typecheck`).

### Acceptance Gate
- `npm run build` passes with no new errors.
- `npm run typecheck` passes.

---

## Phase 1 — Content Pipeline

**Goal:** Build the single module that owns all blog data. Routes depend on
this. Nothing else in the codebase reads MDX files or frontmatter directly.
**Depends on:** Phase 0.

### Files to Create

```
src/lib/blog/schema.ts
src/lib/blog/content.ts
src/lib/blog/types.ts
```

### `src/lib/blog/types.ts`

Define and export all blog TypeScript interfaces:

```ts
Post          // normalized post (all frontmatter + computed fields)
PostMeta      // subset used for cards and listings (no body)
Author        // author profile shape
Category      // string enum of valid categories
BlogConfig    // constants: postsPerPage, baseUrl, feedTitle, etc.
```

### `src/lib/blog/schema.ts`

- Use `zod` (already installed) to define `PostFrontmatterSchema`.
- Required fields: `title`, `description`, `publishedAt`, `authors`,
  `category`, `tags`, `draft`.
- Optional fields: `updatedAt`, `image`, `imageAlt`, `featured`,
  `canonicalUrl`, `related`.
- Export `parseFrontmatter(raw: unknown): PostFrontmatter` — throws a clear
  error with the filename and field name if validation fails.
- Define `CATEGORIES` as a `zod.enum` so invalid categories fail at parse time.
- Define `AuthorFrontmatterSchema` for `content/blog/authors/*.mdx`.

### `src/lib/blog/content.ts`

This module is the only place in the codebase that touches the filesystem for
blog content. Export these functions:

```ts
getAllPosts(): Promise<Post[]>
// Reads all MDX files in content/blog/*.mdx.
// Parses frontmatter with gray-matter.
// Validates with PostFrontmatterSchema — throws if invalid.
// Computes: slug (from filename), readingTime, excerpt (first 160 chars of body).
// Extracts TOC entries from the MDX AST, not regex.
// Validates inline MDX images, approved MDX component usage, unsafe tags,
// and duplicate explicit heading IDs.
// Filters out draft:true in production (NODE_ENV === 'production').
// Sorts by publishedAt descending.

getPostBySlug(slug: string): Promise<Post | null>
// Returns one post or null.

getFeaturedPosts(): Promise<Post[]>
// Returns posts where featured:true, max 3.

getPostsByCategory(category: string): Promise<Post[]>
// Returns published posts matching category.

getPostsByTag(tag: string): Promise<Post[]>
// Returns published posts containing tag (after slug normalisation).

getPaginatedPosts(page: number, perPage: number): Promise<{ posts: Post[], total: number, totalPages: number }>

getAllCategories(): Promise<{ category: string, count: number }[]>

getAllTags(): Promise<{ tag: string, count: number }[]>

getAllSlugs(): Promise<string[]>
// Used by generateStaticParams.

getAllAuthors(): Promise<Author[]>

getAuthorBySlug(slug: string): Promise<Author | null>
```

### Sample Post

Create `content/blog/sample-post.mdx` using the full frontmatter schema so
the pipeline can be tested before any route is live. It must include headings
with inline formatting, duplicate generated heading text, an inline image,
approved custom components, and a fenced code block with filename/title,
marked-line, inserted-line, deleted-line, and collapsible/fold metadata
examples.

### Acceptance Gate
- `getAllPosts()` is exercised through the existing Next app build once the
  `/blog` routes import the content module.
- A post with a missing required field throws a clear Zod error.
- A post with an invalid category throws a clear Zod error.
- A post with duplicate explicit heading IDs fails validation.
- A post with unsupported MDX components, unsafe tags, or invalid inline
  images fails validation.
- `npm run typecheck` passes.

---

## Phase 2 — Core Routes

**Goal:** Ship `/blog` and `/blog/[slug]`. No styling required — raw
structure and data wiring only.
**Depends on:** Phase 1.

`/blog` is part of the existing Doow landing page app. It lives under
`src/app/(site-pages)/blog/` and uses the existing app shell, providers,
package scripts, and deployment flow.

### Files to Create

```
src/app/(site-pages)/blog/page.tsx
src/app/(site-pages)/blog/[slug]/page.tsx
```

### `/blog` (index)

- Call `getAllPosts()` and `getFeaturedPosts()`.
- Render a basic unstyled list of post titles and dates (styled in Phase 3).
- Wire `generateMetadata` (basic title + description for now, full SEO in
  Phase 4).

### `/blog/[slug]` (article)

- First prove the exact MDX render path inside `/blog/sample-post` using
  `next-mdx-remote/rsc`, `remark-gfm`, `rehype-slug`,
  `rehype-autolink-headings`, and `rehype-pretty-code`.
- Confirm heading IDs, heading anchors, tables, fenced code blocks, external
  links, image handling, fenced code metadata, and one custom MDX component
  render before expanding the route.
- `generateStaticParams`: call `getAllSlugs()` and return `{ slug }` for each.
- `generateMetadata`: return basic title + description from post frontmatter.
- Call `getPostBySlug(slug)`.
- Return `notFound()` if result is null.
- Render `post.title`, `post.publishedAt`, raw MDX body compiled with
  `next-mdx-remote` (unstyled, default components for now).

### Acceptance Gate
- `/blog` loads with no runtime errors.
- `/blog/sample-post` loads and renders the MDX body.
- `/blog/sample-post` passes the MDX render proof with the planned plugins.
- `/blog/does-not-exist` returns HTTP 404.
- `generateStaticParams` produces one entry per post.
- `npm run build` passes.

---

## Phase 3 — Article Layout and MDX Component Map

**Goal:** Replace raw unstyled rendering with Doow-native layouts and
component map. This is the visual foundation all articles will use.
**Depends on:** Phase 2.

### Files to Create

```
src/components/blog/mdx-components.tsx
src/components/blog/article-layout.tsx
src/components/blog/article-card.tsx
src/components/blog/article-header.tsx
```

### `src/components/blog/mdx-components.tsx`

Map every MDX element to a Doow-native component:

| MDX Element | Doow Component / Behaviour |
|---|---|
| `a` | `next/link` with external link handling |
| `img` | `next/image` with CDN-aware src and alt enforcement |
| `pre` / `code` | Styled code block using rehype-pretty-code output |
| `table` | Responsive wrapper + styled table |
| `h2`, `h3`, `h4` | Heading with anchor link (from rehype-slug + rehype-autolink-headings) |
| `blockquote` | Doow-styled pull quote |
| `Callout` | Custom component accepting `type`: `Note`, `Warning`, `Insight`, `Example` |
| `Cards` | Linked card grid for grouped resources or article paths |
| `Tabs` | Accessible tabbed prose/diagram/content switcher |
| `CodeBlockTabs` | Package-manager or framework code variations; each tab wraps one fenced code block |
| `Video` | Embed wrapper |
| `Chart` | Placeholder wrapper (implementation deferred) |
| `Quote` | Editorial pull quote block |
| `CTA` | In-article call-to-action block using Doow button primitives |

Pass `mdx-components.tsx` to `next-mdx-remote`'s `components` prop when
rendering article pages.

The component map is Doow's approved MDX contract. Code blocks must support
filename/title bars, marked lines, inserted/deleted line states, and
collapsible or folded regions when the metadata appears in content. `Cards`,
`Tabs`, and `CodeBlockTabs` are included when launch/sample content requires
them, and unsupported components fail the Phase 1 validation path.

### `src/components/blog/article-layout.tsx`

Canonical single-article shell. Accepts `post: Post` as prop.

Contains:
- Breadcrumb (`Blog > Category > Title`)
- Article header (title, description, date, reading time, author byline)
- MDX body rendered with component map
- Placeholder slots for: table of contents (Phase 9), related posts (Phase 9),
  author card (Phase 8)

### `src/components/blog/article-card.tsx`

Post listing card for index and archive pages. Accepts `post: PostMeta`.

Contains:
- Cover image (if present)
- Category badge
- Title
- Description excerpt
- Author name + avatar
- Date + reading time

### Acceptance Gate
- `/blog/sample-post` renders with Doow typography, spacing, and link styles.
- The sample post's code block is syntax highlighted.
- The sample post's code block metadata states render correctly.
- `Cards`, `Tabs`, and `CodeBlockTabs` render correctly if enabled by the
  sample or launch content.
- The sample post's image renders via `next/image`.
- `/blog` renders a list of styled article cards.
- No layout shift on article or index pages.
- Passes design review at 390, 768, 1280, 1440.

---

## Phase 4 — SEO Layer

**Goal:** Every route has complete metadata, canonical URLs, and JSON-LD.
**Depends on:** Phase 2 (routes exist).

### Files to Create

```
src/lib/blog/seo.ts
```

### `src/lib/blog/seo.ts`

Export these helpers:

```ts
buildArticleMetadata(post: Post, baseUrl: string): Metadata
// Returns Next.js Metadata object:
// - title, description
// - openGraph: type "article", title, description, image, publishedTime, modifiedTime, authors, tags
// - twitter: card "summary_large_image", title, description, image
// - alternates.canonical

buildArticleJsonLd(post: Post, author: Author | null, baseUrl: string): string
// Returns safe JSON-LD string for the BlogPosting schema:
// @context, @type, headline, description, image, author, datePublished,
// dateModified, publisher, mainEntityOfPage, keywords
// Serialize with JSON.stringify(data, null, 2).replace(/</g, '\\u003c')

buildBreadcrumbJsonLd(crumbs: { name: string, url: string }[]): string
// BreadcrumbList JSON-LD for archive and article pages

buildAuthorJsonLd(author: Author, baseUrl: string): string
// Person JSON-LD

buildIndexMetadata(page?: number): Metadata
// For /blog and /blog/page/[page]

buildCategoryMetadata(category: string, page?: number): Metadata

buildTagMetadata(tag: string, page?: number): Metadata
```

### Wire into Routes

- `/blog/[slug]/page.tsx`: replace basic `generateMetadata` with
  `buildArticleMetadata`. Add `<script type="application/ld+json">` for
  `BlogPosting`, `BreadcrumbList`, and `Person` JSON-LD in page body.
- `/blog/page.tsx`: wire `buildIndexMetadata`.

### Acceptance Gate
- Article page `<head>` contains correct OG, Twitter, and canonical tags.
- JSON-LD validates at https://validator.schema.org (test manually with sample
  post).
- `generateMetadata` for index returns correct title and description.
- No hardcoded URLs — all use `BLOG_BASE_URL` from `BlogConfig`.

---

## Phase 5 — Distribution (RSS, Sitemap, OG Images)

**Goal:** Primary RSS feed, full sitemap entries, and branded OG images.
**Depends on:** Phase 4.

### Files to Create

```
src/lib/blog/rss.ts
src/app/(site-pages)/blog/rss.xml/route.ts
src/app/api/og/blog/route.tsx
```

### `src/lib/blog/rss.ts`

Using the `feed` package:

```ts
buildBlogFeed(posts: Post[], baseUrl: string): Feed
// Creates a Feed with site title, description, image, copyright.
// Adds one entry per post: title, description, link, date, author, image,
// category.

generateRssXml(feed: Feed): string
generateAtomXml(feed: Feed): string
```

### `/blog/rss.xml`

- Route handler (`route.ts`) that calls `getAllPosts()`, builds feed, returns
  XML with `Content-Type: application/xml`.
- Exclude drafts (already handled by `getAllPosts` in production).

### Sitemap Extension

- Extend or create `src/app/sitemap.ts`.
- Include: all published post slugs (`/blog/[slug]`), `/blog`,
  `/blog/page/[page]` for each page, all category archive URLs, all tag
  archive URLs.
- Set `lastModified` from `updatedAt ?? publishedAt`.

### `/api/og/blog` — Dynamic OG Images

- Route handler using `next/og` (`ImageResponse`).
- Accepts query params: `title`, `category`, `author`, `date`.
- Renders a branded image using Doow colors, logo, and typography.
- Dimensions: 1200×630.
- Reference this route in `buildArticleMetadata` image field.

### Acceptance Gate
- `/blog/rss.xml` returns valid RSS XML containing at least the sample post.
- Feed validates at https://validator.w3.org/feed.
- `/api/og/blog?title=Test+Post` returns a 1200×630 image.
- `sitemap.ts` includes the sample post URL.
- `npm run build` passes.

---

## Phase 6 — Taxonomy (Categories and Tags)

**Goal:** Category and tag archive pages.
**Depends on:** Phase 3 (card component), Phase 4 (SEO helpers).

### Files to Create

```
src/app/(site-pages)/blog/category/[category]/page.tsx
src/app/(site-pages)/blog/tag/[tag]/page.tsx
src/components/blog/archive-header.tsx
src/components/blog/tag-cloud.tsx
src/lib/blog/taxonomy.ts
```

### `src/lib/blog/taxonomy.ts`

```ts
CATEGORIES: Record<string, { label: string, description: string }>
// Central typed enum of valid categories.
// Example: 'finance-operations', 'product', 'engineering', 'company'

normalizeTag(tag: string): string
// Lowercase, replace spaces with hyphens, strip special chars.

getCategoryLabel(slug: string): string | null

isValidCategory(slug: string): boolean

isValidTag(slug: string, allTags: string[]): boolean
```

### `/blog/category/[category]/page.tsx`

- `generateStaticParams`: return all valid category slugs from
  `getAllCategories()`.
- `generateMetadata`: call `buildCategoryMetadata`.
- If category slug is not in `CATEGORIES`, return `notFound()`.
- Render `archive-header` (category label + description) and post cards.

### `/blog/tag/[tag]/page.tsx`

- `generateStaticParams`: return all tag slugs from `getAllTags()`.
- `generateMetadata`: call `buildTagMetadata`.
- If tag has zero posts, return `notFound()`.
- Render tag name as heading and post cards.

### `src/components/blog/archive-header.tsx`

- Accepts: heading text, optional description, optional post count.
- Used by category pages, tag pages, and the main index.

### `src/components/blog/tag-cloud.tsx`

- Accepts: `{ tag: string, count: number }[]`.
- Renders linked tag pills with post counts.
- Used on article pages and archive sidebars.

### Acceptance Gate
- `/blog/category/finance-operations` renders correctly with filtered posts.
- An invalid category slug returns 404.
- `/blog/tag/saas-management` renders posts tagged with that value.
- A tag with no posts returns 404.
- Category and tag pages have correct OG metadata.

---

## Phase 7 — Pagination

**Goal:** Paginated index, category, and tag archive pages.
**Depends on:** Phase 6.

### Files to Create

```
src/app/(site-pages)/blog/page/[page]/page.tsx
src/app/(site-pages)/blog/category/[category]/page/[page]/page.tsx
src/app/(site-pages)/blog/tag/[tag]/page/[page]/page.tsx
src/components/blog/pagination.tsx
```

### Constants

Add to `BlogConfig` in `types.ts`:
```ts
POSTS_PER_PAGE = 12
```

### `/blog/page/[page]/page.tsx`

- `generateStaticParams`: generate `{ page: "2" }` through
  `{ page: String(totalPages) }`. Page 1 is not included — it lives at
  `/blog`.
- If `page` param is `"1"`, return `redirect("/blog")`.
- If `page > totalPages`, return `notFound()`.
- Render paginated post cards + `pagination` component.

### `/blog/category/[category]/page/[page]/page.tsx`

- Same logic scoped to category posts.
- `page: "1"` redirects to `/blog/category/[category]`.

### `/blog/tag/[tag]/page/[page]/page.tsx`

- Same logic scoped to tag posts.
- `page: "1"` redirects to `/blog/tag/[tag]`.

### `src/components/blog/pagination.tsx`

- Accepts: `currentPage`, `totalPages`, `basePath`.
- Renders: Previous, page numbers (with ellipsis), Next.
- Uses `next/link` for all links.
- Marks current page with `aria-current="page"`.

### Sitemap Update

- Add paginated URLs to sitemap in Phase 5's sitemap extension.

### Acceptance Gate
- `/blog/page/2` renders the second page of posts.
- `/blog/page/1` redirects to `/blog`.
- `/blog/page/999` returns 404.
- Pagination component renders correctly at all breakpoints.
- Category and tag pagination mirrors index behavior.

---

## Phase 8 — Author Profiles

**Goal:** Author content files, author data pipeline, author display on
article pages.
**Depends on:** Phase 3 (article layout has a slot for author card).

### Files to Create

```
content/blog/authors/doow-team.mdx
src/lib/blog/authors.ts
src/components/blog/author-card.tsx
```

### `content/blog/authors/doow-team.mdx`

```yaml
---
name: "Doow Team"
role: "Product & Engineering"
bio: "The team behind Doow."
avatar: "/assets/blog/authors/doow-team.png"
linkedin: ""
x: ""
website: "https://www.doow.co"
---
```

### `src/lib/blog/authors.ts`

```ts
getAllAuthors(): Promise<Author[]>
getAuthorBySlug(slug: string): Promise<Author | null>
```

Move author-specific logic out of `content.ts` into this module.

### `src/components/blog/author-card.tsx`

- Accepts `author: Author`.
- Renders: avatar (`next/image`), name, role, bio, social links.
- Used inside `article-layout.tsx` below the article body.

### Wire into Article Layout

- In `article-layout.tsx`, call `getAuthorBySlug` for each author slug in the
  post frontmatter.
- Render an `author-card` per author below the article body.
- Wire `buildAuthorJsonLd` and inject into the page's JSON-LD block.

### Acceptance Gate
- Article pages render the Doow Team author card.
- Author JSON-LD is present and valid on article pages.
- Missing author slug logs a warning but does not crash the build.

---

## Phase 9 — Enhanced Article Features

**Goal:** Table of contents, related posts, reading time visible on articles.
**Depends on:** Phase 8.

### Files to Create

```
src/components/blog/table-of-contents.tsx
src/components/blog/related-posts.tsx
```

### Table of Contents

- Extract headings from MDX during content processing in `content.ts`.
- Use the MDX AST, `mdast-util-to-string`, and `github-slugger` for TOC ids so
  headings with inline code, links, emphasis, or duplicate generated text match
  rendered `rehype-slug` heading ids.
- Duplicate explicit heading IDs fail validation instead of silently rendering
  broken anchors.
- Add `toc: { id: string, text: string, level: number }[]` to `Post` type.
- `table-of-contents.tsx` accepts the `toc` array and renders a sticky
  sidebar nav on desktop, collapsible on mobile.
- Highlight the active heading as user scrolls (client component).
- Wire into `article-layout.tsx` as a sidebar or above-body block.

### Related Posts

- If post frontmatter includes `related: string[]` (array of slugs), fetch
  those posts.
- Fall back to posts in the same category if `related` is not set, max 3.
- `related-posts.tsx` accepts `PostMeta[]` and renders a horizontal card row.
- Wire into `article-layout.tsx` below the author card.

### Reading Time

- `reading-time` package is already installed from Phase 0.
- Compute in `getAllPosts()` and store in `post.readingTime` (e.g.
  `"5 min read"`).
- Display in `article-header.tsx` and `article-card.tsx`.

### Acceptance Gate
- TOC renders for posts with 3+ headings.
- TOC is not rendered for posts with fewer than 3 headings.
- Related posts section shows 1–3 posts.
- Reading time is visible on article pages and listing cards.

---

## Phase 10 — Build-Time Search Index

**Goal:** Generate a static search index at build time. No hosted search
service.
**Depends on:** Phase 1 (content pipeline).

### Files to Create

```
src/lib/blog/search.ts
src/app/(site-pages)/blog/search.json/route.ts
src/components/blog/search-bar.tsx
```

### `src/lib/blog/search.ts`

```ts
interface SearchEntry {
  slug: string
  title: string
  description: string
  category: string
  tags: string[]
  publishedAt: string
  excerpt: string       // first 300 chars of plain-text body
}

buildSearchIndex(posts: Post[]): SearchEntry[]
// Strips MDX syntax from body to produce plain-text excerpt.
// Excludes drafts.
```

### `/blog/search.json` Route

- Returns `buildSearchIndex(await getAllPosts())` as JSON.
- Cache-controlled: `Cache-Control: public, max-age=3600`.

### `src/components/blog/search-bar.tsx`

- Client component.
- On focus, fetches `/blog/search.json` once and caches in state.
- Filters entries by query string across title, description, tags, and excerpt.
- Renders a dropdown of matching results with title, category, and date.
- Links to `/blog/[slug]`.
- Accessible: keyboard navigable, `role="combobox"`, `aria-expanded`.

### Acceptance Gate
- `/blog/search.json` returns valid JSON with at least the sample post.
- Search bar finds the sample post by title keyword.
- Search bar finds the sample post by tag keyword.
- Drafts are excluded from the search index.
- Search bar meets WCAG 2.1 AA keyboard navigation requirements.

---

## Phase 11 — Per-Taxonomy RSS Feeds

**Goal:** Category and tag RSS feeds.
**Depends on:** Phase 5 (RSS infrastructure), Phase 6 (taxonomy).

### Files to Create

```
src/app/(site-pages)/blog/category/[category]/rss.xml/route.ts
src/app/(site-pages)/blog/tag/[tag]/rss.xml/route.ts
```

### `/blog/category/[category]/rss.xml`

- Validate category against `CATEGORIES`. Return 404 if invalid.
- Call `getPostsByCategory(category)`.
- Build feed with `buildBlogFeed`, return XML.

### `/blog/tag/[tag]/rss.xml`

- Validate tag (check it has posts). Return 404 if no posts.
- Call `getPostsByTag(tag)`.
- Build feed with `buildBlogFeed`, return XML.

### Acceptance Gate
- `/blog/category/finance-operations/rss.xml` returns valid RSS.
- An invalid category slug returns 404.
- Per-tag feeds validate at https://validator.w3.org/feed.

---

## Phase 12 — Editorial Governance

**Goal:** Make high-quality publishing repeatable and enforced by the build.
**Depends on:** Phase 1 (schema), Phase 3 (MDX components).

### Tasks

- [ ] **Frontmatter validation in build.** In `getAllPosts()`, ensure that a
      Zod parse failure throws and is not caught silently. Confirm `npm run
      build` fails with a clear message when a required field is missing.
- [ ] **Sample post.** Replace the Phase 0 placeholder with a complete
      `content/blog/sample-post.mdx` that exercises: H2, H3, inline code,
      fenced code block metadata, table, image, `Callout` (all four types),
      `Cards`, `Tabs`, `CodeBlockTabs` when enabled, `Quote`, `CTA`, and an
      external link. This is the regression fixture for the MDX component map.
- [ ] **MDX authoring contract validation.** Fail the build for unsupported
      MDX components, duplicate explicit heading IDs, unsafe raw tags or event
      handlers, raw `/public` image paths, hardcoded CDN base URLs, and inline
      images without valid alt handling.
- [ ] **Author validation.** If a post lists an author slug that does not
      match any file in `content/blog/authors/`, `getAllPosts()` logs a warning
      with the filename. The build does not fail, but the warning is visible.
- [ ] **Featured cap.** If more than 3 posts are marked `featured: true`,
      `getFeaturedPosts()` logs a warning and returns only the 3 most recent.
- [ ] **Tag normalisation.** `normalizeTag()` is called in `getAllPosts()` so
      tags are always stored lowercase and hyphenated before indexing.
- [ ] **Document the frontmatter contract.** Update `docs/rebuild/content-model.md`
      with the final required and optional fields, valid categories list, and
      example frontmatter block. This is the authoring reference.

### Acceptance Gate
- `npm run build` fails with a Zod error message when a required field is
  missing from a post.
- The sample post renders all component types without errors.
- Unsupported MDX components and invalid inline images fail the build with
  named errors.
- Tags in posts with inconsistent casing are normalised automatically.

---

## Phase 13 — Shell Integration and Cross-Site Polish

**Goal:** The blog feels like part of Doow, not a separate product.
**Depends on:** All prior phases.

### Tasks

- [ ] Confirm blog pages use the existing site navbar and footer from
      `src/components/layout/`.
- [ ] Apply Doow spacing tokens and typography scale to all blog components.
      No hardcoded pixel values for spacing or font sizes.
- [ ] Wire breadcrumb (`Blog > Category > Post Title`) using the existing
      site's breadcrumb pattern or add a minimal `breadcrumb.tsx` in
      `src/components/blog/`.
- [ ] CDN assets: all author avatars and cover images should use the CDN asset
      helper, not hardcoded `/public/` paths. Follow the pattern in
      `docs/rebuild/assets-cdn.md`.
- [ ] Confirm footer links do not include placeholder blog links that 404.
- [ ] Run the full review matrix: 360, 390, 768, 1024, 1280, 1440.
- [ ] Run Lighthouse on `/blog` and `/blog/[slug]`. Performance ≥ 90 on
      desktop. Accessibility ≥ 95.
- [ ] Confirm `prefers-reduced-motion` is respected for any scroll-based or
      animated elements in blog components.

### Acceptance Gate
- Blog pages render with the site navbar and footer at all breakpoints.
- No spacing, color, or font values are hardcoded outside the design system.
- Lighthouse desktop performance ≥ 90, accessibility ≥ 95 on article page.
- `prefers-reduced-motion` suppresses TOC scroll animations and any card
  hover transitions.

---

## Phase 14 — Final Acceptance Sweep

**Goal:** Every item on the completion checklist passes before the blog is
considered shippable.
**Depends on:** All prior phases.

This phase is a validation run, not new implementation.

### Completion Checklist

- [ ] Blog index renders published posts in date order.
- [ ] Featured posts surface correctly on the index.
- [ ] Article routes are statically generated (`generateStaticParams` covers
      all published slugs).
- [ ] Missing article slugs return HTTP 404.
- [ ] Draft articles are excluded in production build.
- [ ] Category archive pages exist for all defined categories.
- [ ] Tag archive pages exist for all tags that have at least one post.
- [ ] Archive pages paginate correctly.
- [ ] Page 1 of any paginated archive redirects to the canonical URL.
- [ ] Article pages generate complete Next.js `Metadata` (title, description,
      OG, Twitter, canonical).
- [ ] Article pages emit valid `BlogPosting` JSON-LD.
- [ ] Author pages emit valid `Person` JSON-LD.
- [ ] Archive pages emit valid `BreadcrumbList` JSON-LD.
- [ ] Primary RSS feed at `/blog/rss.xml` is valid and contains published posts
      only.
- [ ] Per-category RSS feeds are valid.
- [ ] Per-tag RSS feeds are valid.
- [ ] Sitemap includes all published posts, category pages, and tag pages.
- [ ] MDX renders Doow-native links, images, tables, code blocks, and all four
      callout types.
- [ ] MDX code block metadata, `Cards`, `Tabs`, and `CodeBlockTabs` pass if
      enabled by launch content.
- [ ] Unsupported MDX components, unsafe tags, duplicate explicit heading IDs,
      and invalid inline images fail validation.
- [ ] `npm run build` fails when required frontmatter is missing.
- [ ] Search index excludes drafts.
- [ ] Search bar finds posts by title and tag.
- [ ] Blog reuses Doow navbar, footer, spacing, asset manifest, and typography.
- [ ] All breakpoints pass design review (360, 390, 768, 1024, 1280, 1440).
- [ ] Lighthouse desktop: performance ≥ 90, accessibility ≥ 95.

---

## Dependency Graph (summary)

```
Phase 0  ──► Phase 1  ──► Phase 2  ──► Phase 3
                                   └──► Phase 4  ──► Phase 5
Phase 6  (needs Ph 3 + Ph 4)
Phase 7  (needs Ph 6)
Phase 8  (needs Ph 3)
Phase 9  (needs Ph 8)
Phase 10 (needs Ph 1)
Phase 11 (needs Ph 5 + Ph 6)
Phase 12 (needs Ph 1 + Ph 3)
Phase 13 (needs all above)
Phase 14 (validation sweep — no new code)
```

---

## What Is Explicitly Out of Scope

These items are not in scope unless the content strategy explicitly requires
them. Do not introduce them.

- A CMS or database-backed content system.
- Comment systems.
- Newsletter subscribe forms wired to an email platform.
- Math rendering (`katex`, `rehype-mathjax`).
- Academic citation tooling (`rehype-citation`).
- Multiple article layout variants (one layout only until editorial need is
  proven).
- Per-post interactive applications as a default MDX pattern.
- Theme-provider or dark-mode machinery specific to the blog.
- Internationalization of blog routes.
- A/B testing on article layouts.
