'use client';

import { useState } from 'react';
import { StrategyPolicy } from '@/types/strategy';
import { RulesPanel } from './RulesPanel';

interface PortfolioDashboardProps {
  policy: StrategyPolicy;
}

export function PortfolioDashboard({ policy }: PortfolioDashboardProps) {
  const [showAddRule, setShowAddRule] = useState(false);
  const [rules, setRules] = useState(policy.rules);

  // Mock initial portfolio performance metrics
  const portfolioValue = policy.capital_usdc * 1.0056; // +0.56% mock PnL
  const pnlUsd = portfolioValue - policy.capital_usdc;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <span className="text-xs text-zinc-500 font-mono uppercase">Portfolio Value</span>
          <div className="text-3xl font-extrabold text-white mt-1">
            ${portfolioValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <span className="text-xs text-emerald-400 font-mono font-semibold">
            +${pnlUsd.toFixed(2)} (+0.56%)
          </span>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <span className="text-xs text-zinc-500 font-mono uppercase">Active Strategy</span>
          <div className="text-xl font-bold text-white mt-1 truncate">{policy.name}</div>
          <span className="text-xs text-zinc-400 font-mono">Rebalance: Every {policy.rebalance_days} Days</span>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <span className="text-xs text-zinc-500 font-mono uppercase">Status</span>
          <div className="flex items-center gap-2 mt-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm font-mono font-semibold text-emerald-400">ACTIVE & MONITORING</span>
          </div>
        </div>
      </div>

      {/* Holdings Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
        <h3 className="text-lg font-bold text-white">Holdings Breakdown</h3>
        <div className="divide-y divide-zinc-800 font-mono text-sm">
          <div className="grid grid-cols-4 pb-2 text-xs text-zinc-500 uppercase">
            <span>Asset</span>
            <span>Allocation</span>
            <span>Target Weight</span>
            <span className="text-right">Value</span>
          </div>
          {policy.assets.map((asset) => {
            const assetVal = policy.capital_usdc * asset.weight;
            return (
              <div key={asset.symbol} className="grid grid-cols-4 py-3 items-center">
                <span className="font-bold text-white">{asset.symbol}</span>
                <span className="text-zinc-400">${assetVal.toFixed(2)}</span>
                <span className="text-zinc-400">{(asset.weight * 100).toFixed(0)}%</span>
                <span className="text-right text-emerald-400 font-semibold">${assetVal.toFixed(2)}</span>
              </div>
            );
          })}
          <div className="grid grid-cols-4 py-3 items-center text-zinc-400">
            <span>USDC Reserve</span>
            <span>${(policy.capital_usdc * policy.reserve).toFixed(2)}</span>
            <span>{(policy.reserve * 100).toFixed(0)}%</span>
            <span className="text-right">${(policy.capital_usdc * policy.reserve).toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Programmable Rules Management */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold text-white">Strategy Policy & Rules</h3>
            <p className="text-xs text-zinc-400">Automated conditions evaluated on Base market events.</p>
          </div>
          <button
            onClick={() => setShowAddRule(!showAddRule)}
            className="bg-zinc-800 hover:bg-zinc-700 text-emerald-400 font-mono text-xs px-3 py-1.5 rounded-lg border border-zinc-700 transition"
          >
            {showAddRule ? 'Close' : '+ Add Rule'}
          </button>
        </div>

        {showAddRule && (
          <RulesPanel
            assets={policy.assets}
            onAddRule={(newRule) => {
              setRules([...rules, newRule]);
              setShowAddRule(false);
            }}
          />
        )}

        <div className="space-y-2 pt-2">
          {rules.length === 0 ? (
            <p className="text-xs text-zinc-500 font-mono italic">No automated execution rules active.</p>
          ) : (
            rules.map((rule, idx) => (
              <div key={idx} className="bg-zinc-950 p-3 rounded-lg border border-zinc-800 flex justify-between items-center font-mono text-xs">
                <div>
                  <span className="text-emerald-400 font-bold">WHEN</span> {rule.target_symbol || 'PORTFOLIO'} {rule.condition_type} {rule.threshold}%{' '}
                  <span className="text-emerald-400 font-bold">THEN</span> {rule.action_type} ${rule.action_value}
                </div>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded">READY</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}