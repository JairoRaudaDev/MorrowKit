import "server-only";

import { WelcomeEmail } from "@/emails/welcome-email";
import { publicEnv } from "@/env/public";

import { sendEmail } from "./send";

type SendWelcomeEmailOptions = {
  to: string;
  name?: string;
};

export function sendWelcomeEmail({ to, name }: SendWelcomeEmailOptions) {
  const dashboardUrl = new URL(
    "/dashboard",
    publicEnv.NEXT_PUBLIC_APP_URL,
  ).toString();

  return sendEmail({
    to,
    subject: "Welcome to MorrowKit",
    react: <WelcomeEmail name={name} appUrl={dashboardUrl} />,
    text: `${name?.trim() ? `Hi ${name.trim()},` : "Hi there,"}\n\nWelcome to MorrowKit. Your account is ready. Open your dashboard: ${dashboardUrl}`,
  });
}
