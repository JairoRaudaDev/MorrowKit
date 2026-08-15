# Graph Report - SaaSSeed  (2026-08-15)

## Corpus Check
- 89 files · ~21,974 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 438 nodes · 760 edges · 30 communities (24 shown, 6 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ae0ee186`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Graphify Pipeline
- cn
- components.json
- compilerOptions
- scripts
- SaaSSeed
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
- public.ts
- track.ts
- instrumentation.ts
- next.config.ts
- instrumentation-client.ts

## God Nodes (most connected - your core abstractions)
1. `cn()` - 49 edges
2. `createClient()` - 20 edges
3. `compilerOptions` - 16 edges
4. `scripts` - 11 edges
5. `Button()` - 11 edges
6. `runMutation()` - 11 edges
7. `safeNextPath()` - 10 edges
8. `publicEnv` - 9 edges
9. `synchronizeSubscriptionEvent()` - 9 edges
10. `signup()` - 8 edges

## Surprising Connections (you probably didn't know these)
- `Agent Instruction Integration` --semantically_similar_to--> `Graphify First Codebase Workflow`  [INFERRED] [semantically similar]
  .codex/skills/graphify/references/hooks.md → AGENTS.md
- `Graphify First Codebase Workflow` --references--> `Path and Explain Queries`  [EXTRACTED]
  AGENTS.md → .codex/skills/graphify/references/query.md
- `ProfileForm()` --indirect_call--> `updateProfile()`  [INFERRED]
  src/app/dashboard/settings/profile-form.tsx → src/app/dashboard/settings/actions.ts
- `CardAction()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/card.tsx → src/lib/utils.ts
- `Graphify First Codebase Workflow` --references--> `Budget Aware Graph Traversal`  [EXTRACTED]
  AGENTS.md → .codex/skills/graphify/references/query.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Graphify Extraction Flow** — _codex_skills_graphify_skill_file_detection, _codex_skills_graphify_skill_structural_extraction, _codex_skills_graphify_skill_semantic_extraction, _codex_skills_graphify_skill_graph_build_and_clustering [EXTRACTED 1.00]
- **Scoped Graph Navigation Modes** — _codex_skills_graphify_references_query_constrained_query_expansion, _codex_skills_graphify_references_query_graph_traversal, _codex_skills_graphify_references_query_path_and_explain, agents_scoped_graph_navigation [INFERRED 0.85]

## Communities (30 total, 6 thin omitted)

### Community 0 - "Graphify Pipeline"
Cohesion: 0.08
Nodes (31): Folder Watch Incremental Rebuild, URL Ingestion, Optional Graph Exports, Token Reduction Benchmark, Edge Confidence Rubric, Deterministic Node IDs, Semantic Extraction JSON Schema, Cross Repository Graph Merge (+23 more)

### Community 1 - "cn"
Cohesion: 0.07
Nodes (44): AuthFormState, initialState, ProfileForm(), AppShell(), AppShellProps, AuthForm(), AuthFormProps, initialState (+36 more)

### Community 2 - "components.json"
Cohesion: 0.11
Nodes (17): aliases, components, hooks, lib, ui, utils, iconLibrary, rsc (+9 more)

### Community 3 - "compilerOptions"
Cohesion: 0.07
Nodes (27): dom, dom.iterable, esnext, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts (+19 more)

### Community 4 - "scripts"
Cohesion: 0.10
Nodes (20): description, engines, node, pnpm, license, name, packageManager, private (+12 more)

### Community 5 - "SaaSSeed"
Cohesion: 0.33
Nodes (5): License, Local Supabase, SaaSSeed, Status, Transactional email

### Community 6 - "devDependencies"
Cohesion: 0.09
Nodes (23): eslint, eslint-config-next, devDependencies, eslint, eslint-config-next, prettier, prettier-plugin-tailwindcss, supabase (+15 more)

### Community 7 - "auth/actions.ts"
Cohesion: 0.11
Nodes (33): authError(), AuthField, AuthValues, login(), logout(), signup(), GET(), ProfileFormState (+25 more)

### Community 8 - "dependencies"
Cohesion: 0.06
Nodes (35): class-variance-authority, clsx, lucide-react, next, dependencies, class-variance-authority, clsx, lucide-react (+27 more)

### Community 11 - "billing/page.tsx"
Cohesion: 0.11
Nodes (27): BillingPage(), formatDate(), planLabels, statusLabels, PremiumInsightsPage(), DashboardLayout(), stats, AuthPageProps (+19 more)

### Community 13 - "20260814000000_create_profiles.sql"
Cohesion: 0.33
Nodes (4): profiles_set_updated_at, public.profiles, auth.users, public.set_updated_at

### Community 17 - "pricing/actions.ts"
Cohesion: 0.18
Nodes (18): handledEvents, POST(), createBillingPortalSession(), checkoutSchema, stripe, stripeConfig, CustomerIdentity, getOrCreateStripeCustomer() (+10 more)

### Community 19 - "Q: Create /dashboard/settings with display name, future avatar, email display, logout, separate password flows, and secure server-side mutations"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: Create /dashboard/settings with display name, future avatar, email display, logout, separate password flows, and secure server-side mutations, Source Nodes

### Community 20 - "marketing.tsx"
Cohesion: 0.19
Nodes (11): metadata, Container(), ContainerProps, containerSizes, CTA(), Features, Footer(), Hero() (+3 more)

### Community 21 - "20260814010000_create_billing_tables.sql"
Cohesion: 0.32
Nodes (7): public, billing_customers_set_updated_at, public.billing_customers, public.subscriptions, auth.users, public.set_updated_at, subscriptions_set_updated_at

### Community 22 - "Q: Create a centralized entitlement layer that converts billing state into application permissions. Product code should depend on entitlements rather than querying Stripe-specific fields directly"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: Create a centralized entitlement layer that converts billing state into application permissions. Product code should depend on entitlements rather than querying Stripe-specific fields directly, Source Nodes

### Community 24 - "public.ts"
Cohesion: 0.11
Nodes (17): WelcomeEmail(), WelcomeEmailProps, publicEnv, privateEnv, serverEnv, Environment, validateEnv(), EmailDeliveryResult (+9 more)

### Community 25 - "track.ts"
Cohesion: 0.42
Nodes (4): AnalyticsEvent, AnalyticsEventName, AnalyticsEvents, AnalyticsProvider

### Community 27 - "next.config.ts"
Cohesion: 0.50
Nodes (3): canUploadSourceMaps, hasSentryDsn, nextConfig

## Knowledge Gaps
- **150 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+145 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `billing/page.tsx`, `marketing.tsx`?**
  _High betweenness centrality (0.046) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `scripts`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **Why does `publicEnv` connect `public.ts` to `pricing/actions.ts`, `auth/actions.ts`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _150 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Graphify Pipeline` be split into smaller, more focused modules?**
  _Cohesion score 0.07526881720430108 - nodes in this community are weakly interconnected._
- **Should `cn` be split into smaller, more focused modules?**
  _Cohesion score 0.07242063492063493 - nodes in this community are weakly interconnected._
- **Should `components.json` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._