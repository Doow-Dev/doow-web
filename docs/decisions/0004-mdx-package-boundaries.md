# 0004 Keep MDX package boundaries narrow

## Status

Accepted.

## Context

Both apps need MDX parsing and validation, but they do not publish the same
content type. The blog has editorial metadata, RSS, dynamic Open Graph images,
and launch gating. The docs app has navigation, redirects, search, and version
metadata.

Sharing too much content behavior would couple product surfaces that need
different governance.

## Decision

Use `@doow/mdx` for generic MDX helpers:

- parsing
- heading extraction
- code-block helpers
- allowed component validation
- link validation
- image validation
- shared MDX errors

Use `@doow/content-schemas` for reusable schema primitives:

- dates
- slugs
- links
- SEO fields
- asset paths
- frontmatter primitives

Keep publication models, app routes, app components, and app-specific metadata
inside the owning app.

## Consequences

Shared code stays useful without becoming a dumping ground. A helper can move
into a package only when both apps need it and it has no app-specific imports.

The tradeoff is a small amount of intentional duplication between blog and docs
schemas when their product needs differ.
