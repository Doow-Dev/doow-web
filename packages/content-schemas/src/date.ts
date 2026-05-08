import { z } from "zod";

export const dateStringSchema = z.string().date();

export function isDateString(value: string) {
  return dateStringSchema.safeParse(value).success;
}
