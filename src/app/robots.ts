import type { MetadataRoute } from "next";

import { BLOG_LIVE } from "@/lib/blog/config";
import { absoluteSiteUrl, siteUrl } from "@/lib/seo/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        allow: BLOG_LIVE ? "/" : ["/", "/api/og/blog"],
        disallow: BLOG_LIVE ? ["/api/site/"] : ["/api/site/", "/blog", "/blog/"],
        userAgent: "*",
      },
    ],
    sitemap: absoluteSiteUrl("/sitemap.xml"),
    host: siteUrl,
  };
}
