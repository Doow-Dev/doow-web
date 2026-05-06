import type { Metadata } from "next";

import type { FaqSectionContent } from "@/components/layout/faq";

const DEFAULT_SITE_URL = "https://www.doow.co";

export const SITE_NAME = "Doow";
export const SITE_DEFAULT_DESCRIPTION =
  "Doow helps finance teams see SaaS spend, renewals, licenses, and app usage clearly before money slips away.";

function trimTrailingSlash(value: string) {
  return value.replace(/\/+$/, "");
}

export const siteUrl = trimTrailingSlash(process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL);

export function absoluteSiteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${siteUrl}${normalizedPath}`;
}

export function getSiteOgImageUrl(title = SITE_NAME, category = "SaaS Spend Visibility") {
  const params = new URLSearchParams({
    category,
    title,
  });

  return absoluteSiteUrl(`/api/og/blog?${params.toString()}`);
}

export interface SiteRouteSeo {
  title: string;
  description: string;
  path: string;
  ogCategory?: string;
}

export const siteRouteSeo = {
  home: {
    title: "SaaS Spend Visibility",
    description:
      "Doow helps finance teams see exactly where the money's going before it's gone - every subscription, renewal, and license in one place.",
    path: "/",
    ogCategory: "SaaS Spend Visibility",
  },
  applications: {
    title: "Applications",
    description:
      "See every app your company is paying for. Discover tools your teams use, how often they're used, and where money might be slipping away.",
    path: "/applications",
    ogCategory: "Applications",
  },
  alternativeApps: {
    title: "Alternative Apps",
    description: "Explore alternatives to your current stack and find the right tool for your team.",
    path: "/alternative-apps",
    ogCategory: "Alternative Apps",
  },
  subscriptions: {
    title: "Subscriptions",
    description: "Keep contracts, licenses, and renewals in one place with clearer subscription visibility and governance.",
    path: "/subscriptions",
    ogCategory: "Subscriptions",
  },
  expenses: {
    title: "Expenses",
    description: "See where your software money actually goes across cards, banks, and accounting systems in one place.",
    path: "/expenses",
    ogCategory: "Expenses",
  },
  integrations: {
    title: "Integrations",
    description: "Bring identity, finance, and HR data together so everything stays up to date.",
    path: "/integrations",
    ogCategory: "Integrations",
  },
  pricing: {
    title: "Pricing",
    description: "Choose the Doow plan that fits your team and start finding SaaS savings faster.",
    path: "/pricing",
    ogCategory: "Pricing",
  },
  doowAi: {
    title: "Doow AI",
    description: "Learn how Doow AI helps finance teams explore spend, licenses, and renewals in plain language.",
    path: "/doow-ai",
    ogCategory: "Doow AI",
  },
  aboutUs: {
    title: "About Us",
    description: "Learn why Doow was built, what we believe about software spend, and the team experience behind the product.",
    path: "/about_us",
    ogCategory: "About Doow",
  },
  privacyPolicy: {
    title: "Privacy Policy",
    description: "Learn how Doow collects, uses, and protects information when you visit the Doow website.",
    path: "/privacy_policy",
    ogCategory: "Legal",
  },
  termsOfUse: {
    title: "Terms of Use",
    description: "Review the terms that govern access to and use of the Doow website.",
    path: "/terms_of_use",
    ogCategory: "Legal",
  },
} as const satisfies Record<string, SiteRouteSeo>;

export function buildSiteMetadata(route: SiteRouteSeo): Metadata {
  const url = absoluteSiteUrl(route.path);
  const title = route.title;
  const description = route.description;
  const image = getSiteOgImageUrl(title, route.ogCategory);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [
        {
          alt: `${title} | ${SITE_NAME}`,
          height: 630,
          url: image,
          width: 1200,
        },
      ],
      siteName: SITE_NAME,
      type: "website",
      url,
    },
    twitter: {
      card: "summary_large_image",
      description,
      images: [image],
      title: `${title} | ${SITE_NAME}`,
    },
  };
}

export function safeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: siteUrl,
  };
}

export function buildWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    description: SITE_DEFAULT_DESCRIPTION,
    name: SITE_NAME,
    url: siteUrl,
  };
}

export function buildWebPageJsonLd(route: SiteRouteSeo) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    description: route.description,
    name: `${route.title} | ${SITE_NAME}`,
    url: absoluteSiteUrl(route.path),
  };
}

export function buildBreadcrumbJsonLd(items: { href: string; label: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      item: absoluteSiteUrl(item.href),
      name: item.label,
      position: index + 1,
    })),
  };
}

function faqPairs(content: FaqSectionContent) {
  return content.categories.flatMap((category) => {
    const pairs = [];

    for (let index = 0; index < category.messages.length - 1; index += 1) {
      const question = category.messages[index];
      const answer = category.messages[index + 1];

      if (question?.speaker === "user" && answer?.speaker === "assistant") {
        pairs.push({
          question: question.text,
          answer: answer.text,
        });
      }
    }

    return pairs;
  });
}

export function buildFaqJsonLd(content: FaqSectionContent) {
  const pairs = faqPairs(content);

  if (pairs.length === 0) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: pairs.map((pair) => ({
      "@type": "Question",
      acceptedAnswer: {
        "@type": "Answer",
        text: pair.answer,
      },
      name: pair.question,
    })),
  };
}

export function JsonLd({ data }: { data: unknown }) {
  return <script dangerouslySetInnerHTML={{ __html: safeJsonLd(data) }} type="application/ld+json" />;
}
