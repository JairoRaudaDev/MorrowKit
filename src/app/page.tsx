import { AppShell } from "@/components/app-shell";
import { Container } from "@/components/container";
import { Logo } from "@/components/logo";

export default function Home() {
  return (
    <AppShell
      header={
        <Container className="flex h-16 items-center">
          <Logo />
        </Container>
      }
    >
      <Container
        size="md"
        className="flex min-h-[calc(100svh-4rem)] items-center py-section"
      >
        <div className="max-w-content">
          <p className="mb-4 text-sm font-medium text-muted-foreground">
            A flexible starting point
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
            Build the product your customers need.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            A neutral Next.js foundation with reusable layout primitives and
            design tokens that are ready to become your own.
          </p>
        </div>
      </Container>
    </AppShell>
  );
}
