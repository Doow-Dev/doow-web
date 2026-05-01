# Assets and CDN Plan

## Direction

The long-term home for production landing-page assets is Azure Blob Storage behind Azure Front Door.

## Repo Rules

- `public/` is not the long-term source of truth for landing-page media.
- Keep only the minimal local essentials that truly belong in the app package.
- Move landing-page imagery, videos, and exported design assets to the CDN contract.
- If a section must ship before the canonical blob URL is available, use a temporary local fallback through the typed asset manifest and mark the entry with a clear replacement note.

## Required Layers

### Asset host
- canonical public host fronted by Azure Front Door

### Manifest
- typed asset registry in code
- semantic IDs instead of raw URL strings in components

### Environment
- site URL
- CDN base URL
- analytics keys
- server-only Doow API base URL and admin secrets
- optional media service values if product demos use a streaming provider

## App-Level Rules

- `next/image` should target the Front Door hostname, not random vendor URLs.
- videos and large media should not live in the app package.
- assets should be versionable and cacheable without code churn across components.

## Migration Note

The current repo still contains `67` legacy public asset files across several folders. These should be reviewed and removed during the cleanup batch unless explicitly retained.

## Current Blob Usage

- The hero background, demo frame, demo poster, demo video, and pricing background assets now resolve through the shared blob asset helper.
- `.env.example` documents `NEXT_PUBLIC_BLOB_BASE_URL`, which is the single contract for blob-hosted landing assets until Front Door is introduced.
- `.env.example` and `.env.local.example` document the server-only deployment variables `DOOW_API_BASE_URL`, `CATALOG_ADMIN_KEY`, and `X_ADMIN_SECRET`; the GitHub Actions Azure Static Web Apps workflows load them from repository secrets during deploy.
- `next/image` remains responsible for optimizing the remote hero, frame, poster, and thumbnail images, while the demo MP4 stays a direct blob video source that only mounts after user intent.
