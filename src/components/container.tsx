import * as React from "react";

import { cn } from "@/lib/utils";

const containerSizes = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-7xl",
  wide: "max-w-wide",
  full: "max-w-none",
} as const;

type ContainerProps = React.ComponentProps<"div"> & {
  size?: keyof typeof containerSizes;
  bleed?: boolean;
};

function Container({
  className,
  size = "wide",
  bleed = false,
  ...props
}: ContainerProps) {
  return (
    <div
      data-slot="container"
      className={cn(
        "mx-auto w-full",
        !bleed && "px-page",
        containerSizes[size],
        className,
      )}
      {...props}
    />
  );
}

export { Container, type ContainerProps };
