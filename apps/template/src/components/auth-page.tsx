import { AuthForm } from "@/components/auth-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Logo } from "@/components/logo";
import { FormFeedback } from "@/components/form-feedback";
import { productConfig } from "@/config/product";

type AuthPageProps = {
  mode: "login" | "signup";
  next: string;
  notice?: string;
};

export function AuthPage({ mode, next, notice }: AuthPageProps) {
  const isSignup = mode === "signup";

  return (
    <main className="flex min-h-svh items-center justify-center bg-muted/30 px-page py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="flex justify-center">
          <Logo name={productConfig.name} />
        </div>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              {isSignup ? "Create your account" : "Welcome back"}
            </CardTitle>
            <CardDescription>
              {isSignup
                ? "Use your email and a secure password to get started."
                : "Sign in with the email and password for your account."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {notice && (
              <FormFeedback kind="success" message={notice} className="mb-5" />
            )}
            <AuthForm mode={mode} next={next} />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
