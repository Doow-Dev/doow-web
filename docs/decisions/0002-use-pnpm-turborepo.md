# 0002 Use pnpm and Turborepo

## Status

Accepted.

## Context

The repo needs deterministic installs, workspace linking, shared package builds,
and one root command surface for agents and CI. The original single-app setup
used npm scripts from the app root. That no longer fits a two-app production
repo.

## Decision

Use pnpm workspaces for dependency installation and workspace linking. Use
Turborepo for root build, lint, typecheck, test, and content-check orchestration.

The root `package.json` is the command surface. App and package manifests remain
the source of truth for local scripts.

## Consequences

Root commands can validate the full repo without each agent memorizing every
workspace. CI and local development use the same command names.

The tradeoff is that every workspace must declare its own dependencies. The
boundary checker enforces that source files cannot rely on undeclared external
packages or invalid workspace imports.
