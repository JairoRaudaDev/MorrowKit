# Graph Report - SaaSSeed  (2026-08-14)

## Corpus Check
- 49 files · ~15,146 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 274 nodes · 388 edges · 20 communities (17 shown, 3 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.92)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ffe1e86e`
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
- auth-form.tsx
- dependencies
- layout.tsx
- postcss.config.mjs
- app/page.tsx
- 20260814000000_create_profiles.sql
- prettier.config.mjs
- public.ts
- dialog.tsx

## God Nodes (most connected - your core abstractions)
1. `cn()` - 47 edges
2. `compilerOptions` - 16 edges
3. `createClient()` - 13 edges
4. `scripts` - 11 edges
5. `safeNextPath()` - 10 edges
6. `Graphify Pipeline` - 7 edges
7. `tailwind` - 6 edges
8. `aliases` - 6 edges
9. `login()` - 6 edges
10. `signup()` - 6 edges

## Surprising Connections (you probably didn't know these)
- `Agent Instruction Integration` --semantically_similar_to--> `Graphify First Codebase Workflow`  [INFERRED] [semantically similar]
  .codex/skills/graphify/references/hooks.md → AGENTS.md
- `Graphify First Codebase Workflow` --references--> `Path and Explain Queries`  [EXTRACTED]
  AGENTS.md → .codex/skills/graphify/references/query.md
- `Home()` --calls--> `createClient()`  [EXTRACTED]
  src/app/page.tsx → src/lib/supabase/server.ts
- `DialogOverlay()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/dialog.tsx → src/lib/utils.ts
- `DialogContent()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/dialog.tsx → src/lib/utils.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Graphify Extraction Flow** — _codex_skills_graphify_skill_file_detection, _codex_skills_graphify_skill_structural_extraction, _codex_skills_graphify_skill_semantic_extraction, _codex_skills_graphify_skill_graph_build_and_clustering [EXTRACTED 1.00]
- **Scoped Graph Navigation Modes** — _codex_skills_graphify_references_query_constrained_query_expansion, _codex_skills_graphify_references_query_graph_traversal, _codex_skills_graphify_references_query_path_and_explain, agents_scoped_graph_navigation [INFERRED 0.85]

## Communities (20 total, 3 thin omitted)

### Community 0 - "Graphify Pipeline"
Cohesion: 0.08
Nodes (31): Folder Watch Incremental Rebuild, URL Ingestion, Optional Graph Exports, Token Reduction Benchmark, Edge Confidence Rubric, Deterministic Node IDs, Semantic Extraction JSON Schema, Cross Repository Graph Merge (+23 more)

### Community 1 - "cn"
Cohesion: 0.09
Nodes (29): AuthPageProps, Logo(), LogoProps, Avatar(), AvatarBadge(), AvatarFallback(), AvatarGroup(), AvatarGroupCount() (+21 more)

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
Cohesion: 0.40
Nodes (4): License, Local Supabase, SaaSSeed, Status

### Community 6 - "devDependencies"
Cohesion: 0.09
Nodes (23): eslint, eslint-config-next, devDependencies, eslint, eslint-config-next, prettier, prettier-plugin-tailwindcss, supabase (+15 more)

### Community 7 - "auth-form.tsx"
Cohesion: 0.20
Nodes (17): authErrorMessage(), login(), logout(), signup(), GET(), LoginPage(), LoginPageProps, SignupPage() (+9 more)

### Community 8 - "dependencies"
Cohesion: 0.09
Nodes (23): class-variance-authority, clsx, lucide-react, next, dependencies, class-variance-authority, clsx, lucide-react (+15 more)

### Community 11 - "app/page.tsx"
Cohesion: 0.28
Nodes (6): Home(), AppShell(), AppShellProps, Container(), ContainerProps, containerSizes

### Community 13 - "20260814000000_create_profiles.sql"
Cohesion: 0.33
Nodes (4): auth.users, public.set_updated_at, profiles_set_updated_at, public.profiles

### Community 17 - "public.ts"
Cohesion: 0.18
Nodes (8): publicEnv, privateEnv, serverEnv, Environment, validateEnv(), updateSession(), config, proxy()

### Community 19 - "dialog.tsx"
Cohesion: 0.16
Nodes (8): Button(), buttonVariants, DialogContent(), DialogDescription(), DialogFooter(), DialogHeader(), DialogOverlay(), DialogTitle()

## Knowledge Gaps
- **102 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+97 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `dialog.tsx`, `app/page.tsx`?**
  _High betweenness centrality (0.075) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `scripts`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `devDependencies` to `scripts`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _102 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Graphify Pipeline` be split into smaller, more focused modules?**
  _Cohesion score 0.07526881720430108 - nodes in this community are weakly interconnected._
- **Should `cn` be split into smaller, more focused modules?**
  _Cohesion score 0.08773784355179703 - nodes in this community are weakly interconnected._
- **Should `components.json` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._