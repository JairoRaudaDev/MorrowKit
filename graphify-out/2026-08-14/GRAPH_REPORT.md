# Graph Report - C:\Users\jairo\dev\SaaSSeed  (2026-08-14)

## Corpus Check
- Corpus is ~10,611 words - fits in a single context window. You may not need a graph.

## Summary
- 31 nodes · 35 edges · 4 communities
- Extraction: 91% EXTRACTED · 9% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.92)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Continuous Graph Maintenance
- Graph Build and Outputs
- Extraction and Data Integrity
- Agent Graph Navigation

## God Nodes (most connected - your core abstractions)
1. `Graphify Pipeline` - 7 edges
2. `Incremental Graph Update` - 6 edges
3. `Semantic Extraction` - 5 edges
4. `Graph Build and Community Clustering` - 5 edges
5. `Graphify First Codebase Workflow` - 5 edges
6. `Semantic Extraction JSON Schema` - 3 edges
7. `Budget Aware Graph Traversal` - 3 edges
8. `Whisper Media Transcription` - 3 edges
9. `Corpus File Detection` - 2 edges
10. `Structural AST Extraction` - 2 edges

## Surprising Connections (you probably didn't know these)
- `Agent Instruction Integration` --semantically_similar_to--> `Graphify First Codebase Workflow`  [INFERRED] [semantically similar]
  .codex/skills/graphify/references/hooks.md → AGENTS.md
- `Graphify First Codebase Workflow` --references--> `Path and Explain Queries`  [EXTRACTED]
  AGENTS.md → .codex/skills/graphify/references/query.md
- `Graphify First Codebase Workflow` --references--> `Incremental Graph Update`  [EXTRACTED]
  AGENTS.md → .codex/skills/graphify/references/update.md
- `Graphify Pipeline` --references--> `Constrained Query Expansion`  [EXTRACTED]
  .codex/skills/graphify/SKILL.md → .codex/skills/graphify/references/query.md
- `Graphify First Codebase Workflow` --references--> `Budget Aware Graph Traversal`  [EXTRACTED]
  AGENTS.md → .codex/skills/graphify/references/query.md

## Hyperedges (group relationships)
- **Graphify Extraction Flow** — _codex_skills_graphify_skill_file_detection, _codex_skills_graphify_skill_structural_extraction, _codex_skills_graphify_skill_semantic_extraction, _codex_skills_graphify_skill_graph_build_and_clustering [EXTRACTED 1.00]
- **Scoped Graph Navigation Modes** — _codex_skills_graphify_references_query_constrained_query_expansion, _codex_skills_graphify_references_query_graph_traversal, _codex_skills_graphify_references_query_path_and_explain, agents_scoped_graph_navigation [INFERRED 0.85]

## Communities (4 total, 0 thin omitted)

### Community 0 - "Continuous Graph Maintenance"
Cohesion: 0.25
Nodes (9): Folder Watch Incremental Rebuild, URL Ingestion, Cross Repository Graph Merge, GitHub Repository Clone, Post Commit Graph Update Hook, Incremental Graph Update, Semantic Manifest Stamping, Replace on Re-extraction (+1 more)

### Community 1 - "Graph Build and Outputs"
Cohesion: 0.25
Nodes (8): Optional Graph Exports, Token Reduction Benchmark, Cluster Only Refresh, Graph Build and Community Clustering, Graph Health Integrity Gate, Graph Honesty Rules, Graph Output Generation, Structural AST Extraction

### Community 2 - "Extraction and Data Integrity"
Cohesion: 0.25
Nodes (8): Edge Confidence Rubric, Deterministic Node IDs, Semantic Extraction JSON Schema, Corpus Derived Transcription Prompt, Whisper Media Transcription, Semantic Extraction Cache, Corpus File Detection, Semantic Extraction

### Community 3 - "Agent Graph Navigation"
Cohesion: 0.40
Nodes (6): Agent Instruction Integration, Constrained Query Expansion, Budget Aware Graph Traversal, Path and Explain Queries, Graphify First Codebase Workflow, Scoped Graph Navigation

## Knowledge Gaps
- **6 isolated node(s):** `Semantic Extraction Cache`, `Token Reduction Benchmark`, `Cross Repository Graph Merge`, `Post Commit Graph Update Hook`, `Agent Instruction Integration` (+1 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Graphify Pipeline` connect `Continuous Graph Maintenance` to `Graph Build and Outputs`, `Extraction and Data Integrity`, `Agent Graph Navigation`?**
  _High betweenness centrality (0.623) - this node is a cross-community bridge._
- **Why does `Semantic Extraction` connect `Extraction and Data Integrity` to `Continuous Graph Maintenance`, `Graph Build and Outputs`?**
  _High betweenness centrality (0.447) - this node is a cross-community bridge._
- **Why does `Incremental Graph Update` connect `Continuous Graph Maintenance` to `Agent Graph Navigation`?**
  _High betweenness centrality (0.389) - this node is a cross-community bridge._
- **What connects `Semantic Extraction Cache`, `Token Reduction Benchmark`, `Cross Repository Graph Merge` to the rest of the system?**
  _6 weakly-connected nodes found - possible documentation gaps or missing edges._