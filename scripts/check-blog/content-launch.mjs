import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

const postsDir = path.join(process.cwd(), "content", "blog");
const enforce = process.argv.includes("--enforce");
const files = fs
  .readdirSync(postsDir, { withFileTypes: true })
  .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
  .map((entry) => entry.name)
  .sort();

const publishedPosts = files
  .map((filename) => {
    const raw = fs.readFileSync(path.join(postsDir, filename), "utf8");
    const parsed = matter(raw);

    return {
      category: parsed.data.category,
      draft: parsed.data.draft === true,
      filename,
      title: parsed.data.title,
    };
  })
  .filter((post) => !post.draft);

const categories = new Set(publishedPosts.map((post) => post.category).filter(Boolean));
const failures = [];

if (publishedPosts.length < 1) {
  failures.push(`expected at least 1 published post, found ${publishedPosts.length}`);
}

if (categories.size < 1) {
  failures.push(`expected at least 1 represented category, found ${categories.size}`);
}

if (publishedPosts.some((post) => !post.title || !post.category)) {
  failures.push("all published posts must include title and category frontmatter");
}

if (failures.length > 0) {
  const message = `Launch content gate blocked: ${failures.join("; ")}`;

  if (enforce) {
    console.error(`FAIL: ${message}`);
    process.exit(1);
  }

  console.warn(`WARN: ${message}`);
} else {
  console.log(`Launch content gate passed: ${publishedPosts.length} posts across ${categories.size} categories.`);
}
