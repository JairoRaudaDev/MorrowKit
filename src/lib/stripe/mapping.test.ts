import { describe, expect, it } from "vitest";

import { planForPrice, stripeId, stripeTimestamp } from "./mapping";

const priceIds = { pro: "price_pro", business: "price_business" };

describe("Stripe billing mapping", () => {
  it.each([
    ["price_pro", "pro"],
    ["price_business", "business"],
    ["price_unknown", undefined],
  ] as const)("maps price %s to %s", (priceId, plan) => {
    expect(planForPrice(priceId, priceIds)).toBe(plan);
  });

  it("normalizes expandable Stripe IDs", () => {
    expect(stripeId("cus_123")).toBe("cus_123");
    expect(stripeId({ id: "cus_456" })).toBe("cus_456");
    expect(stripeId(null)).toBeNull();
  });

  it("converts Stripe epoch seconds to database timestamps", () => {
    expect(stripeTimestamp(1_700_000_000)).toBe("2023-11-14T22:13:20.000Z");
    expect(stripeTimestamp(null)).toBeNull();
    expect(stripeTimestamp(undefined)).toBeNull();
  });
});
