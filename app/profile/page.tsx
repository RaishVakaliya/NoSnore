"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Shield, Globe, Activity, Edit2 } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const user = useQuery(api.users.getMe);
  const stats = useQuery(api.services.getMyStats);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="mx-auto max-w-4xl px-6 pt-32 pb-24">
        <div className="relative overflow-hidden rounded-3xl border border-white/5 bg-zinc-900/40 p-8 backdrop-blur-xl sm:p-12">
          <div className="relative flex flex-col items-center gap-8 sm:flex-row sm:items-start">
            <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-2xl border-4 border-white/10 shadow-2xl">
              {user?.imageUrl ? (
                <img
                  src={user.imageUrl}
                  alt={user.name || "User"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-zinc-800 text-4xl font-bold">
                  {user?.name?.[0] || "U"}
                </div>
              )}
            </div>

            <div className="flex flex-1 flex-col items-center text-center sm:items-start sm:text-left">
              <div className="mb-2 flex items-center gap-3">
                <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  {user?.name || "NoSnore User"}
                </h1>
                <Badge
                  variant="outline"
                  className="border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                >
                  {user?.plan === "pro" ? "Pro" : "Free Plan"}
                </Badge>
              </div>

              <p className="mb-6 flex items-center gap-2 text-zinc-400">
                <Mail className="h-4 w-4" />
                {user?.email || "loading email..."}
              </p>

              <div className="flex flex-wrap justify-center gap-3 sm:justify-start">
                <Link href="/settings">
                  <Button
                    variant="outline"
                    className="h-9 rounded-xl border-white/10 bg-white/5 text-xs font-semibold text-white transition-all"
                  >
                    Account Settings
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <Link href="/pricing" className="block group">
            <div className="h-full rounded-3xl border border-white/5 bg-zinc-900/40 p-8 transition-all hover:bg-zinc-900/60 hover:border-emerald-500/30">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 group-hover:bg-emerald-500/10 group-hover:text-emerald-400 transition-colors">
                  <Shield className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider group-hover:text-emerald-500/50 transition-colors">
                  Current Plan
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">
                {user?.plan === "pro" ? "Enterprise Pro" : "Personal Free"}
              </h3>
              <p className="text-sm text-zinc-400 mb-6">
                {user?.plan === "pro"
                  ? "Unlimited endpoints and 1-min intervals enabled."
                  : "Limited to 3 endpoints and 15-min intervals."}
              </p>
              <div className="inline-flex items-center text-emerald-400 hover:text-emerald-300 text-sm font-semibold">
                Upgrade your plan →
              </div>
            </div>
          </Link>

          <div className="rounded-3xl border border-white/5 bg-zinc-900/40 p-8 transition-colors hover:bg-zinc-900/60">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                <Activity className="h-5 w-5" />
              </div>
              <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Monitoring Activity
              </span>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <h3 className="text-3xl font-black text-white">
                {stats?.totalServices || 0}
              </h3>
              <span className="text-zinc-500 text-sm font-medium">
                Endpoints
              </span>
            </div>
            <p className="text-sm text-zinc-400 mb-6">
              You currently have {stats?.activeServices || 0} active pings
              running across your services.
            </p>
            <div className="h-1 w-full overflow-hidden rounded-full bg-zinc-800">
              <div
                className="h-full bg-emerald-500 transition-all duration-500"
                style={{
                  width: `${Math.min(((stats?.totalServices || 0) / 10) * 100, 100)}%`,
                }}
              />
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-white/5 bg-zinc-900/40 p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-400">
                <Globe className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-white">Default Region</h4>
                <p className="text-xs text-zinc-500">
                  Global / Multi-region Edge
                </p>
              </div>
            </div>
            <Badge variant="outline" className="border-white/5 text-zinc-500">
              Automatic
            </Badge>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
