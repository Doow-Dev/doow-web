import type { NextConfig } from "next";
import path from "node:path";

import { docsRedirects } from "./src/lib/docs/redirects";

const docsSiteUrl = process.env.NEXT_PUBLIC_DOCS_SITE_URL ?? "https://docs.doow.co";

const nextConfig: NextConfig = {
  transpilePackages: ["@doow/content-schemas", "@doow/mdx"],
  turbopack: {
    root: path.join(process.cwd(), "../.."),
  },
  env: {
    NEXT_PUBLIC_DOCS_SITE_URL: docsSiteUrl,
  },
  async redirects() {
    return docsRedirects.map((redirect) => ({
      source: redirect.from,
      destination: redirect.to,
      permanent: true,
    }));
  },
};

export default nextConfig;
