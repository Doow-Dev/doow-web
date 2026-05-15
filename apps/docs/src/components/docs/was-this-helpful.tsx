"use client";

import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useState } from "react";

type Vote = "up" | "down" | null;

export function WasThisHelpful({ slug }: { slug: string }) {
  const [vote, setVote] = useState<Vote>(null);

  function cast(next: Vote) {
    setVote((prev) => (prev === next ? null : next));
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("docs:helpful", { detail: { slug, vote: next } }),
      );
    }
  }

  return (
    <div className="docs-helpful" aria-label="Was this page helpful?">
      <span>Was this page helpful?</span>
      <div className="docs-helpful__actions">
        <button
          aria-pressed={vote === "up"}
          className="docs-helpful__btn"
          data-active={vote === "up"}
          onClick={() => cast("up")}
          type="button"
        >
          <ThumbsUp aria-hidden="true" size={14} />
          <span>Yes</span>
        </button>
        <button
          aria-pressed={vote === "down"}
          className="docs-helpful__btn"
          data-active={vote === "down"}
          onClick={() => cast("down")}
          type="button"
        >
          <ThumbsDown aria-hidden="true" size={14} />
          <span>No</span>
        </button>
      </div>
      {vote ? (
        <p className="docs-helpful__ack">Thanks for the signal — noted.</p>
      ) : null}
    </div>
  );
}
