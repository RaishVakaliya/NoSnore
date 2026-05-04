import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("Stripe-Signature") as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as any;

  if (event.type === "checkout.session.completed") {
    const subscription = await stripe.subscriptions.retrieve(session.subscription);
    
    await convex.mutation(api.users.updateSubscription, {
      clerkId: session.metadata.clerkId,
      plan: "pro",
      stripeCustomerId: session.customer as string,
      subscriptionId: subscription.id,
    });
  }

  if (event.type === "customer.subscription.deleted") {
    await convex.mutation(api.users.updateSubscriptionByStripeId, {
      stripeCustomerId: session.customer as string,
      plan: "free",
    });
  }

  return new NextResponse(null, { status: 200 });
}
