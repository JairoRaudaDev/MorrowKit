import "server-only";

import type { ReactElement } from "react";
import { Resend } from "resend";

import { validateEnv } from "@/env/validation";

export type SendEmailOptions = {
  to: string | string[];
  subject: string;
  react: ReactElement;
  text?: string;
  replyTo?: string | string[];
  from?: string;
};

export type EmailDeliveryResult =
  { id: string; delivery: "sent" } | { id: null; delivery: "preview" };

export async function sendEmail(
  email: SendEmailOptions,
): Promise<EmailDeliveryResult> {
  if (process.env.NODE_ENV !== "production") {
    return { id: null, delivery: "preview" };
  }

  const emailEnv = validateEnv("email", {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    EMAIL_FROM: process.env.EMAIL_FROM,
  });
  const resend = new Resend(emailEnv.RESEND_API_KEY);
  const { data, error } = await resend.emails.send({
    ...email,
    from: email.from ?? emailEnv.EMAIL_FROM,
  });

  if (error) {
    throw new Error(`Email provider rejected the message: ${error.message}`, {
      cause: error,
    });
  }

  if (!data) {
    throw new Error("Email provider returned no delivery result.");
  }

  return { id: data.id, delivery: "sent" };
}
