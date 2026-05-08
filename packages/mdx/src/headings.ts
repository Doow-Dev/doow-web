import GithubSlugger from "github-slugger";
import { toString } from "mdast-util-to-string";
import { visit } from "unist-util-visit";

import type { MdxRoot } from "./parse";

export interface MdxHeading {
  depth: number;
  id: string;
  text: string;
}

type MarkdownHeadingNode = {
  depth?: number;
  type: string;
};

type MarkdownParagraphNode = {
  type: string;
};

export function extractHeadings(tree: MdxRoot, options: { depths?: readonly number[] } = {}) {
  const depths = new Set(options.depths ?? [2, 3]);
  const slugger = new GithubSlugger();
  const headings: MdxHeading[] = [];

  visit(tree, "heading", (node) => {
    const heading = node as MarkdownHeadingNode;

    if (!heading.depth || !depths.has(heading.depth)) {
      return;
    }

    const text = toString(node).trim();

    if (!text) {
      return;
    }

    headings.push({
      depth: heading.depth,
      id: slugger.slug(text),
      text,
    });
  });

  return headings;
}

export function extractFirstParagraphText(tree: MdxRoot) {
  let excerpt = "";

  visit(tree, "paragraph", (node) => {
    if (excerpt) {
      return;
    }

    const paragraph = node as MarkdownParagraphNode;
    const value = toString(paragraph).trim().replace(/\s+/g, " ");

    if (value) {
      excerpt = value;
    }
  });

  return excerpt;
}
