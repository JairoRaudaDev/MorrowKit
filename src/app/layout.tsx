import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SaaSSeed",
  description: "A production-ready starting point for your next SaaS product.",
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
