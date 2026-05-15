import fs from "node:fs/promises";
import path from "node:path";

const [oldSlug, newSlug] = process.argv.slice(2);

if (!oldSlug || !newSlug) {
  throw new Error("Usage: pnpm docs:move-page <old-slug> <new-slug>");
}

const contentDir = path.join(process.cwd(), "content", "docs");
const redirectsFile = path.join(process.cwd(), "src", "lib", "docs", "redirects.ts");
const oldFile = path.join(contentDir, `${oldSlug}.mdx`);
const newFile = path.join(contentDir, `${newSlug}.mdx`);

const raw = await fs.readFile(oldFile, "utf8");
const updated = raw.replace(`slug: "${oldSlug}"`, `slug: "${newSlug}"`);

if (updated === raw) {
  throw new Error(`Could not update frontmatter slug "${oldSlug}" in ${oldFile}`);
}

await fs.writeFile(newFile, updated);
await fs.unlink(oldFile);

const redirectEntry = `  {
    from: "/${oldSlug}",
    reason: "Moved by docs content tooling.",
    to: "/${newSlug}",
  },
`;
const redirectsSource = await fs.readFile(redirectsFile, "utf8");
await fs.writeFile(redirectsFile, redirectsSource.replace("export const docsRedirects = [\n", `export const docsRedirects = [\n${redirectEntry}`));

console.log(`Moved docs page ${oldSlug} -> ${newSlug} and added a redirect.`);
