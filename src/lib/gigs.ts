export type GigStatus = "in_progress" | "awaiting_review" | "pending_deposit" | "dispute" | "settled";

export interface Gig {
  id: string;
  title: string;
  milestone: string;
  client: string;
  freelancer: string;
  amount: number;
  status: GigStatus;
  createdAt: number;
}

export const STATUS_META: Record<
  GigStatus,
  { label: string; color: "cyan" | "green" | "amber" | "red" | "muted"; pulse?: boolean }
> = {
  in_progress: { label: "In_Progress", color: "green" },
  awaiting_review: { label: "Awaiting_Review", color: "amber", pulse: true },
  pending_deposit: { label: "Pending_Deposit", color: "muted" },
  dispute: { label: "Dispute_Raised", color: "red", pulse: true },
  settled: { label: "Settled", color: "cyan" },
};

export const SEED_GIGS: Gig[] = [
  {
    id: "KRY-892A-4F91",
    title: "Rust Smart Contract Audit",
    milestone: "Milestone 2 / 3",
    client: "GDE3KQXM7Z9XTK",
    freelancer: "GBX8R2NL4P2L9V",
    amount: 5000,
    status: "in_progress",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3,
  },
  {
    id: "KRY-114B-8X22",
    title: "Soroban Yield Aggregator UI",
    milestone: "Final Delivery",
    client: "GDJ1QM3V2K9P0X",
    freelancer: "GBX8R2NL4P2L9V",
    amount: 3200,
    status: "awaiting_review",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 6,
  },
  {
    id: "KRY-773C-2M19",
    title: "Technical Whitepaper V2",
    milestone: "Full Draft",
    client: "GCC4H7H892TYUP",
    freelancer: "GBX8R2NL4P2L9V",
    amount: 1800,
    status: "pending_deposit",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 1,
  },
  {
    id: "KRY-441D-9R03",
    title: "Cross-chain Bridge Logic",
    milestone: "Milestone 1 / 2",
    client: "GAZ90QR5MN18VC",
    freelancer: "GBX8R2NL4P2L9V",
    amount: 4250,
    status: "dispute",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 9,
  },
];

export const truncateAddr = (a: string) =>
  a.length > 12 ? `${a.slice(0, 4)}...${a.slice(-4)}` : a;
