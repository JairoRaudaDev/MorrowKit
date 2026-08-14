import { Activity, ArrowUpRight, CreditCard, Users } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  { label: "Active users", value: "2,420", change: "+12.5%", icon: Users },
  {
    label: "Monthly revenue",
    value: "$18,240",
    change: "+8.2%",
    icon: CreditCard,
  },
  { label: "Conversion rate", value: "3.8%", change: "+1.1%", icon: Activity },
];

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <div>
        <p className="text-sm font-medium text-muted-foreground">Overview</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
          Dashboard
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          A quick look at how your business is performing.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold tracking-tight">
                {stat.value}
              </div>
              <p className="mt-1 flex items-center text-xs text-muted-foreground">
                <span className="mr-1 inline-flex items-center text-emerald-600 dark:text-emerald-400">
                  {stat.change} <ArrowUpRight className="ml-0.5 size-3" />
                </span>
                from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid h-64 place-items-center rounded-lg border border-dashed bg-muted/30 text-center">
            <div>
              <Activity className="mx-auto mb-3 size-6 text-muted-foreground" />
              <p className="text-sm font-medium">Your chart goes here</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Connect your data source to populate this area.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
