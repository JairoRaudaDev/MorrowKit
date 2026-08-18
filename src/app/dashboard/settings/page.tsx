import { logout } from "@/app/auth/actions";
import { ActionForm } from "@/components/action-form";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getCurrentUser, getProfile } from "@/lib/db/queries";

import { ProfileForm } from "./profile-form";

export default async function AccountSettingsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const profile = await getProfile(user.id);
  const email = user.email ?? "Unavailable";
  const metadataDisplayName = user.user_metadata.display_name;
  const displayName =
    profile?.displayName ??
    (typeof metadataDisplayName === "string" ? metadataDisplayName : "");
  const initial = (displayName || email).trim().charAt(0).toUpperCase() || "A";

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8">
        <p className="text-sm font-medium text-muted-foreground">Settings</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          Account settings
        </h1>
        <p className="mt-2 text-muted-foreground">
          Manage your profile and account session.
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>
              Update the personal information shown in your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar className="size-14">
                <AvatarFallback className="text-base">{initial}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">Profile photo</p>
                <p className="text-sm text-muted-foreground">
                  Avatar uploads are coming soon.
                </p>
              </div>
              <Button className="ml-auto" variant="outline" disabled>
                Upload
              </Button>
            </div>

            <ProfileForm displayName={displayName} />

            <div className="space-y-2 border-t pt-5">
              <Label htmlFor="email">Email address</Label>
              <Input id="email" value={email} readOnly disabled />
              <p className="text-sm text-muted-foreground">
                Email changes and password management use separate secure flows.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Session</CardTitle>
            <CardDescription>
              Sign out of your account on this device.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ActionForm
              action={logout}
              label="Sign out"
              pendingLabel="Signing out…"
              pendingMessage="Ending your session…"
              variant="outline"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
import { redirect } from "next/navigation";
