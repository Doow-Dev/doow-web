import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

export const allowedDocsMdxComponents = new Set([
  "Callout",
  "Steps",
  "Card",
  "Cards",
  "CodeBlock",
  "Tabs",
  "Tooltip",
]);

export const allowedDocsHtmlElements = new Set([
  "br",
  "cite",
  "em",
  "kbd",
  "li",
  "mark",
  "ol",
  "strong",
  "sub",
  "sup",
]);

export const docsMdxOptions = {
  mdxOptions: {
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: {
            ariaLabel: "Link to heading",
            className: ["docs-heading-anchor"],
          },
        },
      ],
      [
        rehypePrettyCode,
        {
          theme: "github-light",
        },
      ],
    ],
    remarkPlugins: [remarkGfm],
  },
} satisfies MDXRemoteProps["options"];
