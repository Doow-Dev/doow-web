# Section Registry

This file tracks the source Figma nodes and status for each major landing-page section.

## Root Frame

- Page root: `580:1110` (`LANDING PAGE`)

## Initial Section Order

| Order | Section | Figma node | Status |
|---|---|---|---|
| 1 | Navbar or header | `580:1112` | Implemented as dedicated site component, review pending |
| 2 | Hero | `580:1111` | Implemented, review pending |
| 3 | Demo or video section | `580:1167` | Implemented as dedicated site component, review pending |
| 4 | Feature split | `580:2094` | Implemented as dedicated site component, review pending |
| 5 | Finance control feature section | `580:2482` | Implemented as dedicated site component, review pending |
| 6 | Alternative apps comparison | `581:2611` | Implemented as dedicated site component, review pending |
| 7 | Doow AI spotlight | `1056:1823` | Implemented as dedicated site component, review pending |
| 8 | Pricing | `582:3087` | Implemented as dedicated site component, review pending |
| 9 | FAQ | `583:3321` | Implemented as dedicated site component, review pending |
| 10 | Additional product-story sections | To be mapped from later frames under `580:2289` | Pending |
| 11 | Integrations | `583:3592` | Implemented as dedicated site component, review pending |
| 12 | Footer | `583:3998` | Implemented as shared site layout component, review pending |

## Current Known Notes

- The landing page in Figma is structurally different from the current production site.
- The new design includes a redesigned hero, demo section, feature storytelling, integrations, and footer.
- Some section subnodes still need to be extracted in smaller targeted calls because the current Figma seat has hit tool-call limits during broader exploration.
- The header has now been extracted successfully from the local desktop bridge with targeted node calls.
- The hero frame, screenshot, typography variables, hero headline, hero lead copy, and both hero CTA variants have now been extracted successfully from the local desktop bridge, but the full hero inspect payload still times out.
- The hero background currently uses a typed local fallback asset while the Azure Blob or Front Door link is pending.
- The demo section implementation uses `580:1167` as the section root, `580:1168` for the subtle heading band, and `580:1174` for the framed media wrapper.
- The demo section currently uses typed local fallback assets for the frame art, poster, and placeholder video until the canonical CDN URLs are available.
- The finance control section implementation uses `580:2482` as the section root with targeted card-level extraction for exact copy, alternating fills, icon mapping, and spacing values.
- The alternative apps section implementation uses `581:2611` as the section root, with targeted extraction for the app pills, current-app summary, alternative cards, CTA, and the custom horizontal scrollbar rail.
- The Doow AI section implementation uses `1056:1823` as the section root, with the CTA and centered copy rebuilt from live primitives while the combined Derek and Mina composition currently ships as a typed local fallback asset pending a canonical CDN export.
- The pricing section implementation uses `582:3087` as the section root, `582:3088` for the background art reference, and `1056:1977` for the gradient overlay plus centered copy lock while sourcing production looped backgrounds from `siteAssetManifest.pricingBackgrounds`.
- The FAQ section implementation uses `583:3321` as the section root and now lives under `src/components/layout/faq` as a shared site layout component with page-owned conversation content, while preserving the fixed CTA shell and shared custom scroll rail behavior.
- The integrations section implementation now uses `583:3592` as the section root and renders directly below FAQ.
- The integrations card-geometry refactor now treats `584:1581` as the background shell source of truth, `584:1583` as the upward-arc card reference, and `584:1647` as the downward-arc card reference.
- The footer is now implemented under `src/components/layout/footer` as a reusable promo surface plus an invariant footer body, with site pages composing only the promo while shared route chrome owns the footer body.
- The footer slice implementation uses the combined `583:3998` frame as the landing convenience wrapper reference, with the landing promo extracted from `583:3999` and the footer body extracted from `583:4655`.
- The additional promo variants now use `605:126341` for the compact headline-only preset and `605:26463` for the compact-with-description preset.
- The shared footer promo uses a dedicated `1314px` shell because it does not match the shared landing `1005px` container used by FAQ and several earlier sections.

## Route Policy

Keep:

- `/`
- `/doow-ai`
- `/signin`
- `/privacy_policy`
- `/terms_of_use`

Prune:

- `/about_us`
- `/contact_us`
