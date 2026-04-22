# Content Model

## Direction

Marketing content stays code-managed for now, but it should be structured so it is easy to edit and safe for AI assistants to work with.

## Content Types To Introduce

- site metadata
- primary navigation
- hero copy
- CTA groups
- feature sections
- trust or proof content
- integrations copy
- footer groups
- legal metadata

## Rules

- keep content in typed objects, not scattered inline strings
- validate reusable content shapes where helpful
- keep asset references indirect through the asset manifest
- separate copy from layout whenever it improves clarity

## Current Landing Shapes

- `landingPageContent.hero` remains the source of truth for hero copy and CTA links.
- `landingPageContent.demo` now stores:
  - the section anchor id
  - title and description copy
  - accessible play-label copy
  - typed references to the frame, poster, and video entries in the site asset manifest

## Benefits

- easier review
- safer AI edits
- cleaner section implementations
- easier future CMS migration if needed
