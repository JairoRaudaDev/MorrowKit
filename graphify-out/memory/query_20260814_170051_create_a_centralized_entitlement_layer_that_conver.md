---
type: "query"
date: "2026-08-14T17:00:51.334745+00:00"
question: "Create a centralized entitlement layer that converts billing state into application permissions. Product code should depend on entitlements rather than querying Stripe-specific fields directly"
contributor: "graphify"
outcome: "useful"
source_nodes: ["getCurrentSubscription()", "BillingPage()", "stripeConfig"]
---

# Q: Create a centralized entitlement layer that converts billing state into application permissions. Product code should depend on entitlements rather than querying Stripe-specific fields directly

## Answer

Expanded via graph vocabulary: billing, stripe, subscription, status, plan, plans, features, user, customers, checkout. Added src/lib/entitlements.ts as a server-only boundary. getEntitlements(userId) maps active or trialing Stripe-backed subscriptions to application plans and premium access, defaults unknown/inactive billing state to free, and the billing page now consumes entitlements for its plan decision while raw billing metadata remains confined to billing display code.

## Outcome

- Signal: useful

## Source Nodes

- getCurrentSubscription()
- BillingPage()
- stripeConfig