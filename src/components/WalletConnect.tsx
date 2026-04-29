import { useState } from "react";
import { Wallet, Fingerprint, ChevronDown, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "@/hooks/use-toast";

interface WalletConnectProps {
  address: string | null;
  onConnect: (provider: "freighter" | "passkey", address: string) => void;
  onDisconnect: () => void;
}

const mockAddress = (prefix: string) =>
  `G${prefix}${Math.random().toString(36).slice(2, 6).toUpperCase()}${Math.random()
    .toString(36)
    .slice(2, 6)
    .toUpperCase()}${Math.random().toString(36).slice(2, 4).toUpperCase()}`;

export function WalletConnect({ address, onConnect, onDisconnect }: WalletConnectProps) {
  const [open, setOpen] = useState(false);

  const connect = (provider: "freighter" | "passkey") => {
    const addr = mockAddress(provider === "freighter" ? "FR" : "PK");
    onConnect(provider, addr);
    setOpen(false);
    toast({
      title: `Connected via ${provider === "freighter" ? "Freighter" : "Passkey Kit"}`,
      description: `${addr.slice(0, 6)}...${addr.slice(-4)}`,
    });
  };

  if (address) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <button className="group flex items-center gap-3 px-4 py-2 bg-led-cyan/5 border border-led-cyan/30 text-led-cyan font-mono text-xs uppercase tracking-widest hover:bg-led-cyan/10 transition-all">
            <span className="size-1.5 bg-led-green glow-green rounded-full" />
            <span>{address.slice(0, 4)}...{address.slice(-4)}</span>
            <ChevronDown className="size-3" />
          </button>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          className="w-64 bg-surface-panel border-border p-2 font-mono text-xs"
        >
          <div className="px-2 py-2 text-muted-foreground uppercase tracking-widest text-[10px]">
            Connected
          </div>
          <div className="px-2 py-1 text-foreground break-all mb-2">{address}</div>
          <button
            onClick={onDisconnect}
            className="w-full flex items-center gap-2 px-2 py-2 text-led-red hover:bg-surface-hover uppercase tracking-widest"
          >
            <LogOut className="size-3" /> Disconnect
          </button>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "group flex items-center gap-3 px-4 py-2 bg-led-cyan/5 border border-led-cyan/30 text-led-cyan",
            "font-mono text-xs uppercase tracking-widest hover:bg-led-cyan/10 hover:border-led-cyan/50 transition-all"
          )}
        >
          <span className="size-1.5 bg-led-cyan glow-cyan rounded-full animate-pulse-led" />
          Connect_Wallet
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-72 bg-surface-panel border-border p-2">
        <div className="px-2 py-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Select Provider
        </div>
        <button
          onClick={() => connect("freighter")}
          className="w-full flex items-center gap-3 px-3 py-3 hover:bg-surface-hover transition-colors text-left group"
        >
          <Wallet className="size-4 text-led-cyan" />
          <div className="flex-1">
            <div className="font-mono text-sm text-foreground">Freighter</div>
            <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
              Browser extension
            </div>
          </div>
        </button>
        <button
          onClick={() => connect("passkey")}
          className="w-full flex items-center gap-3 px-3 py-3 hover:bg-surface-hover transition-colors text-left group"
        >
          <Fingerprint className="size-4 text-led-cyan" />
          <div className="flex-1">
            <div className="font-mono text-sm text-foreground">Passkey Kit</div>
            <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
              Gasless · Smart wallet
            </div>
          </div>
        </button>
      </PopoverContent>
    </Popover>
  );
}
