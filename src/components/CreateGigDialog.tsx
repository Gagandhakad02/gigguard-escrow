import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import type { Gig } from "@/lib/gigs";
import { toast } from "@/hooks/use-toast";

interface CreateGigDialogProps {
  onCreate: (g: Gig) => void;
  disabled?: boolean;
}

export function CreateGigDialog({ onCreate, disabled }: CreateGigDialogProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [milestone, setMilestone] = useState("");
  const [freelancer, setFreelancer] = useState("");
  const [amount, setAmount] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !freelancer || !amount) return;
    const id = `KRY-${Math.random().toString(36).slice(2, 6).toUpperCase()}-${Math.random()
      .toString(36)
      .slice(2, 6)
      .toUpperCase()}`;
    onCreate({
      id,
      title,
      milestone: milestone || "Milestone 1 / 1",
      client: "GCLIENT_LOCAL",
      freelancer,
      amount: Number(amount),
      status: "pending_deposit",
      createdAt: Date.now(),
    });
    toast({ title: "Gig deployed", description: `Contract ${id} initialized` });
    setOpen(false);
    setTitle(""); setMilestone(""); setFreelancer(""); setAmount("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          disabled={disabled}
          className="flex items-center gap-2 px-4 py-2 bg-led-cyan text-background font-mono text-xs uppercase tracking-widest hover:bg-led-cyan/90 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <Plus className="size-3.5" strokeWidth={2.5} />
          Deploy_Contract
        </button>
      </DialogTrigger>
      <DialogContent className="bg-surface-panel border-border max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-mono uppercase tracking-widest text-sm text-led-cyan">
            ▸ Initialize_Escrow
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={submit} className="flex flex-col gap-4 mt-2">
          <Field label="Deliverable">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Soroban contract audit"
              className="w-full bg-surface-base border border-border px-3 py-2.5 font-mono text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-led-cyan/50"
            />
          </Field>
          <Field label="Milestone">
            <input
              value={milestone}
              onChange={(e) => setMilestone(e.target.value)}
              placeholder="Milestone 1 / 3"
              className="w-full bg-surface-base border border-border px-3 py-2.5 font-mono text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-led-cyan/50"
            />
          </Field>
          <Field label="Freelancer Address">
            <input
              value={freelancer}
              onChange={(e) => setFreelancer(e.target.value)}
              placeholder="GXXXX...XXXX"
              className="w-full bg-surface-base border border-border px-3 py-2.5 font-mono text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-led-cyan/50"
            />
          </Field>
          <Field label="Amount (USDC)">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full bg-surface-base border border-border px-3 py-2.5 font-mono text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-led-cyan/50"
            />
          </Field>
          <button
            type="submit"
            className="mt-2 px-4 py-3 bg-led-cyan text-background font-mono text-xs uppercase tracking-widest hover:bg-led-cyan/90 transition-all"
          >
            ▸ Lock_Funds_&_Deploy
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
