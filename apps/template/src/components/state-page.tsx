import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export function StatePage({
  eyebrow,
  title,
  description,
  icon: Icon,
  actions,
  className,
}: {
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
  actions: React.ReactNode;
  className?: string;
}) {
  return (
    <main
      className={cn(
        "grid min-h-[70vh] place-items-center px-page py-16",
        className,
      )}
    >
      <div className="mx-auto max-w-lg text-center">
        <div className="mx-auto grid size-12 place-items-center rounded-full border bg-background shadow-sm">
          <Icon className="size-5 text-muted-foreground" aria-hidden="true" />
        </div>
        <p className="mt-5 text-sm font-medium text-muted-foreground">
          {eyebrow}
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          {title}
        </h1>
        <p className="mt-4 leading-7 text-muted-foreground">{description}</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          {actions}
        </div>
      </div>
    </main>
  );
}
