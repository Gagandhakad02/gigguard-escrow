import { useMemo, useState } from "react";
import { WalletConnect } from "@/components/WalletConnect";
import { StatPanel } from "@/components/StatPanel";
import { GigsTable } from "@/components/GigsTable";
import { CreateGigDialog } from "@/components/CreateGigDialog";
import { EmptyState } from "@/components/EmptyState";
import { SEED_GIGS, type Gig } from "@/lib/gigs";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [address, setAddress] = useState<string | null>(null);
  const [gigs, setGigs] = useState<Gig[]>(SEED_GIGS);

  const stats = useMemo(() => {
    const escrow = gigs
      .filter((g) => g.status !== "settled" && g.status !== "pending_deposit")
      .reduce((s, g) => s + g.amount, 0);
    const active = gigs.filter((g) => g.status === "in_progress" || g.status === "awaiting_review").length;
    const pending = gigs.filter((g) => g.status === "awaiting_review").length;
    return { escrow, active, pending };
  }, [gigs]);

  const handleAction = (id: string, action: "approve" | "dispute") => {
    setGigs((prev) =>
      prev.map((g) =>
        g.id === id
          ? { ...g, status: action === "approve" ? "settled" : "dispute" }
          : g
      )
    );
    toast({
      title: action === "approve" ? "Funds released" : "Dispute filed",
      description:
        action === "approve"
          ? `Contract ${id} settled — USDC transferred to freelancer.`
          : `Contract ${id} flagged. Timelock arbitration engaged.`,
    });
  };

  return (
    <div className="min-h-dvh flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-surface-base/80 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="font-mono font-bold tracking-tighter text-foreground">
              NEXUS<span className="text-muted-foreground">_ESCROW</span>
            </div>
            <div className="hidden md:block h-4 w-px bg-border" />
            <div className="hidden md:flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              <span className="size-1.5 bg-led-green glow-green" />
              Stellar_Mainnet · Online
            </div>
          </div>
          <WalletConnect
            address={address}
            onConnect={(_, addr) => setAddress(addr)}
            onDisconnect={() => {
              setAddress(null);
              toast({ title: "Disconnected" });
            }}
          />
        </div>
      </header>

      <main className="flex-1 max-w-[1440px] w-full mx-auto px-6 lg:px-10 py-10 lg:py-14 flex flex-col gap-10">
        {/* Title */}
        <section className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
              Gig-Escrow Console
            </h1>
            <p className="mt-2 text-sm text-muted-foreground max-w-xl">
              Trustless freelance contracts on Soroban. Lock funds, track milestones, and release on multi-sig approval.
            </p>
          </div>
          {address && <CreateGigDialog onCreate={(g) => setGigs((p) => [g, ...p])} />}
        </section>

        {/* Stats */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          <StatPanel
            label="Funds in Escrow"
            value={stats.escrow.toLocaleString()}
            unit="USDC"
            accent="cyan"
            meta={
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Held by Soroban Contract
              </span>
            }
          />
          <StatPanel
            label="Active Gigs"
            value={String(stats.active).padStart(2, "0")}
            meta={
              <div className="flex gap-1">
                {Array.from({ length: Math.min(stats.active, 8) }).map((_, i) => (
                  <div key={i} className="w-1.5 h-5 bg-led-green glow-green" />
                ))}
                {stats.active === 0 && (
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    None active
                  </span>
                )}
              </div>
            }
          />
          <StatPanel
            label="Pending Approval"
            value={String(stats.pending).padStart(2, "0")}
            meta={
              <div className="flex gap-1">
                {Array.from({ length: stats.pending }).map((_, i) => (
                  <div key={i} className="w-1.5 h-5 bg-led-amber glow-amber animate-pulse-led" />
                ))}
                {stats.pending === 0 && (
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    All clear
                  </span>
                )}
              </div>
            }
          />
        </section>

        {/* Ledger */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="font-mono text-sm uppercase tracking-widest text-foreground">
              ▸ Contract_Radar
            </h2>
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              {gigs.length} {gigs.length === 1 ? "Entry" : "Entries"}
            </div>
          </div>

          {!address ? (
            <EmptyState walletConnected={false} onCreate={(g) => setGigs((p) => [g, ...p])} />
          ) : gigs.length === 0 ? (
            <EmptyState walletConnected onCreate={(g) => setGigs((p) => [g, ...p])} />
          ) : (
            <GigsTable gigs={gigs} onAction={handleAction} />
          )}
        </section>

        {/* Footer */}
        <footer className="mt-auto pt-10 border-t border-border flex flex-col md:flex-row md:items-center md:justify-between gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          <div>Built for Stellar Hackathon · Soroban + Passkey Kit</div>
          <div className="flex items-center gap-2">
            <span className="size-1.5 bg-led-cyan glow-cyan" />
            Latency 0.3s · Fee &lt;$0.001
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
