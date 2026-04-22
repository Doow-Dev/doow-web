# Global Site Navbar Extraction

## Status

- Extracted on `2026-04-22` via the remote Figma plugin connection
- Source file key: `aUt2nki2FMqr6qKZ10GRR6`
- Source frame link:
  - `https://www.figma.com/design/aUt2nki2FMqr6qKZ10GRR6/DOOW-WEBSITE?node-id=652-2045&m=dev`
- Corner validation link:
  - `https://www.figma.com/design/aUt2nki2FMqr6qKZ10GRR6/DOOW-WEBSITE?node-id=608-128328&m=dev`

## Primary Node

- Shared global navbar frame: `652:2045`
- Corner validation instance: `608:128328`

## Frame Layout

### Outer shell

- name: `Overlay+Shadow+OverlayBlur`
- size: `502 x 50`
- padding: `10px` horizontal, `8px` vertical
- corner treatment:
  - top-left: `26px`
  - top-right: `12px`
  - bottom-left: `26px`
  - bottom-right: `12px`

### Surface treatment

- background: `rgba(255, 255, 255, 0.8)`
- blur: `10px`
- inner highlight: `inset 0 1px 1px 0 rgba(255, 255, 255, 0.45)`
- shadow stack:
  - `0 1px 1px 0 rgba(39, 44, 48, 0.1)`
  - `0 21px 28px -18px rgba(70, 81, 88, 0.2)`
  - `0 21px 10px -25px rgba(0, 0, 0, 0.3)`
  - `0 14px 40px 0 rgba(39, 44, 48, 0.05)`
  - `0 0 0 1px rgba(39, 44, 48, 0.04)`
  - `0 4px 9px 0 rgba(39, 44, 48, 0.07)`

### Inner row

- row node: `652:2046`
- size: `482 x 34`
- left cluster gap: `34px`
- nav gap: `28px`
- action gap: `16px`

## Typography

- font family: `Inter`
- weight: `500`
- font size: `13px`
- line height: `21px`
- letter spacing: `-0.14px`
- text color: `#111827`

## CTA Evidence

- login button:
  - node: `652:2060`
  - size: `54 x 32`
  - style: secondary
- sign-up button:
  - node: `652:2061`
  - size: `70 x 34`
  - style: primary

## Product Menu Reference

- Desktop interaction reference: Ramp enterprise navigation on `2026-04-22`
- Doow visual reference: grouped two-column menu with six persona cards
- Current implementation rule:
  - live destinations map to existing landing anchors
  - non-live destinations must not ship as dead links

## What This Unlocks

- a reusable non-landing global navbar for retained utility routes and future pages
- a dedicated token set for light glass chrome, sticky page-shell layering, and route-scoped scroll padding
- a shared content contract for product mega-menu entries, live-vs-planned nav items, and auth actions
