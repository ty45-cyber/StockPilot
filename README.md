# ✈️ StockPilot

**StockPilot turns plain-English investment goals into verifiable, programmable tokenized-stock strategies that execute on Base.**

Built for the Base Hackathon (September 2026).

---

## 💡 The Vision

Base has introduced Coinbase Tokenized Stocks (B20 tokens), bringing traditional equities like `$NVDAc` and `$MSFTc` on-chain. But interacting with them manually is tedious. 

StockPilot introduces a new financial primitive: **The Programmable Portfolio**.

Instead of manually swapping USDC for 5 different tokens, users simply type:
> *"I have $500. Build me an AI portfolio. No company above 20% and keep 10% in USDC."*

StockPilot compiles this into a structured Strategy DSL, deterministically validates the tokenized stock contracts against an official registry, and previews the exact execution route on Base for the user to sign.

## ✨ Core Features (MVP)

*   🧠 **AI Strategy Compiler:** Translates natural language into a strict JSON Strategy DSL.
*   🛡️ **Deterministic Validation:** A Rust backend validates all AI outputs. If the AI suggests an unverified token, exceeds 100% weight, or breaks a user constraint, the compiler rejects it.
*   ✅ **Asset Verification Layer:** Turns contract verification into a UI feature. Users see exactly which B20 tokens are verified by Coinbase before signing.
*   ⚡ **1-Click Execution Preview:** Routes USDC into a multi-token portfolio via DEX adapters (e.g., Aerodrome) on Base.
*   ⚙️ **Programmable Rules Engine:** Add automated logic to your portfolio (e.g., `WHEN NVDAc drops 10% THEN BUY $25`).

## 🏗️ Architecture

StockPilot explicitly separates AI intent from execution authority. **The AI never generates calldata and never touches funds.**

```text
USER INTENT (Natural Language)
       ↓
AI STRATEGY COMPILER (LLM -> Strategy DSL)
       ↓
RUST VALIDATOR (Strict constraints & asset registry verification)
       ↓
EXECUTION PLANNER (Route calculation)
       ↓
USER SIGNATURE (Wagmi / Viem on Base)
       ↓
LIVE PORTFOLIO & RULES ENGINE