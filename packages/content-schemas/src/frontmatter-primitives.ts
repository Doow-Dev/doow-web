import { z } from "zod";

import { cdnRelativeAssetPathSchema } from "./asset-path";

export const requiredStringSchema = z.string().trim().min(1);
export const optionalStringSchema = requiredStringSchema.optional();

export function requireAltTextWhenImageIsPresent<
  T extends {
    image?: string;
    imageAlt?: string;
  },
>(value: T, ctx: z.RefinementCtx) {
  if (value.image && !value.imageAlt) {
    ctx.addIssue({
      code: "custom",
      message: "imageAlt is required when image is present",
      path: ["imageAlt"],
    });
  }
}

export function imageWithAltFields() {
  return {
    image: cdnRelativeAssetPathSchema.optional(),
    imageAlt: requiredStringSchema.optional(),
  };
}
