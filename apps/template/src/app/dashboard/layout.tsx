import { DashboardShell } from "@/components/dashboard-shell";
import { requireAuth } from "@/lib/auth/session";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const claims = await requireAuth();
  const email = typeof claims.email === "string" ? claims.email : "Account";

  return <DashboardShell email={email}>{children}</DashboardShell>;
}
