import { NextResponse } from "next/server";
import crypto from "crypto";
import { api } from "@/convex/_generated/api";
import { convex } from "@/lib/convex";

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = req.headers.get("x-razorpay-signature");

    if (!signature) {
      return new NextResponse("No signature", { status: 400 });
    }

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
      .update(body)
      .digest("hex");

    if (expectedSignature !== signature) {
      return new NextResponse("Invalid signature", { status: 400 });
    }

    const event = JSON.parse(body);

    if (event.event === "order.paid") {
      const order = event.payload.order.entity;
      const clerkId = order.notes.clerkId;

      if (clerkId) {
        await convex.mutation(api.users.updateSubscription, {
          clerkId: clerkId,
          plan: "pro",
        });
        console.log(`Successfully upgraded user ${clerkId} via webhook`);
      }
    }

    return NextResponse.json({ status: "ok" });
  } catch (error: any) {
    console.error("Razorpay Webhook Error:", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
