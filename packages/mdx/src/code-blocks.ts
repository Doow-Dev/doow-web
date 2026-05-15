import { visit } from "unist-util-visit";

import type { MdxRoot } from "./parse";

export interface MdxCodeBlock {
  lang?: string;
  meta?: string;
  value: string;
}

type MarkdownCodeNode = {
  lang?: string;
  meta?: string;
  type: string;
  value?: string;
};

export function extractCodeBlocks(tree: MdxRoot) {
  const blocks: MdxCodeBlock[] = [];

  visit(tree, "code", (node) => {
    const code = node as MarkdownCodeNode;

    blocks.push({
      lang: code.lang,
      meta: code.meta,
      value: code.value ?? "",
    });
  });

  return blocks;
}
