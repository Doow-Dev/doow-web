# Header And Nav Extraction

## Status

- Extracted on `2026-04-15` via the local desktop-backed Figma MCP bridge
- Source file key: `aUt2nki2FMqr6qKZ10GRR6`
- Source frame link:
  - `https://www.figma.com/design/aUt2nki2FMqr6qKZ10GRR6/DOOW-WEBSITE?node-id=580-1112&m=dev`

## Primary Nodes

- Header frame: `580:1112`
- Header inner frame: `580:1114`
- Logo group: `580:1116`
- Nav links group: `580:1120`
- Product nav link: `580:1121`
- Header action group: `580:1127`
- Login button instance: `580:1128`
- Sign up button instance: `580:1129`

## Frame Layout

### Header

- name: `Header`
- size: `1312 x 34`

### Inner layout

- main content frame: `1292 x 34`
- left logo block
- centered nav group
- right action group

### Nav group

- node: `580:1120`
- size: `1045 x 21`
- visible items in screenshot:
  - `Product`
  - `Pricing`
  - `Blog`

### Action group

- node: `580:1127`
- size: `136 x 34`
- contains:
  - login button instance
  - sign-up button instance

## Nav Link Evidence

### Product nav link

- node: `580:1121`
- size: `63 x 21`
- text node width: `51`
- chevron icon size: `10 x 10`
- gap between label and icon: `2px`

### Typography

- font family: `Inter`
- font weight: `500`
- font size: `13px`
- line height: `21px`
- letter spacing: `-0.14px`
- text color: `#FFFFFF`

## Sign Up Button Evidence

### Instance

- node: `580:1129`
- size: `70 x 34`
- variant hints exposed in inspect:
  - size: `Base`
  - state: `Default | Hover | Pressed | Focused | Disabled`
  - style: `Primary | Secondary | Danger | Transparent`

### Layout

- horizontal padding: `9px`
- vertical padding: `7px`
- gap: `8px`
- radius: `8px`

### Visuals

- border: `1px solid #04984D`
- primary surface: `#04A755`
- highlight color: `#4ADE80`
- text color: `#FFFFFF`
- shadow stack:
  - `0 3px 6px -3px rgba(0,0,0,0.35)`
  - `0 6px 12px -2px rgba(0,0,0,0.08)`
  - `0 12px 24px 0 rgba(2,6,23,0.08)`
- inset highlight:
  - `inset 0 2px 1px 0 #4ADE80`

### Label typography

- font family: `Inter`
- font weight: `500`
- font size: `13px`
- line height: `21px`
- letter spacing: `-0.14px`

## Variables Observed

- `Type/font family/Primary`: `Inter`
- `Type/Font weight/medium`: `medium`
- `Font size/body/sm`: `13`
- `Line height/body/sm`: `21`
- `Letter-spacing/body/sm`: `-0.14000000059604645`
- `Foreground/fg-on-color`: `#FFFFFF`
- `Color/green/400`: `#4ADE80`
- `Primary/Green/green-600`: `#04984D`

## What This Unlocks

- first exact nav-link text spec
- first exact button variant spec
- confirmation that targeted local MCP extraction works even while `tools/list` still hangs
- a concrete basis for refining Batch 3 tokens and reusable primitives before hero implementation
