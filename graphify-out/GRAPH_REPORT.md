# Graph Report - SaaSSeed  (2026-08-14)

## Corpus Check
- 36 files · ~13,324 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 229 nodes · 278 edges · 19 communities (16 shown, 3 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.92)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `afc51c3b`
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
- include
- dependencies
- layout.tsx
- postcss.config.mjs
- page.tsx
- dialog.tsx
- prettier.config.mjs
- server.ts

## God Nodes (most connected - your core abstractions)
1. `cn()` - 47 edges
2. `compilerOptions` - 16 edges
3. `scripts` - 11 edges
4. `Graphify Pipeline` - 7 edges
5. `tailwind` - 6 edges
6. `aliases` - 6 edges
7. `include` - 6 edges
8. `Incremental Graph Update` - 6 edges
9. `Graph Build and Community Clustering` - 5 edges
10. `Semantic Extraction` - 5 edges

## Surprising Connections (you probably didn't know these)
- `Agent Instruction Integration` --semantically_similar_to--> `Graphify First Codebase Workflow`  [INFERRED] [semantically similar]
  .codex/skills/graphify/references/hooks.md → AGENTS.md
- `Graphify First Codebase Workflow` --references--> `Path and Explain Queries`  [EXTRACTED]
  AGENTS.md → .codex/skills/graphify/references/query.md
- `DialogOverlay()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/dialog.tsx → src/lib/utils.ts
- `DialogContent()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/dialog.tsx → src/lib/utils.ts
- `DialogHeader()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/dialog.tsx → src/lib/utils.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Graphify Extraction Flow** — _codex_skills_graphify_skill_file_detection, _codex_skills_graphify_skill_structural_extraction, _codex_skills_graphify_skill_semantic_extraction, _codex_skills_graphify_skill_graph_build_and_clustering [EXTRACTED 1.00]
- **Scoped Graph Navigation Modes** — _codex_skills_graphify_references_query_constrained_query_expansion, _codex_skills_graphify_references_query_graph_traversal, _codex_skills_graphify_references_query_path_and_explain, agents_scoped_graph_navigation [INFERRED 0.85]

## Communities (19 total, 3 thin omitted)

### Community 0 - "Graphify Pipeline"
Cohesion: 0.08
Nodes (31): Folder Watch Incremental Rebuild, URL Ingestion, Optional Graph Exports, Token Reduction Benchmark, Edge Confidence Rubric, Deterministic Node IDs, Semantic Extraction JSON Schema, Cross Repository Graph Merge (+23 more)

### Community 1 - "cn"
Cohesion: 0.09
Nodes (26): Avatar(), AvatarBadge(), AvatarFallback(), AvatarGroup(), AvatarGroupCount(), AvatarImage(), Card(), CardAction() (+18 more)

### Community 2 - "components.json"
Cohesion: 0.11
Nodes (17): aliases, components, hooks, lib, ui, utils, iconLibrary, rsc (+9 more)

### Community 3 - "compilerOptions"
Cohesion: 0.11
Nodes (19): dom, dom.iterable, esnext, compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules (+11 more)

### Community 4 - "scripts"
Cohesion: 0.10
Nodes (20): description, engines, node, pnpm, license, name, packageManager, private (+12 more)

### Community 5 - "SaaSSeed"
Cohesion: 0.40
Nodes (4): License, Local Supabase, SaaSSeed, Status

### Community 6 - "devDependencies"
Cohesion: 0.09
Nodes (23): eslint, eslint-config-next, devDependencies, eslint, eslint-config-next, prettier, prettier-plugin-tailwindcss, supabase (+15 more)

### Community 7 - "include"
Cohesion: 0.22
Nodes (8): .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx, exclude, include

### Community 8 - "dependencies"
Cohesion: 0.11
Nodes (19): class-variance-authority, clsx, lucide-react, next, dependencies, class-variance-authority, clsx, lucide-react (+11 more)

### Community 11 - "page.tsx"
Cohesion: 0.21
Nodes (7): AppShell(), AppShellProps, Container(), ContainerProps, containerSizes, Logo(), LogoProps

### Community 13 - "dialog.tsx"
Cohesion: 0.16
Nodes (8): Button(), buttonVariants, DialogContent(), DialogDescription(), DialogFooter(), DialogHeader(), DialogOverlay(), DialogTitle()

### Community 17 - "server.ts"
Cohesion: 0.39
Nodes (5): publicEnv, privateEnv, serverEnv, Environment, validateEnv()

## Knowledge Gaps
- **95 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+90 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `page.tsx`, `dialog.tsx`?**
  _High betweenness centrality (0.061) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `devDependencies` to `scripts`?**
  _High betweenness centrality (0.043) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `scripts`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _95 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Graphify Pipeline` be split into smaller, more focused modules?**
  _Cohesion score 0.07526881720430108 - nodes in this community are weakly interconnected._
- **Should `cn` be split into smaller, more focused modules?**
  _Cohesion score 0.0931174089068826 - nodes in this community are weakly interconnected._
- **Should `components.json` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._