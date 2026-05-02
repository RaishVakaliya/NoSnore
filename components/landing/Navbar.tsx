"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Languages", href: "#languages" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
        <header
          className={[
            "flex w-full max-w-3xl items-center justify-between rounded-full px-2 py-1.5 transition-all duration-300",
            scrolled
              ? "border border-white/10 bg-zinc-900/90 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl"
              : "border border-white/[0.08] bg-zinc-900/70 shadow-[0_4px_24px_rgba(0,0,0,0.25)] backdrop-blur-lg",
          ].join(" ")}
        >
          <Link
            href="#home"
            aria-label="NoSnore home"
            className="group flex shrink-0 items-center gap-2.5 rounded-full pl-1.5 pr-4 py-1"
          >
            <div className="relative flex h-8 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full transition-transform duration-200">
              <video
                src="/app_logo_video.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover"
              />
            </div>

            <span className="text-[15px] font-semibold tracking-tight text-white">
              No
              <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                Snore
              </span>
            </span>
          </Link>

          <nav
            className="hidden items-center gap-0.5 md:flex"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-1.5 text-sm font-medium text-zinc-400 transition-all duration-150 hover:bg-white/8 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1 pr-1">
            <Link
              href="/login"
              className="hidden rounded-full px-4 py-1.5 text-sm font-medium text-zinc-400 transition-colors duration-150 hover:text-white md:block"
            >
              Sign in
            </Link>

            <Link
              href="/dashboard"
              className="inline-flex h-8 items-center gap-1.5 rounded-full bg-white px-4 text-sm font-semibold text-zinc-900 shadow-sm transition-all duration-150 hover:bg-zinc-100 hover:shadow-md active:scale-[0.98]"
            >
              Get Started
            </Link>

            <button
              id="navbar-mobile-toggle"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="ml-1 flex h-8 w-8 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-white/10 hover:text-white md:hidden"
            >
              {open ? (
                <X className="h-4 w-4" strokeWidth={2.5} />
              ) : (
                <Menu className="h-4 w-4" strokeWidth={2.5} />
              )}
            </button>
          </div>
        </header>
      </div>

      <div
        className={[
          "fixed inset-x-4 top-[4.5rem] z-40 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/95 shadow-2xl backdrop-blur-xl transition-all duration-300 ease-in-out md:hidden",
          open
            ? "max-h-80 opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-2 pointer-events-none",
        ].join(" ")}
      >
        <nav className="flex flex-col gap-1 p-3" aria-label="Mobile navigation">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-2.5 text-sm font-medium text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
            >
              {item.label}
            </Link>
          ))}

          <div className="mt-1 border-t border-white/[0.06] pt-2 flex flex-col gap-1.5">
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-2.5 text-sm font-medium text-zinc-500 transition-colors hover:bg-white/5 hover:text-white"
            >
              Sign in
            </Link>
            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-100"
            >
              Get Started
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
