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

interface DeleteServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteServiceModal({
  isOpen,
  onClose,
  onConfirm,
}: DeleteServiceModalProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent className="w-[95vw] max-w-lg rounded-3xl border border-white/10 bg-zinc-950 p-6 md:p-8 shadow-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl md:text-2xl font-bold text-white mb-2">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-zinc-400 mb-4">
            This action cannot be undone. This will permanently delete the
            service and all its associated ping history.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-col sm:flex-row gap-3">
          <AlertDialogCancel
            onClick={onClose}
            className="cursor-pointer flex-1 h-11 md:h-12 rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/60"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="cursor-pointer flex-1 h-11 md:h-12 rounded-xl bg-red-600 text-white font-bold hover:bg-red-500 transition-all border-0"
          >
            Delete Service
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
