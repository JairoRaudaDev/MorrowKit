import Link from "next/link";
import { CreditCard } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { requireAuth } from "@/lib/auth/session";
import { getEntitlements, type Plan } from "@/lib/entitlements";
import { getCurrentSubscription } from "@/lib/stripe/subscription";

import { createBillingPortalSession } from "./actions";

const statusLabels: Record<string, string> = {
  active: "Active",
  canceled: "Canceled",
  incomplete: "Incomplete",
  incomplete_expired: "Expired",
  past_due: "Past due",
  paused: "Paused",
  trialing: "Trialing",
  unpaid: "Unpaid",
};

const planLabels: Record<Plan, string> = {
  free: "Free",
  pro: "Pro",
  business: "Business",
};

function formatDate(value: string | null) {
  if (!value) return null;

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeZone: "UTC",
  }).format(new Date(value));
}

export default async function BillingPage() {
  const claims = await requireAuth();
  const userId = claims.sub;

  if (typeof userId !== "string" || userId.length === 0) {
    throw new Error("Authenticated user is missing an identifier");
  }

  const [entitlements, subscription] = await Promise.all([
    getEntitlements(userId),
    getCurrentSubscription(userId),
  ]);
  const plan = planLabels[entitlements.plan];
  const status = subscription
    ? (statusLabels[subscription.status] ?? subscription.status)
    : "No subscription";
  const periodEnd = formatDate(subscription?.currentPeriodEnd ?? null);

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <p className="text-sm font-medium text-muted-foreground">Billing</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
          Plan and billing
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          View your subscription and manage billing securely through Stripe.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Current plan</CardTitle>
            <CardDescription>Your latest subscription status.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div>
              <p className="text-3xl font-semibold tracking-tight">{plan}</p>
              <span className="mt-2 inline-flex rounded-full bg-muted px-2.5 py-1 text-xs font-medium">
                {status}
              </span>
            </div>
            {periodEnd ? (
              <div className="border-t pt-4 text-sm">
                <p className="font-medium">
                  {subscription?.cancelAtPeriodEnd
                    ? "Access ends"
                    : "Current period ends"}
                </p>
                <p className="mt-1 text-muted-foreground">{periodEnd}</p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Choose a paid plan to unlock subscription features.
              </p>
            )}
          </CardContent>
          {!subscription && (
            <CardFooter className="border-t">
              <Button asChild>
                <Link href="/pricing">View plans</Link>
              </Button>
            </CardFooter>
          )}
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Manage billing</CardTitle>
            <CardDescription>
              Stripe securely handles payment methods, invoices, and plan
              changes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-3 rounded-lg border p-4">
              <CreditCard className="mt-0.5 size-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Stripe Customer Portal</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  You will be redirected to Stripe&apos;s hosted billing page.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t">
            <form action={createBillingPortalSession}>
              <Button type="submit" variant="outline">
                Manage subscription
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
