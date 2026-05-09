"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Shield, Globe, Activity, Camera, Loader2 } from "lucide-react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { useRef, useState } from "react";
import Unauthorized from "@/components/shared/Unauthorized";
import Loading from "@/app/loading";

export default function ProfilePage() {
  const { isLoaded, isSignedIn, user: clerkUser } = useUser();
  const user = useQuery(api.users.getMe);
  const stats = useQuery(api.services.getMyStats);
  const updateProfileImage = useMutation(api.users.updateProfileImage);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  if (!isLoaded) return <Loading />;
  if (!isSignedIn) return <Unauthorized />;

  const maxServices = user?.plan === "pro" ? 10 : 2;
  const isPro = user?.plan === "pro";

  const handleImageClick = () => {
    if (!isPro) {
      toast.error("Pro Feature", {
        description: "Please upgrade to Pro to change your profile picture.",
      });
      return;
    }
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File too large", {
        description: "Image must be less than 5MB.",
      });
      return;
    }

    try {
      setIsUploading(true);
      const result = await clerkUser?.setProfileImage({ file });

      const newImageUrl = result?.publicUrl || clerkUser?.imageUrl;

      if (newImageUrl) {
        await updateProfileImage({ imageUrl: newImageUrl });
      }

      toast.success("Profile picture updated!");
    } catch (error: any) {
      toast.error("Failed to update picture", {
        description: error.message || "An unexpected error occurred.",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="mx-auto max-w-4xl px-6 pt-32 pb-24">
        <div className="relative overflow-hidden rounded-3xl border border-white/5 bg-zinc-900/40 p-8 backdrop-blur-xl sm:p-12">
          <div className="relative flex flex-col items-center gap-8 sm:flex-row sm:items-start">
            <div className="relative shrink-0">
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
              <div
                onClick={handleImageClick}
                className={`relative h-32 w-32 rounded-2xl shadow-2xl transition-all ${
                  isPro
                    ? "p-[3px] bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400 animate-[gradientShift_3s_ease_infinite] bg-[length:200%_200%] shadow-amber-500/30 cursor-pointer group"
                    : "border-4 border-white/10"
                }`}
              >
                <div className="h-full w-full overflow-hidden rounded-[14px] relative">
                  {user?.imageUrl ? (
                    <img
                      src={user.imageUrl}
                      alt={user.name || "User"}
                      className="h-full w-full object-cover transition-transform group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-zinc-800 text-4xl font-bold">
                      {user?.name?.[0] || "U"}
                    </div>
                  )}

                  {isPro && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px]">
                      {isUploading ? (
                        <Loader2 className="h-6 w-6 animate-spin text-amber-400" />
                      ) : (
                        <>
                          <Camera className="h-6 w-6 text-amber-400 mb-1" />
                          <span className="text-[10px] font-bold text-white uppercase tracking-wider">
                            Change
                          </span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
              {isPro && (
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 px-3 py-0.5 text-[10px] font-black text-white shadow-lg shadow-amber-500/30 uppercase tracking-widest">
                  ✦ Pro
                </div>
              )}
            </div>

            <div className="flex flex-1 flex-col items-center text-center sm:items-start sm:text-left">
              <div className="mb-2 flex items-center gap-3">
                <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  {user?.name || "NoSnore User"}
                </h1>
                {user?.plan === "pro" ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/40 px-3 py-0.5 text-xs font-bold text-amber-300 tracking-wide">
                    ✦ PRO
                  </span>
                ) : (
                  <Badge
                    variant="outline"
                    className="border-white/10 text-zinc-500"
                  >
                    Free
                  </Badge>
                )}
              </div>

              <p className="mb-6 flex items-center gap-2 text-zinc-400">
                <Mail className="h-4 w-4" />
                {user?.email || "loading email..."}
              </p>

              <div className="flex flex-wrap justify-center gap-3 sm:justify-start">
                <Link href="/settings">
                  <Button
                    variant="outline"
                    className="h-9 cursor-pointer rounded-xl border-white/10 bg-white/5 text-xs font-semibold text-white transition-all"
                  >
                    Account Settings
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {user?.plan === "pro" ? (
            <div className="h-full rounded-3xl border border-amber-500/20 bg-zinc-900/40 p-8 transition-all">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                  <Shield className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                  Current Plan
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">
                Enterprise Pro
              </h3>
              <p className="text-sm text-zinc-400">
                Up to 10 endpoints and 1-min intervals enabled.
              </p>
            </div>
          ) : (
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
                  Personal Free
                </h3>
                <p className="text-sm text-zinc-400 mb-6">
                  Limited to 2 endpoints and 15-min intervals.
                </p>
                <div className="inline-flex items-center text-amber-400 hover:text-amber-300 text-sm font-semibold">
                  Upgrade your plan →
                </div>
              </div>
            </Link>
          )}

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
                  width: `${Math.min(((stats?.totalServices || 0) / maxServices) * 100, 100)}%`,
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
