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
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
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
                No<span className="text-emerald-400">Snore</span>
              </span>
            </Link>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-xs">
              Keep your free-tier backends alive with scheduled HTTP pings.
              Open-source, privacy-first, and always free.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-400 transition hover:border-white/20 hover:text-white"
              >
                <GitFork className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-400 transition hover:border-white/20 hover:text-white"
              >
                <MessageSquare className="h-4 w-4" />
              </a>
            </div>
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

        <div className="flex flex-col items-center justify-between gap-3 text-xs text-zinc-600 sm:flex-row">
          <p>© {new Date().getFullYear()} NoSnore. All rights reserved.</p>
          <p className="font-medium text-emerald-500/80">✨ Happy {dayName}!</p>
        </div>
      </div>
    </footer>
  );
}
