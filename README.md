Stellar Gig-Escrow
Hackathon Blueprint: From White Belt to Black Belt

This document provides the full-stack architecture, smart contract logic, and strategic
prompts required to build a winning project on the Stellar network using Soroban.
Our focus is Trustless Payments with Seamless User Onboarding.

1. Project Overview & Strategy
The Core Problem: Freelancers fear non-payment; clients fear low-quality delivery.
The Solution: A Soroban-powered escrow that locks funds in Stellar USDC. Funds are
released only upon mutual agreement or AI verification, using Passkeys to eliminate the
friction of crypto wallets.

2. Technical Architecture

Smart Contract (Soroban/Rust)
State Management: Stores Client, Freelancer, Amount, and Status.
Auth: Uses address.require_auth() to ensure only involved parties can
trigger state changes.
Balance: Utilizes the token::Client for cross-asset compatibility (USDC/
XLM).
•
•

•

3. The Progression Guide (Levels 1-6)

Level Focus Hackathon Milestone
White &
Yellow

Foundations

Setup Stellar CLI, deploy a "Hello World" contract, and
fund a Testnet account.

Orange &
Green

Core Logic

Implement the Escrow Rust contract with
require_auth and milestone logic.

Blue (Level
5)

MVP & UX

Build React Frontend with Stellar Passkey Kit.
Onboard 5 beta testers.

Black (Level
6)

Scale

Implement Fee-Bumps (Gasless) and scale to 20
users. Present at Demo Day.

// Simplified Escrow Logic
pub fn create_escrow(env: Env, client: Address, freelancer: Address,
amount: i128) {
client.require_auth();
// Logic to transfer token to contract address...
env.storage().instance().set(&DataKey::Escrow, &EscrowConfig
{ client, freelancer, amount });
}

4. Specialized AI Prompts

PROMPT: CONTRACT
"Act as a Senior Soroban Developer. Create a Rust contract for a Gig-Escrow.
Include a 'complete_gig' function requiring dual-signature (multi-sig) and a 7-day
timelock for dispute resolution. Use optimized storage for state archival."

PROMPT: FRONTEND
"Act as a Web3 UI Expert. Design a Next.js dashboard for Stellar Gig-Escrow.
Integrate Stellar Passkey Kit for biometric login. Use Tailwind CSS for a modern,
fintech-dark aesthetic."

5. Winning the Hackathon: Key Tips
Use Passkeys: Judges prioritize UX. If you don't require a 24-word seed phrase,
you're ahead of 90% of projects.
Gasless Transactions: Use Fee-Bumps so users don't need XLM to start.
Indexer Integration: Use Mercury or Zephyr to show a real-time history of
completed gigs.
url - https://gigguard-escrow.vercel.app/

