import Link from "next/link";
import { Zap, GitFork, X, MessageSquare } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const links = {
  Product: [
    { label: "Features", href: "/#features" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Languages", href: "/#languages" },
  ],
  Resources: [
    { label: "Documentation", href: "#" },
    { label: "Contact Us", href: "/contact" },
    { label: "Changelog", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export default function Footer() {
  const dayName = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
    new Date(),
  );

  return (
    <footer className="border-t border-white/5 bg-black px-6 pt-16 pb-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col gap-10 lg:flex-row lg:justify-between lg:gap-0">
          <div className="lg:max-w-sm">
            <Link href="#home" className="flex items-center gap-2 group mb-4">
              <span className="flex h-10 w-16 items-center justify-center overflow-hidden rounded-lg bg-zinc-900 shadow-lg shadow-white/5 transition-transform group-hover:scale-105">
                <video
                  src="/app_logo_video.webm"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover"
                />
              </span>
              <span className="text-lg font-bold text-white">
                No
                <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                  Snore
                </span>
              </span>
            </Link>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-xs">
              Keep your free-tier backends alive with scheduled HTTP pings.
              Open-source, privacy-first, and always free.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:gap-x-16">
            {Object.entries(links).map(([group, items]) => (
              <div key={group}>
                <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-400">
                  {group}
                </h4>
                <ul className="space-y-2.5">
                  {items.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="text-sm text-zinc-500 hover:text-white transition-colors"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <Separator className="bg-white/5 mb-6" />

        <div className="flex flex-col items-center justify-between gap-6 text-xs text-zinc-600 sm:flex-row sm:gap-3">
          <p className="flex-1 text-center sm:text-left">
            © {new Date().getFullYear()} NoSnore. All rights reserved.
          </p>

          <div className="flex h-6 shrink-0 items-center justify-center opacity-40 grayscale transition-all hover:opacity-100 hover:grayscale-0">
            <img
              src="/pulse-removebg-previewty.png"
              alt="PulsePing"
              className="h-full w-auto object-contain"
            />
          </div>

          <p className="flex-1 font-medium text-emerald-500/80 text-center sm:text-right">
            ✨ Happy {dayName}!
          </p>
        </div>
      </div>
    </footer>
  );
}
