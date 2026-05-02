import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative bg-zinc-950 py-24 px-6">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent" />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-600/15 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-3xl text-center">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-yellow-600 mb-6 shadow-xl shadow-white/10">
          <Zap className="h-6 w-6 text-white" />
        </div>
        <h2 className="text-4xl font-extrabold text-white sm:text-5xl">
          Stop letting your backend sleep
        </h2>
        <p className="mt-4 text-zinc-400 text-lg">
          NoSnore keeps your Render, Railway, Fly.io or any free-tier backend
          always ready — no cold starts, no unhappy users.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link href="/dashboard">
            <Button
              size="lg"
              className="gap-2 bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-white/10 transition-all hover:-translate-y-0.5 hover:shadow-emerald-500/20"
            >
              Start Monitoring — It&apos;s Free
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              variant="outline"
              className="border-white/10 bg-white/5 text-white hover:bg-white/10"
            >
              Self-host on GitHub
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
