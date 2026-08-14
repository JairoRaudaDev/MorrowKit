import Link from "next/link";
import * as React from "react";

import { cn } from "@/lib/utils";

type LogoProps = Omit<
  React.ComponentProps<typeof Link>,
  "children" | "href"
> & {
  href?: React.ComponentProps<typeof Link>["href"];
  name?: string;
  mark?: React.ReactNode;
};

function Logo({
  className,
  href = "/",
  name = "Your Company",
  mark,
  ...props
}: LogoProps) {
  return (
    <Link
      href={href}
      aria-label={name}
      data-slot="logo"
      className={cn(
        "inline-flex items-center gap-2.5 text-sm font-semibold tracking-tight",
        className,
      )}
      {...props}
    >
      {mark ?? (
        <span
          aria-hidden="true"
          className="grid size-7 place-items-center rounded-md border bg-muted text-xs text-muted-foreground"
        >
          {name.slice(0, 1).toUpperCase()}
        </span>
      )}
      <span>{name}</span>
    </Link>
  );
}

export { Logo, type LogoProps };
