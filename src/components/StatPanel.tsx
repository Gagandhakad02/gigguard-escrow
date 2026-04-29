import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface StatPanelProps {
  label: string;
  value: ReactNode;
  unit?: string;
  accent?: "cyan" | "none";
  meta?: ReactNode;
}

export function StatPanel({ label, value, unit, accent = "none", meta }: StatPanelProps) {
  return (
    <div className="bg-surface-panel border border-border p-6 relative overflow-hidden group transition-colors hover:border-border-strong">
      <div
        className={cn(
          "absolute top-0 left-0 w-full h-px",
          accent === "cyan" ? "bg-led-cyan glow-cyan" : "bg-border-strong"
        )}
      />
      <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-4">
        {label}
      </div>
      <div className="flex items-baseline gap-2">
        <span className="font-mono text-4xl text-foreground tracking-tight tabular-nums font-medium">
          {value}
        </span>
        {unit && <span className="font-mono text-sm text-led-cyan">{unit}</span>}
      </div>
      {meta && <div className="mt-4 pt-4 border-t border-border/60">{meta}</div>}
    </div>
  );
}
