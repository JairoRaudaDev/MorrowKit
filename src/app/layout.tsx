import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SaaSSeed — Build what matters",
  description:
    "A calm, capable place for teams to plan, collaborate, and ship.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
