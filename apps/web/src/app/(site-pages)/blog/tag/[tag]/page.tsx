import { permanentRedirect } from "next/navigation";

type BlogTagPageProps = {
  params: Promise<{
    tag: string;
  }>;
};

export default async function BlogTagRedirect({ params }: BlogTagPageProps) {
  const { tag } = await params;

  permanentRedirect(`/blog?tag=${encodeURIComponent(tag)}`);
}
