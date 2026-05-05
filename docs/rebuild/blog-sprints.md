# Doow Blog — Sprints and Tasks (Revised)

**Reference:** `docs/rebuild/blog-roadmap.md`
**Revision note:** Reordered from "build visible pages first, harden later" to
"production-safe slices." Routes, metadata, SEO, and noindex safety now ship
together. Authors and governance moved into the foundation. Automated gates
added throughout. Asset policy made explicit. Product gaps (success metric,
analytics, launch content, deferred scope) addressed per Bob's review.
Clerk's public docs repo was reviewed as a production content benchmark; the
useful parts are folded into the existing sprints, not added as a separate
Clerk-specific sprint or side plan.

### Integration Boundary

The blog is not a separate project. It is a route family inside the existing
Doow landing site. It uses the current Next.js app, route groups, navbar,
footer, design tokens, asset helpers, package scripts, and deployment flow.

Planning and implementation must avoid creating a second tooling layer for the
blog. Validation runs through the existing app checks:

- `npm run typecheck`
- `npm run build`
- `npm run lint`
- staged runtime checks under `scripts/check-blog/`

Do not add a standalone TypeScript runner or blog-only project harness unless
the existing app toolchain cannot reasonably cover the requirement.

### Lane Structure

The sprint sequence has three concurrent lanes. Within a lane, no sprint
starts until the previous sprint's gate passes. Across lanes, work runs in
parallel where dependencies allow.

```
Lane A (sequential — main implementation):
  Pre-sprint → S0 → S1 → S2 → S3 → S4 → S5 → S6 → S7 → S10 → S11 → S12

Lane B (parallel — design extraction):
  S0B  (runs alongside Lane A, must finish before S3 opens)

Lane C (parallel — production hardening):
  S0.5 (runs alongside S0; must finish before S1 opens)
```

**Rule per lane:** No sprint starts until the previous sprint in its lane
has passed its acceptance gate.

**Cross-lane rule:** S1 cannot start until both S0 (Lane A) and S0.5
(Lane C) have passed. S3 cannot start until both S2 (Lane A) and S0B
(Lane B) have passed.

---

## Pre-Sprint Requirements
**These must be resolved before S0 begins. No code is written until both are done.**

### P0 — Define success
Write one sentence that defines what a successful blog launch looks like for
Doow. It must be specific enough to make scope decisions against.

Example: *"Within 60 days of launch, the blog drives 500 unique monthly
readers and at least 3 inbound demo requests attributed to blog content via
PostHog."*

Owner: Bob + founder sign-off.
Artifact: one line added to `docs/rebuild/blog-roadmap.md` under a
`## Success Definition` heading.

This is not optional. Without it, every scope debate defaults to "build more"
and there is no principled way to decide what to defer.

### P1 — Sign off on categories
The category slugs seeded in S1-03 (`finance-operations`, `product`,
`engineering`, `company`) are baked into the Zod schema, taxonomy module,
sample post frontmatter, and archive routes. Changing them after S1 means
rewriting schema, taxonomy, and all content frontmatter.

Owner: Bob confirms with content/marketing stakeholders before S0.
Artifact: `CATEGORIES` object in S1-03 is finalized and signed off, not
proposed.

### Pre-Sprint Gate
- [ ] Success definition written and signed off
- [ ] Category list confirmed — no changes after S0 starts
- [ ] Both artifacts committed to `docs/rebuild/blog-roadmap.md`

---

## Sprint 0 — Package Setup
**Goal:** All blog packages installed. Build and typecheck pass clean.
**Est:** 1 day
**Depends on:** Nothing

### Tasks

**S0-01** Install runtime packages
```bash
npm install next-mdx-remote gray-matter github-slugger remark-gfm rehype-slug \
  rehype-autolink-headings rehype-pretty-code shiki reading-time feed
```

**S0-02** Install dev packages
```bash
npm install --save-dev @types/mdx
```

**S0-03** Run `npm run typecheck` — confirm zero new errors

**S0-04** Run `npm run build` — confirm build passes with new packages

**S0-05** Create directory scaffold
```
content/blog/.gitkeep
content/blog/authors/.gitkeep
src/lib/blog/          (empty)
src/components/blog/   (empty)
```

### Gate
- [ ] `npm run build` exits 0
- [ ] `npm run typecheck` exits 0
- [ ] All directories exist in repo
- [ ] No new lint errors

---

## Sprint 0B — Figma Extraction (Parallel with Sprint 1)
**Goal:** Every blog component has a written spec before Sprint 3 opens.
Sprint 3 is build-only — zero design decisions made during it.
**Est:** 1–2 days
**Depends on:** Nothing (runs alongside S1)

### Tasks

**S0B-01** Extract blog index layout
- Grid: columns and gaps at 360, 390, 768, 1280, 1440
- Section padding, max-width, featured post slot dimensions

**S0B-02** Extract article card component
- Dimensions, border radius, shadow
- Image aspect ratio
- Typography: title, description, meta (size, weight, line-height)
- Category badge: bg, text color, padding, radius
- Author avatar size, name + role typography
- Date and reading time typography and color
- Hover and focus states
- Spacing between all elements

**S0B-03** Extract article page layout
- Content column width and max-width at each breakpoint
- Sidebar width and position on desktop
- Article header: title, description, meta row spacing
- Body typography: paragraph, h2, h3, h4, blockquote, list items
- Code block: background, padding, font size, border radius, title bar
- Table: header background, border style, row padding
- Callout variants: Note, Warning, Insight, Example — background, border color, icon
- Image caption style
- CTA block style
- Pull quote style (distinct from blockquote)

**S0B-04** Extract article header
- Breadcrumb style and spacing
- Title typography (display vs heading scale)
- Description typography
- Meta row: avatar, name, date, reading time — layout and spacing
- Cover image aspect ratio and max dimensions
- Category badge position and style

**S0B-05** Extract TOC component
- Sticky sidebar position on desktop
- Collapsible trigger style on mobile
- Active heading highlight style
- Item typography and indentation per heading level

**S0B-06** Extract author card
- Avatar size and shape
- Name and role typography
- Bio text style
- Social link icons and spacing
- Card padding and background

**S0B-07** Extract related posts section
- Section heading style
- Card layout: strip vs grid
- Number of cards shown

**S0B-08** Extract pagination component
- Button size, spacing, border, radius
- Active page state
- Previous / Next label style
- Ellipsis style
- Disabled state

**S0B-09** Extract archive header (used on category + tag pages)
- Heading size
- Description text style
- Post count badge if present

**S0B-10** Extract tag pill / tag cloud
- Pill background, text color, radius, padding
- Count badge style
- Hover state

**S0B-11** Extract search bar and dropdown
- Input dimensions and border
- Dropdown: shadow, background, radius
- Result row: title, category badge, date — layout and typography
- Empty state
- Loading state

**S0B-12** Document extracted tokens
- Any new color values not yet in the design system
- Any new spacing values not yet in the Tailwind scale
- Map every value to an existing token or flag it for addition
- No hardcoded values survive into Sprint 3

### Gate
- [ ] Every component listed in S3 has a written spec
- [ ] All new token values identified and flagged for design system
- [ ] Zero design decisions deferred into Sprint 3

---

## Sprint 0.5 — Pre-Implementation Hardening
**Goal:** Close the production-readiness gaps before code starts: route
policy, automated gate scripts, launch ops, and full performance targets.
**Est:** 1–2 days
**Depends on:** Pre-sprint requirements signed off

### Why this sprint exists
The architecture is good. The execution doc had four gaps that block treating
it as the source of truth: `/blog` not in route policy, manual gates that
should be automated, launch ops not specified, and performance gates desktop-
only. This sprint resolves all four before S1 starts.

---

### 0.5A — Route Policy

**S05-01** Update `AGENTS.md` route policy
- Add all blog routes from `docs/rebuild/blog-roadmap.md`
- Mark post-launch routes (search, per-taxonomy RSS) as deferred
- Note that all blog routes are noindex until `BLOG_LIVE=true`

**S05-02** Update `docs/rebuild/roadmap.md`
- Add a "Blog implementation" batch referencing `blog-roadmap.md` and
  `blog-sprints.md`
- Mark blog as a separate work stream, not blocking other rebuild batches

---

### 0.5B — Automated Gate Script

**S05-03** Create `scripts/check-blog/` with staged check scripts

A single check script cannot be used in early gates because later sprints add
routes that do not exist yet. The check is split into staged scripts. Each
sprint's gate calls only the script for routes that exist by that point.

Create `scripts/check-blog/_lib.sh` with shared helpers:

```bash
#!/usr/bin/env bash
# Shared helpers for staged blog runtime checks
set -euo pipefail
BASE="${BASE_URL:-http://localhost:3000}"

assert_status() {
  local expected="$1" path="$2"
  local actual
  actual="$(curl -o /dev/null -s -w '%{http_code}' "$BASE$path")"
  if [ "$actual" != "$expected" ]; then
    echo "FAIL: $path expected $expected, got $actual" >&2
    exit 1
  fi
}

assert_body_contains() {
  local path="$1" pattern="$2"
  if ! curl -s "$BASE$path" | grep -Eq "$pattern"; then
    echo "FAIL: $path does not match /$pattern/" >&2
    exit 1
  fi
}
```

Note on JSON-LD grep: the spec uses `JSON.stringify(obj, null, 2)` which
emits `"@type": "BlogPosting"` (with whitespace after the colon). The
patterns below use a tolerant regex `"@type":\s*"BlogPosting"` so both
compact and pretty-printed output match.

---

**`scripts/check-blog/s2.sh`** — checks routes that exist after S2

```bash
#!/usr/bin/env bash
source "$(dirname "$0")/_lib.sh"

# Core routes
assert_status 200 /blog
assert_status 200 /blog/sample-post
assert_status 404 /blog/non-existent-slug

# noindex meta (BLOG_LIVE=false)
assert_body_contains /blog/sample-post 'name="robots"[^>]*content="noindex'

# JSON-LD on article page (tolerant of whitespace)
assert_body_contains /blog/sample-post '"@type":\s*"BlogPosting"'
assert_body_contains /blog/sample-post '"@type":\s*"BreadcrumbList"'
assert_body_contains /blog/sample-post '"@type":\s*"Person"'

# OG image route
content_type="$(curl -o /dev/null -s -w '%{content_type}' "$BASE/api/og/blog?title=Test&category=Finance")"
[ "$content_type" = "image/png" ] || { echo "FAIL: OG image content-type was $content_type"; exit 1; }

echo "S2 runtime checks passed."
```

---

**`scripts/check-blog/s4.sh`** — adds RSS, sitemap, autodiscovery (cumulative)

```bash
#!/usr/bin/env bash
source "$(dirname "$0")/_lib.sh"
"$(dirname "$0")/s2.sh"

# Primary RSS
assert_body_contains /blog/rss.xml '<\?xml'
assert_body_contains /blog/rss.xml '<rss'
assert_body_contains /blog/rss.xml 'sample-post'

# RSS autodiscovery link in index
assert_body_contains /blog 'rel="alternate"[^>]*rss\.xml'

# Sitemap entries
assert_body_contains /sitemap.xml '/blog</loc>'
assert_body_contains /sitemap.xml '/blog/sample-post'

echo "S4 runtime checks passed."
```

---

**`scripts/check-blog/s5.sh`** — adds category and tag routes (cumulative)

```bash
#!/usr/bin/env bash
source "$(dirname "$0")/_lib.sh"
"$(dirname "$0")/s4.sh"

# Category routes
assert_status 200 /blog/category/finance-operations
assert_status 404 /blog/category/not-a-real-category

# Tag routes (sample post has saas-management tag)
assert_status 200 /blog/tag/saas-management
assert_status 404 /blog/tag/this-tag-does-not-exist

# Breadcrumb JSON-LD on archive
assert_body_contains /blog/category/finance-operations '"@type":\s*"BreadcrumbList"'

# Sitemap includes archive URLs
assert_body_contains /sitemap.xml '/blog/category/finance-operations'
assert_body_contains /sitemap.xml '/blog/tag/saas-management'

echo "S5 runtime checks passed."
```

---

**`scripts/check-blog/s6.sh`** — adds pagination redirects (cumulative)

```bash
#!/usr/bin/env bash
source "$(dirname "$0")/_lib.sh"
"$(dirname "$0")/s5.sh"

# /blog/page/1 redirects to canonical
assert_status 308 /blog/page/1

# /blog/page/999 returns 404
assert_status 404 /blog/page/999

# Category and tag pagination redirects
assert_status 308 /blog/category/finance-operations/page/1
assert_status 308 /blog/tag/saas-management/page/1

echo "S6 runtime checks passed."
```

---

**`scripts/check-blog/s8.sh`** — post-launch search check

This script is created only when S8 is activated. It is not part of the launch
gate because search is a post-launch milestone.

```bash
#!/usr/bin/env bash
source "$(dirname "$0")/_lib.sh"
"$(dirname "$0")/s6.sh"

# Search index route
assert_status 200 /blog/search.json
assert_body_contains /blog/search.json '"slug"'
assert_body_contains /blog/search.json '"sample-post"'

echo "S8 runtime checks passed."
```

---

**`scripts/check-blog/launch.sh`** — full pre-launch check (cumulative)

```bash
#!/usr/bin/env bash
source "$(dirname "$0")/_lib.sh"
"$(dirname "$0")/s6.sh"

# When BLOG_LIVE=true, no noindex on any blog page
if [ "${BLOG_LIVE:-false}" = "true" ]; then
  curl -s "$BASE/blog/sample-post" | grep -Eq 'name="robots"[^>]*content="noindex' \
    && { echo "FAIL: noindex still present with BLOG_LIVE=true"; exit 1; } \
    || true
fi

echo "Launch runtime checks passed."
```

---

**S05-04** Register staged scripts in `package.json`

```json
{
  "scripts": {
    "check:blog:s2": "bash scripts/check-blog/s2.sh",
    "check:blog:s4": "bash scripts/check-blog/s4.sh",
    "check:blog:s5": "bash scripts/check-blog/s5.sh",
    "check:blog:s6": "bash scripts/check-blog/s6.sh",
    "check:blog:launch": "bash scripts/check-blog/launch.sh"
  }
}
```

**S05-05** Each downstream sprint gate calls only the script for routes
that exist at that point:

| Sprint | Runtime check command |
|---|---|
| S2 | `npm run check:blog:s2` |
| S4 | `npm run check:blog:s4` |
| S5 | `npm run check:blog:s5` |
| S6 | `npm run check:blog:s6` |
| S8 | `npm run check:blog:s8` (post-launch only) |
| S11 | `BLOG_LIVE=true npm run check:blog:launch` |

This is a documentation update on the gate sections of those sprints
(see fixes in S2, S4, S5, S6, S11 gates below).

---

### 0.5C — Launch Operations Plan

**S05-06** Create `docs/rebuild/blog-launch-ops.md`

Contents:

#### Editorial Owner
- Named individual responsible for the blog post-launch
- Owns: content calendar, post review, broken link sweeps, frontmatter
  compliance, image asset uploads
- Escalation path if owner is unavailable

#### Search Console Setup
1. Add `https://www.doow.co` property in Google Search Console (if not
   already verified for the marketing site)
2. Submit sitemap: `https://www.doow.co/sitemap.xml`
3. Verify the blog URLs are crawlable (manual `URL Inspection` for `/blog`
   and one article)
4. Set up an alert for crawl errors on `/blog/*` paths
5. Submit individual launch posts via URL Inspection for faster indexing

#### Bing Webmaster Tools
- Same steps as Search Console (Bing's share is small but easy)

#### Rollback Plan
The blog has one production kill switch and one content-level rollback path.

**Full kill switch (entire blog):**
1. Set `BLOG_LIVE=false` in production environment variables
2. Redeploy (or wait for next deploy) — all blog routes return `noindex`
3. Routes still respond 200; this is for SEO containment, not a 503
4. If we need a hard 503: revert the deploy that introduced the blog routes

**Content-level rollback (single post breaks build):**
1. Revert the offending post's PR
2. Confirm `npm run build` passes locally
3. Push revert
4. Deploy automatically rebuilds without the broken post
5. If urgent: set `draft: true` on the post, push directly — excludes from
   prod build without a full revert

**Image / CDN rollback:**
- Cover images live on the CDN. If a corrupted image breaks rendering, swap
  the CDN file under the same path and purge cache. The post does not need
  to be redeployed.

#### Incident Response
| Symptom | Likely Cause | First Action |
|---|---|---|
| Build fails after merging a post | Frontmatter validation error | Check `npm run build` output, fix or revert the post |
| Article page 404s after deploy | Slug mismatch or draft:true accidentally shipped | Check post frontmatter, check `getAllSlugs()` includes it |
| RSS feed missing posts | Drafts in prod, or content cache stale | Verify `NODE_ENV=production` filter, force redeploy |
| Search Console reports crawl errors | noindex not removed after launch | Verify `BLOG_LIVE=true` in prod env |
| Lighthouse mobile score drops | Cover image not optimized | Check image size and format on CDN |

#### Launch Day Checklist
- [ ] All Sprint 12 acceptance items pass
- [ ] `BLOG_LIVE=true` set in production env
- [ ] Search Console sitemap submitted
- [ ] Bing Webmaster Tools sitemap submitted
- [ ] PostHog dashboard set up with blog event funnel
- [ ] Editorial owner confirmed on call for first 48 hours
- [ ] Social announcement coordinated (or explicitly deferred)

---

### 0.5D — Performance Targets (Mobile + Core Web Vitals)

**S05-07** Update `docs/rebuild/acceptance-gates.md` with full performance
targets for the blog. These supersede the desktop-only target previously in
S11-10.

#### Lighthouse — Desktop
- Performance: ≥ 90
- Accessibility: ≥ 95
- Best Practices: ≥ 95
- SEO: ≥ 95

#### Lighthouse — Mobile
- Performance: ≥ 85
- Accessibility: ≥ 95
- Best Practices: ≥ 95
- SEO: ≥ 95

#### Core Web Vitals (from real-world or lab measurement)
- **LCP (Largest Contentful Paint):** ≤ 2.5s on 4G mobile
- **INP (Interaction to Next Paint):** ≤ 200ms
- **CLS (Cumulative Layout Shift):** ≤ 0.1
- **TTFB (Time to First Byte):** ≤ 0.8s for static routes

These targets apply to:
- `/blog` (index)
- `/blog/[slug]` (article — sample post used as fixture)
- `/blog/category/[category]` (one category page)

**S05-08** Add CWV validation to S11 gate (replaces desktop-only line)
- Run Lighthouse mobile on a representative article page
- Capture LCP, INP, CLS in the gate sign-off
- If any metric fails: do not flip `BLOG_LIVE=true`

---

### S0.5 Gate
```bash
# Verify route policy
grep -q "/blog" AGENTS.md
# Verify staged scripts exist and are executable
test -x scripts/check-blog/s2.sh
test -x scripts/check-blog/s4.sh
test -x scripts/check-blog/s5.sh
test -x scripts/check-blog/s6.sh
test -x scripts/check-blog/launch.sh
# Verify launch ops doc exists
test -f docs/rebuild/blog-launch-ops.md
# Verify performance targets documented
grep -q "LCP" docs/rebuild/acceptance-gates.md
```
- [ ] `/blog` and all blog routes added to AGENTS.md route policy
- [ ] `scripts/check-blog/{s2,s4,s5,s6,launch}.sh` created and executable
- [ ] `_lib.sh` shared helper created
- [ ] Launch-path scripts `check:blog:s2`, `check:blog:s4`,
      `check:blog:s5`, `check:blog:s6`, and `check:blog:launch`
      registered in `package.json`
- [ ] Post-launch `check:blog:s8` documented for S8 activation
- [ ] `docs/rebuild/blog-launch-ops.md` created with editorial owner,
      Search Console steps, rollback plan, incident response, launch checklist
- [ ] Editorial owner named (not "TBD")
- [ ] Mobile Lighthouse + Core Web Vitals targets documented in
      `acceptance-gates.md`
- [ ] S11 gate updated to call `npm run check:blog:launch` and validate CWV

---

## Sprint 1 — Foundation (Pipeline + Authors + Governance + Asset Policy)
**Goal:** The complete data foundation. Content pipeline, author pipeline,
asset policy, frontmatter governance, and build enforcement — all in place
before a single route is created.
**Est:** 3 days
**Depends on:** S0

### Why authors are here and not later
`getAllPosts()` resolves author slugs. If `AuthorFrontmatterSchema` and
`getAuthorBySlug` do not exist in S1, `content.ts` either skips author
resolution or ships with unvalidated data. Author schema belongs in the
foundation, not as a late addition.

### Why governance is here and not later
Frontmatter validation that runs only at the end of the project catches
problems after content has been published and spread. It belongs in the
pipeline so the build enforces the contract from the first post.

---

### 1A — Types

**S1-01** Create `src/lib/blog/types.ts`

Define and export:
```ts
// All frontmatter fields after Zod parse + all computed fields
interface Post {
  slug: string
  title: string
  description: string
  publishedAt: string         // ISO date string
  updatedAt?: string
  authors: string[]           // author slugs
  category: string            // category slug
  tags: string[]              // normalized slugs
  draft: boolean
  featured: boolean
  image?: string              // CDN path
  imageAlt?: string
  canonicalUrl?: string
  related?: string[]          // post slugs
  // computed
  readingTime: string         // "5 min read"
  excerpt: string             // first 160 chars plain text
  toc: TocEntry[]
  body: string                // raw MDX string
}

interface TocEntry {
  id: string
  text: string
  level: 2 | 3
}

// Subset used for cards, feeds, and listings — no body
interface PostMeta {
  slug: string
  title: string
  description: string
  publishedAt: string
  updatedAt?: string
  authors: string[]
  category: string
  tags: string[]
  featured: boolean
  image?: string
  imageAlt?: string
  readingTime: string
  excerpt: string
}

interface Author {
  slug: string
  name: string
  role: string
  bio: string
  avatar: string              // CDN path
  linkedin?: string
  x?: string
  website?: string
}

interface PaginatedResult {
  posts: PostMeta[]
  total: number
  totalPages: number
  currentPage: number
}

interface BlogConfig {
  POSTS_PER_PAGE: number
  BLOG_BASE_URL: string
  FEED_TITLE: string
  FEED_DESCRIPTION: string
  FEED_AUTHOR_NAME: string
  FEED_AUTHOR_EMAIL: string
}
```

---

### 1B — Schema

**S1-02** Create `src/lib/blog/schema.ts`

- Import `z` from `zod` (already installed)
- Import `CATEGORY_SLUGS` from `taxonomy.ts` (create taxonomy.ts first — see S1-04)
- Define `PostFrontmatterSchema`:
  - `title`: `z.string().min(1)`
  - `description`: `z.string().min(1).max(300)`
  - `publishedAt`: `z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "must be YYYY-MM-DD")`
  - `updatedAt`: optional, same regex
  - `authors`: `z.array(z.string().min(1)).min(1)`
  - `category`: `z.enum(CATEGORY_SLUGS)`
  - `tags`: `z.array(z.string().min(1)).min(1)`
  - `draft`: `z.boolean()`
  - `featured`: `z.boolean().default(false)`
  - `image`: optional string
  - `imageAlt`: optional string — required if `image` is set (use `.superRefine`)
  - `canonicalUrl`: optional URL string
  - `related`: optional `z.array(z.string())`

- Define `AuthorFrontmatterSchema`:
  - `name`: `z.string().min(1)`
  - `role`: `z.string().min(1)`
  - `bio`: `z.string().min(1)`
  - `avatar`: `z.string().min(1)` (CDN path)
  - `linkedin`: optional URL
  - `x`: optional URL
  - `website`: optional URL

- Export `parseFrontmatter(raw: unknown, filename: string): PostFrontmatter`
  - On Zod failure: throw `Error(\`[blog] Invalid frontmatter in \${filename}: \${err.message}\`)`
  - Message must name the file and the failing field

- Export `parseAuthorFrontmatter(raw: unknown, filename: string): AuthorFrontmatter`
  - Same error pattern

---

### 1C — Taxonomy

**S1-03** Create `src/lib/blog/taxonomy.ts`

```ts
export const CATEGORIES = {
  'finance-operations': {
    label: 'Finance Operations',
    description: 'How finance teams manage, control, and optimise software spend.',
  },
  'product': {
    label: 'Product',
    description: 'What we are building and why.',
  },
  'engineering': {
    label: 'Engineering',
    description: 'How we build it.',
  },
  'company': {
    label: 'Company',
    description: 'News, culture, and what is happening at Doow.',
  },
} as const

export type CategorySlug = keyof typeof CATEGORIES
export const CATEGORY_SLUGS = Object.keys(CATEGORIES) as [CategorySlug, ...CategorySlug[]]

export function normalizeTag(tag: string): string
// lowercase, trim, spaces → hyphens, strip non-alphanumeric except hyphens

export function slugifyHeading(text: string): string
// Uses github-slugger so generated TOC ids match rehype-slug heading ids.
// Do not use a separate hand-rolled heading slug function.
// Must support the same duplicate-slug counter behavior used by rendered
// headings.

export function getCategoryLabel(slug: string): string | null
export function getCategoryDescription(slug: string): string | null
export function isValidCategory(slug: string): slug is CategorySlug

export function normalizeSlug(title: string): string
// For generating post slugs from titles during authoring
// lowercase, trim, spaces → hyphens, strip special chars
// Used in authoring checklist — not in the build pipeline
```

---

### 1D — Author Pipeline

**S1-04** Create `content/blog/authors/doow-team.mdx`
```yaml
---
name: "Doow Team"
role: "Product & Engineering"
bio: "The team behind Doow — building the operating system for SaaS finance."
avatar: "blog/authors/doow-team.jpg"
website: "https://www.doow.co"
---
```
Note: `avatar` is a CDN-relative path, not `/public/`. The asset must be
uploaded to the CDN blob store per `docs/rebuild/assets-cdn.md` before S1
gates close.

**S1-05** Create `src/lib/blog/authors.ts`

```ts
import { cache } from 'react'

export const getAllAuthors = cache(async (): Promise<Author[]> => {
  // Read all *.mdx from content/blog/authors/
  // Parse frontmatter with gray-matter
  // Validate with parseAuthorFrontmatter
  // Compute slug from filename
  // Return Author[]
})

export const getAuthorBySlug = cache(async (slug: string): Promise<Author | null> => {
  const authors = await getAllAuthors()
  return authors.find(a => a.slug === slug) ?? null
})
```

Note: `cache()` from React is used on all content-reading functions so
multiple server components calling the same function in one request do not
trigger multiple filesystem reads.

---

### 1E — Asset Policy

**S1-06** Create `src/lib/blog/assets.ts`

```ts
// All blog media goes through these helpers. No raw CDN paths in components.

export function getBlogCoverUrl(path: string): string
// Resolves a CDN-relative cover path to full CDN URL
// e.g. "blog/covers/post-slug.jpg" → "https://cdn.doow.co/blog/covers/post-slug.jpg"
// Follows the same pattern as the existing asset helpers in src/assets/

export function getAuthorAvatarUrl(path: string): string
// Same pattern for author avatars

export function getBlogOgImageUrl(params: { title: string, category: string, author?: string, date?: string }): string
// Builds the /api/og/blog?... URL for a given post
// Encodes all params
// Used by seo.ts for og:image
```

**S1-07** Document the asset policy in a comment block at the top of `assets.ts`

```
Blog asset policy:
- All cover images: content/blog/covers/ → uploaded to CDN blob store
- All author avatars: content/blog/authors/avatars/ → uploaded to CDN blob store
- Inline MDX images: referenced as CDN-relative paths, resolved by mdx-components.tsx img handler
- OG images: generated dynamically at /api/og/blog — no static file needed
- No /public/ paths for any blog media
- No hardcoded CDN base URLs — always use getBlogCoverUrl() / getAuthorAvatarUrl()
```

---

### 1F — Content Pipeline

**S1-08** Create `src/lib/blog/content.ts`

All exported functions wrapped with `cache()` from React.

```ts
import { cache } from 'react'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { parseFrontmatter } from './schema'
import { normalizeTag, slugifyHeading } from './taxonomy'
import { getAuthorBySlug } from './authors'

export const getAllPosts = cache(async (): Promise<Post[]> => {
  // 1. Read all *.mdx from content/blog/ (not subdirs)
  // 2. For each file:
  //    a. Parse with gray-matter
  //    b. Validate frontmatter with parseFrontmatter(data, filename) — throws on failure
  //    c. Compute slug from filename (strip .mdx)
  //    d. Normalize all tags with normalizeTag()
  //    e. Compute readingTime from content string
  //    f. Compute excerpt: strip MDX syntax, take first 160 chars of plain text
  //    g. Extract toc from the MDX AST, not regex:
  //       - parse with remark-frontmatter, remark-mdx, and remark-gfm
  //       - include H2 and H3 only
  //       - use mdast-util-to-string for heading text
  //       - use github-slugger with counter state so duplicate heading IDs
  //         match rendered rehype-slug output
  //       - support explicit heading IDs once the annotation contract exists
  //       - throw on duplicate explicit heading IDs
  //    h. Check author slugs: for each slug, call getAuthorBySlug — throw if null
  //    i. Check related slugs: for each explicit related slug, throw if missing
  //    j. Validate inline MDX images: alt text required, no raw /public paths,
  //       no hardcoded CDN base URLs
  //    k. Validate approved MDX component usage against the S3 component map
  //    l. Check featured count: if total featured > 3, warn but do not throw
  // 3. Filter draft:true when NODE_ENV === 'production'
  // 4. Sort by publishedAt descending
  // 5. Return Post[]
})

export const getPostBySlug = cache(async (slug: string): Promise<Post | null>)
export const getFeaturedPosts = cache(async (): Promise<PostMeta[]>)
// max 3, sorted by publishedAt desc

export const getPostsByCategory = cache(async (category: string): Promise<PostMeta[]>)
export const getPostsByTag = cache(async (tag: string): Promise<PostMeta[]>)
// normalizeTag(tag) before comparison

export const getPaginatedPosts = cache(
  async (page: number, perPage: number): Promise<PaginatedResult>
)
export const getPaginatedPostsByCategory = cache(
  async (category: string, page: number, perPage: number): Promise<PaginatedResult>
)
export const getPaginatedPostsByTag = cache(
  async (tag: string, page: number, perPage: number): Promise<PaginatedResult>
)

export const getAllCategories = cache(async (): Promise<{ category: string, count: number }[]>)
export const getAllTags = cache(async (): Promise<{ tag: string, count: number }[]>)
export const getAllSlugs = cache(async (): Promise<string[]>)
// Production: excludes drafts
```

---

### 1G — Blog Config

**S1-09** Create `src/lib/blog/config.ts`

```ts
export const BLOG_CONFIG = {
  POSTS_PER_PAGE: 12,
  BLOG_BASE_URL: process.env.NEXT_PUBLIC_SITE_URL
    ? `${process.env.NEXT_PUBLIC_SITE_URL}/blog`
    : 'https://www.doow.co/blog',
  FEED_TITLE: 'Doow Blog',
  FEED_DESCRIPTION: 'Insights on SaaS finance operations, product, and engineering from the Doow team.',
  FEED_AUTHOR_NAME: 'Doow Team',
  FEED_AUTHOR_EMAIL: 'hello@doow.co',
  SITE_NAME: 'Doow',
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.doow.co',
} as const
```

---

### 1H — Sample Post

**S1-10** Create `content/blog/sample-post.mdx`

Full frontmatter exercising every field:
```yaml
---
title: "How Finance Teams Lose Track of SaaS Spend"
description: "A short summary for cards, metadata, feeds, and search. Under 160 characters."
publishedAt: "2026-05-02"
updatedAt: "2026-05-02"
authors:
  - "doow-team"
category: "finance-operations"
tags:
  - "saas-management"
  - "finance"
image: "blog/covers/saas-spend.jpg"
imageAlt: "Finance dashboard showing software spend by vendor."
draft: false
featured: true
canonicalUrl: "https://www.doow.co/blog/how-finance-teams-lose-track-of-saas-spend"
related: []
---
```

Body must exercise every MDX component so it serves as the permanent
regression fixture: H2, H3, paragraph, bold, italic, inline code, fenced code
block with language + title, ordered list, unordered list, table, blockquote,
external link, image with alt, Note callout, Warning callout, Insight callout,
Example callout, Quote block, CTA block. It must also include at least one
code block with filename metadata and one marked-line example so the S3 code
block contract is proven against real content.

---

### 1I — Build-Native Pipeline Validation

**S1-11** Make content validation build-native

The blog does not get a standalone TypeScript test runner. Validation belongs
inside the content modules that the existing Next app imports during build,
static route generation, sitemap generation, RSS generation, and runtime
checks.

`getAllPosts()` must throw a named error when:
- Required frontmatter is missing.
- A category is not in `CATEGORIES`.
- A post references an author slug that does not exist.
- A post references a `related` slug that does not exist.
- An image is set without `imageAlt`.
- A rendered heading would produce a duplicate `id`.
- An unsupported MDX component is used.
- A raw `<script>` tag, inline event handler, or unapproved embed appears in
  MDX.
- An inline image is missing alt text, uses a raw `/public` path, or bypasses
  the blog asset helpers.

`getPostBySlug(slug)` must return `null` for unknown slugs. Route-level 404
behavior is verified in S2 by `npm run check:blog:s2` once `/blog/[slug]`
exists.

**S1-12** Do not add a blog-only test script

The launch path uses the existing app commands:
- `npm run typecheck`
- `npm run build`
- `npm run lint`
- `npm run check:blog:*` staged runtime checks after routes exist

If parser unit coverage is needed later, add it through the repo's existing
test setup. Do not add `tsx`, `ts-node`, or a blog-only runner just to execute
one script.

---

### 1J — Authoring Checklist

**S1-13** Create `docs/rebuild/blog-authoring.md`

Contents:
- Frontmatter contract (required and optional fields, valid categories list,
  example block)
- Tag normalisation rule: always lowercase, hyphenated
- Slug convention: derived from title using `normalizeSlug()`, never changed
  after publish
- Cover image policy: upload to CDN, use CDN-relative path, include `imageAlt`
- Author slug convention
- What draft:true does (excluded from production, feeds, sitemap, search)
- Redirects: if a slug must change, add to `src/lib/blog/redirects.ts`
- MDX trust policy:
  - Blog MDX is written and reviewed by trusted Doow contributors only.
  - Do not add raw `<script>` tags, arbitrary inline event handlers, or
    unreviewed third-party embeds in MDX.
  - Use approved MDX components from `src/components/blog/mdx-components.tsx`
    for callouts, quotes, CTAs, images, videos, and code blocks.
  - External links must use `target="_blank" rel="noopener noreferrer"` via
    the MDX link component.
  - Use the approved code block metadata syntax for filenames, marked lines,
    inserted lines, deleted lines, and collapsible blocks. Do not invent
    per-post code block wrappers.
  - Use shared partials only after the S3/S7 MDX compiler supports them; until
    then, duplicate content must stay explicit in the sample post.
- PR check: run `npm run typecheck`, `npm run build`, and the relevant
  `npm run check:blog:*` command once routes exist

**S1-14** Create `src/lib/blog/redirects.ts`

```ts
// Slug redirect registry. Add an entry here when a post slug changes.
// These are picked up by next.config.ts redirects.
export const BLOG_REDIRECTS: { source: string, destination: string }[] = [
  // { source: '/blog/old-slug', destination: '/blog/new-slug' },
]
```

**S1-15** Wire `BLOG_REDIRECTS` into `next.config.ts`
```ts
// In next.config.ts redirects():
...BLOG_REDIRECTS.map(r => ({ ...r, permanent: true }))
```

### S1 Gate (Automated)
```bash
npm run typecheck          # zero errors
npm run build              # exits 0
```
- [ ] `npm run typecheck` clean
- [ ] `npm run build` green
- [ ] Content module implementation throws named Zod errors for missing
      required fields and invalid categories
- [ ] Content module implementation throws when referenced author slugs are
      missing
- [ ] Content module implementation throws on duplicate heading IDs,
      unsupported MDX components, unsafe MDX tags, and invalid inline images
- [ ] Full build-native failure is verified in S2 after `/blog` routes import
      the content module
- [ ] `doow-team.jpg` avatar uploaded to CDN blob store

---

## Sprint 2 — Routes + SEO + Release Safety
**Goal:** `/blog` and `/blog/[slug]` live — but every route ships with full
metadata, JSON-LD, canonical URL, and `noindex` until the blog is launch-ready.
No route goes live without its full SEO surface.
**Est:** 2–3 days
**Depends on:** S1

### Route boundary
`/blog` is a new route family inside the existing Doow landing page app. It
must live under `src/app/(site-pages)/blog/` and inherit the existing site
layout, navbar, footer, providers, scripts, and deployment behavior. Do not
create a separate app, package, or blog-only runtime.

### Why noindex now
A half-built blog that leaks into search indexes before launch creates
permanent SEO debt — Google caches pages, old titles appear in SERPs, and
disavowing them takes months. The correct approach is `noindex` on all blog
routes during development, removed only in the final launch sprint.

---

### 2A — MDX Render Proof

Before the full route and SEO implementation proceeds, prove that the exact
MDX render path works inside the existing `/blog` route family.

**S2-01** Create the minimal proof route
- Create `src/app/(site-pages)/blog/[slug]/page.tsx` with the smallest
  possible implementation.
- Read `content/blog/sample-post.mdx` through `getPostBySlug('sample-post')`.
- Render the raw MDX body with `next-mdx-remote/rsc`.
- Use the exact planned plugins:
  - `remark-gfm`
  - `rehype-slug`
  - `rehype-autolink-headings`
  - `rehype-pretty-code`

**S2-02** Prove the expected MDX features render
The sample post must visibly exercise:
- H2/H3 heading IDs
- heading anchor links
- table rendering from GFM
- fenced code block rendering with syntax highlighting
- fenced code metadata does not break rendering: filename/title metadata,
  highlighted lines, and collapsible metadata are present in the sample content
  even if the final styled controls are completed in S3
- external link behavior
- image placeholder through the MDX image component path
- one custom MDX component from the planned component map

**S2-03** Run the proof gate
```bash
npm run typecheck
npm run build
# Start dev server: npm run dev
# Manual: open /blog/sample-post and confirm the MDX proof items render.
```

If this proof fails, stop Sprint 2 and adjust the MDX render approach before
building SEO, RSS, layouts, or downstream blog routes on top of it.

---

### 2B — SEO Helpers

**S2-04** Create `src/lib/blog/seo.ts`

```ts
import type { Metadata } from 'next'
import { BLOG_CONFIG } from './config'

// Controls noindex globally during pre-launch
const BLOG_LIVE = process.env.BLOG_LIVE === 'true'

export function buildArticleMetadata(post: Post, author: Author | null): Metadata
// title: post.title
// description: post.description
// robots: BLOG_LIVE ? 'index,follow' : 'noindex,nofollow'
// openGraph: type 'article', title, description, image (getBlogOgImageUrl),
//   publishedTime, modifiedTime, authors, tags, siteName
// twitter: summary_large_image, title, description, image
// alternates.canonical: post.canonicalUrl ?? `${BLOG_CONFIG.BLOG_BASE_URL}/${post.slug}`

export function buildArticleJsonLd(post: Post, authors: Author[]): string
// BlogPosting: headline, description, image, author (Person[]),
//   datePublished, dateModified, publisher (Organization with logo),
//   mainEntityOfPage, keywords, url
// Return safeJsonLd(data), not raw JSON.stringify(data)

export function buildAuthorJsonLd(author: Author): string
// Person: name, url, image, jobTitle (role), description (bio), sameAs[]

export function buildBreadcrumbJsonLd(crumbs: { name: string, url: string }[]): string
// BreadcrumbList with itemListElement[]

export function buildIndexMetadata(page?: number): Metadata
// title: page ? "Blog — Page N — Doow" : "Blog — Doow"
// robots: BLOG_LIVE ? index : noindex

export function buildCategoryMetadata(category: string, page?: number): Metadata
export function buildTagMetadata(tag: string, page?: number): Metadata

function safeJsonLd(data: unknown): string
// JSON.stringify(data, null, 2).replace(/</g, '\\u003c')
// Prevents titles/descriptions containing < or </script> from breaking the
// inline JSON-LD script tag.
```

---

### 2C — Core Routes

**S2-05** Create `src/app/(site-pages)/blog/page.tsx`
- Call `getAllPosts()` and `getFeaturedPosts()`
- `generateMetadata`: call `buildIndexMetadata()`
- Render unstyled post list (styled in S3)
- `robots` meta inherits from `buildIndexMetadata` — `noindex` until BLOG_LIVE

**S2-06** Expand `src/app/(site-pages)/blog/[slug]/page.tsx`
- `generateStaticParams`: `getAllSlugs()` → `{ slug }[]`
- `generateMetadata`: `buildArticleMetadata(post, author)`
- Fetch post with `getPostBySlug(slug)`
- Return `notFound()` if null
- Fetch authors with `getAuthorBySlug` for each slug in `post.authors`
- Inject JSON-LD into page:
  ```tsx
  <script type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: buildArticleJsonLd(post, authors) }} />
  <script type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: buildBreadcrumbJsonLd([
      { name: 'Blog', url: BLOG_CONFIG.BLOG_BASE_URL },
      { name: getCategoryLabel(post.category) ?? post.category,
        url: `${BLOG_CONFIG.BLOG_BASE_URL}/category/${post.category}` },
      { name: post.title, url: `${BLOG_CONFIG.BLOG_BASE_URL}/${post.slug}` },
    ]) }} />
  {authors.map(a => (
    <script key={a.slug} type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: buildAuthorJsonLd(a) }} />
  ))}
  ```
- Render post title, date, and raw MDX body via `next-mdx-remote` with:
  ```ts
  remarkPlugins: [remarkGfm]
  rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }],
    [rehypePrettyCode, { theme: 'github-dark' }]]
  ```
- No styled layout yet — styled in S3

---

### 2D — OG Image Route

**S2-07** Create `src/app/api/og/blog/route.tsx`
- `ImageResponse` from `next/og`
- Query params: `title`, `category`, `author`, `date`
- Dimensions: 1200 × 630
- Use Doow brand colors and logo
- Inline font from existing site font config (no external fetch)
- Return with `Content-Type: image/png`

**S2-08** Wire OG image into `buildArticleMetadata` via `getBlogOgImageUrl()`
- `openGraph.images[0]` = `getBlogOgImageUrl({ title, category, author, date })`

---

### 2E — Sitemap Foundation

**S2-09** Create or extend `src/app/sitemap.ts`
- Include `/blog` and all published post slugs
- `lastModified` from `updatedAt ?? publishedAt`
- Omit drafts
- Placeholder for category/tag/paginated URLs (added in S5, S6, S7)
- `priority: 0.8` for index, `0.7` for articles

---

### 2F — Release Safety

**S2-10** Add `BLOG_LIVE=false` to `.env.local`

**S2-11** Add `BLOG_LIVE=false` note to `.env.example` (or equivalent env
template file) with comment: `# Set to true only when blog is fully ready to launch`

**S2-12** Confirm that with `BLOG_LIVE=false`:
- All blog routes return `noindex, nofollow` in metadata
- Build still passes

### S2 Gate (Automated)
```bash
npm run typecheck
npm run build
# Start dev server: npm run dev
BASE_URL=http://localhost:3000 npm run check:blog:s2
# Manual (one-time): visit /api/og/blog?title=Test+Post&category=Finance+Operations
#                    and visually confirm the rendered image looks correct (1200×630).
#                    The script verifies content-type; visual confirmation needed only
#                    once when the OG template is first built.
```
- [ ] `npm run typecheck` clean
- [ ] `npm run build` green
- [ ] MDX render proof passes on `/blog/sample-post` with the exact planned
      remark/rehype plugins
- [ ] `npm run check:blog:s2` green (covers status codes, noindex meta,
      JSON-LD presence, OG image content-type, sitemap entries)
- [ ] OG image visually correct (one-time manual confirmation)

---

## Sprint 3 — UI (Layouts + MDX Components)
**Goal:** Every blog page is built to Figma spec. Requires S0B complete.
**Est:** 3–4 days
**Depends on:** S2 (routes exist), S0B (specs exist)

### Tasks

**S3-01** Add new design tokens from S0B-12 to design system
- New color values → Tailwind config or CSS variables
- New spacing values → confirm Tailwind scale or add custom values
- Zero hardcoded px/color values in any blog component

**S3-02** Create `src/components/blog/mdx-components.tsx`

Every mapping from Figma article body spec (S0B-03):

| MDX Element | Implementation |
|---|---|
| `a` | `next/link`, detect external (href starts with `http`), add `target="_blank" rel="noopener noreferrer"` for external |
| `img` | `next/image`, enforce `alt`, CDN-aware via `getBlogCoverUrl()`, responsive `sizes` |
| `pre` / `code` | Styled code block consuming rehype-pretty-code output, with filename/title bar, line marking, insert/delete states, and collapsible/folded regions |
| `table` | `<div className="overflow-x-auto">` wrapper + styled `<table>` |
| `h2`, `h3`, `h4` | Heading with hover-reveal anchor icon (from rehype-autolink-headings) |
| `blockquote` | Doow pull quote style |
| `Callout` | `type: "Note" \| "Warning" \| "Insight" \| "Example"`, distinct background + icon per type |
| `Cards` | Curated card grid for related resources and article-internal navigation; uses existing card/button primitives |
| `Tabs` | Lightweight content tabs for comparing approaches inside long-form posts |
| `CodeBlockTabs` | Package-manager or framework code variations; each tab wraps one fenced code block |
| `Video` | Iframe with aspect-ratio container |
| `Quote` | Editorial pull quote (larger text, attribution line) |
| `CTA` | In-article CTA, props: `href`, `label`, `variant?` — uses Doow button primitive |

The component map is Doow's approved MDX contract. It borrows Clerk's public
docs ideas for rich authoring, but it must stay scoped to the blog:

- Code block metadata supports `filename`, `mark`, `ins`, `del`,
  `collapsible`, and `fold`.
- `Cards`, `Tabs`, and `CodeBlockTabs` are implemented only if the sample post
  needs them or the launch content requires them. They still belong to S3 if
  used; they are not a later bolt-on.
- Every custom component must have accessible markup, keyboard behavior if
  interactive, and responsive behavior from the S0B design spec.
- Unsupported custom MDX components must fail in the content validation path
  added in S1.

**S3-03** Create `src/components/blog/article-header.tsx`
- From S0B-04 spec
- Props: `post: PostMeta`, `author: Author | null`
- Renders: breadcrumb, category badge, title, description, cover image
  (`next/image`, CDN via `getBlogCoverUrl()`), author avatar + name, date, reading time

**S3-04** Create `src/components/blog/article-layout.tsx`
- From S0B-03 spec
- Props: `post: Post`, `authors: Author[]`, `children: React.ReactNode`
- Renders: `article-header`, MDX children, author card slot, TOC slot, related posts slot
- Slots are `null` until those components exist (S7, S8)
- Desktop: content column + sidebar; mobile: single column

**S3-05** Create `src/components/blog/article-card.tsx`
- From S0B-02 spec
- Props: `post: PostMeta`
- Full card is `next/link` to `/blog/[slug]`
- Renders: cover image, category badge, title, description excerpt, author avatar + name, date, reading time
- Hover and focus states from Figma spec

**S3-06** Create `src/components/blog/archive-header.tsx`
- From S0B-09 spec
- Props: `heading: string`, `description?: string`, `count?: number`

**S3-07** Wire `article-layout` and `mdx-components` into `/blog/[slug]/page.tsx`
- Pass `components` to `next-mdx-remote`
- Wrap rendered output in `article-layout`

**S3-08** Wire `article-card` and `archive-header` into `/blog/page.tsx`
- Featured slot at top using `getFeaturedPosts()`
- Post grid below using `getAllPosts()`

**S3-09** Wire PostHog analytics events for routes that exist in S3
PostHog is already installed on the site. Blog-specific events are wired here
for routes that exist as of S3 (article + index). Category/tag events are
wired in S5 when those routes exist. Search events are wired in S8 when
search exists.

Events to instrument in S3:

| Event | Where | Properties |
|---|---|---|
| `blog_article_viewed` | `/blog/[slug]` page mount | `slug`, `title`, `category`, `tags`, `author` |
| `blog_index_viewed` | `/blog` page mount | `page` (number) |
| `blog_article_scrolled_50` | Article page, 50% scroll depth | `slug` |
| `blog_article_scrolled_100` | Article page, 100% scroll depth | `slug` |
| `blog_cta_clicked` | In-article CTA component click | `slug`, `label`, `href` |

Events deferred to later sprints:
- `blog_category_viewed`, `blog_tag_viewed` → wired in **S5** (when category and tag routes exist)
- `blog_search_used`, `blog_search_result_clicked` → wired in **S8** (when search exists, post-launch)

Implementation notes:
- Page-level events go in a `useEffect` in the relevant layout or page component
- Scroll depth events use `IntersectionObserver` on a sentinel element at
  50% and bottom of article body — client component
- CTA clicks are handled in `CTA` component in `mdx-components.tsx`
- Use the existing PostHog instance from `src/providers/` — do not import
  posthog-js directly in blog components

**S3-10** Visual review pass at all breakpoints
- 360, 390, 768, 1024, 1280, 1440
- Article page vs Figma
- Blog index vs Figma

### S3 Gate
```bash
npm run build
```
- [ ] `/blog` matches Figma at all 6 breakpoints
- [ ] `/blog/sample-post` matches Figma at all 6 breakpoints
- [ ] All MDX elements in the sample post render correctly
- [ ] All four Callout types render correctly
- [ ] Code blocks render filename/title metadata, marked lines, inserted and
      deleted lines, and collapsible/folded regions when present
- [ ] `Cards`, `Tabs`, and `CodeBlockTabs` render correctly if enabled for
      launch content
- [ ] No hardcoded px/color values outside design tokens
- [ ] No layout shift on article or index
- [ ] PostHog events fire correctly (verify in PostHog live events view)
- [ ] `npm run build` green

---

## Sprint 4 — Distribution (RSS + Sitemap + OG)
**Goal:** Primary RSS feed valid and live. Sitemap complete for all current
routes. OG image wired and branded.
**Est:** 2 days
**Depends on:** S2 (SEO helpers exist, sitemap started)

### Tasks

**S4-01** Create `src/lib/blog/rss.ts`

```ts
import { Feed } from 'feed'
import { BLOG_CONFIG } from './config'

export function buildBlogFeed(posts: PostMeta[], title?: string, feedUrl?: string): Feed
// Creates Feed with: title, description, link, language, image, copyright
// feedLinks: { rss: feedUrl ?? BLOG_BASE_URL/rss.xml }
// author: { name: FEED_AUTHOR_NAME, email: FEED_AUTHOR_EMAIL }
// Adds one entry per post:
//   title, description (excerpt), link, date (publishedAt),
//   id (post URL), category [{ name: post.category }], image

export function generateRssXml(feed: Feed): string   // feed.rss2()
export function generateAtomXml(feed: Feed): string  // feed.atom1()
```

**S4-02** Create `src/app/(site-pages)/blog/rss.xml/route.ts`
```ts
export async function GET() {
  const posts = await getAllPosts()
  const metas = posts.map(toPostMeta)   // strip body for feed
  const feed = buildBlogFeed(metas)
  return new Response(generateRssXml(feed), {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  })
}
```

**S4-03** Extend `src/app/sitemap.ts`
- All published post slugs (already in S2-09)
- Confirm `priority` and `changeFrequency` are set per roadmap spec
- Placeholder comments for category/tag/paginated URLs (added in S6, S7)

**S4-04** Add `<link rel="alternate" type="application/rss+xml">` to blog
index page `<head>` pointing to `/blog/rss.xml`

**S4-05** Validate RSS manually
- Open `/blog/rss.xml` in browser
- Paste XML into https://validator.w3.org/feed (or equivalent)
- Confirm zero errors

**S4-06** Verify RSS through the staged runtime check
- `npm run check:blog:s4` confirms `/blog/rss.xml` returns XML.
- The check confirms the feed contains `sample-post`.
- Draft exclusion is enforced by the shared `getAllPosts()` production filter
  and confirmed during launch with `BLOG_LIVE=true`.

### S4 Gate
```bash
npm run build
BASE_URL=http://localhost:3000 npm run check:blog:s4
# Manual (one-time): paste /blog/rss.xml into https://validator.w3.org/feed
#                    and confirm zero errors. Required only when feed shape changes.
```
- [ ] `npm run check:blog:s4` green (covers RSS XML structure, sample post
      presence, autodiscovery link, sitemap entries)
- [ ] `/blog/rss.xml` validates at W3C feed validator (one-time manual
      confirmation when feed shape changes)
- [ ] `npm run build` green

---

## Sprint 5 — Taxonomy (Categories + Tags)
**Goal:** Category and tag archive pages live with SEO, JSON-LD, and correct filters.
**Est:** 2 days
**Depends on:** S3 (card + archive-header), S2 (SEO helpers)

### Tasks

**S5-01** Confirm `CATEGORIES` labels and descriptions are final
- Categories were signed off in Pre-Sprint P1 — this is not a new decision
- Confirm each category has a `label` and `description` ready for the archive
  page header (if not already in taxonomy.ts from S1-03, add them now)
- No new categories added here without a schema + content migration plan

**S5-02** Create `src/app/(site-pages)/blog/category/[category]/page.tsx`
- `generateStaticParams`: all category slugs from `getAllCategories()`
- `generateMetadata`: `buildCategoryMetadata(category)`
- If `!isValidCategory(category)` → `notFound()`
- `<script>` with `buildBreadcrumbJsonLd([Blog, Category])`
- Render `archive-header` with category label + description
- Render `article-card` grid

**S5-03** Create `src/app/(site-pages)/blog/tag/[tag]/page.tsx`
- `generateStaticParams`: all tag slugs from `getAllTags()`
- `generateMetadata`: `buildTagMetadata(tag)`
- If zero posts for tag → `notFound()`
- `<script>` with `buildBreadcrumbJsonLd([Blog, Tag])`
- Render tag name as archive heading + `article-card` grid

**S5-04** Create `src/components/blog/tag-cloud.tsx`
- From S0B-10 spec
- Props: `tags: { tag: string, count: number }[]`
- Each pill links to `/blog/tag/[tag]`

**S5-05** Add category/tag URLs to `sitemap.ts`

**S5-06** Wire category and tag PostHog analytics events
- `blog_category_viewed` on `/blog/category/[category]` page mount, property: `category`
- `blog_tag_viewed` on `/blog/tag/[tag]` page mount, property: `tag`
- Use the same PostHog provider pattern established in S3-09

**S5-07** Visual review of category and tag pages at all breakpoints

### S5 Gate
```bash
npm run build
BASE_URL=http://localhost:3000 npm run check:blog:s5
```
- [ ] `npm run check:blog:s5` green (covers category 200/404, tag 200/404,
      breadcrumb JSON-LD on archive, sitemap archive entries)
- [ ] Category and tag pages render with correct filtered posts (visual)
- [ ] Category and tag pages have correct OG metadata (visual spot-check)
- [ ] PostHog `blog_category_viewed` and `blog_tag_viewed` events fire
- [ ] `npm run build` green

---

## Sprint 6 — Pagination
**Goal:** Index, category, and tag archives paginate. Page 1 redirects handled.
**Est:** 2 days
**Depends on:** S5

### Tasks

**S6-01** Create `src/components/blog/pagination.tsx`
- From S0B-08 spec
- Props: `currentPage: number`, `totalPages: number`, `basePath: string`
- Renders: Previous, page numbers with ellipsis for large ranges, Next
- `aria-current="page"` on active page
- All links `next/link`
- Disabled + visually muted on first/last edges

**S6-02** Create `src/app/(site-pages)/blog/page/[page]/page.tsx`
- `generateStaticParams`: pages 2 through totalPages only (not 1)
- `page === "1"` → `redirect('/blog', 308)`
- `page > totalPages` → `notFound()`
- `generateMetadata`: `buildIndexMetadata(Number(page))`
- Render paginated post cards + `pagination`

**S6-03** Create `src/app/(site-pages)/blog/category/[category]/page/[page]/page.tsx`
- Same logic scoped to category
- `page === "1"` → `redirect('/blog/category/[category]', 308)`
- `generateMetadata`: `buildCategoryMetadata(category, Number(page))`

**S6-04** Create `src/app/(site-pages)/blog/tag/[tag]/page/[page]/page.tsx`
- Same logic scoped to tag
- `page === "1"` → `redirect('/blog/tag/[tag]', 308)`
- `generateMetadata`: `buildTagMetadata(tag, Number(page))`

**S6-05** Add `pagination` to `/blog/page.tsx` index
- Wire `getPaginatedPosts`
- Show only when `totalPages > 1`

**S6-06** Add `pagination` to category and tag archive pages

**S6-07** Add all paginated URLs to `sitemap.ts`

**S6-08** Visual review of pagination at all breakpoints

### S6 Gate
```bash
npm run build
BASE_URL=http://localhost:3000 npm run check:blog:s6
# Manual: visit /blog/page/2 with >12 posts (use dummy posts) — visual confirmation
```
- [ ] `npm run check:blog:s6` green (covers page/1 308 redirect, page/999
      404, category and tag pagination redirects)
- [ ] Page 2+ renders correctly with >12 posts (visual)
- [ ] Pagination keyboard navigable
- [ ] Category and tag pagination mirrors index behavior
- [ ] `npm run build` green

---

## Sprint 7 — Enhanced Article Features (TOC + Related + Reading Time)
**Goal:** Articles are rich and navigable. TOC highlights on scroll.
Related posts drive editorial continuation.
**Est:** 2 days
**Depends on:** S3 (article layout has slots)

### Tasks

**S7-01** Confirm TOC extraction is working in `content.ts` (from S1-08)
- `post.toc` contains H2 and H3 entries with correct `id` values
- TOC extraction uses the MDX AST, not regex, so headings with inline code,
  links, emphasis, or custom heading metadata resolve to the same IDs as the
  rendered article
- Duplicate generated IDs use the same github-slugger counter behavior as
  rendered headings
- Duplicate explicit IDs fail validation before launch
- Confirm through `/blog/sample-post` after the article layout renders

**S7-02** Create `src/components/blog/table-of-contents.tsx`
- From S0B-05 spec
- Props: `toc: TocEntry[]`
- Client component (`"use client"`)
- Desktop: sticky sidebar
- Mobile: collapsible, closed by default
- `IntersectionObserver` highlights active heading on scroll
- Do not render if `toc.length < 3`
- `aria-label="Table of contents"`, `role="navigation"`

**S7-03** Wire TOC into `article-layout.tsx`
- Sidebar slot on desktop
- Collapsed above-body on mobile

**S7-04** Create `src/components/blog/related-posts.tsx`
- From S0B-07 spec
- Props: `posts: PostMeta[]`
- Heading: "Continue Reading"
- Renders up to 3 article cards in a horizontal strip

**S7-05** Wire related posts into article page
- If `post.related` has slugs → fetch those posts
- Else → `getPostsByCategory(post.category)`, exclude current slug, max 3
- Render below author card in `article-layout`

**S7-06** Confirm reading time is visible
- `article-header.tsx`: reading time in meta row
- `article-card.tsx`: reading time in card meta

**S7-07** Visual review at all breakpoints

### S7 Gate
- [ ] TOC renders on sample post (which has 3+ headings)
- [ ] TOC does not render on post with fewer than 3 headings
- [ ] TOC highlights active heading on scroll
- [ ] TOC is collapsible on mobile
- [ ] Related posts section shows 1–3 posts
- [ ] Reading time visible on article and card
- [ ] `npm run build` green

---

## Sprint 8 — Build-Time Search
**Goal:** Static search index. No hosted service. Search bar works client-side.
**Est:** 2 days
**Depends on:** S1 (content pipeline)
**Unlock condition:** Deferred to post-launch. Activate when the blog has
20+ published posts. Search with fewer posts adds UI complexity with no
user value. See Post-Launch Milestones at the bottom of this doc.

### Tasks

**S8-01** Create `src/lib/blog/search.ts`
```ts
export interface SearchEntry {
  slug: string
  title: string
  description: string
  category: string
  tags: string[]
  publishedAt: string
  excerpt: string    // 300 chars plain text, no MDX syntax
}

export function buildSearchIndex(posts: Post[]): SearchEntry[]
// strips MDX syntax (remove frontmatter, code fences, JSX tags, markdown syntax)
// excludes drafts
// returns compact array
```

**S8-02** Create `src/app/(site-pages)/blog/search.json/route.ts`
```ts
export async function GET() {
  const posts = await getAllPosts()
  const index = buildSearchIndex(posts)
  return Response.json(index, {
    headers: { 'Cache-Control': 'public, max-age=3600' },
  })
}
```

**S8-03** Create `src/components/blog/search-bar.tsx`
- Client component
- Fetch `/blog/search.json` on first focus, cache in `useRef` (one fetch per session)
- Filter on: `title`, `description`, `tags`, `excerpt` (case-insensitive)
- Dropdown: title, category badge, date per result
- Each result: `next/link` to `/blog/[slug]`
- Keyboard: arrow keys move focus, Enter navigates, Escape closes
- `role="combobox"`, `aria-expanded`, `aria-autocomplete="list"`, `aria-controls`
- Empty state: "No results for [query]"

**S8-04** Add search bar to `/blog/page.tsx`

**S8-05** Wire search PostHog analytics events
- `blog_search_used` when query is submitted, properties: `query`, `results_count`
- `blog_search_result_clicked` when a result is clicked, properties: `query`, `slug`
- Use the same PostHog provider pattern established in S3-09

**S8-06** Add search checks to the existing app validation path
- `npm run build` must fail if `buildSearchIndex()` receives invalid post
  data.
- Create `scripts/check-blog/s8.sh` from the S0.5 template and register
  `"check:blog:s8": "bash scripts/check-blog/s8.sh"` in `package.json`.
- Do not add a standalone script runner for search.

### S8 Gate
```bash
npm run build
BASE_URL=http://localhost:3000 npm run check:blog:s8
# Manual: search for "finance" → sample post appears
# Manual: search by tag "saas-management" → sample post appears
# Manual: keyboard: arrow down selects first result, Enter navigates
# Manual: Escape closes dropdown
```
- [ ] `npm run check:blog:s8` passes
- [ ] `/blog/search.json` returns valid JSON
- [ ] Drafts excluded from search index
- [ ] Search finds by title and tag
- [ ] Keyboard navigation complete (arrows, Enter, Escape)
- [ ] `aria-*` attributes correct
- [ ] `npm run build` green

---

## Sprint 9 — Per-Taxonomy RSS Feeds
**Goal:** Category and tag RSS feeds live and valid.
**Est:** 1 day
**Depends on:** S4 (RSS infrastructure), S5 (taxonomy routes exist)
**Unlock condition:** Deferred to post-launch. Activate when at least one
category has 5+ published posts. A category feed with 2 posts is noise, not
signal. See Post-Launch Milestones at the bottom of this doc.

### Tasks

**S9-01** Create `src/app/(site-pages)/blog/category/[category]/rss.xml/route.ts`
- Validate category with `isValidCategory()` — return 404 if invalid
- `getPostsByCategory(category)`
- Feed title: `"[Category Label] — Doow Blog"`
- Feed URL: `/blog/category/[category]/rss.xml`
- Return RSS XML

**S9-02** Create `src/app/(site-pages)/blog/tag/[tag]/rss.xml/route.ts`
- If `getPostsByTag(tag)` returns empty → return 404
- Feed title: `"Posts tagged [tag] — Doow Blog"`
- Return RSS XML

**S9-03** Add `<link rel="alternate">` autodiscovery tags to category and tag
archive pages pointing to their respective RSS feeds

**S9-04** Manual validation
- Open both feeds in browser, confirm XML
- Validate at W3C feed validator

### S9 Gate
- [ ] `/blog/category/finance-operations/rss.xml` returns valid RSS
- [ ] `/blog/tag/saas-management/rss.xml` returns valid RSS
- [ ] Invalid category slug returns 404
- [ ] Tag with no posts returns 404
- [ ] Autodiscovery links in archive page `<head>`
- [ ] `npm run build` green

---

## Sprint 10 — Author Profiles (Full Implementation)
**Goal:** Author display complete on article pages. JSON-LD wired.
**Est:** 1 day
**Depends on:** S3 (article layout slot exists), S1 (author pipeline exists)

Note: Author schema, content file, and data pipeline were built in S1.
This sprint adds only the UI component and wires JSON-LD.

### Tasks

**S10-01** Create `src/components/blog/author-card.tsx`
- From S0B-06 spec
- Props: `author: Author`
- Renders: avatar (`next/image`, via `getAuthorAvatarUrl()`), name, role, bio,
  social links (linkedin, x, website)
- Social icons from `react-icons`
- Links: `target="_blank" rel="noopener noreferrer"`

**S10-02** Wire author card into `article-layout.tsx`
- Render one `author-card` per resolved author below article body

**S10-03** Confirm `buildAuthorJsonLd` is wired into article page
(was added in S2-06 — confirm it is working, not a new task)

**S10-04** Visual review of author card at all breakpoints

### S10 Gate
- [ ] Author card renders on sample post article page
- [ ] Author avatar loads from CDN
- [ ] Author JSON-LD is present and valid
- [ ] Social links open in new tab
- [ ] `npm run build` green

---

## Sprint 11 — Shell Integration + Launch Prep
**Goal:** Blog is indistinguishable from the rest of the Doow site.
`noindex` removed. Blog is live.
**Est:** 2 days
**Depends on:** All prior sprints complete and gates passed

### Tasks

**S11-01** Confirm all blog pages use the existing site navbar
- No blog-specific navbar
- Blog link in navbar active state wired if applicable

**S11-02** Confirm all blog pages use the existing site footer
- No broken footer links to `/blog`

**S11-03** Audit all blog components for hardcoded values
- Replace any hardcoded colors with design system tokens
- Replace any hardcoded spacing with Tailwind scale
- Replace any hardcoded font sizes with typography tokens

**S11-04** CDN asset audit
- Confirm all cover images use `getBlogCoverUrl()`
- Confirm all author avatars use `getAuthorAvatarUrl()`
- Zero `/public/` paths for blog media
- Follow `docs/rebuild/assets-cdn.md`
- Confirm there are no missing referenced blog images and no unused launch
  blog images left in the repo after CDN upload
- Confirm every rendered image has meaningful alt text or an explicitly empty
  alt value only when decorative

**S11-05** MDX authoring contract audit
- Confirm all launch posts use only approved MDX components from
  `src/components/blog/mdx-components.tsx`
- Confirm code block metadata works for filename/title, marked lines,
  inserted/deleted lines, and collapsible/folded regions where used
- Confirm `Cards`, `Tabs`, and `CodeBlockTabs` render correctly if enabled
  for launch content
- Confirm no raw `<script>`, inline event handlers, or unapproved third-party
  embeds are present in MDX

**S11-06** Add breadcrumb to article and archive pages
- `Blog` → `/blog`
- `[Category Label]` → `/blog/category/[category]`
- `[Post Title]` on article pages (truncated at 60 chars)

**S11-07** `prefers-reduced-motion` audit
- TOC scroll highlighting suppressed
- Card hover transitions suppressed
- Any entrance animations suppressed

**S11-08** Full breakpoint review — every page type
- `/blog`: 360, 390, 768, 1024, 1280, 1440
- `/blog/[slug]`: 360, 390, 768, 1024, 1280, 1440
- `/blog/category/[category]`: 360, 390, 768, 1024, 1280, 1440
- `/blog/tag/[tag]`: 360, 390, 768, 1024, 1280, 1440
- `/blog/page/[page]`: 360, 390, 768, 1024, 1280, 1440

**S11-09** Keyboard navigation audit
- Tab through index: all cards, search bar, pagination reachable
- Tab through article: TOC links, in-body links, author social links,
  related post cards reachable
- All focus styles visible

**S11-10** Run full performance and CWV validation
Per `docs/rebuild/blog-launch-ops.md` and `acceptance-gates.md` (see S05-07).

Run on `/blog`, `/blog/sample-post` (or a real article), and one category
page. Capture all of these — failing any blocks the launch flip:

Lighthouse desktop:
- Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95

Lighthouse mobile:
- Performance ≥ 85, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95

Core Web Vitals (lab measurement on mobile 4G profile):
- LCP ≤ 2.5s
- INP ≤ 200ms
- CLS ≤ 0.1
- TTFB ≤ 0.8s

Fix all failures before marking gate passed.

**S11-11** Publish launch content — required before `BLOG_LIVE` flips
A technically complete blog with one sample post is a demo, not a launch.
Real posts must be live before search engines are invited in.

Minimum required before `BLOG_LIVE=true`:
- 3 published posts with `draft: false`
- Each post: real title, real description, real body (not placeholder)
- At least 2 different categories represented
- All cover images uploaded to CDN (not placeholder paths)
- All posts pass `npm run build` (schema validation, author resolution,
  sitemap generation, RSS generation)

Owner: content/marketing team. Engineering unblocks by confirming the pipeline
accepts the posts without errors. Content team writes and submits via PR.

**S11-12** Set `BLOG_LIVE=true`
- In production environment variables (Vercel / deploy config)
- Confirm all blog routes now return `index, follow` in metadata
- Confirm sitemap is complete

**S11-13** Final sitemap audit
- All published posts present
- All category pages present
- All tag pages present
- All paginated archive URLs present
- No draft URLs present

**S11-14** Remove `.gitkeep` files from `content/blog/` and `content/blog/authors/`
(now replaced by real content)

### S11 Gate
```bash
BLOG_LIVE=true npm run build
BLOG_LIVE=true BASE_URL=<preview-url> npm run check:blog:launch
# Manual: all breakpoints pass design review
# Manual: Lighthouse desktop + mobile + CWV measured (see S11-10)
```
- [ ] All blog pages use site navbar and footer
- [ ] No hardcoded values outside design system
- [ ] All media served via CDN asset helpers
- [ ] MDX authoring contract passes for components, code block metadata,
      unsafe tags, and inline images
- [ ] Breadcrumbs present on all page types
- [ ] All breakpoints pass design review against Figma
- [ ] `prefers-reduced-motion` suppresses all animations
- [ ] Lighthouse desktop: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95
- [ ] Lighthouse mobile: Performance ≥ 85, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95
- [ ] Core Web Vitals: LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1, TTFB ≤ 0.8s
- [ ] Full keyboard navigation passes
- [ ] 3 real posts published with `draft: false`
- [ ] All launch cover images on CDN (no placeholder paths)
- [ ] PostHog events firing correctly on article and index pages
- [ ] `BLOG_LIVE=true` removes noindex from all routes
- [ ] Sitemap complete
- [ ] Search Console sitemap submitted
- [ ] Editorial owner confirmed on call for first 48 hours
- [ ] `npm run check:blog:launch` green against preview deployment
- [ ] `npm run build` green

---

## Sprint 12 — Final Acceptance Sweep
**Goal:** Every item on the ship checklist passes. No exceptions.
**Est:** 1 day
**Depends on:** S11

No new code. Verification run only. If anything fails, fix it and re-run.

### Checklist

**Content and routing**
- [ ] Blog index renders published posts in date order
- [ ] Featured posts surface on the index (max 3)
- [ ] Article routes statically generated (`generateStaticParams` covers all slugs)
- [ ] Missing article slugs return HTTP 404
- [ ] Draft articles excluded from production build, feeds, sitemap, and search

**Archives and pagination**
- [ ] Category archive pages exist for all defined categories
- [ ] Tag archive pages exist for all tags with at least one post
- [ ] Archive pages paginate correctly
- [ ] Page 1 of any paginated archive returns HTTP 308 redirect to canonical URL
- [ ] Invalid category/tag/page returns 404

**SEO**
- [ ] Every article page: complete `Metadata` (title, description, OG, Twitter, canonical)
- [ ] Every article page: valid `BlogPosting` JSON-LD
- [ ] Every article page: valid `BreadcrumbList` JSON-LD
- [ ] Author sections: valid `Person` JSON-LD
- [ ] No blog page has `noindex` with `BLOG_LIVE=true`

**Distribution**
- [ ] `/blog/rss.xml` valid, contains published posts only
- [ ] Sitemap: all posts, categories, tags, paginated pages included

> Note: Per-category and per-tag RSS feeds (S9) are post-launch milestones,
> not required for launch acceptance. They are validated in their own sprint
> when activated.

**Rendering**
- [ ] MDX: Doow-native links, images, tables, code blocks render correctly
- [ ] MDX: all four Callout types render correctly
- [ ] MDX: Quote and CTA blocks render correctly
- [ ] TOC renders for articles with 3+ headings
- [ ] Related posts render below author card
- [ ] Reading time visible on article and card

**Governance**
- [ ] `npm run build` fails with Zod error when required frontmatter is missing
- [ ] `npm run build` fails when a post references an unknown author slug

> Note: Search (S8) is a post-launch milestone, not required for launch
> acceptance. Search index, search bar, and search analytics are validated
> in S8 when activated (unlock at 20+ posts).

**Shell and quality**
- [ ] Blog uses site navbar, footer, spacing tokens, CDN helpers, typography
- [ ] All breakpoints pass design review (360, 390, 768, 1024, 1280, 1440)
- [ ] Lighthouse desktop: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95
- [ ] Lighthouse mobile: Performance ≥ 85, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95
- [ ] Core Web Vitals: LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1, TTFB ≤ 0.8s
- [ ] Full keyboard navigation works on all page types
- [ ] `prefers-reduced-motion` suppresses all blog animations

**Final**
- [ ] `npm run build` exits 0
- [ ] `npm run typecheck` exits 0
- [ ] Zero new ESLint errors

---

## Sprint Summary

### Launch sprints (ship these)

| Sprint | Goal | Est | Depends On |
|---|---|---|---|
| Pre-sprint | Success definition + category sign-off | Before S0 | — |
| S0 | Package setup | 1 day | Pre-sprint |
| S0B | Figma extraction | 1–2 days | — (parallel with S1) |
| S0.5 | Route policy + automated gates + launch ops + perf targets | 1–2 days | Pre-sprint |
| S1 | Foundation: pipeline + authors + governance + asset policy | 3 days | S0 + S0.5 |
| S2 | Routes + SEO + noindex safety | 2–3 days | S1 |
| S3 | UI — layouts, MDX components, analytics | 3–4 days | S2 + S0B |
| S4 | Distribution: RSS, sitemap, OG images | 2 days | S2 |
| S5 | Taxonomy: categories and tags | 2 days | S3 + S2 |
| S6 | Pagination | 2 days | S5 |
| S7 | TOC, related posts, reading time | 2 days | S3 |
| S10 | Author profiles UI | 1 day | S3 + S1 |
| S11 | Shell integration + launch prep + real content | 2 days | All above |
| S12 | Final acceptance sweep | 1 day | S11 |

**Launch estimate: 23–29 days**

### Post-launch sprints (unlock when content volume justifies)

| Sprint | Goal | Unlock Condition |
|---|---|---|
| S8 | Build-time search + search bar | 20+ published posts |
| S9 | Per-taxonomy RSS feeds | 1 category with 5+ posts |

---

## Post-Launch Milestones

These sprints are fully specced above. They are not cut — they are deferred
until the content volume makes them valuable. Activating them early adds
engineering surface with no measurable user benefit.

### S8 — Search (unlock at 20+ posts)
- `src/lib/blog/search.ts`
- `/blog/search.json` route
- `search-bar.tsx` component wired to blog index
- Search validation added to the existing app build and S8 runtime check

### S9 — Per-Taxonomy RSS (unlock when 1 category has 5+ posts)
- `/blog/category/[category]/rss.xml`
- `/blog/tag/[tag]/rss.xml`
- Autodiscovery links in archive page `<head>`

**How to activate:** When the unlock condition is met, create a branch, run
the sprint, pass its gate, merge. No changes to the existing sprint sequence
required.

---

## What Changed

### v1 → v2 (Atlas review)
| Issue | v1 | v2 |
|---|---|---|
| Author data | S8 (late) | S1 (foundation) |
| Governance + frontmatter lint | S12 (end) | S1 (foundation) |
| Asset policy | implied | explicit in S1, `assets.ts` created |
| SEO shipped with routes | No (S2 then S4) | Yes (S2 bundles routes + SEO together) |
| noindex safety | missing | S2 adds `BLOG_LIVE` env flag, all routes noindex until launch |
| Automated gates | manual QA only | Build-native validation plus staged `check:blog:*` runtime checks |
| `cache()` memoization | missing | S1-08 wraps all content reads in React `cache()` |
| Redirect registry | missing | `src/lib/blog/redirects.ts` in S1 |
| RSS structure test | missing | S4-06 verifies RSS through `check:blog:s4` |
| Search index test | missing | S8 verifies search through build validation and `check:blog:s8` |
| `BLOG_LIVE` launch flip | missing | S11 explicit step with env var and verification |

### v2 → v3 (Bob review)
| Issue | v2 | v3 |
|---|---|---|
| No success definition | missing | Pre-sprint P0 — required before S0 |
| Category sign-off mid-project | S5-01 decision gate | Pre-sprint P1 — signed off before S0 |
| Analytics not wired | missing | S3-09 — PostHog events on layouts when built |
| Search before content exists | S8 in launch sequence | Deferred — unlock at 20+ posts |
| Per-taxonomy RSS before content | S9 in launch sequence | Deferred — unlock when category has 5+ posts |
| No real content before launch | missing | S11-11 — 3 real posts required before BLOG_LIVE flips |
| Launch estimate inflated | 26–32 days | 22–27 days (deferred sprints removed from launch path) |

### v3 → v4 (Bob second review)
| Issue | v3 | v4 |
|---|---|---|
| `/blog` not in route policy | missing | Added to AGENTS.md |
| S1-11 import bug | `getAllAuthors` from `content.ts` | Fixed: imported from `authors.ts` |
| Manual gates everywhere | 24 "Manual:" entries | `scripts/check-blog-runtime.sh` automates 16 of them; gates updated |
| No launch ops plan | missing | S0.5 creates `blog-launch-ops.md` (editorial owner, Search Console, rollback, incidents) |
| Performance gates desktop-only | Lighthouse desktop only | Mobile Lighthouse + Core Web Vitals (LCP, INP, CLS, TTFB) added |
| Sprint 0.5 added | n/a | New sprint covers route policy, automated gates, launch ops, perf targets |
| Launch estimate | 22–27 days | 23–29 days (S0.5 added) |

### v4 → v5 (Atlas second review — internal consistency pass)
| Issue | v4 | v5 |
|---|---|---|
| S12 still required search and per-tag/category RSS | listed in checklist | Removed from launch acceptance, marked as post-launch milestones with explicit notes |
| One monolithic check script | single `check-blog-runtime.sh` checked everything | Split into staged scripts: `check:blog:{s2,s4,s5,s6,launch}` — each only checks routes that exist by that sprint |
| Manual gates not actually replaced | S2/S4/S5/S6 gates still listed manual checks | Gates updated to call the appropriate staged check script; manual items reduced to genuine visual confirmations only |
| Analytics events for non-existent routes | S3 wired category, tag, and search events | Split: article/index in S3, category/tag added to S5, search added to S8 |
| JSON-LD grep too strict | `'"@type":"BlogPosting"'` (no whitespace) | `'"@type":\s*"BlogPosting"'` regex tolerates `JSON.stringify(..., null, 2)` whitespace |
| Sprint ordering ambiguous | "no sprint starts until previous gate passes" + parallel sprints | Lane Structure section explicitly defines Lane A (sequential), Lane B (S0B parallel), Lane C (S0.5 parallel), with cross-lane rules |
