import { isExternalUrl, isInternalPath } from "@doow/content-schemas";
import { visit } from "unist-util-visit";

import type { MdxValidationError } from "./errors";
import type { MdxRoot } from "./parse";

type MarkdownLinkNode = {
  type: string;
  url?: string;
};

export interface MarkdownLink {
  url: string;
}

export function collectMarkdownLinks(tree: MdxRoot) {
  const links: MarkdownLink[] = [];

  visit(tree, "link", (node) => {
    const link = node as MarkdownLinkNode;

    if (link.url) {
      links.push({
        url: link.url,
      });
    }
  });

  return links;
}

export function validateMarkdownLinks(tree: MdxRoot) {
  const errors: MdxValidationError[] = [];

  visit(tree, "link", (node) => {
    const link = node as MarkdownLinkNode;

    if (!link.url) {
      errors.push({
        field: "link",
        message: "links must include a URL",
      });

      return;
    }

    if (!isExternalUrl(link.url) && !isInternalPath(link.url) && !link.url.startsWith("#")) {
      errors.push({
        field: "link",
        message: `unsupported link URL "${link.url}"`,
      });
    }
  });

  return errors;
}
