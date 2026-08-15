import { ArrowLeft, FileQuestion } from "lucide-react";
import Link from "next/link";

import { StatePage } from "@/components/state-page";
import { Button } from "@/components/ui/button";

export default function DashboardNotFound() {
  return (
    <StatePage
      className="min-h-[calc(100svh-8rem)]"
      eyebrow="404 · Dashboard page not found"
      title="There’s nothing here yet."
      description="This dashboard address doesn’t point to an active page. Return to the overview to keep working."
      icon={FileQuestion}
      actions={
        <Button asChild>
          <Link href="/dashboard">
            <ArrowLeft aria-hidden="true" /> Back to overview
          </Link>
        </Button>
      }
    />
  );
}
