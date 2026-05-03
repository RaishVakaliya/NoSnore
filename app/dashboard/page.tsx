"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Activity,
  Globe,
  ShieldCheck,
  Trash2,
  ExternalLink,
  Clock,
  RotateCw,
  AlertCircle,
  X,
  Info,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const user = useQuery(api.users.getMe);
  const services = useQuery(api.services.list);
  const stats = useQuery(api.services.getMyStats);
  const createService = useMutation(api.services.create);
  const deleteService = useMutation(api.services.deleteService);

  const [showAddModal, setShowAddModal] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    interval: 15,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await createService({
        name: formData.name,
        url: formData.url,
        interval: formData.interval,
        isActive: true,
      });
      setShowAddModal(false);
      setFormData({ name: "", url: "", interval: 15 });
    } catch (error) {
      console.error(error);
      alert("Failed to create service. Please check your plan limits.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: any) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    try {
      await deleteService({ id });
    } catch (error) {
      console.error(error);
    }
  };

  const formatLastPing = (timestamp?: number) => {
    if (!timestamp) return { relative: "Never", exact: "" };
    const date = new Date(timestamp);
    const seconds = Math.floor((Date.now() - timestamp) / 1000);

    let relative = "";
    if (seconds < 60) relative = `${seconds}s ago`;
    else {
      const mins = Math.floor(seconds / 60);
      relative = `${mins}m ago`;
    }

    const exact = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    return { relative, exact };
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />

      <main className="flex-1 mx-auto max-w-6xl w-full px-6 pt-32 pb-16">
        <div className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              Dashboard
            </h1>
            <p className="text-zinc-500">
              Welcome back,{" "}
              <span className="text-white font-medium">
                {user?.name || "User"}
              </span>
              .
              {user?.isActive
                ? " All systems operational."
                : " Account is currently inactive."}
            </p>
          </div>
          <Button
            onClick={() => setShowAddModal(true)}
            className="rounded-xl bg-white text-black font-bold hover:bg-zinc-200 shadow-lg shadow-white/5 h-12 px-6 transition-all"
          >
            <Plus className="mr-2 h-5 w-5" />
            New Service
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
          <div className="group rounded-3xl border border-white/5 bg-zinc-900/40 p-8 backdrop-blur-xl transition-all hover:bg-zinc-900/60 hover:border-emerald-500/30">
            <div className="flex items-center justify-between mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
                <Globe className="h-5 w-5" />
              </div>
              <Badge variant="outline" className="border-white/5 text-zinc-500">
                Total
              </Badge>
            </div>
            <h2 className="text-sm font-medium text-zinc-400 mb-1 uppercase tracking-wider">
              Total Services
            </h2>
            <p className="text-4xl font-black text-white tracking-tight">
              {stats?.totalServices || 0}
            </p>
          </div>

          <div className="group rounded-3xl border border-white/5 bg-zinc-900/40 p-8 backdrop-blur-xl transition-all hover:bg-zinc-900/60 hover:border-yellow-500/30">
            <div className="flex items-center justify-between mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-400 group-hover:scale-110 transition-transform">
                <Activity className="h-5 w-5" />
              </div>
              <Badge variant="outline" className="border-white/5 text-zinc-500">
                Active
              </Badge>
            </div>
            <h2 className="text-sm font-medium text-zinc-400 mb-1 uppercase tracking-wider">
              Active Pings
            </h2>
            <p className="text-4xl font-black text-white tracking-tight">
              {stats?.activeServices || 0}
            </p>
          </div>

          <div className="group rounded-3xl border border-white/5 bg-zinc-900/40 p-8 backdrop-blur-xl transition-all hover:bg-zinc-900/60 hover:border-blue-500/30">
            <div className="flex items-center justify-between mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <Badge variant="outline" className="border-white/5 text-zinc-500">
                Healthy
              </Badge>
            </div>
            <h2 className="text-sm font-medium text-zinc-400 mb-1 uppercase tracking-wider">
              Uptime Score
            </h2>
            <p className="text-4xl font-black text-white tracking-tight">
              100%
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">
              Your Endpoints
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setIsRefreshing(true);
                setTimeout(() => setIsRefreshing(false), 1000);
              }}
              className="h-8 rounded-lg border border-white/5 bg-white/5 px-3 text-xs font-bold text-zinc-400 hover:bg-white/10 hover:text-white transition-all"
            >
              <RotateCw
                className={`mr-2 h-3 w-3 ${isRefreshing ? "animate-spin" : ""}`}
              />
              {isRefreshing ? "Refreshing..." : "Refresh Data"}
            </Button>
          </div>

          {!services ? (
            <div className="grid gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-white/5 bg-zinc-900/40 p-6">
                  <div className="flex items-start gap-4">
                    <Skeleton className="mt-1 h-3 w-3 shrink-0 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-48 opacity-50" />
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-6 sm:gap-10">
                    <div className="space-y-2">
                      <Skeleton className="h-2 w-16 opacity-30" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-2 w-16 opacity-30" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                    <Skeleton className="h-10 w-10 rounded-xl" />
                  </div>
                </div>
              ))}
            </div>
          ) : services.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-zinc-900/20 py-24 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 text-zinc-600">
                <AlertCircle className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                No services yet
              </h3>
              <p className="text-zinc-500 max-w-sm mb-8">
                Start by adding your first backend endpoint to prevent it from
                going to sleep.
              </p>
              <Button
                onClick={() => setShowAddModal(true)}
                variant="outline"
                className="rounded-xl border-white/10 bg-white/5 hover:bg-white/10"
              >
                Add My First Service
              </Button>
            </div>
          ) : (
            <div className="grid gap-4">
              {services.map((service) => (
                <div
                  key={service._id}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-white/5 bg-zinc-900/40 p-6 transition-all hover:bg-zinc-900/60 hover:border-white/10"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`mt-1 h-3 w-3 shrink-0 rounded-full ${service.status === "online" ? "bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]" : "bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.5)]"}`}
                    />
                    <div className="space-y-1">
                      <h3 className="font-bold text-white leading-none">
                        {service.name}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-zinc-500">
                        <span className="truncate max-w-[200px]">
                          {service.url}
                        </span>
                        <a
                          href={service.url}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-white"
                        >
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-6 sm:gap-10">
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
                        Last Ping
                      </p>
                      <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-1.5 text-sm text-zinc-300">
                          <Clock className="h-3.5 w-3.5 text-zinc-500" />
                          {formatLastPing(service.lastPingedAt).relative}
                        </div>
                        {service.lastPingedAt && (
                          <p className="text-[10px] text-zinc-600 font-medium ml-5">
                            at {formatLastPing(service.lastPingedAt).exact}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
                        Frequency
                      </p>
                      <div className="flex items-center gap-1.5 text-sm text-zinc-300">
                        <Badge
                          variant="outline"
                          className="border-white/5 bg-white/5 text-zinc-400 text-[10px]"
                        >
                          Every {service.interval}m
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-auto sm:ml-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(service._id)}
                        className="h-10 w-10 rounded-xl text-zinc-500 hover:bg-red-500/10 hover:text-red-400 transition-all"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {showAddModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300"
              onClick={() => !isSubmitting && setShowAddModal(false)}
            />
            <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 p-1 shadow-2xl animate-in zoom-in-95 duration-300">
              <div className="bg-zinc-900/50 p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-black text-white">
                      Add Service
                    </h2>
                    <p className="text-sm text-zinc-500">
                      Configure your backend wake-up call.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-zinc-500 hover:bg-white/10 hover:text-white transition-all"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-zinc-400 ml-1">
                      Service Name
                    </label>
                    <input
                      required
                      placeholder="e.g. My Awesome API"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full h-12 rounded-xl border border-white/5 bg-white/5 px-4 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between ml-1">
                      <label className="text-sm font-bold text-zinc-400">
                        Endpoint URL
                      </label>
                      <div className="group relative">
                        <Info className="h-3.5 w-3.5 text-zinc-500 cursor-help" />
                        <div className="absolute bottom-full right-0 mb-2 w-64 p-3 rounded-xl bg-zinc-900 border border-white/10 text-[10px] text-zinc-400 opacity-0 group-hover:opacity-100 transition-all pointer-events-none shadow-2xl z-50">
                          <p className="font-bold text-white mb-1">Pro Tip:</p>
                          For better performance, use a lightweight health
                          endpoint like{" "}
                          <code className="text-emerald-400">/health</code>{" "}
                          instead of your main landing page.
                        </div>
                      </div>
                    </div>
                    <input
                      required
                      type="url"
                      placeholder="https://your-backend.render.com"
                      value={formData.url}
                      onChange={(e) =>
                        setFormData({ ...formData, url: e.target.value })
                      }
                      className="w-full h-12 rounded-xl border border-white/5 bg-white/5 px-4 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-zinc-400 ml-1">
                      Ping Interval
                    </label>
                    <select
                      value={formData.interval}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          interval: parseInt(e.target.value),
                        })
                      }
                      className="w-full h-12 rounded-xl border border-white/5 bg-white/5 px-4 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all appearance-none"
                    >
                      <option value={1}>Every 1 Minute (Pro)</option>
                      <option value={5}>Every 5 Minutes (Pro)</option>
                      <option value={15}>Every 15 Minutes (Free)</option>
                      <option value={30}>Every 30 Minutes (Free)</option>
                    </select>
                  </div>

                  <div className="pt-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-500 shadow-lg shadow-emerald-500/20 transition-all disabled:opacity-50"
                    >
                      {isSubmitting ? "Creating..." : "Start Monitoring"}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
