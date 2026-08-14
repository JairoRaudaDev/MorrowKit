import Link from "next/link";

import { logout } from "@/app/auth/actions";
import { AppShell } from "@/components/app-shell";
import { Container } from "@/components/container";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { requireAuth } from "@/lib/auth/session";

export default async function DashboardPage() {
  const claims = await requireAuth();
  const email = typeof claims.email === "string" ? claims.email : null;

  return (
    <AppShell
      header={
        <Container className="flex h-16 items-center justify-between gap-4">
          <Logo />
          <div className="flex items-center gap-3">
            {email ? (
              <span className="hidden text-sm text-muted-foreground sm:inline">
                {email}
              </span>
            ) : null}
            <Button asChild variant="ghost" size="sm">
              <Link href="/dashboard/settings">Settings</Link>
            </Button>
            <form action={logout}>
              <Button type="submit" variant="outline" size="sm">
                Sign out
              </Button>
            </form>
          </div>
        </Container>
      }
    >
      <Container className="py-section">
        <p className="text-sm font-medium text-muted-foreground">Dashboard</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          Welcome back{email ? `, ${email}` : ""}.
        </h1>
      </Container>
    </AppShell>
  );
}
