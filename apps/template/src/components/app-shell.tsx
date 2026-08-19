import * as React from "react";

import { cn } from "@/lib/utils";

type AppShellProps = React.ComponentProps<"div"> & {
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  footer?: React.ReactNode;
  mainClassName?: string;
};

function AppShell({
  children,
  className,
  header,
  sidebar,
  footer,
  mainClassName,
  ...props
}: AppShellProps) {
  return (
    <div
      data-slot="app-shell"
      className={cn("flex min-h-svh flex-col bg-background", className)}
      {...props}
    >
      {header && <header className="shrink-0 border-b">{header}</header>}
      <div className="flex min-h-0 flex-1">
        {sidebar && (
          <aside className="hidden w-64 shrink-0 border-r md:block">
            {sidebar}
          </aside>
        )}
        <main className={cn("min-w-0 flex-1", mainClassName)}>{children}</main>
      </div>
      {footer && <footer className="shrink-0 border-t">{footer}</footer>}
    </div>
  );
}

export { AppShell, type AppShellProps };
