"use client";

import { Check, ChevronDown, Copy, ExternalLink } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const docsSiteUrl =
  typeof process !== "undefined" && process.env.NEXT_PUBLIC_DOCS_SITE_URL
    ? process.env.NEXT_PUBLIC_DOCS_SITE_URL
    : "https://docs.doow.co";

function buildPrompt(rawUrl: string, title: string) {
  return `Read this Doow docs page and answer my questions about it.\n\nTitle: ${title}\nSource: ${rawUrl}`;
}

export function PageActions({ slug, title }: { slug: string; title: string }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const rawPath = `/raw/${slug}`;
  const rawUrl = `${docsSiteUrl}${rawPath}`;

  useEffect(() => {
    if (!open) return;
    function onClick(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  async function copyPage() {
    try {
      const response = await fetch(rawPath);
      if (!response.ok) return;
      const text = await response.text();
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {}
  }

  const prompt = buildPrompt(rawUrl, title);
  const chatGPTHref = `https://chat.openai.com/?q=${encodeURIComponent(prompt)}`;
  const claudeHref = `https://claude.ai/new?q=${encodeURIComponent(prompt)}`;

  return (
    <div className="docs-page-actions" ref={rootRef}>
      <button
        aria-expanded={open}
        aria-haspopup="menu"
        className="docs-page-actions__trigger"
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        {copied ? <Check aria-hidden="true" size={14} /> : <Copy aria-hidden="true" size={14} />}
        <span>{copied ? "Copied" : "Copy page"}</span>
        <ChevronDown aria-hidden="true" size={14} />
      </button>
      {open ? (
        <div className="docs-page-actions__menu" role="menu">
          <button
            className="docs-page-actions__item"
            onClick={() => {
              copyPage();
              setOpen(false);
            }}
            role="menuitem"
            type="button"
          >
            <Copy aria-hidden="true" size={14} />
            <span>Copy as Markdown</span>
          </button>
          <a
            className="docs-page-actions__item"
            href={chatGPTHref}
            rel="noopener noreferrer"
            role="menuitem"
            target="_blank"
          >
            <ExternalLink aria-hidden="true" size={14} />
            <span>Open in ChatGPT</span>
          </a>
          <a
            className="docs-page-actions__item"
            href={claudeHref}
            rel="noopener noreferrer"
            role="menuitem"
            target="_blank"
          >
            <ExternalLink aria-hidden="true" size={14} />
            <span>Open in Claude</span>
          </a>
          <a
            className="docs-page-actions__item"
            href={rawPath}
            rel="noopener noreferrer"
            role="menuitem"
            target="_blank"
          >
            <ExternalLink aria-hidden="true" size={14} />
            <span>View raw</span>
          </a>
        </div>
      ) : null}
    </div>
  );
}
