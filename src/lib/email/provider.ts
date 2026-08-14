import "server-only";

import type { ReactElement } from "react";
import { Resend } from "resend";

import { validateEnv } from "@/env/validation";

export type ProviderEmail = {
  from?: string;
  to: string | string[];
  subject: string;
  react: ReactElement;
  text?: string;
  replyTo?: string | string[];
};

const emailEnv = validateEnv("email", {
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  EMAIL_FROM: process.env.EMAIL_FROM,
});

const resend = new Resend(emailEnv.RESEND_API_KEY);

export async function sendWithProvider(email: ProviderEmail) {
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

  return { id: data.id };
}
