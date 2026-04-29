import { cn } from "@/lib/utils";
import { STATUS_META, type GigStatus } from "@/lib/gigs";

const colorMap = {
  cyan: { dot: "bg-led-cyan glow-cyan", text: "text-led-cyan", ring: "ring-led-cyan/30" },
  green: { dot: "bg-led-green glow-green", text: "text-led-green", ring: "ring-led-green/30" },
  amber: { dot: "bg-led-amber glow-amber", text: "text-led-amber", ring: "ring-led-amber/30" },
  red: { dot: "bg-led-red glow-red", text: "text-led-red", ring: "ring-led-red/30" },
  muted: { dot: "bg-muted-foreground/60", text: "text-muted-foreground", ring: "ring-border-strong" },
} as const;

export function StatusBadge({ status }: { status: GigStatus }) {
  const meta = STATUS_META[status];
  const c = colorMap[meta.color];
  return (
    <span className={cn("inline-flex items-center gap-2 px-2.5 py-1 ring-1 ring-inset bg-surface-base/40", c.ring)}>
      <span className={cn("size-1.5", c.dot, meta.pulse && "animate-pulse-led")} />
      <span className={cn("font-mono text-[10px] uppercase tracking-widest", c.text)}>{meta.label}</span>
    </span>
  );
}
