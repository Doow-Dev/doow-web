import Link from "next/link";
import { ArrowRight, BookOpen, Compass, FileText, Rocket, Sparkles, Terminal, Wrench, Zap } from "lucide-react";

import { DocsShell } from "@/components/docs/docs-shell";

const journey = [
  {
    label: "Set up",
    icon: Compass,
    items: [
      { label: "Quickstart", href: "/quickstart" },
      { label: "Workspace setup", href: "/workspace-setup" },
      { label: "Connect data", href: "/connect-data" },
      { label: "Invite teammates", href: "/invite-teammates" },
    ],
  },
  {
    label: "Build",
    icon: Wrench,
    items: [
      { label: "Spend reviews", href: "/spend-reviews" },
      { label: "Vendor renewals", href: "/vendor-renewals" },
      { label: "Software ownership", href: "/software-ownership" },
      { label: "Approvals", href: "/approvals" },
    ],
  },
  {
    label: "Ship",
    icon: Rocket,
    items: [
      { label: "Reporting", href: "/reporting" },
      { label: "Webhooks", href: "/webhooks" },
      { label: "Permissions", href: "/permissions" },
      { label: "Conventions", href: "/conventions" },
    ],
  },
  {
    label: "Operate",
    icon: Zap,
    items: [
      { label: "Product surfaces", href: "/product-surfaces" },
      { label: "Fields", href: "/fields" },
      { label: "Latest changelog", href: "/changelog" },
      { label: "RSS feed", href: "/changelog-rss" },
    ],
  },
];

const sdks = [
  { label: "Node SDK", description: "TypeScript-first, fully typed.", href: "/quickstart" },
  { label: "Python SDK", description: "First-class async support.", href: "/quickstart" },
  { label: "cURL", description: "Hit the REST API from anywhere.", href: "/quickstart" },
  { label: "CLI", description: "Scripted automation in the terminal.", href: "/quickstart" },
];

const utility = [
  { label: "Cookbook", description: "Copy-paste recipes for common workflows.", href: "/guides", icon: BookOpen },
  { label: "Quickstarts", description: "Skim the fastest path for each surface.", href: "/quickstart", icon: Sparkles },
  { label: "Changelog", description: "What shipped this week.", href: "/changelog", icon: FileText },
  { label: "What's new", description: "Recent product changes worth a read.", href: "/changelog", icon: Zap },
];

export default function DocsIndexPage() {
  return (
    <DocsShell>
      <main className="docs-home" id="content">
        <section className="docs-home__hero">
          <div>
            <p className="docs-kicker">Doow Docs</p>
            <h1>Start building with Doow.</h1>
            <p>
              Connect your spend, classify it once, and review what matters.
              The docs cover setup, the workflows your finance team runs every
              month, and the API surface for everything you want to script.
            </p>
            <div className="docs-home__actions">
              <Link className="docs-primary-link" href="/quickstart">
                Quickstart <ArrowRight aria-hidden="true" size={16} />
              </Link>
              <Link className="docs-secondary-link" href="/reference">
                API reference
              </Link>
            </div>
          </div>
          <aside className="docs-hero-code" aria-label="Sample request">
            <div className="docs-hero-code__bar">
              <span className="docs-hero-code__dots" aria-hidden="true">
                <i /><i /><i />
              </span>
              <span className="docs-hero-code__lang">bash</span>
            </div>
            <pre className="docs-hero-code__body">
              <code>
                <span className="hl-c"># Run your first spend review</span>{"\n"}
                <span className="hl-k">curl</span> https://api.doow.co/v1/reviews \{"\n"}
                {"  "}-H <span className="hl-s">{`"Authorization: Bearer $DOOW_API_KEY"`}</span> \{"\n"}
                {"  "}-H <span className="hl-s">{`"Content-Type: application/json"`}</span> \{"\n"}
                {"  "}-d <span className="hl-s">{`'{ "period": "2026-05", "scope": "all" }'`}</span>
              </code>
            </pre>
          </aside>
        </section>

        <section className="docs-home__section" aria-labelledby="docs-home-journey">
          <div className="docs-section-heading">
            <h2 id="docs-home-journey">From idea to production</h2>
            <p>Pick the stage you&rsquo;re at and jump to the exact thing you need.</p>
          </div>
          <div className="docs-journey">
            {journey.map((stage) => {
              const Icon = stage.icon;
              return (
                <section className="docs-journey__col" key={stage.label}>
                  <header>
                    <Icon aria-hidden="true" size={16} />
                    <h3>{stage.label}</h3>
                  </header>
                  <ul>
                    {stage.items.map((item) => (
                      <li key={item.href}>
                        <Link href={item.href}>{item.label}</Link>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>
        </section>

        <section className="docs-home__section" aria-labelledby="docs-home-sdks">
          <div className="docs-section-heading">
            <h2 id="docs-home-sdks">Build with the SDKs</h2>
            <p>Same surface, four ways to call it.</p>
          </div>
          <div className="docs-sdk-grid">
            {sdks.map((sdk) => (
              <Link className="docs-sdk-tile" href={sdk.href} key={sdk.label}>
                <Terminal aria-hidden="true" size={18} />
                <strong>{sdk.label}</strong>
                <p>{sdk.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="docs-home__section" aria-labelledby="docs-home-utility">
          <div className="docs-section-heading">
            <h2 id="docs-home-utility">Cookbook &middot; Quickstarts &middot; What&rsquo;s new</h2>
            <p>Bookmark these &mdash; you&rsquo;ll come back to them.</p>
          </div>
          <div className="docs-utility-grid">
            {utility.map((item) => {
              const Icon = item.icon;
              return (
                <Link className="docs-utility-tile" href={item.href} key={item.label}>
                  <Icon aria-hidden="true" size={18} />
                  <div>
                    <strong>{item.label}</strong>
                    <p>{item.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
    </DocsShell>
  );
}
