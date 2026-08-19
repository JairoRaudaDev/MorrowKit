# Graph Report - SaaSSeed  (2026-08-19)

## Corpus Check
- 220 files · ~49,233 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1134 nodes · 1853 edges · 101 communities (79 shown, 22 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 6 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b7657c82`
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
- template/src/app/dashboard/settings/page.tsx
- dependencies
- template/src/app/auth/actions.ts
- billing/page.tsx
- template/src/components/ui/button.tsx
- Production deployment
- scripts
- create-morrowkit/package.json
- components.json
- MorrowKit
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
- minimal/src/app/auth/actions.ts
- renovate.json
- pull_request_template.md
- template/src/components/auth-loading.tsx
- template/src/components/dashboard-loading.tsx
- cn
- utils.ts
- Q: Polish create-morrowkit output with concise progress indicators, useful validation errors, clean cancellation behavior, and clear next-step instructions.
- compilerOptions
- dependencies
- minimal/src/components/marketing.tsx
- minimal/src/lib/utils.ts
- minimal/src/app/dashboard/settings/page.tsx
- minimal/components.json
- devDependencies
- scripts
- minimal/src/components/auth-form.tsx
- template/src/components/marketing.tsx
- create-morrowkit
- README.md
- template/package.json
- minimal/package.json
- Production launch checklist
- Contributing to MorrowKit
- minimal/src/components/logo.tsx
- minimal/scripts/setup.mjs
- minimal/supabase/migrations/20260814000000_create_profiles.sql
- 9. Validate the production system
- minimal/src/instrumentation.ts
- minimal/next.config.ts
- MorrowKit application
- prettier-plugin-tailwindcss
- tailwindcss
- @tailwindcss/postcss
- typescript
- vitest
- prettier-plugin-tailwindcss
- tailwindcss
- @tailwindcss/postcss
- typescript
- vitest
- minimal/playwright.config.ts
- minimal/postcss.config.mjs
- minimal/prettier.config.mjs
- minimal/src/instrumentation-client.ts

## God Nodes (most connected - your core abstractions)
1. `cn()` - 60 edges
2. `cn()` - 60 edges
3. `createClient()` - 21 edges
4. `createClient()` - 20 edges
5. `scripts` - 18 edges
6. `scripts` - 17 edges
7. `scripts` - 17 edges
8. `Button()` - 16 edges
9. `compilerOptions` - 16 edges
10. `compilerOptions` - 16 edges

## Surprising Connections (you probably didn't know these)
- `Agent Instruction Integration` --semantically_similar_to--> `Graphify First Codebase Workflow`  [INFERRED] [semantically similar]
  .codex/skills/graphify/references/hooks.md → AGENTS.md
- `Graphify First Codebase Workflow` --references--> `Path and Explain Queries`  [EXTRACTED]
  AGENTS.md → .codex/skills/graphify/references/query.md
- `AppShell()` --calls--> `cn()`  [EXTRACTED]
  apps/template/src/components/app-shell.tsx → apps/template/src/lib/utils.ts
- `Separator()` --calls--> `cn()`  [EXTRACTED]
  apps/template/src/components/ui/separator.tsx → apps/template/src/lib/utils.ts
- `ProfileForm()` --indirect_call--> `updateProfile()`  [INFERRED]
  tmp/v0.1.0-release-verification/minimal/src/app/dashboard/settings/profile-form.tsx → tmp/v0.1.0-release-verification/minimal/src/app/dashboard/settings/actions.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Graphify Extraction Flow** — _codex_skills_graphify_skill_file_detection, _codex_skills_graphify_skill_structural_extraction, _codex_skills_graphify_skill_semantic_extraction, _codex_skills_graphify_skill_graph_build_and_clustering [EXTRACTED 1.00]
- **Scoped Graph Navigation Modes** — _codex_skills_graphify_references_query_constrained_query_expansion, _codex_skills_graphify_references_query_graph_traversal, _codex_skills_graphify_references_query_path_and_explain, agents_scoped_graph_navigation [INFERRED 0.85]

## Communities (101 total, 22 thin omitted)

### Community 0 - "Graphify Pipeline"
Cohesion: 0.08
Nodes (31): Folder Watch Incremental Rebuild, URL Ingestion, Optional Graph Exports, Token Reduction Benchmark, Edge Confidence Rubric, Deterministic Node IDs, Semantic Extraction JSON Schema, Cross Repository Graph Merge (+23 more)

### Community 1 - "pricing/actions.ts"
Cohesion: 0.05
Nodes (57): handledEvents, POST(), readWebhookBody(), BillingPortalFormState, createBillingPortalSession(), metadata, CheckoutFormState, checkoutSchema (+49 more)

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
Cohesion: 0.09
Nodes (23): Architecture, Billing configuration, Contributing, Core application configuration, Deployment, Development, Email, Environment variables (+15 more)

### Community 6 - "devDependencies"
Cohesion: 0.12
Nodes (17): devDependencies, eslint, eslint-config-next, @playwright/test, prettier, supabase, @types/node, @types/react (+9 more)

### Community 7 - "template/src/app/dashboard/settings/page.tsx"
Cohesion: 0.23
Nodes (11): stats, AuthForm(), AuthPageProps, EmptyState(), Card(), CardContent(), CardDescription(), CardHeader() (+3 more)

### Community 8 - "dependencies"
Cohesion: 0.06
Nodes (35): dependencies, class-variance-authority, clsx, lucide-react, next, posthog-node, radix-ui, react (+27 more)

### Community 9 - "template/src/app/auth/actions.ts"
Cohesion: 0.09
Nodes (36): authError(), AuthField, AuthFormState, AuthValues, login(), logout(), LogoutFormState, signup() (+28 more)

### Community 10 - "billing/page.tsx"
Cohesion: 0.12
Nodes (23): BillingPage(), BillingPageProps, formatDate(), planLabels, statusLabels, PremiumInsightsPage(), DashboardLayout(), DashboardShell() (+15 more)

### Community 11 - "template/src/components/ui/button.tsx"
Cohesion: 0.19
Nodes (7): ActionForm(), ActionFormProps, FormFeedback(), FormFeedbackProps, StatePage(), Button(), buttonVariants

### Community 12 - "Production deployment"
Cohesion: 0.14
Nodes (14): 10. Release and rollback, 1. Choose the environment model, 2. Pass the release gates, 3. Create and migrate Supabase production, 4. Configure Stripe live mode, 5. Import and configure the Vercel project, 6. Make the first Vercel deployment, 7. Attach the custom domain (+6 more)

### Community 13 - "scripts"
Cohesion: 0.12
Nodes (17): scripts, build, dev, format, format:check, lint, setup, start (+9 more)

### Community 14 - "create-morrowkit/package.json"
Cohesion: 0.06
Nodes (34): bin, create-morrowkit, bugs, url, description, devDependencies, prettier, engines (+26 more)

### Community 17 - "components.json"
Cohesion: 0.11
Nodes (17): aliases, components, hooks, lib, ui, utils, iconLibrary, rsc (+9 more)

### Community 18 - "MorrowKit"
Cohesion: 0.14
Nodes (14): Application setup, Architecture, Contributing, Create a project, Features, Generated application, Interactive, License (+6 more)

### Community 19 - "Q: Create /dashboard/settings with display name, future avatar, email display, logout, separate password flows, and secure server-side mutations"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: Create /dashboard/settings with display name, future avatar, email display, logout, separate password flows, and secure server-side mutations, Source Nodes

### Community 20 - "index.mjs"
Cohesion: 0.09
Nodes (27): analyticsModulePaths, CancellationError, configureProject(), createApp(), emailModulePaths, entryDirectory, excludedTemplateEntries, finishProject() (+19 more)

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
Cohesion: 0.29
Nodes (7): Attribution, Contributor Covenant Code of Conduct, Enforcement responsibilities, Our pledge, Our standards, Reporting and enforcement, Scope

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

### Community 38 - "minimal/src/app/auth/actions.ts"
Cohesion: 0.06
Nodes (43): authError(), AuthField, AuthFormState, AuthValues, login(), logout(), LogoutFormState, signup() (+35 more)

### Community 42 - "renovate.json"
Cohesion: 0.08
Nodes (25): before 6am on monday, before 6am on the first day of the month, config:recommended, dependencies, npm, security, automerge, dependencyDashboard (+17 more)

### Community 44 - "pull_request_template.md"
Cohesion: 0.33
Nodes (5): How to reproduce or verify, Reviewer notes, Screenshots or recordings, Tests, What changed

### Community 51 - "template/src/components/auth-loading.tsx"
Cohesion: 0.21
Nodes (7): AuthLoading(), Container(), ContainerProps, containerSizes, Logo(), LogoProps, Skeleton()

### Community 53 - "cn"
Cohesion: 0.09
Nodes (32): ActionForm(), navigation, Avatar(), AvatarBadge(), AvatarFallback(), AvatarGroup(), AvatarGroupCount(), AvatarImage() (+24 more)

### Community 54 - "utils.ts"
Cohesion: 0.29
Nodes (3): AppShell(), AppShellProps, Separator()

### Community 55 - "Q: Polish create-morrowkit output with concise progress indicators, useful validation errors, clean cancellation behavior, and clear next-step instructions."
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: Polish create-morrowkit output with concise progress indicators, useful validation errors, clean cancellation behavior, and clear next-step instructions., Source Nodes

### Community 56 - "compilerOptions"
Cohesion: 0.07
Nodes (27): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+19 more)

### Community 57 - "dependencies"
Cohesion: 0.07
Nodes (27): dependencies, class-variance-authority, clsx, lucide-react, next, radix-ui, react, react-dom (+19 more)

### Community 58 - "minimal/src/components/marketing.tsx"
Cohesion: 0.18
Nodes (9): ActionFormProps, CTA(), Features, Footer(), Hero(), Navbar(), StatePage(), Button() (+1 more)

### Community 59 - "minimal/src/lib/utils.ts"
Cohesion: 0.14
Nodes (8): AppShell(), AppShellProps, Container(), ContainerProps, containerSizes, DashboardLoading(), Separator(), Skeleton()

### Community 60 - "minimal/src/app/dashboard/settings/page.tsx"
Cohesion: 0.23
Nodes (10): stats, AuthLoading(), AuthPageProps, EmptyState(), Logo(), Card(), CardContent(), CardDescription() (+2 more)

### Community 61 - "minimal/components.json"
Cohesion: 0.11
Nodes (17): aliases, components, hooks, lib, ui, utils, iconLibrary, rsc (+9 more)

### Community 62 - "devDependencies"
Cohesion: 0.12
Nodes (17): devDependencies, eslint, eslint-config-next, @playwright/test, prettier, supabase, @types/node, @types/react (+9 more)

### Community 63 - "scripts"
Cohesion: 0.12
Nodes (17): scripts, build, dev, format, format:check, lint, setup, start (+9 more)

### Community 64 - "minimal/src/components/auth-form.tsx"
Cohesion: 0.23
Nodes (9): initialState, ProfileForm(), AuthForm(), AuthFormProps, initialState, FormFeedback(), FormFeedbackProps, Input() (+1 more)

### Community 65 - "template/src/components/marketing.tsx"
Cohesion: 0.28
Nodes (8): metadata, CTA(), Features, Footer(), Hero(), Navbar(), Pricing(), productConfig

### Community 66 - "create-morrowkit"
Cohesion: 0.17
Nodes (12): CLI flags, create-morrowkit, Examples, Generated project structure, Interactive options, License, Optional modules, PostHog analytics (+4 more)

### Community 67 - "README.md"
Cohesion: 0.22
Nodes (4): [0.1.0] - 2026-08-19, Added, Changelog, [Unreleased]

### Community 68 - "template/package.json"
Cohesion: 0.20
Nodes (9): description, engines, node, pnpm, license, name, packageManager, private (+1 more)

### Community 69 - "minimal/package.json"
Cohesion: 0.20
Nodes (9): description, engines, node, pnpm, license, name, packageManager, private (+1 more)

### Community 70 - "Production launch checklist"
Cohesion: 0.22
Nodes (9): Domain and SEO, Email, Legal and customer-facing content, Monitoring and analytics, Production launch checklist, Production smoke tests, Security and access, Stripe (+1 more)

### Community 71 - "Contributing to MorrowKit"
Cohesion: 0.25
Nodes (8): Branch strategy, Commit convention, Contributing to MorrowKit, Maintainer release checklist, Pull requests, Setup, Tests and checks, Versioning and releases

### Community 72 - "minimal/src/components/logo.tsx"
Cohesion: 0.38
Nodes (3): metadata, LogoProps, productConfig

### Community 73 - "minimal/scripts/setup.mjs"
Cohesion: 0.33
Nodes (5): environment, local, replacements, start, status

### Community 74 - "minimal/supabase/migrations/20260814000000_create_profiles.sql"
Cohesion: 0.33
Nodes (4): profiles_set_updated_at, public.profiles, auth.users, public.set_updated_at

### Community 75 - "9. Validate the production system"
Cohesion: 0.40
Nodes (5): 9. Validate the production system, Authentication and email, Billing and webhooks, Infrastructure, Operations

### Community 77 - "minimal/next.config.ts"
Cohesion: 0.50
Nodes (3): canUploadSourceMaps, hasSentryDsn, nextConfig

### Community 78 - "MorrowKit application"
Cohesion: 0.50
Nodes (3): Commands, Get started, MorrowKit application

## Knowledge Gaps
- **479 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+474 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **22 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Work-memory lessons

**Preferred sources** — corroborated by past sessions; start here.
- `logout()` (2× useful, score=1.796761508)

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `keywords` connect `pricing/actions.ts` to `create-morrowkit/package.json`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `template/src/app/dashboard/settings/page.tsx`, `billing/page.tsx`, `template/src/components/ui/button.tsx`, `template/src/components/auth-loading.tsx`, `template/src/components/dashboard-loading.tsx`, `utils.ts`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _479 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Graphify Pipeline` be split into smaller, more focused modules?**
  _Cohesion score 0.07526881720430108 - nodes in this community are weakly interconnected._
- **Should `pricing/actions.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05088919288645691 - nodes in this community are weakly interconnected._
- **Should `cn` be split into smaller, more focused modules?**
  _Cohesion score 0.10128205128205128 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.07142857142857142 - nodes in this community are weakly interconnected._