"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { LogOut, UserX, AlertTriangle } from "lucide-react";

interface ServiceDeleteModalProps {
  serviceId: any;
  onClose: () => void;
  onConfirm: () => void;
}

export function ServiceDeleteModal({
  serviceId,
  onClose,
  onConfirm,
}: ServiceDeleteModalProps) {
  return (
    <AlertDialog open={!!serviceId} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent className="w-[95vw] max-w-lg rounded-3xl border border-white/10 bg-zinc-950 p-6 md:p-8 shadow-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl md:text-2xl font-bold text-white mb-2">
            Delete Service?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-zinc-400 mb-4">
            Are you sure you want to delete this service? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-col sm:flex-row gap-3">
          <AlertDialogCancel className="flex-1 h-11 md:h-12 rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/60">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="flex-1 h-11 md:h-12 rounded-xl bg-red-600 text-white font-bold hover:bg-red-500 transition-all border-0"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

interface LogoutModalProps {
  isOpen: boolean;
  onClose: (open: boolean) => void;
  onConfirm: () => void;
}

export function LogoutModal({ isOpen, onClose, onConfirm }: LogoutModalProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="w-[95vw] max-w-lg rounded-3xl border border-white/10 bg-zinc-950 p-6 md:p-8 shadow-2xl">
        <AlertDialogHeader>
          <div className="mb-4 md:mb-6 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-2xl bg-white/5 text-white">
            <LogOut className="h-5 w-5 md:h-6 md:w-6" />
          </div>
          <AlertDialogTitle className="text-xl md:text-2xl font-bold text-white mb-2">
            Sign Out
          </AlertDialogTitle>
          <AlertDialogDescription className="text-zinc-400 mb-6 md:mb-8 text-sm md:text-base">
            Are you sure you want to sign out? You will need to sign back in to
            access your dashboard.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-col sm:flex-row gap-3">
          <AlertDialogCancel className="cursor-pointer flex-1 h-11 md:h-12 rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/60">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="cursor-pointer flex-1 h-11 md:h-12 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-500 transition-all border-0"
          >
            Sign Out
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

interface DeactivateModalProps {
  isOpen: boolean;
  onClose: (open: boolean) => void;
  onConfirm: () => void;
  isActive: boolean;
}

export function DeactivateModal({
  isOpen,
  onClose,
  onConfirm,
  isActive,
}: DeactivateModalProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="w-[95vw] max-w-lg rounded-3xl border border-white/10 bg-zinc-950 p-6 md:p-8 shadow-2xl">
        <AlertDialogHeader>
          <div className="mb-4 md:mb-6 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-2xl bg-yellow-500/10 text-yellow-400">
            <UserX className="h-5 w-5 md:h-6 md:w-6" />
          </div>
          <AlertDialogTitle className="text-xl md:text-2xl font-bold text-white mb-2">
            {isActive ? "Deactivate" : "Reactivate"} Account
          </AlertDialogTitle>
          <AlertDialogDescription className="text-zinc-400 mb-6 md:mb-8 text-sm md:text-base">
            {isActive
              ? "This will pause all monitoring services. You can reactivate anytime."
              : "This will resume all your monitoring services."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-col sm:flex-row gap-3">
          <AlertDialogCancel className="cursor-pointer flex-1 h-11 md:h-12 rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/60">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="cursor-pointer flex-1 h-11 md:h-12 rounded-xl bg-yellow-500 text-white font-bold hover:bg-yellow-600 transition-all border-0"
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: (open: boolean) => void;
  onConfirm: () => void;
  isDeleting: boolean;
}

export function DeleteAccountModal({
  isOpen,
  onClose,
  onConfirm,
  isDeleting,
}: DeleteAccountModalProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="w-[95vw] max-w-lg rounded-3xl border-red-500/20 bg-zinc-950 p-6 md:p-8 shadow-2xl">
        <AlertDialogHeader>
          <div className="mb-4 md:mb-6 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-2xl bg-red-500/10 text-red-500">
            <AlertTriangle className="h-5 w-5 md:h-6 md:w-6" />
          </div>
          <AlertDialogTitle className="text-xl md:text-2xl font-bold text-white mb-2 tracking-tight">
            Delete Account
          </AlertDialogTitle>
          <AlertDialogDescription className="text-zinc-400 mb-6 md:mb-8 leading-relaxed text-sm md:text-base">
            This action is{" "}
            <span className="text-red-400 font-bold underline underline-offset-4">
              irreversible
            </span>
            . All your services, logs, and monitoring data will be permanently
            deleted from NoSnore and your Clerk account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-col sm:flex-row gap-3">
          <AlertDialogCancel className="cursor-pointer flex-1 h-11 md:h-12 rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/60">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isDeleting}
            className="cursor-pointer flex-1 h-11 md:h-12 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 transition-all border-0"
          >
            {isDeleting ? "Deleting..." : "Yes, Delete Everything"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
