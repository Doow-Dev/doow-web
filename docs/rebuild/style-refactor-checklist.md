# Style Refactor Checklist

This checklist is the implementation guide for cleaning up style drift in the current hero and header slice without over-tokenizing the repo.

Use this alongside:

- `docs/rebuild/hero-nav-review-guide.md`
- `docs/rebuild/design-system.md`
- `src/styles/tokens/foundation.css`
- `src/styles/recipes/system.css`
- `src/styles/recipes/site.css`
- `src/app/(landing)/_components/header/styles/index.css`
- `src/app/(landing)/_components/hero/styles/index.css`

## Decision Rules

### Keep as plain Tailwind

Keep simple utility classes in JSX or recipe classes when they are structural rather than semantic:

- layout: `flex`, `grid`, `items-center`, `justify-between`, `w-full`, `mx-auto`
- stacking and spacing glue: `space-y-4`, `space-y-3`, `sm:flex-row`
- aspect-ratio helpers: `aspect-video`, `aspect-square`, `aspect-[4/3]`
- light state helpers when they are not token-worthy: `hover:underline`, `disabled:opacity-50`

These do not need tokens unless Figma proves they are part of a reusable system rule.

### Use an existing token or recipe

If the class is already expressing a value that exists in `foundation.css`, stop repeating it inline and move it into a named recipe or utility in `system.css`.

This applies especially to:

- colors
- radius
- elevation
- copy measures
- shell spacing
- focus rings

### Add a new token first

Promote a new token only when the value is a reusable design decision, not just a one-off convenience.

Good candidates:

- control padding
- control min-heights
- component-specific micro gaps
- repeated typography tracking values
- repeated gradients
- repeated section stack gaps

Bad candidates:

- one-off hero-only button sizing
- isolated nudges that belong to one section composition

## File-by-File Checklist

## `src/components/system/button.tsx`

| Current class or value | Decision | Replacement target | Notes |
| --- | --- | --- | --- |
| `rounded-[var(--shape-radius-control)]` | Use existing token | move into a shared `button-base` recipe using `--shape-radius-control` | Token already exists. |
| `focus-visible:ring-[var(--focus-ring)]` | Use existing token | keep in `button-base` recipe with `--focus-ring` | Token already exists. |
| `hover:text-[var(--action-primary-strong)]` | Use existing token | move into the link-style button recipe using `--action-primary-strong` | Token already exists. |
| `gap-[8px]` | Add new token first | `--button-gap-base` | Shared button spacing is system-level. |
| `px-[9px]` | Add new token first | `--button-padding-inline-base` | Shared button inset should not stay arbitrary. |
| `py-[7px]` | Add new token first | `--button-padding-block-base` | Shared button inset should not stay arbitrary. |
| `gap-[6px] px-[8px] py-[6px]` in `ctaSecondary` | Remove from primitive, do not add a shared token | move into a hero-only recipe in `src/app/(landing)/_components/hero/styles/index.css`, for example `hero-demo-button` | This is the exact section-specific leak we want to remove from `Button`. |
| `hover:brightness-[0.97]` and `hover:brightness-[0.99]` | Keep as plain Tailwind inside the recipe | keep in button variant recipe | Interaction nuance is fine here; it does not need a root token. |
| `transition-[background-color,border-color,color,box-shadow,transform,opacity]` | Keep as plain Tailwind inside the recipe | keep in `button-base` recipe | Generic transition plumbing does not need tokenization. |

## `src/components/system/container.tsx`

| Current class or value | Decision | Replacement target | Notes |
| --- | --- | --- | --- |
| `max-w-[var(--container-max)]` | Use existing token | create a `container-shell` or `layout-container` utility in `system.css` | Token already exists as `--container-max`. |
| `px-[var(--space-shell)]` | Use existing token | same `container-shell` or `layout-container` utility | Token already exists as `--space-shell`. |
| `mx-auto w-full` | Keep as plain Tailwind inside the recipe | keep in the named container utility | Structural layout glue is fine. |

## `src/components/system/footer-list.tsx`

| Current class or value | Decision | Replacement target | Notes |
| --- | --- | --- | --- |
| `text-[var(--ink-soft)]` | Use existing token | add a `footer-list-heading` recipe or a semantic text-color utility | Token already exists as `--ink-soft`. |
| `tracking-[0.16em]` | Add new token first | `--type-footer-heading-letter-spacing` | This is typography, so it should not remain as an arbitrary value if the footer keeps it. |
| `text-[var(--ink-body)]` | Use existing token | add a `footer-link` recipe or semantic body-color utility | Token already exists as `--ink-body`. |
| `text-sm` for footer links | Keep as plain Tailwind for now | leave as `text-sm` unless footer typography is extracted from Figma | Promote only after footer typography is defined. |
| `space-y-4` and `space-y-3` | Keep as plain Tailwind | leave as-is | Simple list spacing does not need a token yet. |

## `src/components/system/input.tsx`

| Current class or value | Decision | Replacement target | Notes |
| --- | --- | --- | --- |
| `field-shell` | Already correct | keep using `field-shell` | This is the right direction already. |
| `focus-visible:border-[var(--action-primary)]` | Use existing token | move into a stronger input recipe, for example `field-interactive` | Token already exists as `--action-primary`. |
| `focus-visible:ring-[var(--focus-ring)]` | Use existing token | same `field-interactive` recipe | Token already exists as `--focus-ring`. |
| `min-h-12` | Add new token first | `--field-min-height` | Shared control height is system-level. |
| `px-4` | Add new token first | `--field-padding-inline` | Shared field inset should be explicit. |
| `py-3` | Add new token first | `--field-padding-block` | Shared field inset should be explicit. |
| `text-sm` | Keep as plain Tailwind for now | leave until Figma field typography is extracted | Promote only if form text becomes a reusable type rule. |
| `transition-[border-color,box-shadow,background-color]` | Keep as plain Tailwind inside the recipe | leave in the input recipe | Generic interaction plumbing is fine. |

## `src/components/system/media-frame.tsx`

| Current class or value | Decision | Replacement target | Notes |
| --- | --- | --- | --- |
| `rounded-[var(--shape-radius-xl)]` | Use existing token | move into a `media-frame-shell` recipe | Token already exists as `--shape-radius-xl`. |
| `shadow-[var(--elevation-raised)]` | Use existing token | same `media-frame-shell` recipe | Token already exists as `--elevation-raised`. |
| `bg-[linear-gradient(180deg,var(--surface-card),var(--surface-accent))]` | Add new token first | `--gradient-media-frame` | This should become a semantic gradient token if the media shell keeps this treatment. |
| `p-3 sm:p-4` | Keep as plain Tailwind inside the recipe for now | keep in a named padded media-frame recipe or in JSX until reused again | Responsive inset here is simple enough to stay utility-based for now. |
| `aspect-video`, `aspect-square`, `aspect-[4/3]` | Keep as plain Tailwind | leave as aspect utilities | Aspect-ratio helpers are exactly what utility classes are good at. |

## `src/components/system/section-heading.tsx`

| Current class or value | Decision | Replacement target | Notes |
| --- | --- | --- | --- |
| `gap-[var(--space-stack)]` | Use existing token | move into a `section-heading-shell` recipe | Token already exists as `--space-stack`. |
| `space-y-[13px]` for hero | Add new token first | `--section-heading-gap-hero` | This is a repeatable section-heading rule, not layout glue. |
| `max-w-[var(--copy-measure-hero)]` | Use existing token | rely on `text-lead-hero` or a shared measure utility instead of repeating inline | Token already exists as `--copy-measure-hero`. |
| `max-w-[var(--copy-measure)]` | Use existing token | add a shared measure utility such as `measure-copy` if used again | Token already exists as `--copy-measure`. |
| `text-white` on hero copy | Add new semantic token first | `--ink-inverse` or `--ink-on-hero` | This is not arbitrary, but it is still too raw for a system component. |
| `space-y-4`, `mx-auto`, `items-center`, `text-center` | Keep as plain Tailwind | leave as simple layout utilities | This is structural composition, not token-worthy. |

## `src/components/system/nav-link.tsx`

This is already a known problem area from the header review, but it is included here so the cleanup is complete.

| Current class or value | Decision | Replacement target | Notes |
| --- | --- | --- | --- |
| `text-(--header-nav-foreground)` | Use existing token | replace with a named `nav-link-header` recipe using `--header-nav-foreground` | The token exists; the inline syntax is the problem. |
| `gap-[2px]` | Add new token first only if it repeats across nav patterns | otherwise keep as plain Tailwind inside the nav-link recipe | This is small enough to stay utility-based unless it spreads. |
| `text-body-sm-medium` | Already correct | keep using it or rename to a clearer nav-text utility if needed | The token-backed typography utility is valid. |

## Recommended New Tokens To Add First

Add these only if the related component cleanup is happening now:

- `--button-gap-base`
- `--button-padding-inline-base`
- `--button-padding-block-base`
- `--field-min-height`
- `--field-padding-inline`
- `--field-padding-block`
- `--type-footer-heading-letter-spacing`
- `--gradient-media-frame`
- `--section-heading-gap-hero`
- `--ink-inverse` or `--ink-on-hero`

## Recommended Recipes To Add Or Tighten

- `button-base`
- `button-size-base`
- `container-shell`
- `footer-list-heading`
- `footer-link`
- `field-interactive`
- `media-frame-shell`
- `section-heading-shell`
- `nav-link-header`

## Hero-Specific Reminder

Do not solve the hero CTA cleanup by expanding the shared button API.

The hero secondary CTA should be composed with:

- generic button sizing from `Button`
- hero-specific layout treatment in `src/app/(landing)/_components/hero/styles/index.css`
- local hero wrapper classes for the thumbnail and icon spacing

That keeps the primitive reusable and still lets the hero match Figma.
