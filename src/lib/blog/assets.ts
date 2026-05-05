import { assetUrl } from "@/lib/assets/blob";

const BLOG_ASSET_EXTENSIONS = new Set([".avif", ".gif", ".jpg", ".jpeg", ".png", ".webp"]);

export function isBlogAssetPath(value: string) {
  const cleanValue = value.trim();

  if (!cleanValue || cleanValue.startsWith("/") || /^https?:\/\//.test(cleanValue) || cleanValue.includes("..")) {
    return false;
  }

  const extension = cleanValue.match(/\.[a-z0-9]+$/i)?.[0]?.toLowerCase();

  return Boolean(extension && BLOG_ASSET_EXTENSIONS.has(extension));
}

export function assertBlogAssetPath(value: string, filename: string, field: string) {
  if (!isBlogAssetPath(value)) {
    throw new Error(
      `[blog] ${filename}: ${field} - expected a CDN-relative blog image path such as blog/covers/sample.jpg`,
    );
  }
}

export function blogAssetUrl(path: string) {
  return assetUrl(path);
}

export function getAuthorAvatarUrl(path: string) {
  return blogAssetUrl(path);
}

export function getBlogCoverUrl(path: string) {
  return blogAssetUrl(path);
}

export function getBlogOgImageUrl({
  author,
  category,
  date,
  title,
}: {
  author?: string;
  category: string;
  date?: string;
  title: string;
}) {
  const params = new URLSearchParams({
    category,
    title,
  });

  if (author) {
    params.set("author", author);
  }

  if (date) {
    params.set("date", date);
  }

  return `/api/og/blog?${params.toString()}`;
}
