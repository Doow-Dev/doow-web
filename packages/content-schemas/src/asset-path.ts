import { z } from "zod";

export const cdnRelativeAssetPathSchema = z
  .string()
  .min(1)
  .refine((value) => !value.startsWith("/"), "must be a CDN-relative path, not a /public path")
  .refine((value) => !/^https?:\/\//.test(value), "must be a CDN-relative path, not an absolute URL")
  .refine((value) => !value.includes(".."), "must not traverse directories");

export function isCdnRelativeAssetPath(value: string) {
  return cdnRelativeAssetPathSchema.safeParse(value).success;
}

export function createAssetPathSchema(allowedExtensions: readonly string[]) {
  const normalizedExtensions = new Set(allowedExtensions.map((extension) => extension.toLowerCase()));

  return cdnRelativeAssetPathSchema.refine((value) => {
    const extension = value.match(/\.[a-z0-9]+$/i)?.[0]?.toLowerCase();

    return Boolean(extension && normalizedExtensions.has(extension));
  }, `must use one of these file extensions: ${Array.from(normalizedExtensions).join(", ")}`);
}
