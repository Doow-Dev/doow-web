import remarkFrontmatter from "remark-frontmatter";
import remarkMdx from "remark-mdx";
import remarkParse from "remark-parse";
import { unified } from "unified";

import { MdxParseError } from "./errors";

export function parseMdx(source: string) {
  try {
    return unified().use(remarkParse).use(remarkMdx).use(remarkFrontmatter, ["yaml"]).parse(source);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to parse MDX";

    throw new MdxParseError(message);
  }
}

export type MdxRoot = ReturnType<typeof parseMdx>;
