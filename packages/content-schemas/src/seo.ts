import { z } from "zod";

import { absoluteUrlSchema } from "./link";

export const seoTitleSchema = z.string().trim().min(1).max(70);
export const seoDescriptionSchema = z.string().trim().min(1).max(180);
export const canonicalUrlSchema = absoluteUrlSchema.optional();
