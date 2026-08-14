import {
  ArrowRight,
  Check,
  Layers3,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

import { createCheckoutSession } from "@/app/pricing/actions";
import { Container } from "@/components/container";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Layers3,
    title: "A focused foundation",
    description:
      "Start with the essentials, then shape the product around your customers instead of a rigid template.",
  },
  {
    icon: Sparkles,
    title: "Thoughtful by default",
    description:
      "Clear hierarchy, sensible spacing, and accessible components give every screen a polished baseline.",
  },
  {
    icon: ShieldCheck,
    title: "Ready to grow",
    description:
      "Production-minded patterns keep the first release simple without getting in the way of what comes next.",
  },
];

const plans = [
  {
    name: "Starter",
    price: "$0",
    description: "For trying the product and validating an idea.",
    features: ["One workspace", "Core product features", "Community support"],
    cta: "Start free",
    featured: false,
    plan: null,
  },
  {
    name: "Pro",
    price: "$29",
    description: "For individuals and small teams building momentum.",
    features: ["Unlimited projects", "Team collaboration", "Priority support"],
    cta: "Choose Pro",
    featured: true,
    plan: "pro",
  },
  {
    name: "Business",
    price: "$99",
    description: "For growing teams that need more control.",
    features: ["Advanced permissions", "Usage insights", "Dedicated support"],
    cta: "Choose Business",
    featured: false,
    plan: "business",
  },
];

export function Navbar() {
  return (
    <header className="border-b bg-background/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Logo name="SaaSSeed" />
        <nav
          className="hidden items-center gap-7 text-sm text-muted-foreground sm:flex"
          aria-label="Main navigation"
        >
          <Link
            className="transition-colors hover:text-foreground"
            href="/#features"
          >
            Features
          </Link>
          <Link
            className="transition-colors hover:text-foreground"
            href="/pricing"
          >
            Pricing
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="hidden sm:inline-flex"
          >
            <Link href="/login">Sign in</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/signup">Get started</Link>
          </Button>
        </div>
      </Container>
    </header>
  );
}

export function Hero() {
  return (
    <section className="border-b">
      <Container className="grid gap-12 py-20 md:grid-cols-[1.05fr_.95fr] md:items-center md:py-28">
        <div>
          <p className="mb-5 text-sm font-medium text-muted-foreground">
            A clear way to move your work forward
          </p>
          <h1 className="max-w-3xl text-5xl font-semibold tracking-[-0.04em] sm:text-6xl lg:text-7xl">
            Build what matters. Leave the busywork behind.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
            SaaSSeed gives your team a calm, capable place to plan, collaborate,
            and ship—with less setup and fewer distractions.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/signup">
                Start building <ArrowRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/pricing">View pricing</Link>
            </Button>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-2xl border bg-muted/40 p-5 shadow-sm">
          <div className="rounded-xl border bg-background p-5 shadow-sm">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Project overview</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  A simple view of what matters now
                </p>
              </div>
              <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium">
                On track
              </span>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ["12", "In progress"],
                ["28", "Completed"],
                ["4", "Needs review"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-lg border p-4">
                  <p className="text-2xl font-semibold">{value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-3">
              {[
                "Finalize onboarding",
                "Review launch copy",
                "Prepare customer update",
              ].map((item, index) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-lg border px-4 py-3 text-sm"
                >
                  <span className="grid size-6 place-items-center rounded-full bg-secondary text-xs">
                    {index + 1}
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function Features() {
  return (
    <section id="features" className="scroll-mt-16 py-section">
      <Container>
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-muted-foreground">
            Everything you need
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            A better starting point for useful software.
          </h2>
        </div>
        <div className="mt-12 grid gap-px overflow-hidden rounded-xl border bg-border md:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <article key={title} className="bg-background p-7 sm:p-8">
              <Icon className="size-5" aria-hidden="true" />
              <h3 className="mt-8 font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function CTA() {
  return (
    <section className="pb-section">
      <Container>
        <div className="flex flex-col gap-7 rounded-2xl bg-foreground px-7 py-10 text-background sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Ready to make progress?
            </h2>
            <p className="mt-2 text-sm text-background/70">
              Start free today. Upgrade when your team is ready.
            </p>
          </div>
          <Button asChild size="lg" variant="secondary">
            <Link href="/signup">
              Get started <ArrowRight />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}

export function Pricing() {
  return (
    <main>
      <section className="py-20 sm:py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium text-muted-foreground">
              Simple pricing
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Choose the plan that fits.
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              Start small, change plans anytime, and keep your focus on the
              work.
            </p>
          </div>
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {plans.map((plan) => (
              <article
                key={plan.name}
                className={`flex flex-col rounded-2xl border p-7 ${plan.featured ? "border-foreground shadow-lg" : ""}`}
              >
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold">{plan.name}</h2>
                  {plan.featured && (
                    <span className="rounded-full bg-foreground px-2.5 py-1 text-xs font-medium text-background">
                      Popular
                    </span>
                  )}
                </div>
                <div className="mt-7 flex items-end gap-1">
                  <span className="text-4xl font-semibold tracking-tight">
                    {plan.price}
                  </span>
                  <span className="pb-1 text-sm text-muted-foreground">
                    / month
                  </span>
                </div>
                <p className="mt-4 min-h-12 text-sm leading-6 text-muted-foreground">
                  {plan.description}
                </p>
                <ul className="my-7 space-y-3 text-sm">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-3">
                      <Check
                        className="mt-0.5 size-4 shrink-0"
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
                {plan.plan ? (
                  <form action={createCheckoutSession} className="mt-auto">
                    <input type="hidden" name="plan" value={plan.plan} />
                    <Button
                      type="submit"
                      variant={plan.featured ? "default" : "outline"}
                      className="w-full"
                    >
                      {plan.cta}
                    </Button>
                  </form>
                ) : (
                  <Button asChild variant="outline" className="mt-auto">
                    <Link href="/signup">{plan.cta}</Link>
                  </Button>
                )}
              </article>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}

export function Footer() {
  return (
    <footer className="border-t">
      <Container className="flex flex-col gap-5 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <Logo name="SaaSSeed" className="text-foreground" />
        <p>© {new Date().getFullYear()} SaaSSeed. Built to be made your own.</p>
        <div className="flex gap-5">
          <Link className="hover:text-foreground" href="/pricing">
            Pricing
          </Link>
          <Link className="hover:text-foreground" href="/login">
            Sign in
          </Link>
        </div>
      </Container>
    </footer>
  );
}
