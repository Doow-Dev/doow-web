import React from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { GetStaticPropsContext } from "next";
import NoteView from "../../views/help/note/note.view";

type HelpProperties = {
  content: string;
};
export default function HelpPage(props: HelpProperties) {
  return <NoteView content={props.content} />;
}

export function getStaticPaths() {
  const files = fs.readdirSync(path.join("_md"));

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

// export const getStaticProps = async ({params}:
//   GetStaticPropsContext<{ slug: string }>) => {

export function getStaticProps({
  params,
}: GetStaticPropsContext<{ slug: string }>) {
  const markdownWithMeta = fs.readFileSync(
    // path.join("_md", params?.slug + ".md"),
    path.join("_md", `${String(params?.slug)}.md`),
    "utf-8"
  );

  const { data: frontmatter, content } = matter(markdownWithMeta);
  const slug = params?.slug;
  return {
    props: {
      frontmatter,
      slug,
      content,
    },
  };
}
