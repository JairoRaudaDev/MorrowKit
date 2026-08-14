import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/container";
import { Logo } from "@/components/logo";
import { logout } from "@/app/auth/actions";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function Home() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const email =
    typeof data?.claims?.email === "string" ? data.claims.email : null;

  return (
    <AppShell
      header={
        <Container className="flex h-16 items-center justify-between gap-4">
          <Logo />
          {email ? (
            <div className="flex items-center gap-3">
              <span className="hidden text-sm text-muted-foreground sm:inline">
                {email}
              </span>
              <form action={logout}>
                <Button type="submit" variant="outline" size="sm">
                  Sign out
                </Button>
              </form>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" size="sm">
                <Link href="/login">Sign in</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/signup">Sign up</Link>
              </Button>
            </div>
          )}
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
