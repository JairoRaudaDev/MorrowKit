import { stripe } from "@/lib/stripe/client";
import { stripeConfig } from "@/lib/stripe/config";
import { synchronizeSubscriptionEvent } from "@/lib/stripe/webhook";

const handledEvents = new Set([
  "checkout.session.completed",
  "customer.subscription.created",
  "customer.subscription.updated",
  "customer.subscription.deleted",
]);

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
    const body = await request.text();
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      stripeConfig.webhookSecret,
    );
  } catch {
    return Response.json(
      { error: "Invalid Stripe signature" },
      { status: 400 },
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
