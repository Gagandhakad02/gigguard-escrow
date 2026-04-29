import { Inbox } from "lucide-react";
import { CreateGigDialog } from "./CreateGigDialog";
import type { Gig } from "@/lib/gigs";

export function EmptyState({
  walletConnected,
  onCreate,
}: {
  walletConnected: boolean;
  onCreate: (g: Gig) => void;
}) {
  return (
    <div className="bg-surface-panel border border-border p-16 flex flex-col items-center text-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-led-cyan/40" />
      <div className="size-16 grid place-items-center border border-led-cyan/30 mb-6 relative">
        <Inbox className="size-7 text-led-cyan" />
        <div className="absolute -top-px left-0 w-full h-px bg-led-cyan glow-cyan" />
      </div>
      <h3 className="font-mono text-sm uppercase tracking-widest text-foreground mb-2">
        ▸ No_Active_Contracts
      </h3>
      <p className="text-muted-foreground text-sm max-w-md mb-8">
        {walletConnected
          ? "Deploy your first escrow contract to securely lock funds between you and a freelancer on Stellar."
          : "Connect your wallet to deploy a Soroban escrow contract. Funds are held trustlessly until both parties sign off."}
      </p>
      {walletConnected && <CreateGigDialog onCreate={onCreate} />}
    </div>
  );
}
