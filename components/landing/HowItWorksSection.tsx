import { Separator } from "@/components/ui/separator";

const steps = [
  {
    step: "01",
    title: "Register Your Endpoint",
    description:
      "Add your backend URL, give it a name, and choose a ping interval (e.g. every 5 minutes). Supports any HTTP endpoint.",
    code: `POST /api/services\n{\n  "name": "My API",\n  "url": "https://my-api.onrender.com",\n  "interval": 5,\n  "isActive": true\n}`,
  },
  {
    step: "02",
    title: "Worker Daemon Pings It",
    description:
      "The NoSnore Node.js background worker checks every 10 seconds and sends a GET request to each due endpoint automatically.",
    code: `[Worker] Scanning active services...\n[Worker] Pinging [My API] -> https://...\n[Worker] Responded with 200 in 342ms\n[Worker] Updated Convex state for [My API]`,
  },
  {
    step: "03",
    title: "View Logs in Real-Time",
    description:
      "Your dashboard shows live status, response time history, and full ping logs — all powered by Convex real-time subscriptions.",
    code: `Status:    ● UP\nLast Ping: 2 seconds ago\nResponse:  200 OK (342ms)\nLogs:      100 entries stored`,
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative bg-zinc-950 py-24 px-6">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-yellow-400">
            How It Works
          </p>
          <h2 className="text-4xl font-bold text-white">
            Up and running in 3 steps
          </h2>
          <p className="mt-4 text-zinc-400">
            No complex setup. Just register your URL and NoSnore does the rest.
          </p>
        </div>

        <div className="flex flex-col gap-12">
          {steps.map((step, i) => (
            <div key={step.step}>
              <div className="grid items-center gap-8 lg:grid-cols-2">
                <div
                  className={`flex flex-col gap-4 ${i % 2 === 1 ? "lg:order-2" : ""}`}
                >
                  <span className="text-5xl font-black text-white/5">
                    {step.step}
                  </span>
                  <h3 className="text-2xl font-bold text-white -mt-8">
                    {step.title}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className={`${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="rounded-xl border border-white/10 bg-black/60 p-5 font-mono text-sm shadow-2xl shadow-white/5">
                    <div className="mb-3 flex gap-1.5">
                      <span className="h-3 w-3 rounded-full bg-red-500/60" />
                      <span className="h-3 w-3 rounded-full bg-yellow-500/60" />
                      <span className="h-3 w-3 rounded-full bg-emerald-500/60" />
                    </div>
                    <pre className="whitespace-pre-wrap text-emerald-300 text-xs leading-6">
                      {step.code}
                    </pre>
                  </div>
                </div>
              </div>
              {i < steps.length - 1 && (
                <Separator className="mt-12 bg-white/5" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
