const DEFAULT_SITE_URL = "https://www.doow.co";

function trimTrailingSlash(value: string) {
  return value.replace(/\/+$/, "");
}

export const BLOG_CONFIG = {
  author: {
    email: "hello@doow.co",
    name: "Doow",
  },
  description: "Practical essays from Doow on SaaS visibility, finance operations, and software governance.",
  feed: {
    copyright: `Copyright ${new Date().getFullYear()} Doow`,
    id: "https://www.doow.co/blog",
    language: "en",
    path: "/blog/rss.xml",
    title: "Doow Blog",
  },
  siteName: "Doow",
  siteUrl: trimTrailingSlash(process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL),
  title: "Doow Blog",
} as const;

export const BLOG_LIVE = process.env.BLOG_LIVE === "true";

export function blogUrl(path = "/blog") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${BLOG_CONFIG.siteUrl}${normalizedPath}`;
}
