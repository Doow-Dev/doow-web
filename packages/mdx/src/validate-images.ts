import { visit } from "unist-util-visit";

import type { MdxValidationError } from "./errors";
import type { MdxRoot } from "./parse";

type MarkdownImageNode = {
  alt?: string | null;
  type: string;
  url?: string;
};

export interface ValidateMarkdownImagesOptions {
  invalidUrlMessage: string;
  requireAlt?: boolean;
  validateUrl: (url: string) => boolean;
}

export function validateMarkdownImages(tree: MdxRoot, options: ValidateMarkdownImagesOptions) {
  const errors: MdxValidationError[] = [];
  const requireAlt = options.requireAlt ?? true;

  visit(tree, "image", (node) => {
    const image = node as MarkdownImageNode;

    if (!image.url) {
      errors.push({
        field: "image",
        message: "inline images must include a URL",
      });
    }

    if (requireAlt && !image.alt?.trim()) {
      errors.push({
        field: "imageAlt",
        message: "inline images must include descriptive alt text",
      });
    }

    if (image.url && !options.validateUrl(image.url)) {
      errors.push({
        field: "image",
        message: options.invalidUrlMessage,
      });
    }
  });

  return errors;
}
