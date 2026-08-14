# Graph Report - SaaSSeed  (2026-08-14)

## Corpus Check
- 19 files · ~11,083 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 121 nodes · 115 edges · 17 communities (14 shown, 3 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.92)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f2ce4434`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Graphify Pipeline
- Graph Build and Community Clustering
- Semantic Extraction
- compilerOptions
- package.json
- SaaSSeed
- devDependencies
- include
- dependencies
- layout.tsx
- postcss.config.mjs
- scripts
- prettier.config.mjs

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `scripts` - 8 edges
3. `Graphify Pipeline` - 7 edges
4. `include` - 6 edges
5. `Incremental Graph Update` - 6 edges
6. `Graphify First Codebase Workflow` - 5 edges
7. `Graph Build and Community Clustering` - 5 edges
8. `Semantic Extraction` - 5 edges
9. `lib` - 4 edges
10. `engines` - 3 edges

## Surprising Connections (you probably didn't know these)
- `Agent Instruction Integration` --semantically_similar_to--> `Graphify First Codebase Workflow`  [INFERRED] [semantically similar]
  .codex/skills/graphify/references/hooks.md → AGENTS.md
- `Graphify First Codebase Workflow` --references--> `Path and Explain Queries`  [EXTRACTED]
  AGENTS.md → .codex/skills/graphify/references/query.md
- `Graphify First Codebase Workflow` --references--> `Budget Aware Graph Traversal`  [EXTRACTED]
  AGENTS.md → .codex/skills/graphify/references/query.md
- `Graphify First Codebase Workflow` --references--> `Incremental Graph Update`  [EXTRACTED]
  AGENTS.md → .codex/skills/graphify/references/update.md
- `Graphify Pipeline` --references--> `URL Ingestion`  [EXTRACTED]
  .codex/skills/graphify/SKILL.md → .codex/skills/graphify/references/add-watch.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Graphify Extraction Flow** — _codex_skills_graphify_skill_file_detection, _codex_skills_graphify_skill_structural_extraction, _codex_skills_graphify_skill_semantic_extraction, _codex_skills_graphify_skill_graph_build_and_clustering [EXTRACTED 1.00]
- **Scoped Graph Navigation Modes** — _codex_skills_graphify_references_query_constrained_query_expansion, _codex_skills_graphify_references_query_graph_traversal, _codex_skills_graphify_references_query_path_and_explain, agents_scoped_graph_navigation [INFERRED 0.85]

## Communities (17 total, 3 thin omitted)

### Community 0 - "Graphify Pipeline"
Cohesion: 0.16
Nodes (15): Folder Watch Incremental Rebuild, URL Ingestion, Cross Repository Graph Merge, GitHub Repository Clone, Agent Instruction Integration, Post Commit Graph Update Hook, Constrained Query Expansion, Budget Aware Graph Traversal (+7 more)

### Community 1 - "Graph Build and Community Clustering"
Cohesion: 0.25
Nodes (8): Optional Graph Exports, Token Reduction Benchmark, Cluster Only Refresh, Graph Build and Community Clustering, Graph Health Integrity Gate, Graph Honesty Rules, Graph Output Generation, Structural AST Extraction

### Community 2 - "Semantic Extraction"
Cohesion: 0.25
Nodes (8): Edge Confidence Rubric, Deterministic Node IDs, Semantic Extraction JSON Schema, Corpus Derived Transcription Prompt, Whisper Media Transcription, Semantic Extraction Cache, Corpus File Detection, Semantic Extraction

### Community 3 - "compilerOptions"
Cohesion: 0.11
Nodes (19): dom, dom.iterable, esnext, compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules (+11 more)

### Community 4 - "package.json"
Cohesion: 0.20
Nodes (9): description, engines, node, pnpm, license, name, packageManager, private (+1 more)

### Community 5 - "SaaSSeed"
Cohesion: 0.50
Nodes (3): License, SaaSSeed, Status

### Community 6 - "devDependencies"
Cohesion: 0.10
Nodes (21): eslint, eslint-config-next, devDependencies, eslint, eslint-config-next, prettier, prettier-plugin-tailwindcss, tailwindcss (+13 more)

### Community 7 - "include"
Cohesion: 0.22
Nodes (8): .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx, exclude, include

### Community 8 - "dependencies"
Cohesion: 0.29
Nodes (7): next, dependencies, next, react, react-dom, react, react-dom

### Community 13 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, format, format:check, lint, start, typecheck

## Knowledge Gaps
- **62 isolated node(s):** `name`, `version`, `private`, `description`, `license` (+57 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `devDependencies` to `package.json`?**
  _High betweenness centrality (0.095) - this node is a cross-community bridge._
- **Why does `compilerOptions` connect `compilerOptions` to `include`?**
  _High betweenness centrality (0.043) - this node is a cross-community bridge._
- **Why does `scripts` connect `scripts` to `package.json`?**
  _High betweenness centrality (0.040) - this node is a cross-community bridge._
- **What connects `name`, `version`, `private` to the rest of the system?**
  _62 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._