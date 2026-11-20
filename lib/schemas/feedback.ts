import { z } from "zod";

export const feedbackCategories = [
  "Product quality",
  "Service",
  "Pricing",
  "Suggestion",
  "Other",
] as const;

export const MESSAGE_MAX = 1000;

// Shared by the client form (react-hook-form) and the server action.
export const feedbackSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter at least 2 characters")
    .max(60, "Name must be 60 characters or fewer"),
  email: z.email("Please enter a valid email address"),
  phone: z
    .string()
    .trim()
    .max(30, "Phone number is too long")
    .regex(/^[0-9+()\-\s.]*$/, "Please enter a valid phone number")
    .optional()
    .or(z.literal("")),
  rating: z
    .number({ error: "Please choose a rating" })
    .int()
    .min(1, "Please choose a rating")
    .max(5),
  category: z.enum(feedbackCategories, { error: "Please choose a category" }),
  message: z
    .string()
    .trim()
    .min(10, "Please write at least 10 characters")
    .max(MESSAGE_MAX, `Message must be ${MESSAGE_MAX} characters or fewer`),
  consent: z.boolean(),
  // Honeypot: hidden from people, bots tend to fill it in.
  website: z.string().optional(),
});

export type FeedbackInput = z.input<typeof feedbackSchema>;
export type FeedbackValues = z.output<typeof feedbackSchema>;

export type FeedbackResult =
  | { ok: true }
  | { ok: false; message: string; fieldErrors?: Partial<Record<keyof FeedbackValues, string[]>> };
