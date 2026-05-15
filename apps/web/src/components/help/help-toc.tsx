"use client";

import { useEffect, useState } from "react";

import type { HelpTocItem } from "@/lib/help/types";

export function HelpToc({ items }: { items: HelpTocItem[] }) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);

  useEffect(() => {
    if (items.length === 0) return;

    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-25% 0px -65% 0px", threshold: [0, 1] },
    );

    for (const heading of headings) observer.observe(heading);
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav>
      {items.map((item) => (
        <a
          aria-current={activeId === item.id ? "true" : undefined}
          data-active={activeId === item.id ? "true" : undefined}
          data-depth={item.depth}
          href={`#${item.id}`}
          key={item.id}
        >
          {item.text}
        </a>
      ))}
    </nav>
  );
}
