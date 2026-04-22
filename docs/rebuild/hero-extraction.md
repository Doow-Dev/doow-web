# Hero Extraction

## Status

- Extracted on `2026-04-15` via the local desktop-backed Figma MCP bridge
- Source file key: `aUt2nki2FMqr6qKZ10GRR6`
- Source frame link:
  - `https://www.figma.com/design/aUt2nki2FMqr6qKZ10GRR6/DOOW-WEBSITE?node-id=580-1111&m=dev`

## Primary Node

- Hero section: `580:1111`

## What Was Retrieved Successfully

- top-level metadata for the hero frame
- variable definitions used by the hero frame
- screenshot of the hero frame
- targeted `get_design_context`, `get_metadata`, and `get_screenshot` on the hero text and CTA subnodes

## What Timed Out

- full `get_design_context` on the hero frame
- lighter `get_design_context` call with `disableCodeConnect`

This means the current local bridge can reach the hero, but the full frame is still too heavy for a single inspect response. The current working pattern is to keep extracting the hero in smaller targeted node calls.

## Hero Frame Evidence

- node: `580:1111`
- name: `Hero section`
- size: `1440 x 1024`

## Visual Composition From Screenshot

- same header/navigation as the extracted header frame
- centered hero content over a large scenic background image
- large multiline headline in white with amber-highlighted emphasis
- short centered supporting paragraph below the headline
- two CTA buttons:
  - primary green button: `Start Free Trial`
  - secondary light button: `Watch a Demo`
- foreground lifestyle/product composition with a seated person using a laptop

## Variables Observed In The Hero Frame

### Typography

- `Text/Title/Xlarge -sb`
  - `Inter`
  - `600`
  - `60px`
  - `72px` line height
  - `-2px` letter spacing
- `Text/Label/Large-rg`
  - `Inter`
  - `400`
  - `16px`
  - `21px` line height
  - `-0.31px` letter spacing
- `Body/sm-medium`
  - `Inter`
  - `500`
  - `13px`
  - `21px` line height
  - `-0.14px` letter spacing

### Color And Foreground

- `Foreground/fg-on-color`: `#FFFFFF`
- `Foreground/fg-base`: `#011313`
- `Color/Grey/900`: `#111827`
- `Primary/Green/green-600`: `#04984D`
- `Color/green/400`: `#4ADE80`
- `Foreground/fg-interactive`: `#04A755`
- `Color/amber/200`: `#FDE68A`

### Supporting Shared Tokens Seen In Root Variables

- `Radius/Pill`: `999`
- `Background/bg-subtle`: `#FAFAFA`
- `Border/border-base`: `#E5E6E5`
- `Elevation/card-rest`
- `Elevation/card-hover`
- `Elevation/flyout`

## Targeted Hero Subnodes

- `Hero container` frame: `580:1130`
  - position in hero frame: `x=346 y=154`
  - size: `749 x 279`
- `H` content frame: `580:1131`
  - size: `749 x 279`
- `Hero Text` frame: `580:1132`
  - size: `798 x 148`
- hero headline text node: `580:1133`
  - size: `798 x 144`
  - typography: `Inter 600 / 60 / 72 / -2`
  - render effect: `0 1px 1px rgba(0,0,0,0.25)` text shadow
  - emphasis uses a warm-to-green gradient across the highlighted phrase
- second-line group: `580:1146`
  - position in hero container: `x=38 y=74`
  - size: `673 x 72`
- second-line text node: `580:1147`
  - text: `on SaaS no one is using?`
  - typography: `Inter 600 / 60 / 72 / -2`
  - render effect: `0 1px 1px rgba(0,0,0,0.25)` text shadow
  - exact fill export from targeted `get_design_context` is an SVG-backed radial gradient over `673 x 72`
  - radial transform: `matrix(52.348 -1 -0.10276 5.5844 12.897 46)`
  - highlight stays white through `61.986%`, then shifts through `#FCE9BF`, `#F9D480`, `#F7C960`, `#F5BE40`, `#F4B320`, `#F3AD10`, `#F2A800`, and `#FC8811`
- sparkle group: `580:1148`
  - position in hero container: `x=538.5 y=91.7578125`
  - size: `33 x 33`
  - built from two intersecting white-gradient strokes
- lead-copy text node: `580:1135`
  - size: `698 x 57`
  - typography token source: `Text/Label/Large-rg`
  - render output from inspect: `Inter 400 / 16 / 21 / -0.0496`
- CTA container: `580:1136`
  - size: `287 x 34`
  - horizontal gap between CTAs: `12px`
- primary CTA button instance: `580:1138`
  - size: `112 x 34`
  - label: `Start Free Trial`
  - padding: `9px 9px` horizontal, `7px 7px` vertical
  - inner gap: `8px`
  - radius: `8px`
  - border: `#04984D`
  - fill: `#04A755`
  - inset highlight: `#4ADE80`
- secondary CTA frame: `580:1139`
  - size: `163 x 34`
  - label: `Watch a Demo`
  - padding: `8px 8px` horizontal, `6px 6px` vertical
  - inner gap: `6px`
  - radius: `8px`
  - border: `rgba(11, 19, 36, 0.07)`
  - fill: `#FFFFFF`
  - label color: `#111827`
  - media preview frame: `580:1141`, size `22 x 20`
  - label frame: `580:1142`, size `93 x 20`
  - trailing icon size: `20 x 20`

## Implementation Notes

- The shared Figma token `Text/Label/Large-rg` reports `-0.31` letter spacing.
- The rendered inspect output for the actual hero lead-copy node exports `-0.0496px`.
- Batch 3 keeps both facts:
  - the shared raw token remains documented in evidence
  - the hero typography primitive now uses the rendered value for the actual hero-lead style

## What This Unlocks

- exact hero frame size
- exact hero headline token
- exact hero supporting-copy token
- exact hero CTA row sizing and spacing
- exact primary and secondary hero button variants
- confirmation that the hero uses the same brand green family already seen in the header/button extraction
- a stronger token basis for upcoming hero implementation even before hero media inspection succeeds

## Next Step

1. Review the implemented hero section against the extracted text and CTA evidence
2. Replace the temporary local hero background fallback with the Azure Blob or Front Door URL when the canonical link is available
3. Continue to the demo section only after hero review sign-off
