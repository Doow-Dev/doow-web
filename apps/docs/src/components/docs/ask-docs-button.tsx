"use client";

import { Sparkles } from "lucide-react";

import { dispatchDocsSearchOpen } from "./docs-search";

export function AskDocsButton() {
  return (
    <button
      className="docs-ask-button"
      onClick={() => dispatchDocsSearchOpen("ask")}
      title="Ask Doow Docs"
      type="button"
    >
      <Sparkles aria-hidden="true" size={14} />
      <span>Ask Docs</span>
    </button>
  );
}
