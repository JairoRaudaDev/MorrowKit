import { stripe } from "@/lib/stripe/client";
import { stripeConfig } from "@/lib/stripe/config";
import { synchronizeSubscriptionEvent } from "@/lib/stripe/webhook";

const handledEvents = new Set([
  "checkout.session.completed",
  "customer.subscription.created",
  "customer.subscription.updated",
  "customer.subscription.deleted",
]);

const maxWebhookBytes = 1_000_000;

async function readWebhookBody(request: Request): Promise<string> {
  const declaredLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(declaredLength) && declaredLength > maxWebhookBytes) {
    throw new RangeError("Stripe webhook body is too large");
  }

  if (!request.body) return "";
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let length = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    length += value.byteLength;
    if (length > maxWebhookBytes) {
      await reader.cancel();
      throw new RangeError("Stripe webhook body is too large");
    }
    chunks.push(value);
  }

  const body = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder().decode(body);
}

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return Response.json(
      { error: "Missing Stripe signature" },
      { status: 400 },
    );
  }

  let event;
  try {
    const body = await readWebhookBody(request);
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      stripeConfig.webhookSecret,
    );
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof RangeError
            ? "Webhook body too large"
            : "Invalid Stripe signature",
      },
      { status: error instanceof RangeError ? 413 : 400 },
    );
  }

  if (!handledEvents.has(event.type)) {
    return Response.json({ received: true });
  }

  try {
    await synchronizeSubscriptionEvent(event);
    return Response.json({ received: true });
  } catch (error) {
    console.error("Stripe webhook processing failed", {
      eventId: event.id,
      eventType: event.type,
      error,
    });
    return Response.json(
      { error: "Webhook processing failed" },
      { status: 500 },
    );
  }
}
