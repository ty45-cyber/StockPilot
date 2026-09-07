'use client';

import { useState } from 'react';
import { AssetAllocation, StrategyRule } from '@/types/strategy';

interface RulesPanelProps {
  assets: AssetAllocation[];
  onAddRule: (rule: StrategyRule) => void;
}

export function RulesPanel({ assets, onAddRule }: RulesPanelProps) {
  const [targetSymbol, setTargetSymbol] = useState(assets[0]?.symbol || 'NVDAc');
  const [condition, setCondition] = useState<'PRICE_DROP' | 'PERCENT_GAIN' | 'POSITION_ABOVE'>('PRICE_DROP');
  const [threshold, setThreshold] = useState('10');
  const [actionType, setActionType] = useState<'BUY' | 'SELL' | 'REBALANCE'>('BUY');
  const [actionValue, setActionValue] = useState('25');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddRule({
      condition_type: condition,
      target_symbol: targetSymbol,
      threshold: parseFloat(threshold),
      action_type: actionType,
      action_value: parseFloat(actionValue),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 space-y-4 font-mono text-xs">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div>
          <label className="text-zinc-500 block mb-1">Target Asset</label>
          <select
            value={targetSymbol}
            onChange={(e) => setTargetSymbol(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-white"
          >
            {assets.map((a) => (
              <option key={a.symbol} value={a.symbol}>{a.symbol}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-zinc-500 block mb-1">Condition</label>
          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value as any)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-white"
          >
            <option value="PRICE_DROP">PRICE DROPS BY (%)</option>
            <option value="PERCENT_GAIN">PRICE GAINS BY (%)</option>
            <option value="POSITION_ABOVE">POSITION EXCEEDS (%)</option>
          </select>
        </div>

        <div>
          <label className="text-zinc-500 block mb-1">Threshold Value</label>
          <input
            type="number"
            value={threshold}
            onChange={(e) => setThreshold(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-white"
            placeholder="10"
          />
        </div>

        <div>
          <label className="text-zinc-500 block mb-1">Action Amount ($)</label>
          <input
            type="number"
            value={actionValue}
            onChange={(e) => setActionValue(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded p-2 text-white"
            placeholder="25"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold px-4 py-2 rounded transition"
        >
          Save Rule Policy
        </button>
      </div>
    </form>
  );
}