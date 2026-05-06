const baseUrl = process.env.LIGHTHOUSE_BASE_URL ?? "http://localhost:3000";
const blogLive = process.env.BLOG_LIVE === "true";

const publicRoutes = [
  "/",
  "/applications",
  "/subscriptions",
  "/alternative-apps",
  "/alternative-apps/a4571cad-ae9b-4a72-a9a2-eba8597600b2",
  "/expenses",
  "/integrations",
  "/pricing",
  "/doow-ai",
  "/about_us",
  "/privacy_policy",
  "/terms_of_use",
];

const liveBlogRoutes = [
  "/blog",
  "/blog/running-out-of-runway",
  "/blog?category=engineering",
  "/blog/tag/runway",
  "/blog/tag/runway/page/1",
];

function toAbsoluteUrl(route) {
  return `${baseUrl}${route}`;
}

function getLighthouseUrls() {
  return [...publicRoutes, ...(blogLive ? liveBlogRoutes : [])].map(toAbsoluteUrl);
}

module.exports = {
  getLighthouseUrls,
};
