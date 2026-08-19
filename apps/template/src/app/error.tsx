"use client";

import * as Sentry from "@sentry/nextjs";
import { RotateCcw, TriangleAlert } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

import { Navbar } from "@/components/marketing";
import { StatePage } from "@/components/state-page";
import { Button } from "@/components/ui/button";

export default function Error({
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
    <div className="min-h-svh bg-background">
      <Navbar />
      <StatePage
        eyebrow="Something went wrong"
        title="We hit an unexpected snag."
        description="Your work is safe. Try loading this page again, or return home if the problem continues."
        icon={TriangleAlert}
        actions={
          <>
            <Button onClick={retry}>
              <RotateCcw aria-hidden="true" /> Try again
            </Button>
            <Button asChild variant="outline">
              <Link href="/">Return home</Link>
            </Button>
          </>
        }
      />
    </div>
  );
}
