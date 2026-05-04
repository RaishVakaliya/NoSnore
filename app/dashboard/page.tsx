"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Activity,
  Globe,
  ShieldCheck,
  RotateCw,
  AlertCircle,
} from "lucide-react";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import AddServiceModal from "./AddServiceModal";
import DeleteServiceModal from "./DeleteServiceModal";
import { StatsCard, ServiceCard } from "./DashboardComponents";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import Unauthorized from "@/components/shared/Unauthorized";
import Loading from "@/app/loading";

function DashboardContent() {
  const { isLoaded, isSignedIn } = useUser();
  const searchParams = useSearchParams();
  const router = useRouter();
  const user = useQuery(api.users.getMe);
  const services = useQuery(api.services.list);
  const stats = useQuery(api.services.getMyStats);
  const createService = useMutation(api.services.create);
  const deleteService = useMutation(api.services.deleteService);

  const [showAddModal, setShowAddModal] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<any>(null);

  useEffect(() => {
    if (searchParams.get("success") === "true") {
      toast.success("Welcome to Pro!", {
        description:
          "Your plan has been upgraded successfully. Enjoy all Pro features!",
        duration: 3000,
      });
      const timeout = setTimeout(() => {
        router.replace("/dashboard");
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [searchParams, router]);

  if (!isLoaded) return <Loading />;
  if (!isSignedIn) return <Unauthorized />;

  const handleAddService = async (formData: {
    name: string;
    url: string;
    interval: number;
  }) => {
    try {
      await createService({
        name: formData.name,
        url: formData.url,
        interval: formData.interval,
        isActive: true,
      });
    } catch (error) {
      throw error;
    }
  };

  const handleDelete = async () => {
    if (!serviceToDelete) return;
    try {
      await deleteService({ id: serviceToDelete });
      setServiceToDelete(null);
    } catch (error) {}
  };

  const formatLastPing = (timestamp?: number) => {
    if (!timestamp) return { relative: "Never", exact: "" };
    const date = new Date(timestamp);
    const seconds = Math.floor((Date.now() - timestamp) / 1000);

    let relative = "";
    if (seconds < 0) relative = "Just now";
    else if (seconds < 60) relative = `${seconds}s ago`;
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

      <main className="flex-1 mx-auto max-w-6xl w-full px-6 pt-24 md:pt-32 pb-16">
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
          <StatsCard
            title="Total Services"
            value={stats?.totalServices || 0}
            icon={<Globe className="h-5 w-5" />}
            badge="Total"
            color="emerald"
          />
          <StatsCard
            title="Active Pings"
            value={stats?.activeServices || 0}
            icon={<Activity className="h-5 w-5" />}
            badge="Active"
            color="yellow"
          />
          <StatsCard
            title="Uptime Score"
            value={
              stats?.totalServices && stats.totalServices > 0
                ? `${Math.round((stats.activeServices / stats.totalServices) * 100)}%`
                : "—"
            }
            icon={<ShieldCheck className="h-5 w-5" />}
            badge="Healthy"
            color="blue"
          />
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
                <div
                  key={i}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-white/5 bg-zinc-900/40 p-6"
                >
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
              <p className="text-zinc-500 max-w-sm mb-8 px-4">
                Start by adding your first backend endpoint to prevent it from
                going to sleep.
              </p>
              <Button
                onClick={() => setShowAddModal(true)}
                variant="outline"
                className="rounded-xl border-white/10 bg-white/5 hover:bg-white/60"
              >
                Add My First Service
              </Button>
            </div>
          ) : (
            <div className="grid gap-4">
              {services.map((service) => (
                <ServiceCard
                  key={service._id}
                  service={service}
                  onDelete={setServiceToDelete}
                  formatLastPing={formatLastPing}
                />
              ))}
            </div>
          )}
        </div>

        <AddServiceModal
          open={showAddModal}
          onOpenChange={setShowAddModal}
          onSubmit={handleAddService}
        />

        <DeleteServiceModal
          isOpen={!!serviceToDelete}
          onClose={() => setServiceToDelete(null)}
          onConfirm={handleDelete}
        />
      </main>

      <Footer />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={null}>
      <DashboardContent />
    </Suspense>
  );
}
