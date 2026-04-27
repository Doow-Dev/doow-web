import type { Metadata } from "next";

import Link from "next/link";

import { ContentPanel, PageHeading } from "@/app/_components/utility-page-shell";
import { SitePageSectionShell } from "@/app/(site-pages)/_components/site-page-section-shell";
import { Button } from "@/components/system";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.doow.co";

export const metadata: Metadata = {
  title: "Doow AI",
  description: "Learn how Doow AI helps finance teams explore spend, licenses, and renewals in plain language.",
  openGraph: {
    title: "Doow AI | Doow",
    description: "Learn how Doow AI helps finance teams explore spend, licenses, and renewals in plain language.",
    url: `${siteUrl}/doow-ai`,
    type: "website",
  },
};

export default function DoowAiPage() {
  return (
    <main data-layout-shell="sitePageMain">
      <section aria-label="Doow AI">
        <SitePageSectionShell className="py-16 sm:py-20" section="doow-ai">
          <PageHeading
            eyebrow="Doow AI"
            title="Derek & Mina"
            description="A dedicated Doow AI product page is on the way. This route now exists so the landing page and FAQ CTAs resolve to a stable destination during the rebuild."
          />

          <ContentPanel className="mt-10 max-w-3xl">
            <div className="space-y-6">
              <p className="text-body">
                Doow AI is the conversational layer for modern finance teams. It turns spend, license, and renewal
                data into plain-language answers so teams can move from questions to action faster.
              </p>
              <p className="text-body">
                We&apos;re keeping this route live while the full experience is implemented. In the meantime, you can
                continue exploring the landing page or start with the existing Doow sign-in flow.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild size="md">
                  <Link href="/signin">Start with Doow</Link>
                </Button>
                <Button asChild size="md" variant="secondary">
                  <Link href="/">Back to home</Link>
                </Button>
              </div>
            </div>
          </ContentPanel>
        </SitePageSectionShell>
      </section>
    </main>
  );
}
