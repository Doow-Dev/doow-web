# Acceptance Gates

These gates apply to every section before it can be marked complete.

## Review Widths

- `360`
- `390`
- `768`
- `1024`
- `1280`
- `1440+`

## Gate 1. Design Fidelity

The implemented section must match the approved Figma node and screenshot:

- layout and alignment
- spacing rhythm
- typography scale and weight
- colors and contrast
- radii and shadow treatment
- asset framing
- interaction states

## Gate 2. Responsiveness

The section must hold up at all review widths:

- no clipped content
- no unintended overflow
- no collapsed CTA hierarchy
- readable type and spacing
- sensible stacking and ordering

## Gate 3. Accessibility

The section must ship with:

- semantic landmarks and headings
- keyboard operability
- visible focus states
- sufficient contrast
- descriptive alt text
- reduced-motion-safe behavior
- screen-reader-safe labels for controls

## Gate 4. Performance and SEO

The section must avoid:

- unnecessary client-only rendering
- oversized images or video
- avoidable layout shift
- blocking third-party scripts
- non-descriptive links
- broken heading hierarchy
- hidden or JS-only critical copy

### Production performance targets

The production route family has launch gates because the landing, product,
utility, and blog routes are long-lived SEO surfaces. These targets apply to
`/`, public site pages, legal pages, `/blog`, `/blog/[slug]`, and archive pages.

Desktop Lighthouse targets:

- Performance: at least 90
- Accessibility: at least 95
- Best Practices: at least 95
- SEO: at least 95

Mobile Lighthouse targets:

- Performance: at least 85
- Accessibility: at least 95
- Best Practices: at least 95
- SEO: at least 95

Core Web Vitals targets:

- LCP: 2.5 seconds or less on a 4G mobile profile
- INP: 200 milliseconds or less
- CLS: 0.1 or less
- TTFB: 0.8 seconds or less for static routes

Do not set `BLOG_LIVE=true` until the blog passes these targets on a preview
deployment.

Quality harness commands:

- `npm run test:a11y`
- `npm run test:seo`
- `npm run test:lighthouse`
- `npm run test:production`

The Lighthouse CI route set is production-grade, not representative-only. It
covers every intended crawlable public route plus a stable dynamic
`/alternative-apps/[appId]` fixture:

- `/`
- `/applications`
- `/subscriptions`
- `/alternative-apps`
- `/alternative-apps/a4571cad-ae9b-4a72-a9a2-eba8597600b2`
- `/expenses`
- `/integrations`
- `/pricing`
- `/doow-ai`
- `/about_us`
- `/privacy_policy`
- `/terms_of_use`

When `BLOG_LIVE=true`, the same Lighthouse gate also covers live blog routes:

- `/blog`
- `/blog/running-out-of-runway`
- `/blog?category=engineering`
- `/blog/tag/runway`
- `/blog/tag/runway/page/1`

Blog routes remain excluded from the default SEO-scored Lighthouse run while
`BLOG_LIVE` is false because they intentionally emit `noindex, nofollow`.

## Section Sign-off Template

When a section is ready for review, report:

- Figma node used
- responsive widths checked
- accessibility notes
- performance or SEO considerations
- open issues, if any
