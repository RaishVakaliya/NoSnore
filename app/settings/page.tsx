"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useClerk, useUser } from "@clerk/nextjs";
import {
  Settings,
  Trash2,
  Power,
  LogOut,
  ShieldAlert,
  UserX,
  CheckCircle2,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SettingsPage() {
  const router = useRouter();
  const { signOut } = useClerk();
  const { user: clerkUser } = useUser();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const user = useQuery(api.users.getMe);
  const services = useQuery(api.services.list);

  const updateService = useMutation(api.services.updateService);
  const deleteService = useMutation(api.services.deleteService);
  const deactivateAccount = useMutation(api.users.deactivateAccount);
  const deleteAccount = useMutation(api.users.deleteAccount);

  const handleToggleService = async (id: any, currentActive: boolean) => {
    try {
      await updateService({ id, isActive: !currentActive });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteService = async (id: any) => {
    try {
      await deleteService({ id });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeactivateAccount = async () => {
    try {
      await deactivateAccount();
      setShowDeactivateModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteAccount = async () => {
    if (isDeleting) return;
    setIsDeleting(true);
    try {
      await deleteAccount();

      if (clerkUser) {
        await clerkUser.delete();
      }

      setShowDeleteModal(false);
      router.push("/");
    } catch (error) {
      console.error(error);
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="mx-auto max-w-4xl px-6 pt-32 pb-24">
        <div className="mb-12 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-white">
            <Settings className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">App Settings</h1>
            <p className="text-zinc-400">
              Manage your account, services, and preferences.
            </p>
          </div>
        </div>

        <div className="space-y-10">
          <section className="rounded-3xl border border-white/5 bg-zinc-900/40 p-8 backdrop-blur-xl">
            <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-white">
              <Power className="h-5 w-5 text-emerald-400" />
              Service Management
            </h2>

            <div className="space-y-4">
              {services?.length === 0 && (
                <div className="py-10 text-center text-zinc-500 border border-dashed border-white/10 rounded-2xl">
                  No services found. Add some in the dashboard.
                </div>
              )}
              {services?.map((service) => (
                <div
                  key={service._id}
                  className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between rounded-2xl border border-white/5 bg-white/[0.02] p-4 transition-colors hover:bg-white/[0.05]"
                >
                  <div>
                    <h3 className="font-semibold text-white">{service.name}</h3>
                    <p className="text-xs text-zinc-500 truncate max-w-[200px] sm:max-w-xs">
                      {service.url}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleToggleService(service._id, service.isActive)
                      }
                      className={`h-9 rounded-xl border-white/10 text-xs font-semibold transition-all ${
                        service.isActive
                          ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                          : "bg-white/5 text-zinc-400 hover:bg-white/10"
                      }`}
                    >
                      {service.isActive ? (
                        <CheckCircle2 className="mr-2 h-3.5 w-3.5" />
                      ) : (
                        <XCircle className="mr-2 h-3.5 w-3.5" />
                      )}
                      {service.isActive ? "Active" : "Paused"}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteService(service._id)}
                      className="h-9 w-9 rounded-xl text-zinc-500 hover:bg-red-500/10 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-white/5 bg-zinc-900/40 p-8 backdrop-blur-xl">
            <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-white">
              <ShieldAlert className="h-5 w-5 text-yellow-400" />
              Account Security
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-zinc-400">
                  <LogOut className="h-5 w-5" />
                </div>
                <h3 className="mb-1 font-bold text-white">Sign Out</h3>
                <p className="mb-6 text-sm text-zinc-500 leading-relaxed">
                  Securely sign out of your current session.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setShowLogoutModal(true)}
                  className="w-full rounded-xl border-white/10 bg-white/5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                >
                  Logout
                </Button>
              </div>

              <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-400">
                  <UserX className="h-5 w-5" />
                </div>
                <h3 className="mb-1 font-bold text-white">
                  Deactivate Account
                </h3>
                <p className="mb-6 text-sm text-zinc-500 leading-relaxed">
                  Pause all monitoring and hide your profile.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setShowDeactivateModal(true)}
                  className="w-full rounded-xl border-yellow-500/20 bg-yellow-500/5 text-sm font-semibold text-yellow-400 hover:bg-yellow-500/10 transition-colors"
                >
                  {user?.isActive ? "Deactivate Account" : "Reactivate Account"}
                </Button>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/[0.06]">
              <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
                <h3 className="mb-1 font-bold text-red-400">Danger Zone</h3>
                <p className="mb-6 text-sm text-red-400/60 leading-relaxed">
                  Once you delete your account, there is no going back. Please
                  be certain.
                </p>
                <Button
                  variant="destructive"
                  onClick={() => setShowDeleteModal(true)}
                  className="h-12 w-full rounded-xl bg-red-500 text-white font-bold hover:bg-red-600 transition-all shadow-lg shadow-red-500/20"
                >
                  Delete Permanently
                </Button>
              </div>
            </div>
          </section>
        </div>

        {(showLogoutModal || showDeactivateModal || showDeleteModal) && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
              onClick={() => {
                setShowLogoutModal(false);
                setShowDeactivateModal(false);
                setShowDeleteModal(false);
              }}
            />

            {showLogoutModal && (
              <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-zinc-950 p-8 shadow-2xl animate-in zoom-in-95 duration-200">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-white">
                  <LogOut className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Sign Out</h2>
                <p className="text-zinc-400 mb-8">
                  Are you sure you want to sign out? You will need to sign back
                  in to access your dashboard.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowLogoutModal(false)}
                    className="flex-1 rounded-xl border-white/10 bg-white/5 hover:bg-white/10 text-white"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => signOut(() => router.push("/"))}
                    className="flex-1 rounded-xl bg-white text-black font-bold hover:bg-zinc-200"
                  >
                    Sign Out
                  </Button>
                </div>
              </div>
            )}

            {showDeactivateModal && (
              <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-zinc-950 p-8 shadow-2xl animate-in zoom-in-95 duration-200">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-500/10 text-yellow-400">
                  <UserX className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  {user?.isActive ? "Deactivate" : "Reactivate"} Account
                </h2>
                <p className="text-zinc-400 mb-8">
                  {user?.isActive
                    ? "This will pause all monitoring services. You can reactivate anytime."
                    : "This will resume all your monitoring services."}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowDeactivateModal(false)}
                    className="flex-1 rounded-xl border-white/10 bg-white/5 hover:bg-white/10 text-white"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleDeactivateAccount}
                    className="flex-1 rounded-xl bg-yellow-500 text-white font-bold hover:bg-yellow-600"
                  >
                    Confirm
                  </Button>
                </div>
              </div>
            )}

            {showDeleteModal && (
              <div className="relative w-full max-w-md rounded-3xl border border-red-500/20 bg-zinc-950 p-8 shadow-2xl animate-in zoom-in-95 duration-200">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 text-red-500">
                  <AlertTriangle className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">
                  Delete Account
                </h2>
                <p className="text-zinc-400 mb-8 leading-relaxed">
                  This action is{" "}
                  <span className="text-red-400 font-bold underline underline-offset-4">
                    irreversible
                  </span>
                  . All your services, logs, and monitoring data will be
                  permanently deleted from NoSnore and your Clerk account.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowDeleteModal(false)}
                    className="flex-1 rounded-xl border-white/10 bg-white/5 hover:bg-white/10 text-white"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleDeleteAccount}
                    disabled={isDeleting}
                    className="flex-1 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 shadow-lg shadow-red-500/20"
                  >
                    {isDeleting ? "Deleting..." : "Yes, Delete Everything"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
