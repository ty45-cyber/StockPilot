'use client';

import { StrategyPolicy } from '@/types/strategy';

interface StrategyCompilerProps {
  policy: StrategyPolicy;
  onProceed: () => void;
  onReset: () => void;
}

export function StrategyCompiler({ policy, onProceed, onReset }: StrategyCompilerProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header Metadata */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-wrap justify-between items-center gap-4">
        <div>
          <span className="text-xs text-zinc-500 uppercase tracking-wider font-mono">Strategy Name</span>
          <h2 className="text-2xl font-bold text-white">{policy.name}</h2>
        </div>
        <div className="flex gap-6 font-mono text-sm">
          <div>
            <span className="text-zinc-500 block text-xs">CAPITAL</span>
            <span className="text-emerald-400 font-bold">${policy.capital_usdc.toLocaleString()} USDC</span>
          </div>
          <div>
            <span className="text-zinc-500 block text-xs">RESERVE</span>
            <span className="text-white font-bold">{(policy.reserve * 100).toFixed(0)}%</span>
          </div>
          <div>
            <span className="text-zinc-500 block text-xs">REBALANCE</span>
            <span className="text-white font-bold">{policy.rebalance_days} Days</span>
          </div>
        </div>
      </div>

      {/* Asset Allocations & Verification Layer */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-zinc-200">Asset Verification & Allocations</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {policy.assets.map((asset) => {
            const allocationUsd = policy.capital_usdc * asset.weight;
            return (
              <div key={asset.symbol} className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-lg font-bold text-white">{asset.symbol}</span>
                    <span className="text-xs text-zinc-400 block">{asset.name}</span>
                  </div>
                  <div className="text-right font-mono">
                    <span className="text-white font-semibold">${allocationUsd.toFixed(2)}</span>
                    <span className="text-xs text-zinc-500 block">{(asset.weight * 100).toFixed(0)}%</span>
                  </div>
                </div>

                {/* Verification Badge */}
                <div className="pt-2 border-t border-zinc-800/80 flex justify-between items-center text-xs">
                  <span className="text-zinc-500 font-mono truncate max-w-[180px]">
                    {asset.contractAddress}
                  </span>
                  {asset.verified ? (
                    <span className="inline-flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-mono text-[10px]">
                      ✓ Coinbase Verified
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded font-mono text-[10px]">
                      Unverified
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Compiled DSL & Active Rules */}
      {policy.rules.length > 0 && (
        <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-5 space-y-3">
          <h4 className="text-sm font-semibold text-zinc-300">Programmable Rules Engine</h4>
          <div className="space-y-2 font-mono text-xs">
            {policy.rules.map((rule, idx) => (
              <div key={idx} className="bg-zinc-950 p-3 rounded border border-zinc-800 text-zinc-300">
                <span className="text-emerald-400">WHEN</span> {rule.target_symbol} {rule.condition_type} {rule.threshold}%{' '}
                <span className="text-emerald-400">THEN</span> {rule.action_type} ${rule.action_value}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action CTA */}
      <div className="flex justify-between items-center pt-4">
        <button
          onClick={onReset}
          className="text-zinc-400 hover:text-white text-sm font-mono"
        >
          ← Edit Prompt
        </button>
        <button
          onClick={onProceed}
          className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold px-6 py-3 rounded-lg transition"
        >
          Preview Execution →
        </button>
      </div>
    </div>
  );
}