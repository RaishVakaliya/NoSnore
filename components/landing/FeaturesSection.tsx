import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Bell, Clock, Globe, ShieldCheck, Activity, Zap } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Instant Wake-Up Pings",
    description:
      "Schedule HTTP pings to your backend at custom intervals — from every 1 minute to once a day.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    icon: Activity,
    title: "Real-Time Status",
    description:
      "Get live response-time graphs and status updates powered by Convex real-time subscriptions.",
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
  },
  {
    icon: Bell,
    title: "Downtime Alerts",
    description:
      "Receive immediate notifications when a service goes down, before your users even notice.",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
  },
  {
    icon: Globe,
    title: "Any Language, Any Stack",
    description:
      "Works with any publicly accessible HTTP endpoint — Node.js, Python, Java, PHP, Ruby, Go.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    icon: Clock,
    title: "Ping Log History",
    description:
      "Full audit trail of every ping — response code, latency, and timestamp — stored forever.",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Reliable",
    description:
      "Your endpoint URLs are encrypted and our worker daemon runs 24/7 with no single point of failure.",
    color: "text-sky-400",
    bg: "bg-sky-500/10",
  },
];

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="relative bg-black py-24 px-6"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-emerald-400">
            Features
          </p>
          <h2 className="text-4xl font-bold text-white">
            Everything you need to stay online
          </h2>
          <p className="mt-4 text-zinc-400 max-w-xl mx-auto">
            NoSnore combines real-time monitoring, smart scheduling, and instant
            alerting — all in one lightweight platform.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.title}
                className="group border border-white/5 bg-white/3 backdrop-blur transition-all duration-300 hover:border-white/10 hover:bg-white/5 hover:-translate-y-1"
              >
                <CardHeader className="pb-3">
                  <div
                    className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl ${feature.bg}`}
                  >
                    <Icon className={`h-5 w-5 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-base font-semibold text-white">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed text-zinc-400">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
