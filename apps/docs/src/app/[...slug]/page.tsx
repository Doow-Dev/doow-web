import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import { DocsArticleLayout } from "@/components/docs/docs-article-layout";
import { docsMdxComponents } from "@/components/docs/mdx-components";
import { getAllDocsPages, getDocsPageBySlug } from "@/lib/docs/content";
import { docsMdxOptions } from "@/lib/docs/mdx-config";
import { docsRouteSegmentsForSlug, docsSlugFromSegments } from "@/lib/docs/paths";

interface DocsPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateStaticParams() {
  return (await getAllDocsPages()).map((page) => ({ slug: docsRouteSegmentsForSlug(page.slug) }));
}

export async function generateMetadata({ params }: DocsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getDocsPageBySlug(docsSlugFromSegments(slug));

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: page.canonicalPath,
    },
    openGraph: {
      title: page.title,
      description: page.description,
      type: "article",
      url: page.canonicalPath,
    },
  };
}

export default async function DocsPage({ params }: DocsPageProps) {
  const { slug } = await params;
  const page = await getDocsPageBySlug(docsSlugFromSegments(slug));

  if (!page) {
    notFound();
  }

  return (
    <DocsArticleLayout page={page}>
      <MDXRemote components={docsMdxComponents} options={docsMdxOptions} source={page.body} />
    </DocsArticleLayout>
  );
}
