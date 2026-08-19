# Graph Report - SaaSSeed  (2026-08-18)

## Corpus Check
- 130 files · ~32,592 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 615 nodes · 1019 edges · 47 communities (40 shown, 7 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `6e23806d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Graphify Pipeline
- cn
- components.json
- compilerOptions
- scripts
- MorrowKit
- devDependencies
- auth/actions.ts
- dependencies
- layout.tsx
- postcss.config.mjs
- billing/page.tsx
- 20260814000000_create_profiles.sql
- prettier.config.mjs
- pricing/actions.ts
- Q: Create /dashboard/settings with display name, future avatar, email display, logout, separate password flows, and secure server-side mutations
- marketing.tsx
- 20260814010000_create_billing_tables.sql
- Q: Create a centralized entitlement layer that converts billing state into application permissions. Product code should depend on entitlements rather than querying Stripe-specific fields directly
- 20260814020000_add_stripe_webhook_processing.sql
- Contributor Covenant Code of Conduct
- Security Policy
- instrumentation.ts
- next.config.ts
- instrumentation-client.ts
- Q: Add integration tests covering authentication-dependent data access, profile operations, subscription persistence, and important Supabase RLS behavior
- entitlements.ts
- Q: Add consistent pending, success, validation, and error feedback for authentication, account, checkout, and settings forms.
- playwright.config.ts
- renovate.json
- track.ts
- pull_request_template.md
- public.ts
- Production deployment

## God Nodes (most connected - your core abstractions)
1. `cn()` - 60 edges
2. `createClient()` - 21 edges
3. `scripts` - 16 edges
4. `Button()` - 16 edges
5. `compilerOptions` - 16 edges
6. `MorrowKit` - 15 edges
7. `Production deployment` - 14 edges
8. `runMutation()` - 12 edges
9. `safeNextPath()` - 11 edges
10. `Card()` - 9 edges

## Surprising Connections (you probably didn't know these)
- `Agent Instruction Integration` --semantically_similar_to--> `Graphify First Codebase Workflow`  [INFERRED] [semantically similar]
  .codex/skills/graphify/references/hooks.md → AGENTS.md
- `Graphify First Codebase Workflow` --references--> `Path and Explain Queries`  [EXTRACTED]
  AGENTS.md → .codex/skills/graphify/references/query.md
- `ProfileForm()` --indirect_call--> `updateProfile()`  [INFERRED]
  src/app/dashboard/settings/profile-form.tsx → src/app/dashboard/settings/actions.ts
- `Graphify First Codebase Workflow` --references--> `Budget Aware Graph Traversal`  [EXTRACTED]
  AGENTS.md → .codex/skills/graphify/references/query.md
- `Graphify First Codebase Workflow` --references--> `Incremental Graph Update`  [EXTRACTED]
  AGENTS.md → .codex/skills/graphify/references/update.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Graphify Extraction Flow** — _codex_skills_graphify_skill_file_detection, _codex_skills_graphify_skill_structural_extraction, _codex_skills_graphify_skill_semantic_extraction, _codex_skills_graphify_skill_graph_build_and_clustering [EXTRACTED 1.00]
- **Scoped Graph Navigation Modes** — _codex_skills_graphify_references_query_constrained_query_expansion, _codex_skills_graphify_references_query_graph_traversal, _codex_skills_graphify_references_query_path_and_explain, agents_scoped_graph_navigation [INFERRED 0.85]

## Communities (47 total, 7 thin omitted)

### Community 0 - "Graphify Pipeline"
Cohesion: 0.08
Nodes (31): Folder Watch Incremental Rebuild, URL Ingestion, Optional Graph Exports, Token Reduction Benchmark, Edge Confidence Rubric, Deterministic Node IDs, Semantic Extraction JSON Schema, Cross Repository Graph Merge (+23 more)

### Community 1 - "cn"
Cohesion: 0.08
Nodes (33): AppShell(), AppShellProps, navigation, Avatar(), AvatarBadge(), AvatarFallback(), AvatarGroup(), AvatarGroupCount() (+25 more)

### Community 2 - "components.json"
Cohesion: 0.11
Nodes (17): aliases, components, hooks, lib, ui, utils, iconLibrary, rsc (+9 more)

### Community 3 - "compilerOptions"
Cohesion: 0.07
Nodes (27): dom, dom.iterable, esnext, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts (+19 more)

### Community 4 - "scripts"
Cohesion: 0.08
Nodes (25): description, engines, node, pnpm, license, name, packageManager, private (+17 more)

### Community 5 - "MorrowKit"
Cohesion: 0.08
Nodes (22): Architecture, Contributing, Deployment, Development, Email, Environment variables, Features, Hosted project (+14 more)

### Community 6 - "devDependencies"
Cohesion: 0.07
Nodes (27): eslint, eslint-config-next, devDependencies, eslint, eslint-config-next, @playwright/test, prettier, prettier-plugin-tailwindcss (+19 more)

### Community 7 - "auth/actions.ts"
Cohesion: 0.14
Nodes (24): authError(), AuthField, AuthFormState, AuthValues, login(), logout(), LogoutFormState, signup() (+16 more)

### Community 8 - "dependencies"
Cohesion: 0.06
Nodes (35): class-variance-authority, clsx, lucide-react, next, dependencies, class-variance-authority, clsx, lucide-react (+27 more)

### Community 11 - "billing/page.tsx"
Cohesion: 0.08
Nodes (28): BillingPageProps, planLabels, statusLabels, stats, initialState, ProfileForm(), ActionForm(), ActionFormProps (+20 more)

### Community 13 - "20260814000000_create_profiles.sql"
Cohesion: 0.33
Nodes (4): profiles_set_updated_at, public.profiles, auth.users, public.set_updated_at

### Community 17 - "pricing/actions.ts"
Cohesion: 0.10
Nodes (33): handledEvents, POST(), readWebhookBody(), BillingPortalFormState, createBillingPortalSession(), ProfileFormState, profileSchema, updateProfile() (+25 more)

### Community 19 - "Q: Create /dashboard/settings with display name, future avatar, email display, logout, separate password flows, and secure server-side mutations"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: Create /dashboard/settings with display name, future avatar, email display, logout, separate password flows, and secure server-side mutations, Source Nodes

### Community 20 - "marketing.tsx"
Cohesion: 0.13
Nodes (14): metadata, Container(), ContainerProps, containerSizes, CTA(), Features, Footer(), Hero() (+6 more)

### Community 21 - "20260814010000_create_billing_tables.sql"
Cohesion: 0.32
Nodes (7): public, billing_customers_set_updated_at, public.billing_customers, public.subscriptions, auth.users, public.set_updated_at, subscriptions_set_updated_at

### Community 22 - "Q: Create a centralized entitlement layer that converts billing state into application permissions. Product code should depend on entitlements rather than querying Stripe-specific fields directly"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: Create a centralized entitlement layer that converts billing state into application permissions. Product code should depend on entitlements rather than querying Stripe-specific fields directly, Source Nodes

### Community 24 - "Contributor Covenant Code of Conduct"
Cohesion: 0.13
Nodes (13): Attribution, Contributor Covenant Code of Conduct, Enforcement responsibilities, Our pledge, Our standards, Reporting and enforcement, Scope, Branch strategy (+5 more)

### Community 25 - "Security Policy"
Cohesion: 0.50
Nodes (3): Reporting a Vulnerability, Security Policy, Supported Versions

### Community 27 - "next.config.ts"
Cohesion: 0.50
Nodes (3): canUploadSourceMaps, hasSentryDsn, nextConfig

### Community 30 - "Q: Add integration tests covering authentication-dependent data access, profile operations, subscription persistence, and important Supabase RLS behavior"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: Add integration tests covering authentication-dependent data access, profile operations, subscription persistence, and important Supabase RLS behavior, Source Nodes

### Community 31 - "entitlements.ts"
Cohesion: 0.13
Nodes (19): BillingPage(), formatDate(), PremiumInsightsPage(), DashboardLayout(), DashboardShell(), requireAuth(), getSubscription, getEntitlements() (+11 more)

### Community 32 - "Q: Add consistent pending, success, validation, and error feedback for authentication, account, checkout, and settings forms."
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: Add consistent pending, success, validation, and error feedback for authentication, account, checkout, and settings forms., Source Nodes

### Community 42 - "renovate.json"
Cohesion: 0.08
Nodes (25): before 6am on monday, before 6am on the first day of the month, config:recommended, dependencies, npm, security, automerge, dependencyDashboard (+17 more)

### Community 43 - "track.ts"
Cohesion: 0.42
Nodes (4): AnalyticsEvent, AnalyticsEventName, AnalyticsEvents, AnalyticsProvider

### Community 44 - "pull_request_template.md"
Cohesion: 0.33
Nodes (5): How to reproduce or verify, Reviewer notes, Screenshots or recordings, Tests, What changed

### Community 45 - "public.ts"
Cohesion: 0.11
Nodes (17): WelcomeEmail(), WelcomeEmailProps, publicEnv, privateEnv, serverEnv, Environment, validateEnv(), EmailDeliveryResult (+9 more)

### Community 46 - "Production deployment"
Cohesion: 0.07
Nodes (28): 10. Release and rollback, 1. Choose the environment model, 2. Pass the release gates, 3. Create and migrate Supabase production, 4. Configure Stripe live mode, 5. Import and configure the Vercel project, 6. Make the first Vercel deployment, 7. Attach the custom domain (+20 more)

## Knowledge Gaps
- **243 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+238 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Work-memory lessons

**Preferred sources** — corroborated by past sessions; start here.
- `logout()` (2× useful, score=1.829408473)

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `billing/page.tsx`, `marketing.tsx`?**
  _High betweenness centrality (0.040) - this node is a cross-community bridge._
- **Why does `publicEnv` connect `public.ts` to `pricing/actions.ts`, `auth/actions.ts`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `scripts`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _243 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Graphify Pipeline` be split into smaller, more focused modules?**
  _Cohesion score 0.07526881720430108 - nodes in this community are weakly interconnected._
- **Should `cn` be split into smaller, more focused modules?**
  _Cohesion score 0.08405797101449275 - nodes in this community are weakly interconnected._
- **Should `components.json` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._