import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid min-h-64 place-items-center rounded-lg border border-dashed bg-muted/20 px-6 py-12 text-center",
        className,
      )}
    >
      <div className="max-w-sm">
        <div className="mx-auto grid size-11 place-items-center rounded-full border bg-background shadow-sm">
          <Icon className="size-5 text-muted-foreground" aria-hidden="true" />
        </div>
        <h2 className="mt-4 text-sm font-semibold">{title}</h2>
        <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
          {description}
        </p>
        {action ? <div className="mt-5">{action}</div> : null}
      </div>
    </div>
  );
}
