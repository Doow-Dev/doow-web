# Integrations docs Stytch-quality improvement plan

Date: 2026-05-11

## Purpose

This plan defines the next step after the guide-first rewrite. The integrations
docs now have the right structure, but they are not yet as polished,
confidence-building, or task-completing as the best product docs. Stytch is the
comparison point because its docs guide users from a broad product domain into
an exact task with clear choices, examples, references, and next steps.

The goal is not to copy Stytch. The goal is to apply the same discipline to
Doow integrations and make the docs better for Doow's use case.

## Current state

The Doow integrations docs now have:

- A guide-first `/integrations` front door.
- Start-here pages:
  - `what-doow-needs`.
  - `choose-what-to-connect-first`.
  - `how-integrations-work`.
- A usage-source chooser.
- Provider setup pages with confirm, troubleshooting, and next-step sections.
- Navigation organized as Start here, Usage data, Organization data, and
  Financial data.

This is the correct foundation. The remaining gap is quality, confidence, and
depth.

## Stytch-quality bar

Stytch succeeds because each docs surface does five things:

1. Starts from user intent, not product taxonomy.
2. Presents clear choices before details.
3. Uses guides for tasks and references for facts.
4. Shows proof through examples, demos, code, and exact next steps.
5. Reduces cognitive load with strong page rhythm and scoped sections.

Doow should meet the same bar with integration-specific patterns:

```txt
Orient the user
→ help them choose a data source
→ guide exact setup
→ prove the setup worked
→ help them recover from errors
→ tell them what to connect next
```

## Target experience

Users should be able to arrive at `/integrations` without knowing what to
connect and still leave with a clear setup path.

The ideal journey:

```txt
I don't know what Doow needs.
└─ Read what Doow needs.
   └─ Choose what to connect first.
      └─ Choose usage, organization, or financial data.
         └─ Pick a source or method.
            └─ Follow a provider-specific setup guide.
               └─ Confirm data arrived.
                  └─ Fix issues if data does not arrive.
                     └─ Connect the next useful source.
```

## Gaps to close

### 1. Tables are doing too much UI work

The current front-door pages rely heavily on tables. Tables are useful for
comparison, but they do not feel like a high-quality decision product.

Needed improvement:

- Replace key chooser tables with visual decision cards.
- Keep tables only where comparison matters.
- Use short labels, one-sentence descriptions, and direct CTAs.

Candidate pages:

- `/integrations`.
- `/integrations/choose-what-to-connect-first`.
- `/integrations/usage/choose-source`.

### 2. Missing proof states

The docs now say “confirm the sync worked,” but they do not show users what a
successful state looks like.

Needed improvement:

- Add reusable proof-state blocks:
  - Connected state.
  - Recent sync timestamp.
  - Imported records.
  - Event log with no errors.
  - Usage rows by provider, project, model, service, or metric.
- Add screenshots or UI-state examples when product UI is stable enough.
- Add text-only fallback examples until screenshots are ready.

Candidate pages:

- All provider pages.
- `how-integrations-work`.
- `connect`.

### 3. Troubleshooting is too generic

The current troubleshooting sections are helpful but broad. Users need
provider-specific recovery paths.

Needed improvement:

- Add provider-specific troubleshooting bullets for the highest-traffic
  integrations first.
- Include exact causes, expected symptom, and next action.

Priority pages:

- OpenAI.
- AWS Bedrock.
- Azure OpenAI.
- Google Vertex AI.
- Datadog.
- Okta.
- Google Workspace.
- Microsoft 365.
- Accounting.

### 4. SDK and instrumentation claims need verification

The SDK pages include concrete technical claims. Those pages must be verified
by backend and SDK owners before production trust.

Needed improvement:

- Confirm package names.
- Confirm class names and method names.
- Confirm wrapper APIs.
- Confirm environment variables.
- Confirm event shape.
- Confirm authentication behavior.
- Confirm endpoint values.
- Confirm retry, batching, shutdown, and error behavior.
- Confirm OTLP endpoint and authorization header.

Affected pages:

- `usage/instrumentation-sdk/nodejs`.
- `usage/instrumentation-sdk/serverless`.
- `usage/instrumentation-sdk/sidecar`.
- `usage/instrumentation-sdk/cli`.
- `usage/observability/otlp`.

### 5. Missing examples and demos

Stytch pages pair tasks with example apps, demos, or references. Doow should
provide equivalent confidence-building assets.

Needed improvement:

- Add sample event payloads for SDK and OTLP.
- Add “copy and test” minimal examples.
- Add “what Doow receives” examples.
- Add event log examples.
- Add sample successful sync records.
- Add links to SDK/API references when they exist.

### 6. Page rhythm is still uneven

Provider pages now have the right sections, but some still feel like imported
content with appended endings.

Needed improvement:

- Normalize all provider pages into one consistent guide pattern.
- Move “disconnecting” below troubleshooting but above next steps.
- Add “Use this integration when” near the top.
- Add “Before you start” summaries before credential steps.
- Keep setup steps short and imperative.

## Proposed component/content patterns

### Decision cards

Use for front-door choices:

```txt
I want to understand usage
Connect usage data
Best first source when you need consumption visibility.
→ Choose a usage source
```

### Recommended path block

Use for unsure users:

```txt
Recommended first setup
1. Connect one usage source.
2. Connect one identity provider.
3. Add HRIS for department context.
4. Add accounting for verified spend.
```

### Proof-state block

Use after setup steps:

```txt
You are connected when...
- The integration shows Connected.
- Last sync has a recent timestamp.
- Imported records appear in the detail page.
- The event log has no credential or permission errors.
```

### Provider-specific troubleshooting block

Use on provider pages:

```txt
Symptom: Credential accepted, but no usage appears.
Likely cause: The key belongs to the wrong provider organization.
Next action: Create a read-only key in the organization that owns the usage.
```

### Next useful source block

Use at page endings:

```txt
Next useful source
Now that usage data is connected, connect identity so Doow can map usage to
people and app ownership.
```

## Implementation phases

### Phase 1 — Front-door quality

Goal: Make `/integrations` feel like a professional decision guide.

Tasks:

- Replace the main tables on `/integrations` with decision cards.
- Keep one compact comparison table for data layers.
- Add a clearer “recommended first setup” block.
- Add “What success looks like” to the front door.
- Browser-review desktop and mobile.

Acceptance criteria:

- A confused user can answer what to connect first in under 30 seconds.
- The page does not feel like a provider catalog.
- The sidebar and page tell the same story.

### Phase 2 — Choice guides

Goal: Make the orientation pages more decisive.

Tasks:

- Improve `what-doow-needs` with a clear data-layer mental model.
- Improve `choose-what-to-connect-first` with outcome cards.
- Improve `usage/choose-source` with a decision matrix and examples.
- Add explicit “not sure?” paths.

Acceptance criteria:

- Users can choose usage, identity, HRIS, or accounting without already knowing
  Doow's internal terminology.
- Usage data users can choose direct provider APIs, SDK, observability, or OTLP
  based on where their data lives.

### Phase 3 — Proof and verification

Goal: Show users how to confirm a connection worked.

Tasks:

- Add reusable proof-state sections to setup pages.
- Add text examples for connected state, sync status, records, and event log.
- Add screenshots only if the product UI is stable enough.
- Update `how-integrations-work` and `connect` to teach the proof pattern.

Acceptance criteria:

- Every setup path tells users exactly where to look after connecting.
- Users can distinguish “connected but still syncing” from “broken.”

### Phase 4 — Provider-specific troubleshooting

Goal: Move from generic troubleshooting to provider-aware recovery.

Tasks:

- Add provider-specific troubleshooting to the top-priority provider pages.
- Use symptom, likely cause, next action format.
- Add platform-specific permission/scope notes where known.
- Keep generic troubleshooting only as the fallback.

Acceptance criteria:

- Each priority provider page has at least three provider-specific recovery
  paths.
- Troubleshooting helps users resolve missing data, wrong account, and missing
  scope issues without contacting support first.

### Phase 5 — SDK and OTLP verification

Goal: Make technical instrumentation docs trustworthy.

Tasks:

- Review SDK and OTLP pages with backend and SDK owners.
- Correct package, API, endpoint, env var, wrapper, retry, and shutdown claims.
- Add minimal working examples.
- Add production checklist per runtime.
- Add test-event confirmation instructions.

Acceptance criteria:

- Technical owners sign off on all concrete SDK and OTLP claims.
- A user can send a test event and confirm it appears in Doow.

### Phase 6 — Final polish and QA

Goal: Bring the docs to launch-quality.

Tasks:

- Remove remaining weak phrasing and internal terms.
- Check headings for consistent guide rhythm.
- Check all pages for next steps.
- Run content checks, typecheck, lint, and build.
- Browser-review desktop and mobile.
- Search for stale terms, unsupported claims, and broken links.

Acceptance criteria:

- Content gate passes.
- Build passes.
- New users can navigate from `/integrations` to a provider setup guide without
  needing prior integration knowledge.
- Provider pages feel like complete setup guides, not appended reference notes.

## Priority order

1. Phase 1 — Front-door quality.
2. Phase 2 — Choice guides.
3. Phase 5 — SDK and OTLP verification.
4. Phase 3 — Proof and verification.
5. Phase 4 — Provider-specific troubleshooting.
6. Phase 6 — Final polish and QA.

SDK verification is pulled earlier because inaccurate technical docs create
more risk than visual or editorial polish.

## Open questions

- Which accounting providers are actually live today?
- What exact screens show successful sync status in the Doow app?
- What is the expected first-sync timing by integration type?
- Which event log errors are user-visible?
- Are SDK package names, wrappers, and environment variables final?
- Is OTLP push currently live, and what exact endpoint/header does it require?
- Should screenshots be added now or after product UI stabilizes?

## Do not implement from this file blindly

Use this plan to guide the next implementation pass. Before editing SDK and
OTLP pages, confirm technical details with backend and SDK owners.
