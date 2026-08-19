import { redirect } from "next/navigation";

import { AuthPage } from "@/components/auth-page";
import { safeNextPath } from "@/lib/auth/validation";
import { createClient } from "@/lib/supabase/server";

type LoginPageProps = {
  searchParams: Promise<{ next?: string; status?: string; error?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const next = safeNextPath(params.next ?? null);
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  if (data?.claims) redirect(next);

  const notice =
    params.status === "signed-out"
      ? "You have been signed out."
      : params.error === "callback"
        ? "That confirmation link is invalid or has expired. Request a new one by signing up again."
        : undefined;

  return <AuthPage mode="login" next={next} notice={notice} />;
}
