export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black">
      <div className="fixed top-0 left-0 right-0 h-1 overflow-hidden bg-white/5">
        <div className="h-full bg-emerald-500 animate-progress origin-left" />
      </div>

      <div className="relative flex flex-col items-center gap-6">
        <div className="relative h-20 w-20 overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/50 p-4 backdrop-blur-xl">
          <div className="absolute inset-0 bg-emerald-500/20 blur-xl animate-pulse" />

          <video
            src="/app_logo_video.webm"
            autoPlay
            loop
            muted
            playsInline
            className="relative h-full w-full object-cover rounded-xl opacity-50"
          />
        </div>

        <div className="flex flex-col items-center gap-2">
          <span className="text-sm font-medium tracking-widest text-zinc-500 uppercase">
            Loading NoSnore
          </span>
          <div className="flex gap-1">
            <div className="h-1 w-1 rounded-full bg-emerald-500 animate-bounce [animation-delay:-0.3s]" />
            <div className="h-1 w-1 rounded-full bg-emerald-500 animate-bounce [animation-delay:-0.15s]" />
            <div className="h-1 w-1 rounded-full bg-emerald-500 animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
}
