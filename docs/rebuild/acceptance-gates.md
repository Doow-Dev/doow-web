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

### Blog performance targets

The blog route family has additional launch gates because article, archive,
and feed pages are long-lived SEO surfaces. These targets apply to `/blog`,
`/blog/[slug]`, and future category archive pages.

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

## Section Sign-off Template

When a section is ready for review, report:

- Figma node used
- responsive widths checked
- accessibility notes
- performance or SEO considerations
- open issues, if any
