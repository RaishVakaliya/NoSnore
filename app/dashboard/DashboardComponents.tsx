"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Globe, Activity, ShieldCheck, Clock, ExternalLink, Trash2 } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  badge: string;
  color: "emerald" | "yellow" | "blue";
}

export function StatsCard({ title, value, icon, badge, color }: StatsCardProps) {
  const colorClasses = {
    emerald: "bg-emerald-500/10 text-emerald-400 hover:border-emerald-500/30",
    yellow: "bg-yellow-500/10 text-yellow-400 hover:border-yellow-500/30",
    blue: "bg-blue-500/10 text-blue-400 hover:border-blue-500/30",
  };

  return (
    <div className={`group rounded-3xl border border-white/5 bg-zinc-900/40 p-8 backdrop-blur-xl transition-all hover:bg-zinc-900/60 ${colorClasses[color]}`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl group-hover:scale-110 transition-transform ${colorClasses[color].split(' ')[0]} ${colorClasses[color].split(' ')[1]}`}>
          {icon}
        </div>
        <Badge variant="outline" className="border-white/5 text-zinc-500">
          {badge}
        </Badge>
      </div>
      <h2 className="text-sm font-medium text-zinc-400 mb-1 uppercase tracking-wider">
        {title}
      </h2>
      <p className="text-4xl font-black text-white tracking-tight">
        {value}
      </p>
    </div>
  );
}

interface ServiceCardProps {
  service: any;
  onDelete: (id: any) => void;
  formatLastPing: (timestamp?: number) => { relative: string; exact: string };
}

export function ServiceCard({ service, onDelete, formatLastPing }: ServiceCardProps) {
  const lastPing = formatLastPing(service.lastPingedAt);
  
  return (
    <div className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-white/5 bg-zinc-900/40 p-6 transition-all hover:bg-zinc-900/60 hover:border-white/10">
      <div className="flex items-start gap-4">
        <div
          className={`mt-1 h-3 w-3 shrink-0 rounded-full ${service.status === "online" ? "bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]" : "bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.5)]"}`}
        />
        <div className="space-y-1">
          <h3 className="font-bold text-white leading-none">
            {service.name}
          </h3>
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <span className="truncate max-w-[150px] sm:max-w-[200px]">
              {service.url}
            </span>
            <a
              href={service.url}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-6 sm:gap-10">
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
          <div className="flex items-center gap-1.5 text-sm text-zinc-300">
            <Badge
              variant="outline"
              className="border-white/5 bg-white/5 text-zinc-400 text-[10px]"
            >
              Every {service.interval}m
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-2 ml-auto sm:ml-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(service._id)}
            className="h-10 w-10 rounded-xl text-zinc-500 hover:bg-red-500/10 hover:text-red-400 transition-all"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
