# Doow Web

This repository is being rebuilt as the new Doow landing page, with a small set of supporting routes.

The current codebase still contains legacy UI, assets, and routes, but the rebuild is now guided by a staged, review-first workflow rather than a one-shot implementation.

## Start Here

Read these in order:

1. `docs/rebuild/README.md`
2. `docs/rebuild/roadmap.md`
3. `docs/rebuild/acceptance-gates.md`
4. `AGENTS.md`
5. `SKILL.md`

## Current Rebuild Model

- Batch-driven implementation
- Review after every batch
- Review after every section
- Figma as design source of truth
- Mobile-first implementation
- Azure Blob Storage plus Front Door for production landing-page assets

## Active Route Policy

Keep:

- `/`
- `/signin`
- `/privacy_policy`
- `/terms_of_use`

Prune:

- `/about_us`
- `/contact_us`

## Development

```bash
npm run dev
```

Quality checks:

```bash
npm run lint
npm run typecheck
npm run build
```

## Notes

- The current Figma connection works, but the active seat has hit tool-call limits during deeper inspections. Keep Figma extraction targeted.
- Marketing assets are moving to a CDN-backed manifest model. Do not assume `public/` is the long-term production home for site media.
