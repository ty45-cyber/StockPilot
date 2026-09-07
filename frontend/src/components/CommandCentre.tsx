'use client';

import { useState } from 'react';

const EXAMPLE_PROMPTS = [
  'Build me a $500 AI infrastructure portfolio. Max 20% per stock, 10% USDC.',
  'Allocate $1,000 across mega-cap tech, keep 15% in reserve.',
  'Build a $250 semiconductor strategy with weekly rebalancing.',
];

interface CommandCenterProps {
  onCompile: (prompt: string) => void;
  isLoading: boolean;
}

export function CommandCenter({ onCompile, isLoading }: CommandCenterProps) {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) onCompile(prompt);
  };

  return (
    <div className="max-w-3xl mx-auto text-center space-y-6 pt-12">
      <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
        PROGRAMMABLE EQUITIES ON BASE
      </div>
      
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
        Tell StockPilot what your money should do.
      </h1>
      
      <p className="text-zinc-400 text-lg">
        Turn natural language investment goals into verified, programmable tokenized-stock strategies.
      </p>

      <form onSubmit={handleSubmit} className="relative mt-8">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="I have $500. Build me an AI portfolio. No company above 20% and keep 10% in USDC..."
          rows={4}
          className="w-full rounded-xl bg-zinc-900 border border-zinc-800 p-4 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none font-mono text-sm shadow-inner"
        />
        <button
          type="submit"
          disabled={isLoading || !prompt.trim()}
          className="absolute bottom-4 right-4 bg-emerald-500 hover:bg-emerald-400 disabled:bg-zinc-800 disabled:text-zinc-600 text-zinc-950 font-semibold px-5 py-2.5 rounded-lg transition text-sm"
        >
          {isLoading ? 'Compiling Strategy...' : 'Build Strategy →'}
        </button>
      </form>

      <div className="flex flex-wrap gap-2 justify-center pt-2">
        {EXAMPLE_PROMPTS.map((example, i) => (
          <button
            key={i}
            onClick={() => setPrompt(example)}
            className="text-xs bg-zinc-900 hover:bg-zinc-800 text-zinc-400 border border-zinc-800 px-3 py-1.5 rounded-full transition"
          >
            "{example}"
          </button>
        ))}
      </div>
    </div>
  );
}