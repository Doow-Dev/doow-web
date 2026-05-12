import { dateStringSchema, requiredStringSchema } from "@doow/content-schemas";
import { z } from "zod";

export const docsSections = ["integrations"] as const;

const docsSlugSchema = z
  .string()
  .min(1)
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)*$/,
    "must be a lowercase kebab-case route path",
  );

export const DocsFrontmatterSchema = z.object({
  title: requiredStringSchema,
  description: requiredStringSchema,
  slug: docsSlugSchema,
  section: z.enum(docsSections),
  order: z.number().int().nonnegative(),
  status: z.enum(["published", "draft"]).default("published"),
  updatedAt: dateStringSchema.optional(),
  prerequisites: z.array(z.string().min(1)).optional(),
  nextSteps: z
    .array(
      z.object({
        title: z.string().min(1),
        href: z.string().min(1),
        description: z.string().optional(),
      }),
    )
    .optional(),
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
