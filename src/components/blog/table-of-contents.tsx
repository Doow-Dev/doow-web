"use client";

import type { CSSProperties } from "react";

import { useEffect, useMemo, useState } from "react";

import type { BlogTocItem } from "@/lib/blog/types";

type TableOfContentsProps = {
  toc: BlogTocItem[];
};

function getHeadingIdFromHash(hash: string) {
  return decodeURIComponent(hash.replace(/^#/, ""));
}

export function TableOfContents({ toc }: TableOfContentsProps) {
  const items = useMemo(() => toc.filter((item) => item.id && item.text), [toc]);
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (items.length < 3) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const headings = items.map((item) => document.getElementById(item.id)).filter((heading): heading is HTMLElement => Boolean(heading));

    if (headings.length === 0) {
      return;
    }

    function updateActiveHeading() {
      const offset = window.innerHeight * 0.2;
      const currentHeading = [...headings].reverse().find((heading) => heading.getBoundingClientRect().top <= offset);

      setActiveId(currentHeading?.id ?? headings[0]?.id ?? "");
    }

    const observer = new IntersectionObserver(
      () => updateActiveHeading(),
      {
        rootMargin: "-15% 0px -75% 0px",
        threshold: [0, 1],
      },
    );

    headings.forEach((heading) => observer.observe(heading));
    updateActiveHeading();
    window.addEventListener("scroll", updateActiveHeading, { passive: true });
    window.addEventListener("resize", updateActiveHeading);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateActiveHeading);
      window.removeEventListener("resize", updateActiveHeading);
    };
  }, [items]);

  if (items.length < 3) {
    return null;
  }

  const activeIndex = Math.max(
    0,
    items.findIndex((item) => item.id === activeId),
  );
  const tocStyle = {
    "--blog-detail-toc-active-index": activeIndex,
    "--blog-detail-toc-count": items.length,
  } as CSSProperties;

  return (
    <section className="blog-detail-rail__section blog-detail-toc-shell" aria-labelledby="blog-detail-toc-heading" data-expanded={isExpanded}>
      <p className="blog-detail-toc__heading" id="blog-detail-toc-heading">
        Table of Content
      </p>
      <button
        aria-controls="blog-detail-toc-panel"
        aria-expanded={isExpanded}
        className="blog-detail-toc__toggle"
        onClick={() => setIsExpanded((current) => !current)}
        type="button"
      >
        <span>Table of Content</span>
        <span aria-hidden="true">{isExpanded ? "Close" : "Open"}</span>
      </button>
      <div className="blog-detail-toc__panel" id="blog-detail-toc-panel">
        <nav aria-label="Table of contents" className="blog-detail-toc" role="navigation" style={tocStyle}>
          <span className="blog-detail-toc__track" aria-hidden="true" />
          <span className="blog-detail-toc__progress" aria-hidden="true" />
          <div className="blog-detail-toc__items">
            {items.map((item) => (
              <a
                data-active={item.id === activeId}
                data-depth={item.depth}
                href={`#${item.id}`}
                key={item.id}
                onClick={() => {
                  setActiveId(getHeadingIdFromHash(`#${item.id}`));
                  setIsExpanded(false);
                }}
              >
                {item.text}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </section>
  );
}
