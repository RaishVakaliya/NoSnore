import { Badge } from "@/components/ui/badge";

const languages = [
  {
    name: "Node.js",
    color: "border-green-500/30 bg-green-500/10 text-green-400",
    example: "Express / Fastify / NestJS",
  },
  {
    name: "Python",
    color: "border-yellow-500/30 bg-yellow-500/10 text-yellow-400",
    example: "Flask / FastAPI / Django",
  },
  {
    name: "Java",
    color: "border-orange-500/30 bg-orange-500/10 text-orange-400",
    example: "Spring Boot / Quarkus",
  },
  {
    name: "PHP",
    color: "border-indigo-500/30 bg-indigo-500/10 text-indigo-400",
    example: "Laravel / Symfony / Slim",
  },
  {
    name: "Go",
    color: "border-sky-500/30 bg-sky-500/10 text-sky-400",
    example: "Gin / Echo / Fiber",
  },
  {
    name: "Ruby",
    color: "border-red-500/30 bg-red-500/10 text-red-400",
    example: "Rails / Sinatra",
  },
  {
    name: "Rust",
    color: "border-amber-500/30 bg-amber-500/10 text-amber-400",
    example: "Actix-Web / Axum",
  },
  {
    name: "Any HTTP",
    color: "border-blue-500/30 bg-blue-500/10 text-blue-400",
    example: "Any public endpoint URL",
  },
];

export default function LanguageSupportSection() {
  return (
    <section
      id="languages"
      className="relative bg-black py-24 px-6"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

      <div className="mx-auto max-w-6xl text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-yellow-400">
          Language Support
        </p>
        <h2 className="text-4xl font-bold text-white">
          Works with every stack
        </h2>
        <p className="mt-4 mb-12 text-zinc-400 max-w-xl mx-auto">
          NoSnore doesn&apos;t care what your backend is built with. As long as it
          responds to HTTP — we&apos;ll keep it awake.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {languages.map((lang) => (
            <div
              key={lang.name}
              className={`group flex flex-col items-center gap-2 rounded-xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${lang.color}`}
            >
              <Badge
                variant="outline"
                className={`border ${lang.color} text-sm font-bold px-3 py-1`}
              >
                {lang.name}
              </Badge>
              <p className="text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors">
                {lang.example}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-sm text-zinc-600">
          If it has a URL, NoSnore can ping it. Zero SDK or library required.
        </p>
      </div>
    </section>
  );
}
