import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black px-6 pt-32 pb-16 text-center"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-emerald-600/20 blur-[120px]" />
        <div className="absolute top-1/2 -left-32 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-yellow-600/15 blur-[100px]" />
        <div className="absolute top-1/2 -right-32 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-zinc-200/15 blur-[100px]" />
      </div>

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-6">
        <Badge
          variant="outline"
          className="border-emerald-500/40 bg-emerald-500/10 px-4 py-1.5 text-emerald-300 text-xs tracking-widest uppercase"
        >
          <Zap className="mr-1.5 h-3 w-3" />
          Open-source Backend Uptime Monitor
        </Badge>

        <h1 className="max-w-3xl text-5xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl md:text-7xl">
          Keep Your{" "}
          <span className="bg-gradient-to-r from-emerald-400 to-yellow-400 bg-clip-text text-transparent">
            Backend Alive
          </span>
          <br />
          While You Sleep
        </h1>

        <p className="max-w-xl text-lg leading-relaxed text-zinc-400">
          NoSnore pings your backend services on a schedule to prevent cold
          starts. Register any URL — Node, Python, PHP, Java — and we handle the
          rest, 24/7.
        </p>

        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <Link href="/dashboard">
            <Button
              size="lg"
              className="gap-2 bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-white/10 transition-all hover:shadow-emerald-500/20 hover:-translate-y-0.5"
            >
              Start Monitoring Free
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
              className="gap-2 border-white/10 bg-white/5 text-white hover:bg-white/10"
            >
              View on GitHub
            </Button>
          </a>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-8 text-sm text-zinc-500">
          {[
            { label: "Uptime Guaranteed", value: "99.9%" },
            { label: "Avg Response Check", value: "10s" },
            { label: "Languages Supported", value: "Any HTTP" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-0.5"
            >
              <span className="text-2xl font-bold text-white">
                {stat.value}
              </span>
              <span className="text-xs text-zinc-500">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
