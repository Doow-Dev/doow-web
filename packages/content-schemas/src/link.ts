import { z } from "zod";

export const absoluteUrlSchema = z.string().url();
export const optionalAbsoluteUrlSchema = absoluteUrlSchema.optional();

export const internalPathSchema = z
  .string()
  .min(1)
  .refine((value) => value.startsWith("/"), "must start with /")
  .refine((value) => !value.startsWith("//"), "must be a site-relative path, not a protocol-relative URL");

export function isExternalUrl(value: string) {
  return /^https?:\/\//.test(value);
}

export function isInternalPath(value: string) {
  return internalPathSchema.safeParse(value).success;
}
