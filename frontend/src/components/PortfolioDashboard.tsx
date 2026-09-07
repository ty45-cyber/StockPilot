import React from 'react';
import { StrategyPolicy } from '../types/strategy';
import { CheckCircle2, TrendingUp, Shield, Activity, PlusCircle } from 'lucide-react';

interface PortfolioDashboardProps {
  policy: StrategyPolicy;
}

export function PortfolioDashboard({ policy }: PortfolioDashboardProps) {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CheckCircle2 size={24} className="text-emerald-400" />
          <div>
            <h3 className="font-bold text-white text-sm sm:text-base">Strategy Live on Base Network</h3>
            <p className="text-xs text-zinc-400">Your tokenized equity basket was constructed and is now active.</p>
          </div>
        </div>
        <span className="text-xs font-mono bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/30">
          ACTIVE
        </span>
      </div>

      {/* Portfolio Overview */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl space-y-1">
          <span className="text-xs font-mono text-zinc-500 flex items-center gap-1">
            <TrendingUp size={14} className="text-emerald-400" /> PORTFOLIO VALUE
          </span>
          <div className="text-2xl font-bold font-mono text-white">${policy.capital_usdc.toFixed(2)}</div>
        </div>
        
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl space-y-1">
          <span className="text-xs font-mono text-zinc-500 flex items-center gap-1">
            <Shield size={14} className="text-blue-400" /> COINBASE B20 TOKENS
          </span>
          <div className="text-2xl font-bold font-mono text-white">{policy.assets.length} Holdings</div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl space-y-1">
          <span className="text-xs font-mono text-zinc-500 flex items-center gap-1">
            <Activity size={14} className="text-emerald-400" /> ACTIVE RULES
          </span>
          <div className="text-2xl font-bold font-mono text-emerald-400">{policy.rules.length} Trigger Active</div>
        </div>
      </div>

      {/* Holdings List */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white">Active Holdings</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {policy.assets.map((asset) => (
            <div key={asset.symbol} className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex justify-between items-center">
              <div>
                <span className="font-bold text-white block">{asset.symbol}</span>
                <span className="text-xs text-zinc-400">{asset.name}</span>
              </div>
              <div className="text-right font-mono">
                <span className="text-emerald-400 font-bold block">${(policy.capital_usdc * asset.weight).toFixed(2)}</span>
                <span className="text-xs text-zinc-500">{(asset.weight * 100).toFixed(0)}% allocation</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}