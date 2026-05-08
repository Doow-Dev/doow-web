import { describe, expect, it } from "vitest";

import {
  cdnRelativeAssetPathSchema,
  dateStringSchema,
  internalPathSchema,
  slugSchema,
} from "../src";

describe("@doow/content-schemas primitives", () => {
  it("accepts CDN-relative asset paths and rejects public or absolute paths", () => {
    expect(cdnRelativeAssetPathSchema.safeParse("blog/covers/runway.jpg").success).toBe(true);
    expect(cdnRelativeAssetPathSchema.safeParse("/blog/covers/runway.jpg").success).toBe(false);
    expect(cdnRelativeAssetPathSchema.safeParse("https://example.com/runway.jpg").success).toBe(false);
    expect(cdnRelativeAssetPathSchema.safeParse("../runway.jpg").success).toBe(false);
  });

  it("validates date strings, internal paths, and slugs", () => {
    expect(dateStringSchema.safeParse("2026-05-08").success).toBe(true);
    expect(dateStringSchema.safeParse("May 8, 2026").success).toBe(false);
    expect(internalPathSchema.safeParse("/docs/getting-started").success).toBe(true);
    expect(internalPathSchema.safeParse("//example.com").success).toBe(false);
    expect(slugSchema.safeParse("getting-started").success).toBe(true);
    expect(slugSchema.safeParse("Getting Started").success).toBe(false);
  });
});
