"use client";

import { CircleCheck, CircleX, LoaderCircle } from "lucide-react";

import { cn } from "@/lib/utils";

type FormFeedbackProps = {
  kind: "pending" | "success" | "error";
  message: string;
  className?: string;
};

export function FormFeedback({ kind, message, className }: FormFeedbackProps) {
  const Icon =
    kind === "pending"
      ? LoaderCircle
      : kind === "success"
        ? CircleCheck
        : CircleX;

  return (
    <div
      role={kind === "error" ? "alert" : "status"}
      aria-live={kind === "error" ? "assertive" : "polite"}
      className={cn(
        "flex items-start gap-2 rounded-md border px-3 py-2 text-sm",
        kind === "error" &&
          "border-destructive/30 bg-destructive/10 text-destructive",
        kind === "success" &&
          "border-emerald-600/30 bg-emerald-600/10 text-emerald-700 dark:text-emerald-400",
        kind === "pending" && "bg-muted text-muted-foreground",
        className,
      )}
    >
      <Icon
        className={cn(
          "mt-0.5 size-4 shrink-0",
          kind === "pending" && "animate-spin",
        )}
        aria-hidden="true"
      />
      <span>{message}</span>
    </div>
  );
}
