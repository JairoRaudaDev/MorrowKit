"use client";

import * as Sentry from "@sentry/nextjs";
import { RotateCcw, TriangleAlert } from "lucide-react";
import { useEffect } from "react";

export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    if (
      process.env.NODE_ENV === "production" &&
      process.env.NEXT_PUBLIC_SENTRY_DSN
    ) {
      Sentry.captureException(error);
    }
  }, [error]);

  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <main
          style={{
            minHeight: "100vh",
            display: "grid",
            placeItems: "center",
            padding: "2rem",
            background: "#fff",
            color: "#171717",
            fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: "32rem" }}>
            <TriangleAlert
              aria-hidden="true"
              size={32}
              style={{ margin: "0 auto" }}
            />
            <p
              style={{
                margin: "1.25rem 0 0",
                color: "#737373",
                fontSize: "0.875rem",
              }}
            >
              Application error
            </p>
            <h1
              style={{
                margin: "0.5rem 0 0",
                fontSize: "2rem",
                letterSpacing: "-0.03em",
              }}
            >
              Something went wrong.
            </h1>
            <p
              style={{ margin: "1rem 0 0", color: "#737373", lineHeight: 1.6 }}
            >
              We’ve been notified. Try loading the application again in a
              moment.
            </p>
            <button
              type="button"
              onClick={retry}
              style={{
                marginTop: "1.75rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                border: 0,
                borderRadius: "0.625rem",
                background: "#171717",
                color: "#fff",
                padding: "0.7rem 1rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              <RotateCcw aria-hidden="true" size={16} /> Try again
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
