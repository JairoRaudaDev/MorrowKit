"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CreditCard,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  UserRound,
} from "lucide-react";

import { logout } from "@/app/auth/actions";
import { Logo } from "@/components/logo";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const navigation = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
  { href: "/dashboard/billing", label: "Billing", icon: CreditCard },
] as const;

function Navigation({ mobile = false }: { mobile?: boolean }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Dashboard navigation" className="space-y-1">
      {navigation.map((item) => {
        const active =
          pathname === item.href ||
          (item.href !== "/dashboard" && pathname.startsWith(`${item.href}/`));
        const link = (
          <Link
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:bg-accent/70 hover:text-foreground",
            )}
          >
            <item.icon className="size-4" aria-hidden="true" />
            {item.label}
          </Link>
        );

        return mobile ? (
          <DialogClose asChild key={item.href}>
            {link}
          </DialogClose>
        ) : (
          <div key={item.href}>{link}</div>
        );
      })}
    </nav>
  );
}

function Breadcrumbs() {
  const pathname = usePathname();
  const current = navigation.find((item) => item.href === pathname);

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm">
      <Link
        href="/dashboard"
        className="text-muted-foreground transition-colors hover:text-foreground"
      >
        Dashboard
      </Link>
      {current && current.href !== "/dashboard" ? (
        <>
          <span aria-hidden="true" className="text-muted-foreground/60">
            /
          </span>
          <span aria-current="page" className="font-medium">
            {current.label}
          </span>
        </>
      ) : null}
    </nav>
  );
}

function UserMenu({ email }: { email: string }) {
  const initial = email.trim().charAt(0).toUpperCase() || "A";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-9 gap-2 px-2"
          aria-label="Open account menu"
        >
          <Avatar size="sm">
            <AvatarFallback>{initial}</AvatarFallback>
          </Avatar>
          <span className="hidden max-w-40 truncate text-sm sm:inline">
            {email}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuLabel>
          <span className="block text-xs font-normal text-muted-foreground">
            Signed in as
          </span>
          <span className="block truncate">{email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/settings">
              <UserRound /> Account settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/billing">
              <CreditCard /> Billing
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <form action={logout}>
          <DropdownMenuItem asChild>
            <button type="submit" className="w-full">
              <LogOut /> Sign out
            </button>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function DashboardShell({
  children,
  email,
}: {
  children: React.ReactNode;
  email: string;
}) {
  return (
    <div className="min-h-svh bg-muted/20">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r bg-background lg:flex">
        <div className="flex h-16 items-center border-b px-5">
          <Logo href="/dashboard" />
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <p className="mb-2 px-3 text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Workspace
          </p>
          <Navigation />
        </div>
        <div className="border-t p-4 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Your Company
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b bg-background/95 px-page backdrop-blur supports-[backdrop-filter]:bg-background/80">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                aria-label="Open navigation"
              >
                <Menu />
              </Button>
            </DialogTrigger>
            <DialogContent
              showCloseButton
              className="top-0 left-0 h-svh max-w-72 translate-x-0 translate-y-0 content-start rounded-none border-y-0 border-l-0 p-0"
            >
              <DialogTitle className="sr-only">
                Dashboard navigation
              </DialogTitle>
              <DialogDescription className="sr-only">
                Navigate between dashboard pages.
              </DialogDescription>
              <div className="flex h-16 items-center border-b px-5">
                <Logo href="/dashboard" />
              </div>
              <div className="p-4">
                <Navigation mobile />
              </div>
            </DialogContent>
          </Dialog>

          <Breadcrumbs />
          <div className="ml-auto">
            <UserMenu email={email} />
          </div>
        </header>
        <main className="p-page sm:py-8">{children}</main>
      </div>
    </div>
  );
}
