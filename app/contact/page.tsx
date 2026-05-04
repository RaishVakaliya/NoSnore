"use client";

import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Copy,
  Check,
  MessageCircle,
  Zap,
  Shield,
  LayoutDashboard,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const HELP_TOPICS = [
  {
    icon: <Zap className="h-5 w-5 text-emerald-400" />,
    title: "Technical Support",
    description: "Issues with pinging, cold starts, or service configuration.",
  },
  {
    icon: <Shield className="h-5 w-5 text-blue-400" />,
    title: "Billing & Plans",
    description: "Questions about Pro features, invoices, or upgrading.",
  },
  {
    icon: <MessageCircle className="h-5 w-5 text-purple-400" />,
    title: "Feature Requests",
    description: "Have an idea to make NoSnore better? We're listening.",
  },
  {
    icon: <Mail className="h-5 w-5 text-orange-400" />,
    title: "Partnerships",
    description: "For business inquiries, API integrations, and collaboration.",
  },
];

export default function ContactPage() {
  const [copied, setCopied] = useState(false);
  const email = "support@nosnore.com";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-emerald-500/30">
      <Navbar />

      <main className="mx-auto max-w-5xl px-6 pt-32 pb-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-black tracking-tight sm:text-6xl mb-6">
            We're here to{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              help you.
            </span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Have a question about NoSnore? Whether it's a technical hurdle or
            just a quick query, our team is ready to keep your backend alive.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1 space-y-6">
            <div className="rounded-3xl border border-white/5 bg-zinc-900/40 p-8 backdrop-blur-xl">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-white">
                <Mail className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-bold mb-2">Email Us</h2>
              <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
                Send us an email and we'll get back to you within 24 hours.
              </p>

              <div className="group relative flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 transition-all hover:bg-white/10">
                <span className="text-sm font-medium text-white truncate mr-2">
                  {email}
                </span>
                <button
                  onClick={copyToClipboard}
                  className="shrink-0 flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 transition-all hover:bg-emerald-500 hover:text-white"
                  title="Copy email"
                >
                  {copied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="rounded-3xl border border-white/5 bg-zinc-900/40 p-8 backdrop-blur-xl">
              <h2 className="text-xl font-bold mb-4 text-white">
                Need a quick fix?
              </h2>
              <Link href="/dashboard">
                <Button className="w-full h-12 rounded-2xl bg-white text-black font-bold hover:bg-zinc-200 transition-all group">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Back to Dashboard
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-3xl border border-white/5 bg-zinc-900/40 p-8 backdrop-blur-xl h-full">
              <h2 className="text-2xl font-black mb-8 text-white">
                What can we help you with?
              </h2>

              <div className="grid gap-6 sm:grid-cols-2">
                {HELP_TOPICS.map((topic, index) => (
                  <div
                    key={index}
                    className="group rounded-2xl border border-white/5 bg-white/[0.02] p-6 transition-all hover:bg-white/[0.05] hover:border-white/10"
                  >
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 group-hover:scale-110 transition-transform">
                      {topic.icon}
                    </div>
                    <h3 className="font-bold text-white mb-2">{topic.title}</h3>
                    <p className="text-sm text-zinc-500 leading-relaxed">
                      {topic.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-10 p-6 rounded-2xl border border-dashed border-white/10 text-center">
                <p className="text-zinc-500 text-sm">
                  Don't see your topic? Just shoot us an email at{" "}
                  <span className="text-white font-medium">{email}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
