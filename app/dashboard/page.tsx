"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Navbar from "@/components/landing/Navbar";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  const user = useQuery(api.users.getMe);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 pt-32 pb-16">
        <div className="mb-10 flex flex-col gap-4">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
            Welcome back,{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-yellow-400 bg-clip-text text-transparent">
              {user?.name || "User"}
            </span>
          </h1>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-white/5 bg-white/3 p-8 backdrop-blur">
            <h2 className="text-xl font-bold text-white mb-2">
              Total Services
            </h2>
            <p className="text-4xl font-black text-emerald-500">0</p>
          </div>
          <div className="rounded-2xl border border-white/5 bg-white/3 p-8 backdrop-blur">
            <h2 className="text-xl font-bold text-white mb-2">Active Pings</h2>
            <p className="text-4xl font-black text-yellow-500">0</p>
          </div>
          <div className="rounded-2xl border border-white/5 bg-white/3 p-8 backdrop-blur">
            <h2 className="text-xl font-bold text-white mb-2">Uptime Score</h2>
            <p className="text-4xl font-black text-white">100%</p>
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-white/5 bg-white/3 p-8 text-center backdrop-blur">
          <p className="text-zinc-500">
            Your active monitoring services will appear here.
          </p>
        </div>
      </main>
    </div>
  );
}
