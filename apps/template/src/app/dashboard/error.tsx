"use client";

import * as Sentry from "@sentry/nextjs";
import { RotateCcw, TriangleAlert } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

import { StatePage } from "@/components/state-page";
import { Button } from "@/components/ui/button";

export default function DashboardError({
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
    <StatePage
      className="min-h-[calc(100svh-8rem)]"
      eyebrow="Dashboard unavailable"
      title="We couldn’t load this view."
      description="This is usually temporary. Try again now, or return to your dashboard overview."
      icon={TriangleAlert}
      actions={
        <>
          <Button onClick={retry}>
            <RotateCcw aria-hidden="true" /> Try again
          </Button>
          <Button asChild variant="outline">
            <Link href="/dashboard">Back to overview</Link>
          </Button>
        </>
      }
    />
  );
}
