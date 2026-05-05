"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, ExternalLink, Trash2 } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  badge: string;
  color: "emerald" | "yellow" | "blue";
  loading?: boolean;
}

const colorMap = {
  emerald: {
    card: "hover:border-emerald-500/30",
    icon: "bg-emerald-500/10 text-emerald-400",
  },
  yellow: {
    card: "hover:border-yellow-500/30",
    icon: "bg-yellow-500/10 text-yellow-400",
  },
  blue: {
    card: "hover:border-blue-500/30",
    icon: "bg-blue-500/10 text-blue-400",
  },
};

export function StatsCard({
  title,
  value,
  icon,
  badge,
  color,
  loading = false,
}: StatsCardProps) {
  const { card, icon: iconClass } = colorMap[color];

  return (
    <div
      className={`group rounded-3xl border border-white/5 bg-zinc-900/40 p-8 backdrop-blur-xl transition-all hover:bg-zinc-900/60 ${card}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl group-hover:scale-110 transition-transform ${iconClass}`}
        >
          {icon}
        </div>
        <Badge variant="outline" className="border-white/5 text-zinc-500">
          {badge}
        </Badge>
      </div>
      <h2 className="text-sm font-medium text-zinc-400 mb-1 uppercase tracking-wider">
        {title}
      </h2>
      {loading ? (
        <Skeleton className="h-10 w-20 rounded-xl mt-1" />
      ) : (
        <p className="text-4xl font-black text-white tracking-tight">{value}</p>
      )}
    </div>
  );
}

interface ServiceCardProps {
  service: any;
  onDelete: (id: any) => void;
  formatLastPing: (timestamp?: number) => { relative: string; exact: string };
}

export function ServiceCard({
  service,
  onDelete,
  formatLastPing,
}: ServiceCardProps) {
  const lastPing = formatLastPing(service.lastPingedAt);

  const status: "online" | "offline" | "pending" = !service.lastPingedAt
    ? "pending"
    : service.status === "online"
      ? "online"
      : "offline";

  const dotStyles = {
    online: "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.9)]",
    offline: "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]",
    pending: "bg-zinc-600",
  }[status];

  const badgeStyles = {
    online: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
    offline: "border-red-500/30 bg-red-500/10 text-red-400",
    pending: "border-white/5 bg-white/5 text-zinc-500",
  }[status];

  const badgeLabel = {
    online: "Online",
    offline: "Offline",
    pending: "Pending",
  }[status];

  return (
    <div className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-white/5 bg-zinc-900/40 p-6 transition-all hover:bg-zinc-900/60 hover:border-white/10">
      <div className="flex items-center gap-4">
        <div className="relative flex h-5 w-5 shrink-0 items-center justify-center">
          {status === "online" && (
            <div className="absolute h-5 w-5 rounded-full bg-emerald-400 animate-ping opacity-25" />
          )}
          <div className={`h-3 w-3 rounded-full ${dotStyles}`} />
        </div>

        <div className="space-y-1 min-w-0">
          <h3 className="font-bold text-white leading-none">{service.name}</h3>
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <span className="truncate max-w-[150px] sm:max-w-[250px]">
              {service.url}
            </span>
            <a
              href={service.url}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors shrink-0"
            >
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-6 sm:gap-10 ml-9 sm:ml-0">
        <div className="space-y-1">
          <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
            Last Ping
          </p>
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-1.5 text-sm text-zinc-300">
              <Clock className="h-3.5 w-3.5 text-zinc-500" />
              {lastPing.relative}
            </div>
            {service.lastPingedAt && (
              <p className="text-[10px] text-zinc-600 font-medium ml-5">
                at {lastPing.exact}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
            Frequency
          </p>
          <Badge
            variant="outline"
            className="border-white/5 bg-white/5 text-zinc-400 text-[10px]"
          >
            Every {service.interval}m
          </Badge>
        </div>

        <div className="space-y-1">
          <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
            Status
          </p>
          <Badge
            variant="outline"
            className={`text-[10px] font-bold border ${badgeStyles}`}
          >
            {badgeLabel}
          </Badge>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(service._id)}
          className="h-10 w-10 rounded-xl text-zinc-500 hover:bg-red-500/10 hover:text-red-400 transition-all ml-auto sm:ml-0"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
