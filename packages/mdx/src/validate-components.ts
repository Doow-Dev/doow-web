import { visit } from "unist-util-visit";

import type { MdxValidationError } from "./errors";
import type { MdxRoot } from "./parse";

type MdxAttribute = {
  name?: string;
  type?: string;
  value?: unknown;
};

type MdxElementNode = {
  attributes?: MdxAttribute[];
  name?: string | null;
  type: string;
};

const DEFAULT_UNSAFE_HTML_ELEMENTS = new Set([
  "embed",
  "form",
  "iframe",
  "link",
  "meta",
  "object",
  "script",
  "style",
]);

export interface ValidateMdxComponentsOptions {
  allowedHtmlElements: ReadonlySet<string>;
  allowedMdxComponents: ReadonlySet<string>;
  allowHeadingElements?: boolean;
  unsafeHtmlElements?: ReadonlySet<string>;
}

function getAttributeValue(node: MdxElementNode, name: string) {
  const attribute = node.attributes?.find((item) => item.type === "mdxJsxAttribute" && item.name === name);

  return typeof attribute?.value === "string" ? attribute.value : undefined;
}

export function validateMdxComponents(tree: MdxRoot, options: ValidateMdxComponentsOptions) {
  const errors: MdxValidationError[] = [];
  const explicitHeadingIds = new Set<string>();
  const unsafeHtmlElements = options.unsafeHtmlElements ?? DEFAULT_UNSAFE_HTML_ELEMENTS;

  visit(
    tree,
    (node) => {
      const element = node as MdxElementNode;

      return element.type === "mdxJsxFlowElement" || element.type === "mdxJsxTextElement";
    },
    (node) => {
      const element = node as MdxElementNode;
      const name = element.name;

      if (!name) {
        return;
      }

      for (const attribute of element.attributes ?? []) {
        if (attribute.type === "mdxJsxAttribute" && attribute.name && /^on[A-Z]/.test(attribute.name)) {
          errors.push({
            field: attribute.name,
            message: "inline event handlers are not supported in MDX",
          });
        }
      }

      if (/^[A-Z]/.test(name)) {
        if (!options.allowedMdxComponents.has(name)) {
          errors.push({
            field: name,
            message: "unsupported MDX component",
          });
        }

        return;
      }

      if (unsafeHtmlElements.has(name)) {
        errors.push({
          field: name,
          message: "unsafe HTML tag is not supported in MDX",
        });

        return;
      }

      if (!options.allowedHtmlElements.has(name) && !(options.allowHeadingElements && /^h[2-6]$/.test(name))) {
        errors.push({
          field: name,
          message: "unsupported HTML tag in MDX",
        });
      }

      if (options.allowHeadingElements && /^h[2-6]$/.test(name)) {
        const id = getAttributeValue(element, "id");

        if (id) {
          if (explicitHeadingIds.has(id)) {
            errors.push({
              field: "id",
              message: `duplicate explicit heading id "${id}"`,
            });
          }

          explicitHeadingIds.add(id);
        }
      }
    },
  );

  return errors;
}
