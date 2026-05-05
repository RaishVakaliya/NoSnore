"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import Script from "next/script";
import { useUser, SignUpButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";

export default function PricingPage() {
  const { isSignedIn, user: clerkUser, isLoaded: clerkLoaded } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const user = useQuery(api.users.getMe);

  const isPro = user?.plan === "pro";
  const isFree = user && user.plan !== "pro";

  const handleProCheckout = async () => {
    if (isPro) {
      toast.info("You are already on the Pro plan!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/razorpay/order", { method: "POST" });
      const order = await res.json();

      if (order.error) throw new Error(order.error);

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "NoSnore Pro",
        description: "Pro Plan — ₹99/month",
        order_id: order.id,
        handler: async function (response: any) {
          try {
            const verifyRes = await fetch("/api/razorpay/verify", {
              method: "POST",
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyData.status === "ok") {
              toast.success("Payment successful! Upgrading your account...");
              setTimeout(() => {
                router.push("/dashboard?success=true");
              }, 1500);
            } else {
              throw new Error("Payment verification failed");
            }
          } catch (err: any) {
            toast.error("Verification failed", {
              description: err.message,
            });
          }
        },
        retry: {
          enabled: false,
        },
        timeout: 900,
        config: {
          display: {
            hide: [],
            preferences: {
              show_default_blocks: true,
            },
          },
        },
        prefill: {
          name: clerkUser?.fullName || "",
          email: clerkUser?.primaryEmailAddress?.emailAddress || "",
          contact: "",
        },
        theme: {
          color: "#10b981",
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
            toast.info("Payment cancelled", {
              description: "The payment popup was closed.",
            });
          },
        },
      };

      const rzp = new (window as any).Razorpay(options);

      rzp.on("payment.failed", function (response: any) {
        toast.error("Payment failed", {
          description: response.error.description,
        });
        setLoading(false);
      });

      rzp.open();
    } catch (err: any) {
      toast.error("Payment failed", {
        description: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />

      <main className="mx-auto max-w-7xl px-6 pt-32 pb-24 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Choose the right plan for you
        </h1>
        <p className="mt-4 text-zinc-400 max-w-2xl mx-auto">
          Find the ideal plan that fits your budget and goals. Make informed
          choices with ease.
        </p>

        <div className="mt-16 grid gap-8 lg:grid-cols-2 max-w-5xl mx-auto items-stretch">
          <div className="flex flex-col rounded-3xl border border-white/5 bg-zinc-900/40 p-10 text-left transition-all duration-300 hover:border-white/10">
            <div className="flex justify-between items-start">
              <h2 className="text-2xl font-bold text-white">Free Plan</h2>
            </div>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-5xl font-black text-white">₹0</span>
            </div>
            <p className="mt-4 text-sm text-zinc-500 leading-relaxed">
              Recommended for developers starting out with their first side
              projects and small APIs.
            </p>

            <ul className="mt-10 space-y-4 flex-1">
              {[
                "Access to basic monitoring tools",
                "15-minute ping intervals",
                "Up to 2 active endpoints",
                "Basic uptime dashboard",
              ].map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 text-sm text-zinc-300"
                >
                  <Check
                    className="h-5 w-5 shrink-0 text-white"
                    strokeWidth={3}
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <Unauthenticated>
                <SignUpButton mode="modal">
                  <Button
                    variant="outline"
                    className="w-full rounded-xl border-white/10 bg-white/5 py-6 text-base font-semibold text-white hover:bg-white/10 transition-all"
                  >
                    Get started for free
                  </Button>
                </SignUpButton>
              </Unauthenticated>
              <Authenticated>
                <Button
                  variant="outline"
                  onClick={() => router.push("/dashboard")}
                  className="w-full rounded-xl border-white/10 bg-white/5 py-6 text-base font-semibold text-white hover:bg-white/60 transition-all"
                >
                  Go to Dashboard
                </Button>
              </Authenticated>
            </div>
          </div>

          <div className="relative flex flex-col rounded-3xl border border-emerald-500/30 bg-zinc-900 shadow-2xl scale-105 z-10 p-10 text-left transition-all duration-300">
            <div className="flex justify-between items-start">
              <h2 className="text-2xl font-bold text-white">Pro</h2>
              {isPro && (
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-[10px] font-bold text-emerald-400 uppercase tracking-widest border border-emerald-500/20">
                  Current
                </span>
              )}
            </div>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-5xl font-black text-white">₹99</span>
              <span className="text-sm font-medium text-zinc-500">/month</span>
            </div>
            <p className="mt-4 text-sm text-zinc-400 leading-relaxed">
              Recommended for production-grade applications requiring
              high-frequency monitoring and SLA.
            </p>

            <ul className="mt-10 space-y-4 flex-1">
              {[
                "1-minute real-time pinging",
                "Up to 10 active endpoints",
                "Ping history & logs access",
                "Priority support",
              ].map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 text-sm text-zinc-300"
                >
                  <Check
                    className="h-5 w-5 shrink-0 text-emerald-400"
                    strokeWidth={3}
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <Unauthenticated>
                <SignUpButton mode="modal">
                  <Button className="w-full rounded-xl py-6 text-base font-semibold text-white transition-all shadow-lg bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/10">
                    Get started
                  </Button>
                </SignUpButton>
              </Unauthenticated>
              <Authenticated>
                <Button
                  onClick={handleProCheckout}
                  disabled={loading || isPro}
                  className={`w-full rounded-xl py-6 text-base font-semibold text-white transition-all shadow-lg ${
                    isPro
                      ? "bg-zinc-800 text-zinc-400 border-zinc-700 shadow-none cursor-default"
                      : "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/10"
                  }`}
                >
                  {loading
                    ? "Redirecting..."
                    : isPro
                      ? "Current Plan"
                      : "Get started"}
                </Button>
              </Authenticated>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
