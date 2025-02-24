import { z } from "zod"

export const emailSchema = z.object({
  email: z.string().email("Please enter a valid work email address"),
})

export const waitListSchema = z.object({
    email: z.string().email("Please enter a valid work email address"),
    firstName: z.string().min(2, "Name must be at least 2 characters"),
    lastName: z.string().min(2, "Name must be at least 2 characters"),
    company: z.string().min(1, "Company name is required"),
    role: z.string().min(1, "Role is required"),
})

export type EmailFormData = z.infer<typeof emailSchema>
export type WaitListFormData = z.infer<typeof waitListSchema>
