# Graph Report - SaaSSeed  (2026-08-19)

## Corpus Check
- 138 files · ~35,141 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 709 nodes · 1146 edges · 55 communities (47 shown, 8 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d6b32b4e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Graphify Pipeline
- pricing/actions.ts
- cn
- compilerOptions
- scripts
- MorrowKit
- devDependencies
- settings/page.tsx
- dependencies
- auth/actions.ts
- billing/page.tsx
- marketing.tsx
- Production deployment
- scripts
- create-morrowkit/package.json
- components.json
- track.ts
- Q: Create /dashboard/settings with display name, future avatar, email display, logout, separate password flows, and secure server-side mutations
- index.mjs
- 20260814010000_create_billing_tables.sql
- Q: Create a centralized entitlement layer that converts billing state into application permissions. Product code should depend on entitlements rather than querying Stripe-specific fields directly
- build.mjs
- Contributor Covenant Code of Conduct
- Security Policy
- setup.mjs
- 20260814000000_create_profiles.sql
- instrumentation.ts
- next.config.ts
- Q: Add integration tests covering authentication-dependent data access, profile operations, subscription persistence, and important Supabase RLS behavior
- 20260814020000_add_stripe_webhook_processing.sql
- Q: Add consistent pending, success, validation, and error feedback for authentication, account, checkout, and settings forms.
- playwright.config.ts
- postcss.config.mjs
- prettier.config.mjs
- instrumentation-client.ts
- create-morrowkit/README.md
- renovate.json
- pull_request_template.md
- auth-loading.tsx
- dashboard-loading.tsx
- auth-form.tsx
- utils.ts

## God Nodes (most connected - your core abstractions)
1. `cn()` - 60 edges
2. `createClient()` - 21 edges
3. `scripts` - 18 edges
4. `scripts` - 17 edges
5. `Button()` - 16 edges
6. `compilerOptions` - 16 edges
7. `getStripeConfig()` - 15 edges
8. `MorrowKit` - 15 edges
9. `Production deployment` - 14 edges
10. `getStripe()` - 13 edges

## Surprising Connections (you probably didn't know these)
- `Agent Instruction Integration` --semantically_similar_to--> `Graphify First Codebase Workflow`  [INFERRED] [semantically similar]
  .codex/skills/graphify/references/hooks.md → AGENTS.md
- `Graphify First Codebase Workflow` --references--> `Path and Explain Queries`  [EXTRACTED]
  AGENTS.md → .codex/skills/graphify/references/query.md
- `AppShell()` --calls--> `cn()`  [EXTRACTED]
  apps/template/src/components/app-shell.tsx → apps/template/src/lib/utils.ts
- `Separator()` --calls--> `cn()`  [EXTRACTED]
  apps/template/src/components/ui/separator.tsx → apps/template/src/lib/utils.ts
- `Graphify First Codebase Workflow` --references--> `Budget Aware Graph Traversal`  [EXTRACTED]
  AGENTS.md → .codex/skills/graphify/references/query.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Graphify Extraction Flow** — _codex_skills_graphify_skill_file_detection, _codex_skills_graphify_skill_structural_extraction, _codex_skills_graphify_skill_semantic_extraction, _codex_skills_graphify_skill_graph_build_and_clustering [EXTRACTED 1.00]
- **Scoped Graph Navigation Modes** — _codex_skills_graphify_references_query_constrained_query_expansion, _codex_skills_graphify_references_query_graph_traversal, _codex_skills_graphify_references_query_path_and_explain, agents_scoped_graph_navigation [INFERRED 0.85]

## Communities (55 total, 8 thin omitted)

### Community 0 - "Graphify Pipeline"
Cohesion: 0.08
Nodes (31): Folder Watch Incremental Rebuild, URL Ingestion, Optional Graph Exports, Token Reduction Benchmark, Edge Confidence Rubric, Deterministic Node IDs, Semantic Extraction JSON Schema, Cross Repository Graph Merge (+23 more)

### Community 1 - "pricing/actions.ts"
Cohesion: 0.07
Nodes (45): handledEvents, POST(), readWebhookBody(), BillingPortalFormState, createBillingPortalSession(), metadata, CheckoutFormState, checkoutSchema (+37 more)

### Community 2 - "cn"
Cohesion: 0.10
Nodes (30): navigation, Avatar(), AvatarBadge(), AvatarFallback(), AvatarGroup(), AvatarGroupCount(), AvatarImage(), CardAction() (+22 more)

### Community 3 - "compilerOptions"
Cohesion: 0.07
Nodes (27): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+19 more)

### Community 4 - "scripts"
Cohesion: 0.07
Nodes (27): description, engines, node, pnpm, license, name, packageManager, private (+19 more)

### Community 5 - "MorrowKit"
Cohesion: 0.07
Nodes (25): Architecture, Billing configuration, Contributing, Core application configuration, Deployment, Development, Email, Environment variables (+17 more)

### Community 6 - "devDependencies"
Cohesion: 0.07
Nodes (27): devDependencies, eslint, eslint-config-next, @playwright/test, prettier, prettier-plugin-tailwindcss, supabase, tailwindcss (+19 more)

### Community 7 - "settings/page.tsx"
Cohesion: 0.34
Nodes (8): stats, AuthPageProps, EmptyState(), Card(), CardContent(), CardDescription(), CardHeader(), CardTitle()

### Community 8 - "dependencies"
Cohesion: 0.06
Nodes (35): dependencies, class-variance-authority, clsx, lucide-react, next, posthog-node, radix-ui, react (+27 more)

### Community 9 - "auth/actions.ts"
Cohesion: 0.10
Nodes (33): authError(), AuthField, AuthValues, login(), logout(), LogoutFormState, signup(), GET() (+25 more)

### Community 10 - "billing/page.tsx"
Cohesion: 0.12
Nodes (23): BillingPage(), BillingPageProps, formatDate(), planLabels, statusLabels, PremiumInsightsPage(), DashboardLayout(), DashboardShell() (+15 more)

### Community 11 - "marketing.tsx"
Cohesion: 0.16
Nodes (8): metadata, CTA(), Features, Footer(), Hero(), Navbar(), Pricing(), StatePage()

### Community 12 - "Production deployment"
Cohesion: 0.07
Nodes (28): 10. Release and rollback, 1. Choose the environment model, 2. Pass the release gates, 3. Create and migrate Supabase production, 4. Configure Stripe live mode, 5. Import and configure the Vercel project, 6. Make the first Vercel deployment, 7. Attach the custom domain (+20 more)

### Community 13 - "scripts"
Cohesion: 0.07
Nodes (26): description, engines, node, pnpm, license, name, packageManager, private (+18 more)

### Community 14 - "create-morrowkit/package.json"
Cohesion: 0.08
Nodes (23): bin, create-morrowkit, description, devDependencies, prettier, engines, node, files (+15 more)

### Community 17 - "components.json"
Cohesion: 0.11
Nodes (17): aliases, components, hooks, lib, ui, utils, iconLibrary, rsc (+9 more)

### Community 18 - "track.ts"
Cohesion: 0.42
Nodes (4): AnalyticsEvent, AnalyticsEventName, AnalyticsEvents, AnalyticsProvider

### Community 19 - "Q: Create /dashboard/settings with display name, future avatar, email display, logout, separate password flows, and secure server-side mutations"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: Create /dashboard/settings with display name, future avatar, email display, logout, separate password flows, and secure server-side mutations, Source Nodes

### Community 20 - "index.mjs"
Cohesion: 0.12
Nodes (17): configureProject(), createApp(), entryDirectory, excludedTemplateEntries, finishProject(), normalizePackageName(), packagedTemplate, packageManagers (+9 more)

### Community 21 - "20260814010000_create_billing_tables.sql"
Cohesion: 0.32
Nodes (7): billing_customers_set_updated_at, public.billing_customers, public.subscriptions, auth.users, public.set_updated_at, subscriptions_set_updated_at, public

### Community 22 - "Q: Create a centralized entitlement layer that converts billing state into application permissions. Product code should depend on entitlements rather than querying Stripe-specific fields directly"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: Create a centralized entitlement layer that converts billing state into application permissions. Product code should depend on entitlements rather than querying Stripe-specific fields directly, Source Nodes

### Community 23 - "build.mjs"
Cohesion: 0.29
Nodes (6): dist, excluded, packagedTemplate, packageRoot, sourceTemplate, workspaceRoot

### Community 24 - "Contributor Covenant Code of Conduct"
Cohesion: 0.13
Nodes (13): Attribution, Contributor Covenant Code of Conduct, Enforcement responsibilities, Our pledge, Our standards, Reporting and enforcement, Scope, Branch strategy (+5 more)

### Community 25 - "Security Policy"
Cohesion: 0.50
Nodes (3): Reporting a Vulnerability, Security Policy, Supported Versions

### Community 26 - "setup.mjs"
Cohesion: 0.33
Nodes (5): environment, local, replacements, start, status

### Community 27 - "20260814000000_create_profiles.sql"
Cohesion: 0.33
Nodes (4): profiles_set_updated_at, public.profiles, auth.users, public.set_updated_at

### Community 29 - "next.config.ts"
Cohesion: 0.50
Nodes (3): canUploadSourceMaps, hasSentryDsn, nextConfig

### Community 30 - "Q: Add integration tests covering authentication-dependent data access, profile operations, subscription persistence, and important Supabase RLS behavior"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: Add integration tests covering authentication-dependent data access, profile operations, subscription persistence, and important Supabase RLS behavior, Source Nodes

### Community 32 - "Q: Add consistent pending, success, validation, and error feedback for authentication, account, checkout, and settings forms."
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: Add consistent pending, success, validation, and error feedback for authentication, account, checkout, and settings forms., Source Nodes

### Community 42 - "renovate.json"
Cohesion: 0.08
Nodes (25): before 6am on monday, before 6am on the first day of the month, config:recommended, dependencies, npm, security, automerge, dependencyDashboard (+17 more)

### Community 44 - "pull_request_template.md"
Cohesion: 0.33
Nodes (5): How to reproduce or verify, Reviewer notes, Screenshots or recordings, Tests, What changed

### Community 51 - "auth-loading.tsx"
Cohesion: 0.21
Nodes (7): AuthLoading(), Container(), ContainerProps, containerSizes, Logo(), LogoProps, Skeleton()

### Community 54 - "auth-form.tsx"
Cohesion: 0.17
Nodes (12): AuthFormState, ActionForm(), ActionFormProps, AuthForm(), AuthFormProps, initialState, FormFeedback(), FormFeedbackProps (+4 more)

### Community 55 - "utils.ts"
Cohesion: 0.29
Nodes (3): AppShell(), AppShellProps, Separator()

## Knowledge Gaps
- **308 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+303 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Work-memory lessons

**Preferred sources** — corroborated by past sessions; start here.
- `logout()` (2× useful, score=1.829408473) _(code changed — re-verify)_

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `settings/page.tsx`, `billing/page.tsx`, `marketing.tsx`, `auth-loading.tsx`, `dashboard-loading.tsx`, `auth-form.tsx`, `utils.ts`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `scripts`?**
  _High betweenness centrality (0.010) - this node is a cross-community bridge._
- **Why does `productConfig` connect `pricing/actions.ts` to `cn`, `settings/page.tsx`, `billing/page.tsx`, `marketing.tsx`, `auth-loading.tsx`, `auth-form.tsx`?**
  _High betweenness centrality (0.009) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _308 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Graphify Pipeline` be split into smaller, more focused modules?**
  _Cohesion score 0.07526881720430108 - nodes in this community are weakly interconnected._
- **Should `pricing/actions.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06905370843989769 - nodes in this community are weakly interconnected._
- **Should `cn` be split into smaller, more focused modules?**
  _Cohesion score 0.10128205128205128 - nodes in this community are weakly interconnected._