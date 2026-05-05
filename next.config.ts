import type { NextConfig } from "next";

import { BLOG_REDIRECTS } from "./src/lib/blog/redirects";

const DEFAULT_BLOB_BASE_URL = "https://landingpageassests.blob.core.windows.net/images";

function getBlobRemotePattern() {
  const blobBaseUrl = process.env.NEXT_PUBLIC_BLOB_BASE_URL || DEFAULT_BLOB_BASE_URL;

  try {
    const url = new URL(blobBaseUrl);
    const pathname = url.pathname.replace(/\/+$/, "");

    return {
      protocol: url.protocol.replace(":", "") as "http" | "https",
      hostname: url.hostname,
      port: url.port,
      pathname: `${pathname || ""}/**`,
    };
  } catch {
    return {
      protocol: "https" as const,
      hostname: "landingpageassests.blob.core.windows.net",
      port: "",
      pathname: "/images/**",
    };
  }
}

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400,
    qualities: [70, 75, 80, 85, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
      getBlobRemotePattern(),
    ],
  },
  async headers() {
    return [
      {
        source: "/_next/image(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=3600",
          },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, s-maxage=300, stale-while-revalidate=60",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      ...BLOG_REDIRECTS,
      {
        source: "/contact_us",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
