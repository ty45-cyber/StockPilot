import React, { useState } from 'react';
import { StrategyPolicy } from '../types/strategy';
import { ArrowLeft, Zap, ExternalLink, CheckCircle } from 'lucide-react';

interface ExecutionPreviewProps {
  policy: StrategyPolicy;
  onBack: () => void;
  onSuccess: () => void;
}

export function ExecutionPreview({ policy, onBack, onSuccess }: ExecutionPreviewProps) {
  const [isExecuting, setIsExecuting] = useState(false);

  const handleExecute = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      onSuccess();
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition"
      >
        <ArrowLeft size={14} /> Back to Compiler
      </button>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Execution Route Preview</h2>
          <p className="text-xs text-zinc-400 mt-1">Base Network DEX Aggregator via Aerodrome / Uniswap v3</p>
        </div>

        <div className="space-y-3 font-mono text-xs">
          <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-3">
            <div className="flex justify-between text-zinc-400 pb-2 border-b border-zinc-800">
              <span>ACTION</span>
              <span>ESTIMATED OUTPUT</span>
            </div>
            
            {policy.assets.map((asset) => {
              const amount = policy.capital_usdc * asset.weight;
              return (
                <div key={asset.symbol} className="flex justify-between items-center text-zinc-200">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400">USDC</span>
                    <span>→</span>
                    <span className="font-bold text-white">{asset.symbol}</span>
                  </div>
                  <span>${amount.toFixed(2)} USDC</span>
                </div>
              );
            })}
          </div>

          <div className="bg-zinc-950/50 p-4 rounded-xl border border-zinc-800/80 space-y-2 text-zinc-400">
            <div className="flex justify-between">
              <span>Network</span>
              <span className="text-zinc-200">Base Mainnet (Chain ID 8453)</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Gas Fee</span>
              <span className="text-emerald-400">&lt; $0.05 USDC</span>
            </div>
            <div className="flex justify-between">
              <span>Slippage Tolerance</span>
              <span className="text-zinc-200">0.5%</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleExecute}
          disabled={isExecuting}
          className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition disabled:opacity-50 cursor-pointer shadow-lg shadow-emerald-500/10"
        >
          {isExecuting ? (
            <>
              <div className="w-4 h-4 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
              Signing & Executing Swaps on Base...
            </>
          ) : (
            <>
              <Zap size={18} /> Confirm & Execute Portfolio Strategy
            </>
          )}
        </button>
      </div>
    </div>
  );
}