# Docs design analysis — Clerk + Stytch vs ours

Reference shots:
- Clerk (dark): `/tmp/surf-snap-1778484446763.png`, `/tmp/surf-snap-1778484468586.png`
- Stytch (light): `/tmp/surf-snap-1778484565007.png`, `/tmp/surf-snap-1778484627824.png`
- Doow docs landing (light): `/tmp/surf-snap-1778484739265.png`, `/tmp/surf-snap-1778484758186.png`
- Doow docs article (light): `/tmp/surf-snap-1778484785942.png`

This file is a working spec. Each row in the gap table maps to a concrete file. Phases at the bottom are the implementation order.

---

## Headline read

Clerk and Stytch share a discipline that ours does not: **the docs page is the product**. The chrome shrinks, the type system stays calm, and the visual weight sits inside the content. Ours has the proportions of a marketing landing page wedged into a docs shell — hero typography is 5x oversized, color is doing more work than hierarchy, and the sidebar is decorated instead of dense.

The fix isn't more design — it's removing the design we already added.

---

## Concrete gaps (the "vibecoded" signals)

| # | Gap | What Clerk/Stytch do | What we do | Fix |
|---|---|---|---|---|
| 1 | Hero H1 size | 32–40px page-title weight ("Welcome to Clerk Docs" / "Stytch documentation"). H1 is a page label, not a hero | ~72px display-weight "Start building with Doow." stacked over 3 lines | `apps/docs/src/app/page.tsx` — drop the display H1, use shadcn `SectionHeading` at `eyebrow + h1`-sized only |
| 2 | Hero CTA buttons | None. The page opens with cards | Green "Quickstart" pill + secondary "API reference" sit next to a curl example like a product hero | Remove pill row. The card grid below is the CTA |
| 3 | Hero code card | None on Clerk. Stytch has zero gradients | Right-side curl card on a tinted hero band | Move code into a card grid as one of the equal-weight starter cards (Stytch pattern) |
| 4 | Section labels | Tertiary muted-foreground, sentence case ("Explore by feature", "Featured", "Learn the concepts") | All-caps **accent-green** "SET UP / BUILD / SHIP / OPERATE" — design-system improvisation | Replace with `SectionHeading` (text-foreground, sentence-case, no accent color on labels) |
| 5 | Card grid density | 3–4 columns of icon + title + 1-line description, 14px body, hairline border, no shadow | 4-column grid with green icons and accent-green column labels — feels like a marketing comparison table | Use `@doow/ui/system` `Card` primitive at `variant=hairline` (or equivalent), 3-col on desktop, drop the accent-tinted icons |
| 6 | Article H1 size | Stytch: ~28px regular weight, sits flush left. Clerk: ~36px | ~48px bold "Getting started" — twice what it needs | `--type-doow-display-md` → `--type-doow-display-sm` (or smaller) |
| 7 | Section H2 color | `text-foreground`, no accent. Hierarchy via size + spacing | Section H2s render in accent green ("Prepare your workspace", "Create the first page") | Strip accent color from H2/H3. Reserve accent for inline links + the brand mark |
| 8 | "Copy page" affordance | Stytch: pill in top-right of article header with dropdown for "Open in ChatGPT / Claude / Copy markdown" | Our `PageActions` exists but is buried | Move PageActions to a top-right pill aligned with H1 baseline (Stytch placement) |
| 9 | Footer / page end | Stytch: "Was this page helpful?" thumbs + 3-column "Need help / Product updates / Policies & legal" link grid + Next pager | We have "Next steps" cards but no helpful-vote and no Next/Previous pager | Add `WasThisHelpful` + Next/Previous pager + 3-column footer-links grid |
| 10 | Code block treatment | Both: subtle background, language tag in top-right, copy button on hover, NO heavy borders | Ours: heavy border, dark-on-light contrast OK, language tag and copy present | Reduce border to 1px hairline at `border-subtle`, body bg `bg-subtle` not full dark |
| 11 | Color discipline | Clerk and Stytch use exactly **one** accent color for links and primary buttons. Headings, icons, labels are all neutral | We sprinkle `accent-green` on H2s, icons, column labels, button fills | Confine `--accent-700` to: inline links, one primary button per surface, focus ring. Everything else neutral |
| 12 | Surface tints | None. Pure white/black + neutral grays + one accent | Hero band has a soft green/gray gradient | Drop the hero band entirely |

---

## What we're keeping

These already work and don't need to change:
- `ThemeToggle` with the sun/moon swap and `useSyncExternalStore` hydration
- `DocsSearch` modal structure and `⌘K` shortcut behavior
- `Tabs` interactive component with localStorage persistence
- `PageActions` Copy/ChatGPT/Claude/raw dropdown (just needs relocation)
- `llms.txt` route + `/raw/[slug]` route
- Right-rail `DocsToc` with IntersectionObserver
- 16 MDX stub files added in the navigation expansion

---

## Component → primitive map (what to replace, with what)

Bespoke today → @doow/ui consumed:

| Bespoke CSS class today | Replace with |
|---|---|
| `.docs-card-link`, `.docs-feature-card`, `.docs-hero-callout` | `@doow/ui/system` `Card` |
| `.docs-cta-primary`, `.docs-cta-secondary`, hand-rolled `<a>` buttons | `@doow/ui/system` `Button` (or `@doow/ui/ui` `Button` for tighter cases) |
| `.docs-section-heading` + custom kicker spans | `@doow/ui/system` `SectionHeading` |
| `.docs-sidebar__panel` ScrollArea (currently raw div) | `@doow/ui/ui` `ScrollArea` (already done in `docs-shell.tsx`) |
| `.docs-search-modal` backdrop + panel | `@doow/ui/ui` `Dialog` |
| `.docs-tooltip` | `@doow/ui/ui` `Tooltip` |
| `.docs-tag`, `.docs-step-pill`, `.docs-status-pill` | `@doow/ui/system` `Badge` |
| `.docs-search-trigger` (button + kbd) | `@doow/ui/ui` `Button` variant=ghost + raw `<kbd>` |
| `.docs-form-field`, `.docs-input` (any forms inside docs) | `@doow/ui/system` `FormField`, `Input` |
| `.docs-footer__columns` link grid | `@doow/ui/system` `FooterList` |
| `.docs-callout`, `.docs-callout--info/warning/note/success` | Keep custom (no primitive in `@doow/ui` yet — propose a `Callout` component to add) |
| `.docs-page-actions` dropdown | `@doow/ui/ui` `Accordion` won't fit — add `DropdownMenu` to `@doow/ui` (radix) |
| `.docs-toc__item--active` underline | Keep — it's a CSS list, not a component |

Open work in `@doow/ui` to support docs cleanly:
- Add `DropdownMenu` primitive (used by `PageActions` and sidebar SDK switcher)
- Add `Collapsible` primitive (used by sidebar group expand/collapse if we keep collapse behavior)
- Add `Kbd` primitive (used in search trigger and floating ask bar)
- Add `Callout` system component with 4 tones (used by MDX)

---

## Phase plan (content only — chrome is already done)

Scope is the **welcome page** (`/`) and **article body** (e.g. `/getting-started`). The sidebar and top bar are done and out of scope here. Each phase ships independently and ends with a peruz snap pair against Clerk + Stytch.

### Phase 1 — Token + color discipline (CSS only)
Strip accent green from non-link surfaces in content: section headings, journey column labels, icon fills inside cards, eyebrow labels. Reserve `--accent-*` for inline links, one primary CTA per surface, and focus ring.
Files: `apps/docs/src/styles/globals.css`
Verify: load `/` and `/getting-started`. Only inline links and one primary CTA carry the green.

### Phase 2 — Welcome page rebuild
Replace `apps/docs/src/app/page.tsx`. New structure:
1. Small page label: "Doow Docs" eyebrow + H1 "Welcome to Doow Docs" + 2-paragraph intro
2. 4-column starter grid: `Quickstart · UI components · API reference · Customize Doow` using `@doow/ui/system/Card`
3. 2-column "Explore by feature" grid
4. 3-column "Build with the SDKs" icon grid
5. Footer help/community strip
No hero gradient. No oversized type. No accent color outside links.
Files: `apps/docs/src/app/page.tsx`, `apps/docs/src/styles/globals.css`
Verify: matches Clerk landing density. peruz fullpage shot stays inside 1× scroll on desktop.

### Phase 3 — Article header
Shrink H1 to `--type-doow-display-sm`. Move `PageActions` to top-right pill aligned with H1 baseline (Stytch's "Copy page" placement). Tighten meta strip.
Files: `apps/docs/src/components/docs/docs-article-layout.tsx`, `apps/docs/src/styles/globals.css`
Verify: `/getting-started` header proportions match Stytch.

### Phase 4 — Section headings inside MDX
Strip accent color from H2/H3. Tighten H2 to ~22px, H3 to ~17px. Reserve accent for inline links only.
Files: `apps/docs/src/components/docs/mdx-components.tsx`, `apps/docs/src/styles/globals.css`
Verify: all H2/H3 in `/getting-started` render in foreground color.

### Phase 5 — Article footer
Add `WasThisHelpful` thumbs row + Next/Previous pager + 3-column `FooterList` link grid below the existing Next-steps cards. Use `@doow/ui/system/FooterList`.
Files: new `apps/docs/src/components/docs/was-this-helpful.tsx`, new `apps/docs/src/components/docs/article-pager.tsx`, update `docs-article-layout.tsx`
Verify: footer matches Stytch's pattern.

### Phase 6 — Code blocks
Reduce code-block border to 1px hairline. Use `bg-subtle` not full-dark inside articles. Confirm dual-theme tokens fire.
Files: `apps/docs/src/styles/globals.css`, `apps/docs/src/lib/docs/mdx-config.ts`
Verify: code reads as inline-quoted, not as a competing surface.

### Phase 7 — Verify
- `pnpm --filter @doow/docs check:content`
- `pnpm --filter @doow/docs build`
- `pnpm verify`
- peruz snap `/` and `/getting-started` in light + dark, side-by-side with Clerk + Stytch.

---

## Design principles (extracted from Clerk + Stytch)

1. **Type carries hierarchy. Color does not.** One accent color, used only for links and one primary CTA per surface. Everything else neutral.
2. **Chrome shrinks. Content grows.** Sidebar items 28px tall, top-bar 56px tall, H1s page-label sized.
3. **No surface tints in the article body.** Borders separate sections, not color washes.
4. **Density beats decoration.** Show 4 starter cards in a row, not 2 with hero treatment.
5. **Every primitive ships from one place.** All buttons/cards/inputs come from `@doow/ui`. No bespoke `.docs-cta-primary` classes that diverge from `.cta-primary` on the web app.
6. **The doc is the affordance.** No "Quickstart" or "API reference" hero buttons — the card grid IS the navigation. The user came here to read; let them read.
