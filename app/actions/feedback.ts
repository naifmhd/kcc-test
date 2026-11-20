"use server";

import { z } from "zod";
import { feedbackSchema, type FeedbackResult, type FeedbackValues } from "@/lib/schemas/feedback";

/**
 * Where feedback goes. v1 only logs it on the server.
 * Swap this for email (e.g. Resend), a Google Sheet or a database later.
 */
async function deliverFeedback(feedback: Omit<FeedbackValues, "website">) {
  console.info("[feedback] new submission", {
    ...feedback,
    receivedAt: new Date().toISOString(),
  });
}

export async function submitFeedback(input: unknown): Promise<FeedbackResult> {
  // Never trust the client: validate again on the server.
  const parsed = feedbackSchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false,
      message: "Please check the highlighted fields and try again.",
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  const { website, ...feedback } = parsed.data;

  // Honeypot filled in: pretend it worked so bots don't retry.
  if (website) {
    return { ok: true };
  }

  try {
    await deliverFeedback(feedback);
    return { ok: true };
  } catch (error) {
    console.error("[feedback] delivery failed", error);
    return { ok: false, message: "Something went wrong sending your feedback. Please try again." };
  }
}
