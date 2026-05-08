import { describe, expect, it } from "vitest";

import {
  extractCodeBlocks,
  extractFirstParagraphText,
  extractHeadings,
  parseMdx,
  validateMarkdownImages,
  validateMdxComponents,
} from "../src";

describe("@doow/mdx", () => {
  it("parses MDX and extracts headings, excerpts, and code blocks", () => {
    const tree = parseMdx(`Intro paragraph.\n\n## First section\n\n\`\`\`ts\nconst ok = true;\n\`\`\``);

    expect(extractFirstParagraphText(tree)).toBe("Intro paragraph.");
    expect(extractHeadings(tree, { depths: [2] })).toEqual([
      {
        depth: 2,
        id: "first-section",
        text: "First section",
      },
    ]);
    expect(extractCodeBlocks(tree)).toEqual([
      {
        lang: "ts",
        meta: null,
        value: "const ok = true;",
      },
    ]);
  });

  it("validates component allowlists and inline event handlers", () => {
    const tree = parseMdx(`<Callout>Ok</Callout>\n\n<BadThing onClick="x">No</BadThing>`);
    const errors = validateMdxComponents(tree, {
      allowedHtmlElements: new Set(["em", "strong"]),
      allowedMdxComponents: new Set(["Callout"]),
    });

    expect(errors).toEqual([
      {
        field: "onClick",
        message: "inline event handlers are not supported in MDX",
      },
      {
        field: "BadThing",
        message: "unsupported MDX component",
      },
    ]);
  });

  it("validates inline images", () => {
    const tree = parseMdx(`![Diagram](docs/diagram.png)\n\n![](https://example.com/bad.png)`);
    const errors = validateMarkdownImages(tree, {
      invalidUrlMessage: "expected a CDN-relative image path",
      validateUrl: (url) => !url.startsWith("http"),
    });

    expect(errors).toEqual([
      {
        field: "imageAlt",
        message: "inline images must include descriptive alt text",
      },
      {
        field: "image",
        message: "expected a CDN-relative image path",
      },
    ]);
  });
});
