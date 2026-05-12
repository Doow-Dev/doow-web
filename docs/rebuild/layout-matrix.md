# Layout Matrix

This file freezes the outer layout contract for the retained routes before the layout-first refactor.

## Core Rules

- Route layouts own shared page shells.
- `Container` owns outer width and horizontal gutters.
- Landing and utility sections may keep section-specific visual styling and internal composition.
- A section that uses a shared `Container` variant must not declare its own outer width, max-width, viewport-width override, or horizontal recentering layer on top of that shell unless an explicit exception is approved.
- Do not introduce a shared non-zero vertical gap between sibling landing sections.

## Container Variants

| Variant | Max width | Horizontal gutter before zero-padding breakpoint | Horizontal gutter at or above zero-padding breakpoint | Owns vertical spacing | Routes or shells |
|---|---:|---:|---:|---|---|
| `utilityShell` | `76rem` (`--container-max`) | `clamp(1.25rem, 3vw, 2.5rem)` | `0` | no | shared global utility navbar shell |
| `landing` | `64rem` / `1024px` (`--layout-shell-landing`) | `clamp(1.25rem, 3vw, 2.5rem)` before `70rem / 1120px` | `0` at `70rem / 1120px` | no | standard landing and site-page section shells |
| `landingWide` | `82rem` / `1312px` (`--layout-shell-wide`) | `clamp(1.25rem, 3vw, 2.5rem)` before `80rem / 1280px` | `0` at `80rem / 1280px` | no | navbar shell, hero shell |
| `siteFooterPromo` | `82.125rem` / `1314px` (`--layout-shell-footer-promo`) | `clamp(1.25rem, 3vw, 2.5rem)` | `0` at `88rem` | no | shared site footer promo shell |
| `siteFooterBody` | `70.5rem` / `1128px` (`--layout-shell-footer-body`) | `clamp(1.25rem, 3vw, 2.5rem)` | `0` at `76rem` | no | shared site footer body shell |
| `landingFooterPromo` | alias of `siteFooterPromo` | same as `siteFooterPromo` | same as `siteFooterPromo` | no | temporary migration alias |
| `landingFooterBody` | alias of `siteFooterBody` | same as `siteFooterBody` | same as `siteFooterBody` | no | temporary migration alias |
| `readable` | `48rem` / `768px` | `clamp(1.25rem, 3vw, 2.5rem)` | `0` | no | legal-page readable body |

## Shell Presets

| Shell preset | Backed by container variant | Vertical contract | Notes |
|---|---|---|---|
| `landingNavbarShell` | `landingWide` | none | sticky and fixed behavior stays in navbar CSS |
| `landingHeroShell` | `landingWide` | none | hero top offset stays hero-owned |
| `landingSectionShell` | `landing` | none between sibling sections | section-specific internal padding stays section-owned |
| `sitePageSectionShell` | `landing` | none | reusable site-page section shell for `(site-pages)` routes; section-specific internal spacing stays section-owned |
| `utilityHeaderShell` | `utilityShell` | none | sticky global navbar surface stays content-sized on desktop; top offset, z-index, and dropdown layering stay component-owned |
| `siteFooterPromoShell` | `siteFooterPromo` | none | reusable page-owned promo shell; promo card owns the screenshot overlap and desktop overflow |
| `siteFooterBodyShell` | `siteFooterBody` | none | invariant footer-body shell shared by `(site-pages)` route chrome and landing footer composition |
| `utilityPageShell` | `utilityShell` | `padding-block: var(--space-section)` for generic utility pages | shared route shell |
| `legalReadableShell` | `readable` | preserve current legal top and bottom spacing | replaces page-level max-width wrappers |

## Locked Existing Values

| Concern | Locked value | Source of truth |
|---|---|---|
| global landing sibling section gap | `0` | current page composition |
| generic shell gutter token | `--space-shell = clamp(1.25rem, 3vw, 2.5rem)` | `src/styles/tokens/foundation.css` |
| generic utility page block spacing | `--space-section = clamp(4rem, 8vw, 7rem)` | `src/styles/tokens/foundation.css` |
| shared utility navbar top offset | `10px` | Figma node `652:2045` plus `src/styles/tokens/foundation.css` |
| shared utility navbar surface height | `50px` | Figma node `652:2045` plus `src/styles/tokens/foundation.css` |
| shared utility navbar desktop inner row height | `34px` | Figma node `652:2045` plus `src/styles/tokens/foundation.css` |
| shared utility navbar shell scroll padding | `calc(var(--global-site-navbar-shell-height) + 1rem)` | `src/styles/globals.css` |
| shared page-shell chrome z-index | `90` | `src/styles/tokens/foundation.css` |
| navbar shell width | `1312px / 82rem` | extracted header Figma evidence |
| hero shell width | `1312px / 82rem` with hero inner content max `749px / 46.8125rem` | extracted hero Figma evidence |
| standard landing section shell width | `1024px / 64rem` | current tokenized landing shell contract |
| standard landing section shell breakpoint to zero horizontal gutter | `1120px / 70rem` | `src/styles/recipes/system.css` |
| footer promo shell width | `1314px / 82.125rem` | extracted footer promo frames `583:3999`, `605:126341`, and `605:26463` |
| footer body shell width | `1128px / 70.5rem` | extracted footer body containers `583:4656`, `605:125367`, and `604:21379` |
| landing-wide shell breakpoint to zero horizontal gutter | `1280px / 80rem` | `src/styles/recipes/system.css`; keeps `1024`-class desktop widths from pinning the navbar or hero to the viewport edge |

## Explicit Non-Goals

- Do not move demo intro padding into generic container rules.
- Do not move demo media inset padding into generic container rules.
- Do not move feature-split content or stage padding into generic container rules.
- Do not change route URLs or content hierarchy.
- Do not add a section-owned width override inside a shared landing shell just to make one section visually wider. If a wider section is needed, add or use an approved container variant instead.
- Do not introduce a shared non-zero vertical gap between sibling landing sections.
- Do not make promo-to-footer spacing depend on the combined `SiteFooter` wrapper. Promo and footer body must also render correctly when they are siblings from different layouts.
