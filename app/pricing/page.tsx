"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PricingPage() {
  const { isSignedIn } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleProCheckout = async () => {
    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", { method: "POST" });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 pt-32 pb-24 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Choose the right plan for you
        </h1>
        <p className="mt-4 text-zinc-400 max-w-2xl mx-auto">
          Find the ideal plan that fits your budget and goals. Make informed
          choices with ease.
        </p>

        <div className="mt-16 grid gap-8 lg:grid-cols-2 max-w-5xl mx-auto items-stretch">
          <div className="flex flex-col rounded-3xl border border-white/5 bg-zinc-900/50 p-10 text-left transition-all duration-300 hover:border-white/10">
            <h2 className="text-2xl font-bold text-white">Free Plan</h2>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-5xl font-black text-white">$0</span>
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
                "Public uptime dashboards",
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
              <Button
                variant="outline"
                className="w-full rounded-xl border-white/10 bg-white/5 py-6 text-base font-semibold text-white hover:bg-gray-400 hover:border-gray-400 hover:text-black transition-all"
              >
                Get started for free
              </Button>
            </div>
          </div>

          <div className="relative flex flex-col rounded-3xl border border-emerald-500/20 bg-zinc-900 p-10 text-left shadow-2xl lg:scale-105 z-10">
            <h2 className="text-2xl font-bold text-white">Pro</h2>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-5xl font-black text-white">$10</span>
              <span className="text-sm font-medium text-zinc-500">/month</span>
            </div>
            <p className="mt-4 text-sm text-zinc-400 leading-relaxed">
              Recommended for production-grade applications requiring
              high-frequency monitoring and SLA.
            </p>

            <ul className="mt-10 space-y-4 flex-1">
              {[
                "Dedicated uptime manager",
                "1-minute real-time pinging",
                "Unlimited endpoint monitoring",
                "Private status pages with custom branding",
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
              <Button
                onClick={handleProCheckout}
                disabled={loading}
                className="w-full rounded-xl bg-emerald-600 py-6 text-base font-semibold text-white hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-500/10 disabled:opacity-60"
              >
                {loading ? "Redirecting..." : "Get started"}
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
