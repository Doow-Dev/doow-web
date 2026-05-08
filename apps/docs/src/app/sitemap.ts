import type { MetadataRoute } from "next";

import { getAllDocsPages } from "@/lib/docs/content";

const docsSiteUrl = process.env.NEXT_PUBLIC_DOCS_SITE_URL ?? "https://docs.doow.co";

function docsUrl(path: string) {
  return new URL(path, docsSiteUrl).toString();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await getAllDocsPages();

  return [
    {
      changeFrequency: "weekly",
      lastModified: new Date(),
      priority: 1,
      url: docsUrl("/"),
    },
    ...pages.map((page) => ({
      changeFrequency: "monthly" as const,
      lastModified: page.updatedAt ? new Date(page.updatedAt) : new Date(),
      priority: page.slug === "getting-started" ? 0.9 : 0.7,
      url: docsUrl(page.canonicalPath),
    })),
  ];
}
