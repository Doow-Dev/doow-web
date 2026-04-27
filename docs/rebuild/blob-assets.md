# Blob Asset Setup

## Current Contract

- Blob-backed landing assets resolve through `src/lib/assets/blob.ts`
- The base path is configured with `NEXT_PUBLIC_BLOB_BASE_URL`
- `.env.example` documents the required value for local and deployed environments

## Current Migrated Assets

- hero background
- demo frame
- demo poster
- demo video
- pricing backgrounds

## Implementation Notes

- Components should continue importing asset references from the typed manifest, not by constructing blob URLs directly.
- `next/image` should be used for remote hero, frame, poster, and thumbnail assets.
- The demo MP4 should stay conditionally rendered so no video bytes load until the user opens the lightbox.
