# Doow Agent docs plan

Use this file to track the customer-facing docs work for Doow Agent under
`apps/docs/content/docs/integrations/usage`.

The source material lives in `doow-platform`, but those files are mostly
internal product, engineering, and rollout docs. Do not copy them directly into
public docs. Translate them into decision guides, setup guides, proof steps,
privacy notes, and recovery paths for customers.

## Working rule

- [ ] Use the `doow-docs-writer` skill before editing each page.
- [ ] Classify the page type before writing.
- [ ] Define the reader job before writing.
- [ ] Read the relevant source files before making claims.
- [ ] Mark uncertain product or release claims for verification instead of
  guessing.
- [ ] Work page by page. Finish and review one page before moving to the next.
- [ ] Run `pnpm --filter @doow/docs check:content` after docs content changes.
- [ ] Run `pnpm --filter @doow/docs build` after navigation, route, or broad
  docs UI changes.

## Product truth

Doow has one tracking product, not two separate products.

```text
Doow Agent
├─ Browser Agent: browser extension surface for browser and web SaaS usage
└─ Desktop Agent: desktop runtime surface for native app usage
   ├─ Windows
   ├─ Linux
   └─ macOS
```

The public docs must keep this mental model:

- Browser Agent and Desktop Agent are the same product family.
- The device or runtime changes; the usage stream and product meaning stay
  shared.
- Doow Agent is a usage data source, alongside provider APIs, cloud platforms,
  instrumentation, and observability.
- Doow Agent docs are customer setup and usage docs, not implementation
  architecture docs.

## Source map

Use these files as source truth while drafting customer-facing pages.

| Source file | Use for | Public-doc treatment |
| --- | --- | --- |
| `/home/ayodele/Desktop/doow/doow-platform/docs/manager-engineer.review.md` | One-product mental model | Use for the Doow Agent overview and chooser language |
| `/home/ayodele/Desktop/doow/doow-platform/apps/browser-extension/README.md` | Browser Agent behavior, browser support, build/status caveats | Translate into browser setup, support, proof, and known limits |
| `/home/ayodele/Desktop/doow/doow-platform/apps/desktop-agent/README.md` | Desktop Agent current scope, commands, platform status | Translate into customer-facing setup/status language only |
| `/home/ayodele/Desktop/doow/doow-platform/docs/desktop-agent/01-product-requirements.md` | Why Desktop Agent exists, goals, non-goals, success model | Use for overview, use cases, and privacy-safe framing |
| `/home/ayodele/Desktop/doow/doow-platform/docs/desktop-agent/02-core-parity-contract.md` | Browser and desktop parity model | Use to keep wording aligned across Browser and Desktop Agent pages |
| `/home/ayodele/Desktop/doow/doow-platform/docs/desktop-agent/03-event-schema-contract.md` | Shared ingestion wrapper and source-specific fields | Use only as background unless a reference section is needed |
| `/home/ayodele/Desktop/doow/doow-platform/docs/desktop-agent/05-implementation-roadmap.md` | Readiness and rollout status | Use only for cautious status wording; do not overclaim availability |
| `/home/ayodele/Desktop/doow/doow-platform/docs/desktop-agent/06-extension-parity-matrix.md` | What is complete, partial, or still validating | Use to avoid false production claims |
| `/home/ayodele/Desktop/doow/doow-platform/docs/desktop-agent/07-linux-ubuntu-implementation-spec.md` | Linux scope and support boundaries | Use for Linux page only |
| `/home/ayodele/Desktop/doow/doow-platform/docs/desktop-agent/08-privacy-and-data-collection.md` | What Desktop Agent collects and does not collect | Use for privacy notes across Doow Agent pages |
| `/home/ayodele/Desktop/doow/doow-platform/docs/desktop-agent/09-macos-implementation-spec.md` | macOS adapter status and open decisions | Use for macOS page only; avoid claiming finished support unless verified |

## Target information architecture

Add Doow Agent as a first-class usage source under Usage data.

```text
Usage data
├─ Choose a usage source
├─ Doow Agent
│  ├─ Overview
│  ├─ Browser Agent
│  └─ Desktop Agent
│     ├─ Windows
│     ├─ Linux
│     └─ macOS
├─ Direct provider APIs
├─ Cloud platforms
├─ Instrumentation SDK
└─ Observability
```

The OS-specific pages are optional until the overview and Desktop Agent page
prove that users need separate OS setup pages. If setup differs materially by
OS, split them. If not, keep platform notes inside the Desktop Agent page.

## Page sequence

### 1. Choose a usage source

- Target file:
  `apps/docs/content/docs/integrations/usage/choose-source.mdx`
- Page type: Decision guide
- Reader job: Help an admin choose the right usage collection path so they can
  get accurate usage data into Doow without picking the wrong source.
- Dependencies: None
- Work:
  - [x] Add Doow Agent as a usage source path.
  - [x] Explain when to use Doow Agent versus provider APIs, SDK,
    observability, and OTLP.
  - [x] Keep the first screen decision-oriented.
  - [x] Link to the Doow Agent overview once that page exists.
  - [x] Update comparison table and next steps.
- Done when:
  - [x] A reader can see that Doow Agent is a valid usage source.
  - [x] The page does not imply external APIs are the only normal path.
  - [x] The page does not explain internal payload contracts.

### 2. Doow Agent overview

- Target file:
  `apps/docs/content/docs/integrations/usage/doow-agent/index.mdx`
- Page type: Explanation plus routing page
- Reader job: Help an admin understand Doow Agent as one usage collection
  product with browser and desktop surfaces.
- Dependencies: Page 1 should land first so the route has a clear entry point.
- Work:
  - [x] Explain the one-product model.
  - [x] Compare Browser Agent and Desktop Agent by user need.
  - [x] Explain what data flows into Doow at a customer-facing level.
  - [x] Add a privacy boundary summary.
  - [x] Route readers to Browser Agent, Desktop Agent, or another usage source.
- Done when:
  - [x] The page orients users without implementation detail.
  - [x] Browser and Desktop Agent read as one family, not two unrelated
    integrations.
  - [x] Claims about platform support are cautious and source-backed.

### 3. Browser Agent

- Target file:
  `apps/docs/content/docs/integrations/usage/doow-agent/browser-agent.mdx`
- Page type: How-to guide
- Reader job: Help an admin install and verify browser-based usage collection.
- Dependencies: Doow Agent overview
- Work:
  - [x] Explain when Browser Agent is the right surface.
  - [x] Document supported browsers only from verified source truth.
  - [x] Explain permissions and privacy in customer language.
  - [x] Add setup steps.
  - [x] Add proof steps for confirming usage data appears.
  - [x] Add troubleshooting for missing browser activity.
- Done when:
  - [x] The page helps a customer complete setup.
  - [x] Browser support does not overclaim store availability or unverified
    browsers.
  - [x] The page avoids internal build commands unless they are truly customer
    setup commands.

### 4. Desktop Agent

- Target file:
  `apps/docs/content/docs/integrations/usage/doow-agent/desktop-agent.mdx`
- Page type: How-to guide with status notes
- Reader job: Help an admin understand, enable, and verify native app usage
  collection.
- Dependencies: Doow Agent overview
- Work:
  - [ ] Explain when Desktop Agent is the right surface.
  - [ ] Explain what it collects: app identity, process identity, timing,
    duration, idle/active state, device/platform/account context.
  - [ ] Explain what it does not collect: screenshots, keystrokes, clipboard,
    typed content, document bodies, message bodies, file contents, audio/video,
    and window titles.
  - [ ] Add setup steps or mark missing customer setup steps for verification.
  - [ ] Add proof steps for confirming native app usage appears.
  - [ ] Add troubleshooting for missing desktop activity.
  - [ ] Add platform status wording without overclaiming readiness.
- Done when:
  - [ ] The page is useful to customers, not a mirror of internal architecture
    docs.
  - [ ] Privacy boundaries are clear.
  - [ ] Platform readiness claims are source-backed or marked for verification.

### 5. Windows Desktop Agent

- Target file:
  `apps/docs/content/docs/integrations/usage/doow-agent/desktop-agent/windows.mdx`
- Page type: How-to guide
- Reader job: Help an admin install and validate the Windows Desktop Agent.
- Dependencies: Desktop Agent page; product confirmation on installer path
- Work:
  - [ ] Confirm the customer installation path.
  - [ ] Confirm supported Windows versions.
  - [ ] Add setup, proof, and recovery steps.
  - [ ] Include only customer-relevant operational notes.
- Done when:
  - [ ] Windows-specific steps are materially clearer than keeping the content
    inside the Desktop Agent page.

### 6. Linux Desktop Agent

- Target file:
  `apps/docs/content/docs/integrations/usage/doow-agent/desktop-agent/linux.mdx`
- Page type: How-to guide
- Reader job: Help an admin install and validate the Linux Desktop Agent where
  supported.
- Dependencies: Desktop Agent page; product confirmation on Linux pilot status
- Work:
  - [ ] Confirm whether Linux is public, pilot, or internal.
  - [ ] Confirm Ubuntu 24.04 GNOME scope and packaging status.
  - [ ] Explain X11 and GNOME Wayland support boundaries only if customer
    relevant.
  - [ ] Add setup, proof, and recovery steps.
- Done when:
  - [ ] The page avoids presenting internal adapter design as customer setup.

### 7. macOS Desktop Agent

- Target file:
  `apps/docs/content/docs/integrations/usage/doow-agent/desktop-agent/macos.mdx`
- Page type: Status or how-to guide, depending on readiness
- Reader job: Help an admin understand macOS availability and next action.
- Dependencies: Product confirmation on macOS readiness
- Work:
  - [ ] Confirm whether macOS is available, planned, private pilot, or not yet
    public.
  - [ ] If available, add setup, proof, and recovery steps.
  - [ ] If unavailable, keep the page out of published navigation or use a
    controlled status note only if product wants it public.
- Done when:
  - [ ] The page does not imply the macOS adapter is finished unless product
    and source evidence confirm it.

## Dependency map

```text
Source audit
└─ Choose a usage source
   └─ Doow Agent overview
      ├─ Browser Agent
      └─ Desktop Agent
         ├─ Windows page, if separate setup is needed
         ├─ Linux page, if separate setup is needed
         └─ macOS page, if public readiness is confirmed
```

Independent work after the overview lands:

- Browser Agent setup can proceed independently of Desktop Agent setup.
- Desktop privacy wording can proceed before OS-specific pages.
- OS-specific pages must wait for product readiness confirmation.

## Open questions

- [ ] What is the customer-facing Browser Agent installation path?
- [ ] Which browser stores or extension distribution paths are public?
- [ ] Is Safari support public, private, or only a build target?
- [ ] What is the customer-facing Desktop Agent download path?
- [ ] Is Windows public, controlled rollout, or internal pilot?
- [ ] Is Linux public, controlled rollout, or internal pilot?
- [ ] Is macOS public, planned, or not yet available?
- [ ] Should OS-specific pages be published now or drafted only after setup
  paths are confirmed?

## Quality bar

Before marking each page complete:

- [ ] The first screen explains why the reader is there.
- [ ] The next action is obvious.
- [ ] The page helps the reader choose, set up, verify, recover, or continue.
- [ ] The page does not copy internal architecture or roadmap prose.
- [ ] The page preserves product truth.
- [ ] The page avoids unsupported release-readiness claims.
- [ ] The page uses only approved docs MDX components.
- [ ] The page passes `pnpm --filter @doow/docs check:content`.
