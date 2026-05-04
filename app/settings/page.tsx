"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { useClerk, useUser } from "@clerk/nextjs";
import {
  Settings,
  Trash2,
  Power,
  LogOut,
  ShieldAlert,
  UserX,
  Plus,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Unauthorized from "@/components/shared/Unauthorized";
import Loading from "@/app/loading";
import {
  ServiceDeleteModal,
  LogoutModal,
  DeactivateModal,
  DeleteAccountModal,
} from "./SettingsModals";

export default function SettingsPage() {
  const router = useRouter();
  const { signOut } = useClerk();
  const { isLoaded, isSignedIn, user: clerkUser } = useUser();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<any>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const user = useQuery(api.users.getMe);
  const services = useQuery(api.services.list);

  const deleteService = useMutation(api.services.deleteService);
  const deactivateAccount = useMutation(api.users.deactivateAccount);
  const deleteAccount = useMutation(api.users.deleteAccount);

  const handleDeleteService = async () => {
    if (!serviceToDelete) return;
    try {
      await deleteService({ id: serviceToDelete });
      setServiceToDelete(null);
    } catch (error) {}
  };

  const handleDeactivateAccount = async () => {
    try {
      await deactivateAccount();
      setShowDeactivateModal(false);
    } catch (error) {}
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
      setIsDeleting(false);
    }
  };

  if (!isLoaded) return <Loading />;
  if (!isSignedIn) return <Unauthorized />;

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
              {services && services.length === 0 && (
                <div className="py-10 px-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left text-zinc-500 border border-dashed border-white/10 rounded-2xl">
                  <p className="flex-1">
                    No services found. Add some in the dashboard.
                  </p>
                  <Button
                    onClick={() => router.push("/dashboard")}
                    className="rounded-xl bg-white text-black font-bold hover:bg-zinc-200 h-10 px-4 transition-all"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Services
                  </Button>
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
                      variant="ghost"
                      size="icon"
                      onClick={() => setServiceToDelete(service._id)}
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
                  className="w-full rounded-xl border-white/10 bg-white/5 text-sm font-semibold text-white transition-all"
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
                  className="w-full rounded-xl border-yellow-500/20 bg-yellow-500/5 text-sm font-semibold text-yellow-400 hover:text-yellow-400  hover:border-yellow-500/20 transition-all"
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
                  className="h-12 w-full rounded-xl bg-red-500 text-white font-bold hover:bg-red-600 transition-all"
                >
                  Delete Permanently
                </Button>
              </div>
            </div>
          </section>
        </div>
      </main>

      <ServiceDeleteModal
        serviceId={serviceToDelete}
        onClose={() => setServiceToDelete(null)}
        onConfirm={handleDeleteService}
      />

      <LogoutModal
        isOpen={showLogoutModal}
        onClose={setShowLogoutModal}
        onConfirm={() => signOut(() => router.push("/"))}
      />

      <DeactivateModal
        isOpen={showDeactivateModal}
        onClose={setShowDeactivateModal}
        onConfirm={handleDeactivateAccount}
        isActive={user?.isActive ?? true}
      />

      <DeleteAccountModal
        isOpen={showDeleteModal}
        onClose={setShowDeleteModal}
        onConfirm={handleDeleteAccount}
        isDeleting={isDeleting}
      />

      <Footer />
    </div>
  );
}
