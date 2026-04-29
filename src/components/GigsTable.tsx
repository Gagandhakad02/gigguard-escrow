import { StatusBadge } from "./StatusBadge";
import { truncateAddr, type Gig, type GigStatus } from "@/lib/gigs";
import { Check, AlertOctagon } from "lucide-react";

interface GigsTableProps {
  gigs: Gig[];
  onAction: (id: string, action: "approve" | "dispute") => void;
}

export function GigsTable({ gigs, onAction }: GigsTableProps) {
  return (
    <div className="bg-surface-panel border border-border">
      {/* Header */}
      <div className="grid grid-cols-[2.2fr_1.4fr_1.2fr_1.4fr_120px] gap-4 p-4 border-b border-border text-[10px] font-mono uppercase tracking-widest text-muted-foreground bg-surface-base/40">
        <div>Deliverable</div>
        <div>Client / Freelancer</div>
        <div className="text-right">Locked</div>
        <div className="pl-6">Status</div>
        <div className="text-right">Action</div>
      </div>

      <div className="flex flex-col">
        {gigs.map((g, i) => (
          <Row key={g.id} gig={g} onAction={onAction} isLast={i === gigs.length - 1} />
        ))}
      </div>
    </div>
  );
}

function Row({
  gig,
  onAction,
  isLast,
}: {
  gig: Gig;
  onAction: (id: string, action: "approve" | "dispute") => void;
  isLast: boolean;
}) {
  const dim = gig.status === "settled";
  return (
    <div
      className={`grid grid-cols-[2.2fr_1.4fr_1.2fr_1.4fr_120px] gap-4 p-4 items-center hover:bg-surface-hover transition-colors animate-fade-up ${
        !isLast ? "border-b border-border/60" : ""
      } ${dim ? "opacity-60" : ""}`}
    >
      <div>
        <div className="font-medium text-sm text-foreground">{gig.title}</div>
        <div className="text-xs text-muted-foreground mt-1 font-mono">
          {gig.id} · {gig.milestone}
        </div>
      </div>
      <div className="flex flex-col gap-1.5 font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-muted-foreground w-4 uppercase">C:</span>
          <span className="text-foreground">{truncateAddr(gig.client)}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-muted-foreground w-4 uppercase">F:</span>
          <span className="text-led-cyan">{truncateAddr(gig.freelancer)}</span>
        </div>
      </div>
      <div className="text-right font-mono text-sm">
        <span className="text-foreground tabular-nums">{gig.amount.toLocaleString()}</span>
        <span className="text-muted-foreground">.00</span>
        <span className="text-muted-foreground/70 ml-1 text-[10px] uppercase">USDC</span>
      </div>
      <div className="pl-6">
        <StatusBadge status={gig.status as GigStatus} />
      </div>
      <div className="flex items-center justify-end gap-1.5">
        {(gig.status === "awaiting_review" || gig.status === "in_progress") && (
          <>
            <button
              onClick={() => onAction(gig.id, "approve")}
              title="Approve & release funds"
              className="size-7 grid place-items-center border border-led-green/30 text-led-green hover:bg-led-green/10 transition-colors"
            >
              <Check className="size-3.5" strokeWidth={2.5} />
            </button>
            <button
              onClick={() => onAction(gig.id, "dispute")}
              title="Raise dispute"
              className="size-7 grid place-items-center border border-led-red/30 text-led-red hover:bg-led-red/10 transition-colors"
            >
              <AlertOctagon className="size-3.5" strokeWidth={2.5} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
