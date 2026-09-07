import React from 'react';
import { StrategyPolicy } from '../types/strategy';
import { ShieldCheck, ArrowRight, Code, RefreshCw, CheckCircle2 } from 'lucide-react';

interface StrategyCompilerProps {
  policy: StrategyPolicy;
  onProceed: () => void;
  onReset: () => void;
}

export function StrategyCompiler({ policy, onProceed, onReset }: StrategyCompilerProps) {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-800 pb-4">
        <div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
            COMPILED STRATEGY DSL
          </span>
          <h2 className="text-2xl font-bold text-white mt-2">{policy.name}</h2>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition bg-zinc-900 border border-zinc-800 px-3 py-2 rounded-lg"
        >
          <RefreshCw size={14} /> Re-compile Prompt
        </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left Column: Visual Asset Allocation */}
        <div className="lg:col-span-7 space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl">
              <span className="text-xs text-zinc-500 font-mono block mb-1">TOTAL CAPITAL</span>
              <span className="text-xl font-bold font-mono text-white">${policy.capital_usdc} USDC</span>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl">
              <span className="text-xs text-zinc-500 font-mono block mb-1">CASH RESERVE</span>
              <span className="text-xl font-bold font-mono text-emerald-400">{(policy.reserve * 100).toFixed(0)}%</span>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl">
              <span className="text-xs text-zinc-500 font-mono block mb-1">REBALANCE</span>
              <span className="text-xl font-bold font-mono text-white">{policy.rebalance_days} Days</span>
            </div>
          </div>

          <div className="space-y-3">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">Target Portfolio Allocation</span>
            {policy.assets.map((asset) => (
              <div
                key={asset.symbol}
                className="bg-zinc-900/80 border border-zinc-800 p-4 rounded-xl flex items-center justify-between hover:border-zinc-700 transition"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{asset.symbol}</span>
                    {asset.verified && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded border border-blue-500/20">
                        <ShieldCheck size={12} /> B20 VERIFIED
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-zinc-400 block">{asset.name}</span>
                  <span className="text-[10px] font-mono text-zinc-600 block">{asset.contractAddress}</span>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold font-mono text-emerald-400">{(asset.weight * 100).toFixed(0)}%</span>
                  <span className="text-xs text-zinc-500 block font-mono">
                    ${(policy.capital_usdc * asset.weight).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Programmed Rules Section */}
          {policy.rules.length > 0 && (
            <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-4 space-y-2">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">Automated Rule Engine</span>
              {policy.rules.map((rule, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs font-mono text-zinc-300 bg-zinc-900 p-2.5 rounded-lg border border-zinc-800">
                  <CheckCircle2 size={14} className="text-emerald-400" />
                  <span>WHEN <b>{rule.target_symbol}</b> drops {rule.threshold}% THEN <b>{rule.action_type}</b> ${rule.action_value} USDC</span>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={onProceed}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition shadow-lg shadow-emerald-500/10 cursor-pointer"
          >
            Preview Execution Route <ArrowRight size={18} />
          </button>
        </div>

        {/* Right Column: Code JSON Spec */}
        <div className="lg:col-span-5 bg-zinc-900 border border-zinc-800 rounded-2xl p-4 font-mono text-xs flex flex-col h-full min-h-[400px]">
          <div className="flex items-center justify-between mb-3 text-zinc-400 border-b border-zinc-800 pb-2">
            <div className="flex items-center gap-2">
              <Code size={14} className="text-emerald-400" />
              <span>compiled_policy.json</span>
            </div>
            <span className="text-[10px] bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded">RUST VALIDATED</span>
          </div>
          <pre className="text-emerald-400/90 overflow-auto flex-1 leading-relaxed bg-zinc-950/60 p-4 rounded-xl border border-zinc-800/50">
            {JSON.stringify(policy, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}