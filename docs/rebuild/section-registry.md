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
| 7 | Doow AI spotlight | `1056:1823` | Implemented in codebase, currently not mounted on `/`, review pending |
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
- The home route currently comments out `DoowAiSection`, so the spotlight exists in code but is not part of the live landing-section order yet.
- The pricing section implementation uses `582:3087` as the section root, `582:3088` for the background art reference, and `1056:1977` for the gradient overlay plus centered copy lock while sourcing production looped backgrounds from `siteAssetManifest.pricingBackgrounds`.
- The FAQ section implementation uses `583:3321` as the section root and now lives under `src/components/layout/faq` as a shared site layout component with page-owned conversation content, while preserving the fixed CTA shell and shared custom scroll rail behavior.
- The integrations section implementation now uses `583:3592` as the section root and renders directly below FAQ.
- The integrations card-geometry refactor now treats `584:1581` as the background shell source of truth, `584:1583` as the upward-arc card reference, and `584:1647` as the downward-arc card reference.
- The footer is now implemented under `src/components/layout/footer` as a reusable promo surface plus an invariant footer body, with site pages composing only the promo while shared route chrome owns the footer body.
- The footer slice implementation uses the combined `583:3998` frame as the landing convenience wrapper reference, with the landing promo extracted from `583:3999` and the footer body extracted from `583:4655`.
- The additional promo variants now use `605:126341` for the compact headline-only preset and `605:26463` for the compact-with-description preset.
- The shared footer promo uses a dedicated `1314px` shell because it does not match the shared landing `1005px` container used by FAQ and several earlier sections.
- The `/applications` route now includes a Problems section sourced from `604:15094`, with the outer heading extracted from `604:15097`, the dotted selector shell extracted from `657:3553`, the duplicate-tools illustration implemented from `661:4298` using the user-approved horizontal screenshot orientation, the visibility illustration implemented from `660:10746`, and the cost illustration implemented from `660:10964`.
- The `/applications` route now includes a Features and Solutions section sourced from `604:19476`, with the centered intro lockup extracted from `604:19866`, the desktop two-column grid wrapper extracted from `604:19869`, and the four production card references extracted from `604:19870`, `604:19942`, `604:20001`, and `604:20044`.
- The `/integrations` route now composes the hero sourced from `652:1958` plus the shared FAQ section, with the copy lockup rebuilt from the shared site-page shell, the headline gradient promoted into shared utilities, the section-bottom gradient sourced from `605:59383`, the background rebuilt from the masked `652:1960` illustration composition, and page-owned integrations FAQ conversations passed into the shared FAQ layout before the promo footer.
- The `/doow-ai` route now includes the Derek in Action section sourced from `722:2140` and the Mina in Action section sourced from `746:2659`, with shared section structure, blob-backed background and CTA images, and the local `doow-ai-placeholder.svg` standing in for the future video blob surface.
- The `/doow-ai` route now includes the control feature grid sourced from `772:4013`, using repeated placeholder card content from Figma and local `SecurityIcon`, `GrayBulbIcon`, and `ReflectionIcon` components with green icon hover states.

## Route Policy

Keep:

- `/`
- `/about_us`
- `/applications`
- `/subscriptions`
- `/doow-ai`
- `/integrations`
- `/signin`
- `/privacy_policy`
- `/terms_of_use`

Prune:

- `/contact_us`
