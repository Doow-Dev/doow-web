# Stytch docs patterns for Doow

Research date: May 14, 2026.

This note captures the specific Stytch documentation patterns we inspected so
Doow can borrow useful structure without copying brand surface or guessing from
memory.

## Pages reviewed

These pages were reviewed during the Stytch pass:

- `https://stytch.com/docs/consumer-auth/overview`
- `https://stytch.com/docs/consumer-auth/build-auth/login-or-signup`
- `https://stytch.com/docs/consumer-auth/build-auth/overview`
- `https://stytch.com/docs/consumer-auth/authentication/passwords/sdk`
- `https://stytch.com/docs/llms.txt`
- `https://stytch.com/docs/api-reference/consumer/users/create`

The `llms.txt` and API reference URLs redirected into a Stytch login/OAuth
flow in this browser session. Treat that as an access observation, not as
evidence about the API reference content itself.

## What Stytch is doing

Stytch uses docs hubs as routing surfaces. The consumer-auth overview does not
try to teach the whole authentication system in one article. It explains the
surface area, then routes readers into build paths, examples, API and SDK
reference, fraud and risk, and AI-agent authentication.

The result is a professional first impression because a reader can arrive
without knowing the vocabulary and still see a clear way forward. The hub page
answers, "What kind of thing are you trying to build?" before it asks the
reader to choose an API, SDK, or auth method.

## Page jobs

| Page | Reader job | Pattern observed |
| --- | --- | --- |
| Consumer authentication overview | Decide where to start in consumer auth | Hub page with cards for build paths, examples, API and SDK reference, and related product areas |
| Stytch UI overview | Understand the prebuilt UI path before implementation | Small explanation page that routes to setup, customization, configuration reference, and example apps |
| Add login or signup | Build the first login or signup flow | Framework selector, prerequisites, install, provider/context setup, UI component, then session/user handling |
| Add passwords to Stytch Login | Add one auth method to an existing login surface | Dashboard configuration first, then SDK setup, then sign-up/login, reset flow, and support paths |
| API reference URL | Reach exact endpoint facts | Gated in this browser session, so no endpoint-content claims are recorded |

## How Stytch connects to customers

Stytch bridges the gap between product concept and implementation by starting
with the customer outcome. Pages use verbs like build, add, customize, and see
examples. That keeps the reader anchored in the task instead of the internal
product taxonomy.

Stytch also separates decisions from exact implementation. The overview helps
the reader choose. The build-auth pages help them complete one task. Reference
links sit nearby for the moment when the reader needs exact configuration or API
details.

The strongest customer-facing move is that setup pages name the dashboard
requirements before code. The reader is told to find tokens, enable frontend
SDKs, add authorized domains, and configure redirect URLs before installing
packages or writing components.

## Strong patterns to borrow

1. Use hub pages as routing surfaces, not long articles.
2. Start broad docs sections with cards for the reader's job: build, compare,
   customize, view examples, and open reference.
3. Put dashboard prerequisites before code when setup depends on product state.
4. Use framework selectors only where the instructions genuinely differ.
5. Keep small setup pages focused on one task, such as adding passwords.
6. Place example apps, demos, SDK reference, and configuration reference beside
   quickstarts instead of hiding them at the bottom.
7. Explain where the integration runs. Stytch says its SDK and UI are hosted by
   the customer's application; Doow should be equally explicit about whether a
   source runs in the browser, on the desktop, in a provider account, or through
   an SDK.
8. Keep support and recovery paths visible on setup pages.
9. Publish AI-readable documentation indexes as plain, public surfaces if Doow
   wants agents to consume them reliably.

## What not to copy

Doow should not copy Stytch's full authentication taxonomy. Their domain needs
many auth methods, tenant models, and risk products. Doow needs a lighter
integration structure that helps readers choose the right source without
feeling they are studying a platform map.

Doow should also avoid exposing an AI docs index or reference URL that appears
public but falls into an authentication redirect. If a page is gated, say that
clearly. If a page is for agents, make it plain text and reachable.

## Doow decisions from this pass

`/integrations` should behave like a hub. It should route by reader job and
source type: usage data, identity, HRIS, finance systems, browser activity,
desktop activity, SDK instrumentation, and provider APIs.

The Doow Agent area should not create separate docs for every operating system.
Browser and desktop agents are one product family with platform-specific
installation notes. The guide should explain the product once, then branch only
where setup differs by browser or desktop platform.

Provider setup pages should include a "Before you start" section with the exact
account, permission, token, workspace, or admin-access requirements. That
section belongs before commands, code, or step-by-step setup.

SDK pages should expose language or framework choices near the top, then keep
the body focused on the chosen path: install, configure, send the first event,
verify the event in Doow, and recover from common failures.

Every integration guide should link sideways to examples and reference without
turning the guide into a reference dump.

## Open questions for Doow

- Which Doow integration surfaces require admin access before setup can start?
- Which sources can a regular employee connect without an admin?
- Which Doow Agent details are product truth today across browser and desktop,
  and which need backend or agent-team verification?
- Do we want `llms.txt` and raw MDX exports to be public for docs.doow.co?

## Next comparison target

Review Mercury next if we want to understand API access, sandbox, token, and
finance-platform onboarding. Review Brex next if we want another finance-docs
view of admin permissions, quickstarts, and integration setup.
