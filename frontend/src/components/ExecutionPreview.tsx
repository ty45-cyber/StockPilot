'use client';

import { useAccount, useSendTransaction } from 'wagmi';
import { StrategyPolicy } from '@/types/strategy';

interface ExecutionPreviewProps {
  policy: StrategyPolicy;
  onBack: () => void;
  onSuccess: () => void;
}

export function ExecutionPreview({ policy, onBack, onSuccess }: ExecutionPreviewProps) {
  const { address, isConnected } = useAccount();
  const { sendTransaction, isPending } = useSendTransaction();

  const handleExecute = async () => {
    try {
      // In production, fetch transaction calldata from Rust Backend endpoint (/api/execution/quote)
      // Sending native/USDC mock approval or router transaction on Base:
      sendTransaction(
        {
          to: '0x0000000000000000000000000000000000000000', // Router Contract Address
          value: BigInt(0),
        },
        {
          onSuccess: () => {
            onSuccess();
          },
        }
      );
    } catch (err) {
      console.error('Execution rejected:', err);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-6">
      <div>
        <h3 className="text-xl font-bold text-white">Execution Preview</h3>
        <p className="text-xs text-zinc-400 mt-1 font-mono">Network: Base Mainnet</p>
      </div>

      {/* Execution Breakdown */}
      <div className="space-y-3 divide-y divide-zinc-800 font-mono text-sm">
        <div className="flex justify-between pb-2">
          <span className="text-zinc-400">Total Input</span>
          <span className="text-white font-bold">${policy.capital_usdc.toFixed(2)} USDC</span>
        </div>
        
        {policy.assets.map((asset) => (
          <div key={asset.symbol} className="flex justify-between py-2">
            <span className="text-zinc-300">Swap USDC → {asset.symbol}</span>
            <span className="text-zinc-200">${(policy.capital_usdc * asset.weight).toFixed(2)}</span>
          </div>
        ))}

        <div className="flex justify-between py-2">
          <span className="text-zinc-400">USDC Reserve</span>
          <span className="text-zinc-200">${(policy.capital_usdc * policy.reserve).toFixed(2)}</span>
        </div>

        <div className="pt-3 space-y-1 text-xs">
          <div className="flex justify-between text-zinc-500">
            <span>Route</span>
            <span>Aerodrome DEX Adapter</span>
          </div>
          <div className="flex justify-between text-zinc-500">
            <span>Est. Network Fee</span>
            <span>&lt; $0.05 (Base)</span>
          </div>
          <div className="flex justify-between text-zinc-500">
            <span>Max Slippage</span>
            <span>0.50%</span>
          </div>
        </div>
      </div>

      {/* Wallet Signature Trigger */}
      <div className="space-y-3 pt-2">
        {!isConnected ? (
          <div className="text-center p-3 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-lg text-xs font-mono">
            Please connect your Web3 wallet to sign execution orders.
          </div>
        ) : (
          <button
            onClick={handleExecute}
            disabled={isPending}
            className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:bg-zinc-800 text-zinc-950 font-bold py-3.5 rounded-lg transition"
          >
            {isPending ? 'Signing on Base...' : 'Sign & Execute Strategy'}
          </button>
        )}

        <button
          onClick={onBack}
          className="w-full text-zinc-400 hover:text-zinc-200 text-xs text-center font-mono py-1"
        >
          Cancel & Return
        </button>
      </div>
    </div>
  );
}