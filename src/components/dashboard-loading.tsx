import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function DashboardLoading({
  variant = "overview",
}: {
  variant?: "overview" | "cards" | "settings";
}) {
  const cardCount = variant === "settings" ? 1 : variant === "cards" ? 2 : 3;

  return (
    <div
      className="mx-auto max-w-7xl space-y-8"
      aria-label="Loading dashboard"
      aria-busy="true"
    >
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-9 w-52" />
        <Skeleton className="h-4 w-80 max-w-full" />
      </div>
      {variant === "cards" ? <Skeleton className="h-11 w-full" /> : null}
      <div
        className={cn(
          "grid gap-4",
          variant === "cards" ? "md:grid-cols-2" : "md:grid-cols-3",
        )}
      >
        {Array.from({ length: cardCount }, (_, item) => (
          <Card key={item}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="size-4" />
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-3 w-36" />
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className={variant === "settings" ? "max-w-3xl" : undefined}>
        <CardHeader>
          <Skeleton className="h-5 w-24" />
        </CardHeader>
        <CardContent>
          <Skeleton
            className={
              variant === "settings" ? "h-48 w-full" : "h-64 w-full rounded-lg"
            }
          />
        </CardContent>
      </Card>
    </div>
  );
}
