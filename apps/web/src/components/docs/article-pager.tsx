import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

type PagerEntry = { href: string; label: string };

export function ArticlePager({ prev, next }: { prev?: PagerEntry; next?: PagerEntry }) {
  if (!prev && !next) return null;

  return (
    <nav aria-label="Article pagination" className="docs-pager">
      {prev ? (
        <Link className="docs-pager__card" data-direction="prev" href={prev.href}>
          <span className="docs-pager__label">
            <ArrowLeft aria-hidden="true" size={14} />
            Previous
          </span>
          <strong>{prev.label}</strong>
        </Link>
      ) : (
        <span className="docs-pager__spacer" aria-hidden="true" />
      )}
      {next ? (
        <Link className="docs-pager__card" data-direction="next" href={next.href}>
          <span className="docs-pager__label">
            Next
            <ArrowRight aria-hidden="true" size={14} />
          </span>
          <strong>{next.label}</strong>
        </Link>
      ) : (
        <span className="docs-pager__spacer" aria-hidden="true" />
      )}
    </nav>
  );
}
