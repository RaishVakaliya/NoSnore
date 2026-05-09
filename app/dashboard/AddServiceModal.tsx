"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, RotateCw, X, Info, AlertCircle } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  AlertAction,
} from "@/components/ui/alert";
import Link from "next/link";

interface AddServiceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (formData: {
    name: string;
    url: string;
    interval: number;
  }) => Promise<void>;
}

export default function AddServiceModal({
  open,
  onOpenChange,
  onSubmit,
}: AddServiceModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    interval: 15,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setError(null);
    try {
      await onSubmit(formData);
      setFormData({ name: "", url: "", interval: 15 });
      onOpenChange(false);
    } catch (err: any) {
      const errorMessage =
        err?.data ||
        err?.message ||
        "Please check your plan limits. You might need to upgrade to add more services.";
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AlertDialog
      open={open}
      onOpenChange={(open) => {
        if (!isSubmitting) {
          onOpenChange(open);
          if (!open) setError(null);
        }
      }}
    >
      <AlertDialogContent className="w-[95vw] max-w-lg rounded-3xl border border-white/10 bg-zinc-950 p-6 md:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
        <button
          onClick={() => !isSubmitting && onOpenChange(false)}
          className="absolute right-4 top-4 md:right-10 md:top-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-zinc-500 hover:bg-white/10 hover:text-white transition-all"
        >
          <X className="h-4 w-4" />
        </button>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl md:text-2xl font-black text-white">
            Add Service
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-zinc-500">
            Configure your backend wake-up call.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {error && (
          <Alert
            variant="destructive"
            className="mt-4 border-red-500/20 bg-red-500/5 text-red-400"
          >
            <AlertCircle className="h-4 w-4" />
            <AlertTitle className="font-bold">
              {error.includes("limit")
                ? "Plan Limit Reached"
                : "Pro Feature Required"}
            </AlertTitle>
            <AlertDescription className="text-xs opacity-80">
              {error}
            </AlertDescription>
            <AlertAction>
              <Link href="/pricing">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 rounded-lg border-red-500/20 bg-red-500/10 text-[10px] font-bold text-red-400 hover:bg-red-500/20 hover:text-red-400"
                >
                  Upgrade
                </Button>
              </Link>
            </AlertAction>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="mt-4 space-y-4 md:space-y-5">
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
              className="w-full h-11 md:h-12 rounded-xl border border-white/5 bg-white/5 px-4 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
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
                  Use a lightweight health endpoint like{" "}
                  <code className="text-emerald-400">/health</code> instead of
                  your main page.
                </div>
              </div>
            </div>
            <input
              required
              type="url"
              placeholder="https://api.example.com/health"
              value={formData.url}
              onChange={(e) =>
                setFormData({ ...formData, url: e.target.value })
              }
              className="w-full h-11 md:h-12 rounded-xl border border-white/5 bg-white/5 px-4 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-400 ml-1">
              Ping Interval
            </label>
            <Select
              value={formData.interval.toString()}
              onValueChange={(val) =>
                setFormData({ ...formData, interval: parseInt(val) })
              }
            >
              <SelectTrigger className="w-full h-11 md:h-12 rounded-xl border-white/5 bg-white/5 text-white focus:ring-emerald-500/50">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-white/10 bg-zinc-900 text-white z-[200]">
                <SelectItem value="1">Every 1 Minute (Pro)</SelectItem>
                <SelectItem value="5">Every 5 Minutes (Pro)</SelectItem>
                <SelectItem value="15">Every 15 Minutes (Free)</SelectItem>
                <SelectItem value="30">Every 30 Minutes (Free)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="pt-2 md:pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="cursor-pointer group w-full h-11 md:h-12 rounded-xl bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-400 hover:to-emerald-400 font-bold text-white border-0 transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4 transition-transform group-hover:rotate-90" />
                  Start Monitoring
                </>
              )}
            </Button>
          </div>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
