import { redirect } from "next/navigation";

import { AuthPage } from "@/components/auth-page";
import { safeNextPath } from "@/lib/auth/validation";
import { createClient } from "@/lib/supabase/server";

type SignupPageProps = {
  searchParams: Promise<{ next?: string; status?: string; email?: string }>;
};

export default async function SignupPage({ searchParams }: SignupPageProps) {
  const params = await searchParams;
  const next = safeNextPath(params.next ?? null);
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  if (data?.claims) redirect(next);

  const notice =
    params.status === "check-email"
      ? `Check ${params.email ?? "your email"} and follow the confirmation link to finish signing in.`
      : undefined;

  return <AuthPage mode="signup" next={next} notice={notice} />;
}
