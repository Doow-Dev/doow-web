# Monorepo migration guide

This guide defines the recommended production monorepo direction for Doow before
the repository is reorganized. Use it as the planning source of truth for
structure, tooling, package boundaries, deployment, agent instructions, and
migration checks.

## Decision summary

Doow needs one repository with multiple production applications and a small set
of stable shared packages. A different domain for documentation does not require
a separate repository. It requires a separate application and deployment target.

We recommend this direction:

- Use a monorepo with `apps/web` for `www.doow.co`.
- Use `apps/docs` for `docs.doow.co`.
- Use internal packages for stable shared contracts.
- Treat Clerk-style MDX content governance as a product requirement.
- Use Doow-owned MDX and content validation packages to enforce that
  requirement.
- Use Turborepo for task orchestration and caching.
- Use pnpm workspaces for dependency management.
- Keep product behavior inside apps.
- Keep shared packages small, typed, documented, and acyclic.

## Recommended stack

The production setup must make the common path obvious for humans and agents.
Choose boring, widely supported tools with clear failure modes.

- Package manager: `pnpm` with `pnpm-workspace.yaml`.
- Task runner: Turborepo.
- Web app: Next.js.
- Docs app: Next.js with a Doow-owned Clerk-style MDX governance layer.
- Docs implementation option: Fumadocs, Nextra, or a custom Doow MDX pipeline.
- Language: TypeScript in strict mode.
- Linting: ESLint flat config.
- Formatting: Prettier.
- Package tests: Vitest where shared packages need unit tests.
- App verification: Next build, typecheck, lint, and browser checks.
- Deployment: one Vercel project per app.

Use Nx only if the repository grows into many apps, many libraries, generated
project graphs, or advanced affected-project workflows. Turborepo is the better
default for two Next.js apps plus shared packages.

## Target structure

The repository structure must make ownership visible. Apps own routes and
product experiences. Packages own shared contracts.

```text
doow/
  apps/
    web/
      src/
        app/
        components/
        lib/
        styles/
      next.config.ts
      package.json
      tsconfig.json

    docs/
      src/
        app/
        content/
        components/
      next.config.ts
      package.json
      tsconfig.json

  packages/
    ui/
    design-tokens/
    config/
    mdx/
    content-schemas/
    analytics/
    seo/
    utils/

  docs/
    architecture/
    decisions/
    runbooks/
    agent-guides/

  .agent/
  AGENTS.md
  CLAUDE.md
  SKILL.md
  package.json
  pnpm-workspace.yaml
  turbo.json
```

## Package responsibilities

Shared packages must exist only when they remove real duplication or protect a
contract that both apps rely on. Do not extract page-specific code into packages.

| Package | Responsibility | Notes |
| --- | --- | --- |
| `@doow/ui` | Shared primitives and stable components | No page sections, app routes, or app-specific content. |
| `@doow/design-tokens` | Color, type, spacing, radius, motion, and asset tokens | This is the shared visual source for apps and UI primitives. |
| `@doow/config` | Shared ESLint, TypeScript, Prettier, and PostCSS config | Keep app overrides inside each app. |
| `@doow/mdx` | Shared MDX parsing, AST helpers, heading extraction, and validation utilities | Blog and docs keep separate schemas and component maps. |
| `@doow/content-schemas` | Shared schema primitives for dates, slugs, asset paths, links, and SEO fields | Do not put blog or docs schemas here. |
| `@doow/analytics` | Typed analytics events and tracking helpers | Prevent random event names across apps. |
| `@doow/seo` | Metadata, canonical URL, sitemap, and schema helpers | Keep domain-specific values configurable per app. |
| `@doow/utils` | Small framework-light utilities | Keep this small. Avoid turning it into a junk drawer. |

## MDX and content architecture

Doow already has a local MDX content system for the blog. The docs app should
reuse the discipline and selected tooling from that system, but it must not
reuse the blog content model directly.

Current blog infrastructure includes:

- `apps/web/content/blog/*.mdx` for article content.
- `apps/web/content/blog/authors/*.mdx` for author profiles.
- `apps/web/src/lib/blog/schema.ts` for strict frontmatter validation.
- `apps/web/src/lib/blog/content.ts` for filesystem reads, AST parsing, table of
  contents extraction, image validation, related-post validation, and approved
  MDX component checks.
- `apps/web/src/components/blog/mdx-components.tsx` for the blog MDX component
  map.

The docs app needs a parallel docs-specific content model:

```text
apps/
  web/
    content/blog/
    src/lib/blog/
    src/components/blog/

  docs/
    content/docs/
    src/lib/docs/
    src/components/docs/

packages/
  mdx/
  content-schemas/
```

Share the MDX engine pieces that are truly common:

- MDX parsing helpers.
- Markdown and MDX AST traversal helpers.
- Heading extraction and slugging.
- Inline image validation helpers.
- Link validation helpers.
- Code block configuration.
- Common asset path policy.
- Shared callout, card, tab, and code primitives after they stabilize.

Keep these pieces app-specific:

- Blog frontmatter schema.
- Docs frontmatter schema.
- Blog routes and docs routes.
- Blog MDX component map.
- Docs MDX component map.
- Docs navigation, manifest, sidebar, and search indexing.
- Blog taxonomy, author, related-post, and editorial logic.

The principle is: share the MDX toolkit, not the publication model.

The shared MDX package should be concrete from the start:

```text
packages/mdx/
  src/
    parse.ts
    headings.ts
    validate-components.ts
    validate-images.ts
    validate-links.ts
    code-blocks.ts
    errors.ts
```

The shared schema package should hold primitives, not full app schemas:

```text
packages/content-schemas/
  src/
    asset-path.ts
    date.ts
    frontmatter-primitives.ts
    link.ts
    seo.ts
    slug.ts
```

Each app configures the shared tooling for its own content model:

```text
apps/web/src/lib/blog/mdx-config.ts
apps/web/src/lib/blog/schema.ts

apps/docs/src/lib/docs/mdx-config.ts
apps/docs/src/lib/docs/schema.ts
```

## Clerk docs reference

Clerk's public docs repository is a strong reference for production MDX
discipline. Use it as a benchmark for content governance, not as a structure to
copy blindly.

Useful Clerk patterns:

- Content lives as `.mdx` files with frontmatter.
- Docs are organized under a top-level `docs/` tree with partials and tooltips.
- Schemas and scripts validate content quality before publishing.
- Scripts check frontmatter, images, redirects, annotations, SVGs, quickstarts,
  and search records.
- The repository uses pnpm and has a docs-oriented build pipeline.

Important difference:

- Clerk's public repository contains open-source documentation content. Their
  docs site source code is not fully open in that repository. For Doow, we plan
  to keep the docs application and content together inside the monorepo.

For Doow, copy the authoring rigor:

- strict frontmatter,
- approved MDX components,
- AST-based validation,
- content move/delete scripts,
- redirect checks,
- image checks,
- search indexing checks,
- clear contributor and agent guidance.

Doow should not treat Fumadocs or Nextra as the target. The target is a
Clerk-style Doow-owned docs content system. Fumadocs, Nextra, or a custom
pipeline are implementation choices that must fit Doow's governance model.

Do not copy the exact repo shape unless it fits Doow's app and deployment
model.

## Dependency rules

The dependency graph must flow in one direction. This rule matters more than the
tool choice.

```text
apps/web  -> packages/*
apps/docs -> packages/*

packages/ui -> packages/design-tokens
packages/mdx -> packages/content-schemas
packages/seo -> packages/content-schemas
packages/analytics -> packages/content-schemas
```

Packages must never import from `apps/*`. The docs app must never import from
`apps/web`. The web app must never import from `apps/docs`.

Use the `@doow/*` namespace for internal packages. Avoid generic names such as
`@repo/*` because Doow packages are part of a production product system.

## Docs app guidance

The documentation site needs its own application because it has a different
domain, navigation model, search experience, content lifecycle, and SEO surface.

The docs app must support:

- `docs.doow.co` as its canonical domain.
- A dedicated docs layout and navigation shell.
- MDX content with typed frontmatter.
- A docs-specific MDX component map.
- A docs manifest, sidebar, or navigation registry.
- Search.
- Sitemap generation.
- Clear canonical URLs.
- Product, integration, billing, and support documentation.
- A changelog or release notes area when the product needs it.
- Build-time checks for frontmatter, links, images, redirects, and unsupported
  MDX components.
- Content move and delete tooling.
- Redirect tracing for moved docs pages.
- Search indexing checks.
- A documented versioning decision, even if the first decision is "unversioned."

Use Fumadocs only if it can serve the Doow-owned governance model without
removing required validation, redirects, search, and content tooling. Use Nextra
only if the team intentionally chooses a simpler docs-first framework. Use a
custom Doow MDX pipeline if the product needs Clerk-style control over content
processing and validation. Keep the final choice documented in an architecture
decision record before implementation.

## Package build strategy

Local packages need a consistent build and import strategy. Decide this before
moving code so Next.js, TypeScript, and Turborepo agree on how packages compile.

Recommended starting point:

- Use TypeScript source packages for internal packages.
- Add `transpilePackages` in each Next.js app for packages imported by that app.
- Keep package exports explicit through each package `package.json`.
- Add a `build` script only when a package emits files used outside Next.js.
- Add Vitest tests for `@doow/mdx` and `@doow/content-schemas`.

Each Next.js app should list the internal packages it imports:

```ts
const nextConfig = {
  transpilePackages: [
    "@doow/ui",
    "@doow/design-tokens",
    "@doow/mdx",
    "@doow/content-schemas",
    "@doow/seo",
    "@doow/analytics",
  ],
};
```

Do not rely on implicit workspace resolution for production builds. Make package
exports and Next.js transpilation explicit.

## Package manager migration

The current repository uses `package-lock.json`. Moving to pnpm is still the
recommended production monorepo direction, but it must be treated as a deliberate
migration step.

The package manager migration must:

1. Add `packageManager` to the root `package.json`.
2. Add `pnpm-workspace.yaml`.
3. Generate `pnpm-lock.yaml`.
4. Remove `package-lock.json` in the same migration.
5. Enable Corepack in local and CI setup.
6. Run a clean install from scratch.
7. Run lint, typecheck, tests, and builds after the lockfile changes.

Do not keep npm and pnpm lockfiles together. One lockfile must be authoritative.

## Root scripts

Root commands must make local and CI workflows predictable. The exact scripts
can change during implementation, but the interface must stay obvious.

```json
{
  "scripts": {
    "dev": "turbo dev",
    "dev:web": "pnpm --filter @doow/web dev",
    "dev:docs": "pnpm --filter @doow/docs dev",
    "build": "turbo build",
    "build:web": "pnpm --filter @doow/web build",
    "build:docs": "pnpm --filter @doow/docs build",
    "lint": "turbo lint",
    "typecheck": "turbo typecheck",
    "test": "turbo test",
    "format": "prettier --write .",
    "verify": "pnpm lint && pnpm typecheck && pnpm test && pnpm build"
  }
}
```

Each app and package must define only the scripts it owns. The root `package.json`
coordinates workspace tasks through Turborepo.

## Turborepo configuration

The Turborepo configuration must cache the right outputs and avoid caching
persistent development tasks.

```json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "globalEnv": [
    "BLOG_LIVE",
    "NEXT_PUBLIC_SITE_URL",
    "NEXT_PUBLIC_BLOB_BASE_URL",
    "NEXT_PUBLIC_POSTHOG_KEY",
    "NEXT_PUBLIC_POSTHOG_HOST",
    "NEXT_PUBLIC_DOCS_SITE_URL",
    "DOCS_SEARCH_APP_ID",
    "DOCS_SEARCH_API_KEY",
    "DOCS_SEARCH_INDEX"
  ],
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**", "dist/**"]
    },
    "lint": {
      "outputs": []
    },
    "typecheck": {
      "dependsOn": ["^build"],
      "outputs": []
    },
    "test": {
      "outputs": ["coverage/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

Keep cache inputs conservative until the repo settles. Add tighter inputs only
when builds are stable and the team understands which files affect each task.
Environment variables that change rendered output must be represented in Turbo
configuration or app-specific build configuration so cached builds cannot serve
the wrong site state.

## Docs search and versioning

Search and versioning affect the content model, URLs, and deployment behavior.
Decide them before the docs app becomes a public surface.

Search options to evaluate:

- Fumadocs search if Fumadocs is chosen and it satisfies production needs.
- Pagefind for static local search with no external service dependency.
- Algolia if the team needs hosted search analytics and advanced relevance.
- A Doow-owned build-time search index if docs search must match the existing
  blog search approach.

Versioning options to evaluate:

- Unversioned docs for the first public docs launch.
- Versioned product docs when public APIs or SDKs need stable historical docs.
- Changelog-led docs when product behavior changes but old docs don't need to
  remain browsable.

Record the first decision in `docs/decisions/`. If docs launch unversioned, say
that explicitly and define what event triggers versioning later.

## Boundary enforcement

Documentation is necessary, but production monorepos also need automated
enforcement. Add boundary checks after the folder migration is stable.

Boundary enforcement should cover:

- No imports from `apps/web` into `apps/docs`.
- No imports from `apps/docs` into `apps/web`.
- No imports from `apps/*` into `packages/*`.
- No package circular dependencies.
- No package using undeclared dependencies.
- No app using a shared package that is missing from its `package.json`.

Use ESLint boundaries, package exports, TypeScript path rules, or a dependency
checker. The tool matters less than making forbidden imports fail in CI.

## Content validation commands

The blog already has route-level check scripts. The monorepo needs explicit
content validation commands that work per app and at the root.

Recommended command shape:

```json
{
  "scripts": {
    "check:content": "turbo check:content",
    "check:content:web": "pnpm --filter @doow/web check:content",
    "check:content:docs": "pnpm --filter @doow/docs check:content",
    "check:mdx": "turbo check:mdx",
    "check:links": "turbo check:links",
    "check:redirects": "turbo check:redirects"
  }
}
```

The checks must cover frontmatter, unsupported MDX components, unsafe HTML,
inline event handlers, image paths, alt text, links, redirects, search records,
and duplicate slugs.

## Production gotchas

Most monorepo failures come from unclear boundaries, hidden dependencies, or
too much extraction at once. Watch these areas closely.

- Package manager migration can reveal phantom dependencies.
- `@/` aliases must remain app-local unless each app defines them explicitly.
- Shared UI can become expensive if page-specific components move into it.
- Shared MDX can become unsafe if blog and docs are forced into one schema.
- `content/blog` must move with `apps/web` or the blog loader must be updated,
  because the current loader reads from `process.cwd()/content/blog`.
- Next.js apps must explicitly transpile internal source packages.
- pnpm must not be introduced without a clean lockfile and install verification.
- Client components must stay compatible with React Server Components.
- Global CSS must stay app-owned unless a shared token stylesheet is deliberate.
- Environment variables must be scoped per app and per deployment.
- Turbo cache must account for environment variables that affect output.
- Vercel projects must point to the correct app root.
- Docs and web must not accidentally share analytics or canonical domains.
- Docs content must not depend on blog-only author, category, or related-post
  logic.
- Blog content must not inherit docs-only navigation, versioning, or SDK
  reference fields.
- Turborepo outputs must exclude `.next/cache`.
- Shared packages must not create circular dependencies.
- The docs app must not depend on landing-page implementation details.
- Agents must know which app or package owns a change before editing.

## Migration phases

Run the migration as a sequence of verified production changes. Each phase must
have a clear rollback path and a verification checklist.

1. Document the target architecture.
2. Add root monorepo configuration.
3. Migrate from npm lockfile to pnpm lockfile.
4. Move the current app into `apps/web`.
5. Move `content/blog` with the web app or update the loader deliberately.
6. Preserve current web behavior and routes.
7. Add shared config packages.
8. Add shared design tokens.
9. Add `@doow/mdx` and `@doow/content-schemas`.
10. Add `apps/docs` as a separate Next.js app.
11. Add docs content validation, redirects, search, and versioning decisions.
12. Add shared UI only after repeated stable patterns exist.
13. Add shared SEO and analytics helpers.
14. Update CI and deployment project settings.
15. Add boundary enforcement.
16. Update agent instructions and project documentation.
17. Run full verification for both apps.

Do not combine unrelated refactors with the structural migration. If a visual or
content cleanup is needed, do it in a separate task after the app roots build.

## Deployment model

Each production app must have its own deployment target. Domains map to apps,
not to packages.

| Domain | App | Deployment root |
| --- | --- | --- |
| `www.doow.co` | `@doow/web` | `apps/web` |
| `docs.doow.co` | `@doow/docs` | `apps/docs` |

Each Vercel project needs app-specific environment variables, build commands,
install commands, and output settings. Shared packages are built as dependencies
of the app that imports them.

Deployment settings must be documented per app:

| App | Install command | Build command | Notes |
| --- | --- | --- | --- |
| `@doow/web` | `pnpm install --frozen-lockfile` | `pnpm --filter @doow/web build` | Owns `www.doow.co`, blog, landing, and utility pages. |
| `@doow/docs` | `pnpm install --frozen-lockfile` | `pnpm --filter @doow/docs build` | Owns `docs.doow.co`, docs content, search, and redirects. |

## CI expectations

CI must verify both apps and all shared packages. A production monorepo is not
ready until the root command gives a reliable answer.

Required checks:

- Install with a frozen lockfile.
- Lint all apps and packages.
- Typecheck all apps and packages.
- Test shared packages.
- Build `apps/web`.
- Build `apps/docs`.
- Run app-level browser checks when routes or layouts change.
- Run MDX/content validation for blog and docs.
- Verify docs search records when docs content changes.
- Verify redirect rules when docs paths move.
- Verify package boundary rules.
- Verify clean pnpm install from the lockfile.

Preferred root verification command:

```bash
pnpm verify
```

## Agent documentation to update

Agents need explicit rules before the migration starts. Update the documentation
that tells agents where to work, what to read, and how to verify changes.

Create or update these files:

- `docs/architecture/monorepo.md`
- `docs/architecture/app-boundaries.md`
- `docs/architecture/package-boundaries.md`
- `docs/architecture/deployment.md`
- `docs/decisions/0001-use-monorepo.md`
- `docs/runbooks/deploy-web.md`
- `docs/runbooks/deploy-docs.md`
- `docs/agent-guides/working-in-monorepo.md`
- `AGENTS.md`
- `CLAUDE.md`
- `SKILL.md`
- `README.md`

The agent-facing docs must answer these questions:

- Which app owns each domain?
- Where does landing-page code live?
- Where does docs content live?
- Where do blog MDX files live?
- When is a shared package justified?
- Which MDX helpers are shared?
- Which MDX schemas and component maps are app-owned?
- Which package owns content schema primitives?
- How do agents add or move docs pages?
- How do agents add docs redirects?
- Which imports are forbidden?
- Which commands verify each app?
- Which commands verify the whole repo?
- How are environment variables added?
- How do deployments map to apps?
- What files must an agent read before editing docs, web, or packages?

## Readup before implementation

Before any agent changes the repository structure, read the current project
source of truth and the monorepo planning material.

Required project readup:

1. `AGENTS.md`
2. `CLAUDE.md`
3. `SKILL.md`
4. `docs/rebuild/README.md`
5. `docs/rebuild/roadmap.md`
6. `docs/rebuild/acceptance-gates.md`
7. `docs/rebuild/architecture.md`
8. `docs/monorepo-migration-guide.md`
9. `docs/rebuild/blog-roadmap.md`
10. `docs/rebuild/blog-authoring.md`
11. `docs/rebuild/blog-architecture-reference-audit.md`

Recommended external readup:

- Turborepo documentation for workspace tasks, caching, and package graphs.
- pnpm workspace documentation for filters, lockfiles, and dependency rules.
- Next.js documentation for monorepo support and app deployment roots.
- Fumadocs documentation before choosing it as an implementation accelerator.
- Nextra documentation before choosing it as an implementation accelerator.
- Vercel documentation for monorepo project settings and root directories.
- Clerk's public docs content repository as a benchmark for MDX content
  governance and validation workflows.

## Open decisions

Resolve these decisions before the migration branch begins. Record final choices
in `docs/decisions/`.

- Use Fumadocs or Nextra for `apps/docs`.
- Switch to pnpm during the migration or in a dedicated dependency task.
- Keep Tailwind configuration app-local or shared through `@doow/config`.
- Keep tokens as CSS files, TypeScript exports, or both.
- Build `@doow/ui` immediately or wait until both apps need shared components.
- Define the exact first public docs search engine.
- Decide whether docs launch versioned or unversioned.
- Decide whether `@doow/mdx` compiles MDX, validates MDX, or only provides
  shared parser and validation helpers.
- Decide which blog MDX validation helpers move from `src/lib/blog/content.ts`
  into `@doow/mdx`.
- Decide whether docs content uses Fumadocs' native content layer, a Doow-owned
  MDX pipeline, or a hybrid.
- Add remote Turborepo caching now or after the first stable monorepo build.
- Decide whether docs content lives in `apps/docs/content`, `apps/docs/src/content`,
  or a content-only package.

## Migration acceptance checklist

The migration is complete only when the repo is usable as a production monorepo.

- `apps/web` builds and serves the existing site routes.
- `apps/docs` builds and serves the docs site.
- Root scripts can run app-specific and whole-repo checks.
- Package boundaries are documented.
- Forbidden imports are documented.
- Blog and docs MDX ownership is documented.
- `@doow/mdx` exists with tested parsing and validation helpers.
- `@doow/content-schemas` exists with tested schema primitives.
- Shared MDX helpers are covered by tests.
- Blog and docs content validation can run separately.
- Blog content path works after moving into `apps/web`.
- Each Next app transpiles the internal packages it imports.
- pnpm is the only active package manager lockfile.
- Turbo cache config includes output-affecting environment variables.
- Docs search and versioning decisions are recorded.
- Boundary enforcement runs in CI.
- Vercel or deployment settings point at the correct app roots.
- Environment variable ownership is documented.
- Agent instructions reference the new structure.
- CI verifies both apps.
- No app imports from another app.
- No shared package imports from `apps/*`.
- The lockfile matches the selected package manager.

## Next steps

Start by writing the architecture decision record and app-boundary document. Then
create the monorepo migration branch, add root workspace configuration, and move
the existing application into `apps/web` with behavior unchanged.
