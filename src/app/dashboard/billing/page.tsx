import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function BillingPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <p className="text-sm font-medium text-muted-foreground">Billing</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
          Plan and billing
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Manage your subscription and payment details.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Current plan</CardTitle>
            <CardDescription>
              You are currently on the Pro plan.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-1">
              <span className="text-4xl font-semibold tracking-tight">$29</span>
              <span className="pb-1 text-sm text-muted-foreground">
                / month
              </span>
            </div>
            <ul className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
              {[
                "Unlimited projects",
                "Priority support",
                "Advanced analytics",
                "Team collaboration",
              ].map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <Check className="size-4 text-emerald-600 dark:text-emerald-400" />
                  {feature}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="gap-3 border-t">
            <Button>Change plan</Button>
            <Button variant="ghost">Cancel subscription</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment method</CardTitle>
            <CardDescription>
              Used for your recurring subscription.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border p-4">
              <p className="text-sm font-medium">Visa ending in 4242</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Expires 12/28
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline">Update payment method</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
