import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import { docsMdxComponents } from "@/components/docs/mdx-components";
import { DocsArticleLayout } from "@/components/docs/docs-article-layout";
import { getAllDocsPages, getDocsPageBySlug } from "@/lib/docs/content";
import { docsMdxOptions } from "@/lib/docs/mdx-config";

interface DocsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return (await getAllDocsPages()).map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: DocsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getDocsPageBySlug(slug);

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
  const page = await getDocsPageBySlug(slug);

  if (!page) {
    notFound();
  }

  return (
    <DocsArticleLayout page={page}>
      <MDXRemote components={docsMdxComponents} options={docsMdxOptions} source={page.body} />
    </DocsArticleLayout>
  );
}
