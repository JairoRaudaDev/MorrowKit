import { ArrowLeft, FileQuestion } from "lucide-react";
import Link from "next/link";

import { Navbar } from "@/components/marketing";
import { StatePage } from "@/components/state-page";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-svh bg-background">
      <Navbar />
      <StatePage
        eyebrow="404 · Page not found"
        title="This page wandered off."
        description="The address may have changed, or the page may no longer exist. Head home and keep exploring from there."
        icon={FileQuestion}
        actions={
          <>
            <Button asChild>
              <Link href="/">
                <ArrowLeft aria-hidden="true" /> Back to home
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/dashboard">Open dashboard</Link>
            </Button>
          </>
        }
      />
    </div>
  );
}
