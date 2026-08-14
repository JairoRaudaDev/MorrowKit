import "server-only";

import type { ReactElement } from "react";

import { sendWithProvider } from "./provider";

export type SendEmailOptions = {
  to: string | string[];
  subject: string;
  react: ReactElement;
  text?: string;
  replyTo?: string | string[];
  from?: string;
};

export function sendEmail(email: SendEmailOptions) {
  return sendWithProvider(email);
}
