import Link from "next/link";
import { ArrowUpRight, ChartNoAxesCombined, LockKeyhole } from "lucide-react";

import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/empty-state";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getPremiumInsights } from "@/lib/premium-insights";

export default async function PremiumInsightsPage() {
  const result = await getPremiumInsights();

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <p className="text-sm font-medium text-muted-foreground">
          Premium feature example
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
          Premium Insights
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          A demonstrative feature protected by server-side subscription
          entitlements.
        </p>
      </div>

      {result.available ? (
        <>
          <div className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-300">
            <ChartNoAxesCombined className="size-4" aria-hidden="true" />
            Available on your {result.plan} plan
          </div>
          {result.insights.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-3">
              {result.insights.map((insight) => (
                <Card key={insight.label}>
                  <CardHeader>
                    <CardDescription>{insight.label}</CardDescription>
                    <CardTitle className="text-3xl">{insight.value}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    {insight.detail}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={ChartNoAxesCombined}
              title="No insights yet"
              description="Insights will appear here once your workspace has enough activity to surface meaningful trends."
            />
          )}
        </>
      ) : (
        <Card className="overflow-hidden">
          <CardHeader className="items-center border-b bg-muted/30 py-10 text-center">
            <div className="mb-3 grid size-12 place-items-center rounded-full bg-primary/10 text-primary">
              <LockKeyhole className="size-5" aria-hidden="true" />
            </div>
            <CardTitle>Unlock Premium Insights</CardTitle>
            <CardDescription className="max-w-lg">
              Forecast growth, find expansion revenue, and spot accounts that
              need attention. Upgrade to a paid plan to access these insights.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-3 py-8">
            <Button asChild>
              <Link href="/pricing">
                View paid plans <ArrowUpRight aria-hidden="true" />
              </Link>
            </Button>
            <p className="text-xs text-muted-foreground">
              Your current plan: Free
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
