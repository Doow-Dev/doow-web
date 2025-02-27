import { z } from "zod"

const workMailSchema = z
  .string()
  .email("Please enter a valid email")
  .refine(
    (email) => {
      const foundDomain = personalEmailDomains.find((domain) =>
        email.toLowerCase().endsWith(domain)
      );
      return !foundDomain; // Returns false if a personal domain is found
    },
    (email) => {
      const foundDomain = personalEmailDomains.find((domain) =>
        email.toLowerCase().endsWith(domain)
      );
      return {
        message: `Please enter a valid work email address, not (${foundDomain})`,
      };
    }
  );

export const emailSchema = z.object({
  email: workMailSchema
})

export const waitListSchema = z.object({
    email: workMailSchema,
    firstName: z.string().min(2, "Name must be at least 2 characters"),
    lastName: z.string().min(2, "Name must be at least 2 characters"),
    company: z.string().min(1, "Company name is required"),
    role: z.string().min(1, "Role is required"),
})

export type EmailFormData = z.infer<typeof emailSchema>
export type WaitListFormData = z.infer<typeof waitListSchema>


// List of common personal email domains
const personalEmailDomains = [
  "@gmail.com",
  "@outlook.com",
  "@apple.com",
  "@me.com",
  "@icloud.com",
  "@mac.com",
  "@qq.com",
  "@orange.fe",
  "@wed.de",
  "@yahoo.com",
  "@myyahoo.com",
  "@yahoo.co.uk",
  "@yahoo.fr",
  "@aol.com",
  "@icloudmail.com",
  "@live.com",
  "@hotmail.com",
  "@msn.com",
  "@yandex.ru",
  "@googlemail.com",
];