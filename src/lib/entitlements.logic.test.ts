import { describe, expect, it } from "vitest";

import { entitlementsForSubscription } from "./entitlements.logic";

const priceIds = { pro: "price_pro", business: "price_business" };

describe("entitlementsForSubscription", () => {
  it.each([null, { priceId: "price_pro", status: "canceled" }])(
    "keeps absent or inactive subscriptions on free",
    (subscription) => {
      expect(entitlementsForSubscription(subscription, priceIds)).toEqual({
        plan: "free",
        features: { premium: false },
      });
    },
  );

  it.each([
    ["active", "price_pro", "pro"],
    ["trialing", "price_business", "business"],
  ] as const)(
    "maps %s subscriptions to the purchased plan",
    (status, priceId, plan) => {
      expect(
        entitlementsForSubscription({ status, priceId }, priceIds),
      ).toEqual({
        plan,
        features: { premium: true },
      });
    },
  );

  it("does not grant premium access for an unknown price", () => {
    expect(
      entitlementsForSubscription(
        { status: "active", priceId: "price_unknown" },
        priceIds,
      ),
    ).toEqual({ plan: "free", features: { premium: false } });
  });
});
