import { Container } from "@/components/container";
import { Logo } from "@/components/logo";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div
      className="min-h-svh bg-background"
      aria-label="Loading page"
      aria-busy="true"
    >
      <header className="border-b">
        <Container className="flex h-16 items-center justify-between">
          <Logo />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-24" />
          </div>
        </Container>
      </header>
      <Container className="grid gap-12 py-20 md:grid-cols-2 md:items-center md:py-28">
        <div className="space-y-5">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-14 w-full max-w-xl sm:h-20" />
          <Skeleton className="h-6 w-5/6 max-w-lg" />
          <Skeleton className="h-6 w-2/3 max-w-md" />
          <div className="flex gap-3 pt-2">
            <Skeleton className="h-10 w-36" />
            <Skeleton className="h-10 w-28" />
          </div>
        </div>
        <Skeleton className="h-80 w-full rounded-2xl" />
      </Container>
    </div>
  );
}
