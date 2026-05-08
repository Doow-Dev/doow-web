import { dateStringSchema, requiredStringSchema, slugSchema } from "@doow/content-schemas";
import { z } from "zod";

export const docsSections = ["start", "guides", "reference", "updates"] as const;

export const DocsFrontmatterSchema = z.object({
  title: requiredStringSchema,
  description: requiredStringSchema,
  slug: slugSchema,
  section: z.enum(docsSections),
  order: z.number().int().nonnegative(),
  status: z.enum(["published", "draft"]).default("published"),
  updatedAt: dateStringSchema.optional(),
});

export type ParsedDocsFrontmatter = z.infer<typeof DocsFrontmatterSchema>;

export function formatDocsZodIssues(filename: string, error: z.ZodError) {
  return error.issues
    .map((issue) => {
      const field = issue.path.length > 0 ? issue.path.join(".") : "frontmatter";

      return `[docs] ${filename}: ${field} - ${issue.message}`;
    })
    .join("\n");
}

export function validateDocsFrontmatter(data: unknown, filename: string) {
  const result = DocsFrontmatterSchema.safeParse(data);

  if (!result.success) {
    throw new Error(formatDocsZodIssues(filename, result.error));
  }

  return result.data;
}
