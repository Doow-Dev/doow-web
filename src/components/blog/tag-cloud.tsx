import Link from "next/link";

import { formatTagLabel } from "@/lib/blog/taxonomy";

type TagCloudProps = {
  tags: {
    count: number;
    tag: string;
  }[];
};

export function TagCloud({ tags }: TagCloudProps) {
  if (tags.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Blog tags" className="blog-tag-cloud">
      {tags.map(({ count, tag }) => (
        <Link href={`/blog/tag/${tag}`} key={tag}>
          <span>{formatTagLabel(tag)}</span>
          <span aria-label={`${count} articles`}>{count}</span>
        </Link>
      ))}
    </nav>
  );
}
