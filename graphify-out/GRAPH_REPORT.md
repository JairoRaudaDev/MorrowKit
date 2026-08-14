# Graph Report - SaaSSeed  (2026-08-14)

## Corpus Check
- 13 files · ~10,718 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 45 nodes · 47 edges · 6 communities
- Extraction: 94% EXTRACTED · 6% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.92)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Graphify Pipeline
- Graph Build and Community Clustering
- Semantic Extraction
- Graphify First Codebase Workflow
- package.json
- SaaSSeed

## God Nodes (most connected - your core abstractions)
1. `Graphify Pipeline` - 7 edges
2. `Incremental Graph Update` - 6 edges
3. `Graph Build and Community Clustering` - 5 edges
4. `Semantic Extraction` - 5 edges
5. `Graphify First Codebase Workflow` - 5 edges
6. `engines` - 3 edges
7. `SaaSSeed` - 3 edges
8. `Semantic Extraction JSON Schema` - 3 edges
9. `Whisper Media Transcription` - 3 edges
10. `Budget Aware Graph Traversal` - 3 edges

## Surprising Connections (you probably didn't know these)
- `Agent Instruction Integration` --semantically_similar_to--> `Graphify First Codebase Workflow`  [INFERRED] [semantically similar]
  .codex/skills/graphify/references/hooks.md → AGENTS.md
- `Graphify First Codebase Workflow` --references--> `Incremental Graph Update`  [EXTRACTED]
  AGENTS.md → .codex/skills/graphify/references/update.md
- `Graphify First Codebase Workflow` --references--> `Path and Explain Queries`  [EXTRACTED]
  AGENTS.md → .codex/skills/graphify/references/query.md
- `Graphify Pipeline` --references--> `Constrained Query Expansion`  [EXTRACTED]
  .codex/skills/graphify/SKILL.md → .codex/skills/graphify/references/query.md
- `Graphify First Codebase Workflow` --references--> `Budget Aware Graph Traversal`  [EXTRACTED]
  AGENTS.md → .codex/skills/graphify/references/query.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Graphify Extraction Flow** — _codex_skills_graphify_skill_file_detection, _codex_skills_graphify_skill_structural_extraction, _codex_skills_graphify_skill_semantic_extraction, _codex_skills_graphify_skill_graph_build_and_clustering [EXTRACTED 1.00]
- **Scoped Graph Navigation Modes** — _codex_skills_graphify_references_query_constrained_query_expansion, _codex_skills_graphify_references_query_graph_traversal, _codex_skills_graphify_references_query_path_and_explain, agents_scoped_graph_navigation [INFERRED 0.85]

## Communities (6 total, 0 thin omitted)

### Community 0 - "Graphify Pipeline"
Cohesion: 0.25
Nodes (9): Folder Watch Incremental Rebuild, URL Ingestion, Cross Repository Graph Merge, GitHub Repository Clone, Post Commit Graph Update Hook, Incremental Graph Update, Semantic Manifest Stamping, Replace on Re-extraction (+1 more)

### Community 1 - "Graph Build and Community Clustering"
Cohesion: 0.25
Nodes (8): Optional Graph Exports, Token Reduction Benchmark, Cluster Only Refresh, Graph Build and Community Clustering, Graph Health Integrity Gate, Graph Honesty Rules, Graph Output Generation, Structural AST Extraction

### Community 2 - "Semantic Extraction"
Cohesion: 0.25
Nodes (8): Edge Confidence Rubric, Deterministic Node IDs, Semantic Extraction JSON Schema, Corpus Derived Transcription Prompt, Whisper Media Transcription, Semantic Extraction Cache, Corpus File Detection, Semantic Extraction

### Community 3 - "Graphify First Codebase Workflow"
Cohesion: 0.40
Nodes (6): Agent Instruction Integration, Constrained Query Expansion, Budget Aware Graph Traversal, Path and Explain Queries, Graphify First Codebase Workflow, Scoped Graph Navigation

### Community 4 - "package.json"
Cohesion: 0.20
Nodes (9): description, engines, node, pnpm, license, name, packageManager, private (+1 more)

### Community 5 - "SaaSSeed"
Cohesion: 0.50
Nodes (3): License, SaaSSeed, Status

## Knowledge Gaps
- **16 isolated node(s):** `name`, `version`, `private`, `description`, `license` (+11 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Graphify Pipeline` connect `Graphify Pipeline` to `Graph Build and Community Clustering`, `Semantic Extraction`, `Graphify First Codebase Workflow`?**
  _High betweenness centrality (0.287) - this node is a cross-community bridge._
- **Why does `Semantic Extraction` connect `Semantic Extraction` to `Graphify Pipeline`, `Graph Build and Community Clustering`?**
  _High betweenness centrality (0.206) - this node is a cross-community bridge._
- **Why does `Incremental Graph Update` connect `Graphify Pipeline` to `Graphify First Codebase Workflow`?**
  _High betweenness centrality (0.179) - this node is a cross-community bridge._
- **What connects `name`, `version`, `private` to the rest of the system?**
  _16 weakly-connected nodes found - possible documentation gaps or missing edges._