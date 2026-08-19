import "server-only";

import { WelcomeEmail } from "@/emails/welcome-email";
import { productConfig } from "@/config/product";
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
    subject: `Welcome to ${productConfig.name}`,
    react: <WelcomeEmail name={name} appUrl={dashboardUrl} />,
    text: `${name?.trim() ? `Hi ${name.trim()},` : "Hi there,"}\n\nWelcome to ${productConfig.name}. Your account is ready. Open your dashboard: ${dashboardUrl}`,
  });
}
