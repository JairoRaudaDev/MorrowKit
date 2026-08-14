---
type: "query"
date: "2026-08-14T09:29:41.023268+00:00"
question: "Create /dashboard/settings with display name, future avatar, email display, logout, separate password flows, and secure server-side mutations"
contributor: "graphify"
outcome: "useful"
source_nodes: ["dashboard/page.tsx", "requireAuth()", "logout()"]
---

# Q: Create /dashboard/settings with display name, future avatar, email display, logout, separate password flows, and secure server-side mutations

## Answer

Expanded from original query via vocab: [auth, dashboard, name, logout, server, session]. Added an authenticated settings route, validated updateProfile Server Action using Supabase getUser and updateUser metadata, profile form, read-only email, disabled future avatar upload, logout, and dashboard navigation.

## Outcome

- Signal: useful

## Source Nodes

- dashboard/page.tsx
- requireAuth()
- logout()