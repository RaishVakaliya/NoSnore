import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      await req.json();

    const text = razorpay_order_id + "|" + razorpay_payment_id;
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(text)
      .digest("hex");

    if (generated_signature === razorpay_signature) {
      const { api } = await import("@/convex/_generated/api");
      const { convex } = await import("@/lib/convex");

      await convex.mutation(api.users.updateSubscription, {
        clerkId: userId,
        plan: "pro",
      });

      return NextResponse.json({ status: "ok" });
    } else {
      return NextResponse.json(
        { status: "verification_failed" },
        { status: 400 },
      );
    }
  } catch (error: any) {
    console.error("Verification Error:", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
