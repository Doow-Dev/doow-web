import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const sitemapSource = readFileSync("src/app/sitemap.ts", "utf8");
const blogConfigSource = readFileSync("src/lib/blog/config.ts", "utf8");
const blogSeoSource = readFileSync("src/lib/blog/seo.ts", "utf8");

assert.match(
  blogConfigSource,
  /export const BLOG_LIVE = process\.env\.BLOG_LIVE === "true"/,
  "BLOG_LIVE should stay an explicit production launch flag.",
);

assert.match(
  blogSeoSource,
  /BLOG_LIVE \? \{ follow: true, index: true \} : \{ follow: false, index: false \}/,
  "Blog metadata should switch robots policy from BLOG_LIVE.",
);

assert.match(
  sitemapSource,
  /if \(!BLOG_LIVE\) \{\s*return staticEntries;\s*\}/s,
  "Sitemap should exclude blog entries when BLOG_LIVE is false.",
);

assert.match(
  sitemapSource,
  /const blogIndexEntry = \{/,
  "Sitemap should include the blog index only after BLOG_LIVE is true.",
);

console.log("PASS blog live sitemap and robots policy");
