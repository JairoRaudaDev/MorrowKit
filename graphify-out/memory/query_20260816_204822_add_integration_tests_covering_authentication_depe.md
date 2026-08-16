---
type: "query"
date: "2026-08-16T20:48:22.350135+00:00"
question: "Add integration tests covering authentication-dependent data access, profile operations, subscription persistence, and important Supabase RLS behavior"
contributor: "graphify"
outcome: "useful"
source_nodes: ["rls_policies.test.sql", "profiles_set_updated_at", "Subscription"]
---

# Q: Add integration tests covering authentication-dependent data access, profile operations, subscription persistence, and important Supabase RLS behavior

## Answer

Expanded from original query via graph vocab: [authentication, profiles, subscription, supabase, rls, policies, tests, profile, getprofile, getsubscription]. Added a 23-assertion transactional pgTAP integration test covering identity-dependent access, owned profile lifecycle, subscription event idempotency and ordering, trusted persistence, and cross-user/anonymous RLS isolation. Vitest passed; pgTAP execution was blocked because Docker Desktop was not running.

## Outcome

- Signal: useful

## Source Nodes

- rls_policies.test.sql
- profiles_set_updated_at
- Subscription