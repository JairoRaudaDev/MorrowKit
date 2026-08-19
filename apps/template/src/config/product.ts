export const productConfig = {
  name: "MorrowKit",
  description: "Build what matters",
  companyName: "MorrowKit",
  dashboardLabel: "Workspace",
  plans: [
    {
      id: "free",
      name: "Starter",
      price: "$0",
      description: "For trying the product and validating an idea.",
      features: ["One workspace", "Core product features", "Community support"],
      cta: "Start free",
      featured: false,
    },
    {
      id: "pro",
      name: "Pro",
      price: "$29",
      description: "For individuals and small teams building momentum.",
      features: [
        "Unlimited projects",
        "Team collaboration",
        "Priority support",
      ],
      cta: "Choose Pro",
      featured: true,
    },
    {
      id: "business",
      name: "Business",
      price: "$99",
      description: "For growing teams that need more control.",
      features: ["Advanced permissions", "Usage insights", "Dedicated support"],
      cta: "Choose Business",
      featured: false,
    },
  ],
} as const;

export type Plan = (typeof productConfig.plans)[number]["id"];
export type PaidPlan = Exclude<Plan, "free">;

export const paidPlanIds = [
  "pro",
  "business",
] as const satisfies readonly PaidPlan[];
