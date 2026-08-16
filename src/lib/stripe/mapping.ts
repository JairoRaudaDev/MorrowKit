export function stripeId(value: string | { id: string } | null): string | null {
  return typeof value === "string" ? value : (value?.id ?? null);
}

export function stripeTimestamp(
  value: number | null | undefined,
): string | null {
  return value == null ? null : new Date(value * 1000).toISOString();
}

export function planForPrice(
  priceId: string,
  priceIds: Readonly<Record<"pro" | "business", string>>,
): "pro" | "business" | undefined {
  if (priceId === priceIds.pro) return "pro";
  if (priceId === priceIds.business) return "business";
  return undefined;
}
