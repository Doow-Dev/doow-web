import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

export const helpMdxOptions = {
  mdxOptions: {
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: {
            ariaLabel: "Link to heading",
            className: ["help-heading-anchor"],
          },
        },
      ],
      [
        rehypePrettyCode,
        {
          themes: { light: "github-light", dark: "github-dark" },
          defaultLang: "plaintext",
        },
      ],
    ],
    remarkPlugins: [remarkGfm],
  },
} satisfies MDXRemoteProps["options"];
