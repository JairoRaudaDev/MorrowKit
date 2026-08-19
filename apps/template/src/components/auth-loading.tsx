import { Logo } from "@/components/logo";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function AuthLoading() {
  return (
    <main
      className="flex min-h-svh items-center justify-center bg-muted/30 px-page py-12"
      aria-label="Loading authentication page"
      aria-busy="true"
    >
      <div className="w-full max-w-md space-y-8">
        <div className="flex justify-center">
          <Logo />
        </div>
        <Card>
          <CardHeader className="items-center">
            <Skeleton className="h-8 w-44" />
            <Skeleton className="h-4 w-72 max-w-full" />
          </CardHeader>
          <CardContent className="space-y-5">
            {["email", "password"].map((field) => (
              <div className="space-y-2" key={field}>
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-9 w-full" />
              </div>
            ))}
            <Skeleton className="h-9 w-full" />
            <Skeleton className="mx-auto h-4 w-52" />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
