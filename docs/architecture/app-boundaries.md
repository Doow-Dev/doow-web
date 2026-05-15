# App boundaries

The monorepo has two production Next.js apps. Each app owns a domain, its
routes, its content lifecycle, and its app-specific configuration.

## Web app

`apps/web` owns `www.doow.co`.

Add web code here when the change affects:

- landing-page UI
- subscriptions
- sign-in entry points
- privacy and terms pages
- blog routes
- blog MDX content
- marketing assets and asset manifests
- web analytics
- web-only API integrations

Important paths:

- `apps/web/src/app`: App Router routes and layouts.
- `apps/web/src/components`: web UI components.
- `apps/web/src/lib`: web-only helpers, data, blog loaders, and config.
- `apps/web/content/blog`: blog MDX posts.
- `apps/web/public`: local web assets that must ship with the app.
- `apps/web/scripts/check-blog`: blog governance scripts.
- `apps/web/vercel.json`: web deployment config.

## Docs app

`apps/docs` owns `docs.doow.co`.

Add docs code here when the change affects:

- docs pages
- docs navigation
- docs layout and docs UI components
- docs MDX components
- docs redirects
- docs search
- docs versioning
- docs content governance

Important paths:

- `apps/docs/src/app`: docs routes and layouts.
- `apps/docs/src/components/docs`: docs UI components.
- `apps/docs/src/lib/docs`: docs loaders, schema, navigation, search,
  redirects, versioning, and governance.
- `apps/docs/content/docs`: docs MDX pages.
- `apps/docs/scripts/content`: docs content migration tools.
- `apps/docs/vercel.json`: docs deployment config.

## App-local aliases

The `@/*` alias is app-local. Do not use `@/*` to import across apps or shared
packages. Cross-workspace imports must use package names such as `@doow/mdx`.

## Cross-app rule

Apps do not import from each other. If both apps need a helper, extract a
generic version into `packages/*` and make each app depend on that package.
