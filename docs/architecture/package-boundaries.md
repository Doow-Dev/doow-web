# Package boundaries

Shared packages exist to remove real duplication between apps. They must stay
generic, typed, and free of app-specific imports.

## Package map

`packages/mdx` exports generic MDX helpers. Add code here for shared parsing,
heading extraction, code block processing, allowed component validation, link
validation, image validation, and MDX-specific errors.

`packages/content-schemas` exports reusable schema primitives. Add code here for
shared dates, slugs, links, SEO fields, asset paths, and frontmatter helpers.

`packages/design-tokens` exports shared design tokens. Add code here when a
token is meant to be reused by multiple apps or packages.

`packages/config` exports shared config helpers. Add code here only for config
that is genuinely shared and does not depend on app runtime state.

## Extraction test

Before moving code into a package, answer yes to all of these:

- At least two workspaces need the behavior.
- The code has no import from `apps/*`.
- The API can be named without mentioning web, docs, blog, or a route.
- The package can be tested without running a Next.js app.

If any answer is no, keep the code app-local.

## Boundary checks

`pnpm check:boundaries` validates workspace imports, undeclared dependencies,
and package cycles. Run it before committing package changes.
