import { dateStringSchema, requiredStringSchema } from "@doow/content-schemas";
import { z } from "zod";

export const helpCategories = [
  "getting-started",
  "integrations",
  "billing",
  "account",
  "troubleshooting",
] as const;

const helpSlugSchema = z
  .string()
  .min(1)
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "must be a lowercase kebab-case slug",
  );

export const HelpFrontmatterSchema = z.object({
  title: requiredStringSchema,
  description: requiredStringSchema,
  slug: helpSlugSchema,
  category: z.enum(helpCategories),
  order: z.number().int().nonnegative(),
  status: z.enum(["published", "draft"]).default("published"),
  updatedAt: dateStringSchema.optional(),
});

export type ParsedHelpFrontmatter = z.infer<typeof HelpFrontmatterSchema>;

export function formatHelpZodIssues(filename: string, error: z.ZodError) {
  return error.issues
    .map((issue) => {
      const field = issue.path.length > 0 ? issue.path.join(".") : "frontmatter";
      return `[help] ${filename}: ${field} - ${issue.message}`;
    })
    .join("\n");
}

export function validateHelpFrontmatter(data: unknown, filename: string) {
  const result = HelpFrontmatterSchema.safeParse(data);

  if (!result.success) {
    throw new Error(formatHelpZodIssues(filename, result.error));
  }

  return result.data;
}
