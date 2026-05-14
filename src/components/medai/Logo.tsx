import { Activity } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Logo({ to = "/" as const, size = "md" }: { to?: string; size?: "sm" | "md" }) {
  const dim = size === "sm" ? "h-8 w-8" : "h-10 w-10";
  const text = size === "sm" ? "text-base" : "text-xl";
  const content = (
    <div className="flex items-center gap-2.5">
      <div className={`relative ${dim} rounded-xl bg-gradient-primary shadow-glow grid place-items-center`}>
        <Activity className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
        <div className="absolute inset-0 rounded-xl ring-1 ring-white/30" />
      </div>
      <div className={`font-display font-semibold tracking-tight ${text}`}>
        Med<span className="text-gradient">AI</span>
      </div>
    </div>
  );
  return <Link to={to as any}>{content}</Link>;
}
