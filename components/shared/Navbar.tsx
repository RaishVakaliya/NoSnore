"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, User } from "lucide-react";
import { SignInButton, SignUpButton, SignOutButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const NAV_LINKS = [
  { label: "Features", href: "/#features" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Languages", href: "/#languages" },
  { label: "Pricing", href: "/pricing" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const user = useQuery(api.users.getMe);
  const [navPositions, setNavPositions] = useState<
    { left: number; width: number }[]
  >([]);

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
            href="/dashboard"
            aria-label="NoSnore dashboard"
            className="group flex shrink-0 items-center gap-2.5 rounded-full pl-1.5 pr-4 py-1"
          >
            <div className="relative flex h-8 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full transition-transform duration-200">
              <video
                src="/app_logo_video.webm"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
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
            className="relative hidden items-center gap-1 md:flex"
            aria-label="Main navigation"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div
              className="absolute h-8 rounded-full bg-white/10 border border-white/15 backdrop-blur-sm transition-all duration-300 ease-out"
              style={{
                left:
                  hoveredIndex !== null ? navPositions[hoveredIndex]?.left : 0,
                width:
                  hoveredIndex !== null ? navPositions[hoveredIndex]?.width : 0,
                opacity: hoveredIndex !== null ? 1 : 0,
                visibility: hoveredIndex !== null ? "visible" : "hidden",
              }}
            />

            {NAV_LINKS.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onMouseEnter={(e) => {
                  const target = e.currentTarget;
                  setNavPositions((prev) => {
                    const newPositions = [...prev];
                    newPositions[index] = {
                      left: target.offsetLeft,
                      width: target.offsetWidth,
                    };
                    return newPositions;
                  });
                  setHoveredIndex(index);
                }}
                className={`relative z-10 rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-300 ${
                  hoveredIndex === index
                    ? "text-white"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}

            <Authenticated>
              <Link
                href="/dashboard"
                onMouseEnter={(e) => {
                  const target = e.currentTarget;
                  const index = NAV_LINKS.length;
                  setNavPositions((prev) => {
                    const newPositions = [...prev];
                    newPositions[index] = {
                      left: target.offsetLeft,
                      width: target.offsetWidth,
                    };
                    return newPositions;
                  });
                  setHoveredIndex(index);
                }}
                className={`relative z-10 rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-300 ${
                  hoveredIndex === NAV_LINKS.length
                    ? "text-white"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Dashboard
              </Link>
            </Authenticated>
          </nav>

          <div className="flex items-center gap-1 pr-1">
            <Unauthenticated>
              <SignUpButton mode="modal">
                <button className="inline-flex h-8 items-center gap-1.5 rounded-full bg-zinc-900 border border-white/10 px-4 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-zinc-800 hover:border-white/20 active:scale-[0.98]">
                  Get Started
                </button>
              </SignUpButton>
            </Unauthenticated>

            <Authenticated>
              <div className="flex items-center gap-1">
                <Link
                  href="/profile"
                  className="group relative flex h-9 w-9 items-center justify-center"
                  aria-label="View Profile"
                >
                  <div
                    className={`relative flex items-center justify-center rounded-full ${
                      user?.plan === "pro"
                        ? "h-9 w-9 p-[1.5px] bg-gradient-to-r from-yellow-500 to-yellow-300"
                        : "h-8 w-8"
                    }`}
                  >
                    <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-zinc-900">
                      {user?.imageUrl ? (
                        <img
                          src={user.imageUrl}
                          alt={user.name || "Profile"}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <User className="h-4 w-4 text-zinc-400" />
                      )}
                      <span className="pointer-events-none absolute w-[200%] h-[200%] bg-[linear-gradient(135deg,transparent_45%,rgba(255,255,255,0.5)_50%,transparent_55%)] animate-[beamMove_2.5s_linear_infinite]" />
                    </div>
                  </div>
                </Link>
              </div>
            </Authenticated>

            <AuthLoading>
              <div className="h-8 w-8 animate-pulse rounded-full bg-white/10" />
            </AuthLoading>

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
            <Unauthenticated>
              <SignInButton mode="modal">
                <button className="rounded-xl px-4 py-2.5 text-sm font-medium text-zinc-500 transition-colors hover:bg-white/5 hover:text-white text-left">
                  Sign in
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="flex items-center justify-center rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-100">
                  Get Started
                </button>
              </SignUpButton>
            </Unauthenticated>

            <Authenticated>
              <Link
                href="/dashboard"
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-2.5 text-sm font-medium text-zinc-500 transition-colors hover:bg-white/5 hover:text-white"
              >
                Dashboard
              </Link>
              <Link
                href="/profile"
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-2.5 text-sm font-medium text-zinc-500 transition-colors hover:bg-white/5 hover:text-white"
              >
                Profile Settings
              </Link>
            </Authenticated>
          </div>
        </nav>
      </div>
    </>
  );
}
