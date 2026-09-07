import React, { useState } from 'react';
import { Sparkles, Terminal, ArrowRight } from 'lucide-react';

interface CommandCenterProps {
  onCompile: (prompt: string) => void;
  isLoading: boolean;
}

const SAMPLE_PROMPTS = [
  "Build me a $500 AI infrastructure portfolio. Max 20% per stock, 10% USDC reserve.",
  "Invest $1,000 across Big Tech equities on Base with a 14-day auto-rebalance.",
  "Create a $250 basket split between NVDAc and MSFTc with a buy-the-dip rule at -5%."
];

export function CommandCenter({ onCompile, isLoading }: CommandCenterProps) {
  const [prompt, setPrompt] = useState(SAMPLE_PROMPTS[0]);

  return (
    <div className="max-w-3xl mx-auto space-y-8 mt-6">
      <div className="space-y-3 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
          Programmable Tokenized Equities
        </h1>
        <p className="text-zinc-400 max-w-xl mx-auto text-sm sm:text-base">
          Transform natural language into verifiable, executable B20 stock strategies on Base.
        </p>
      </div>

      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 shadow-2xl backdrop-blur focus-within:border-emerald-500/50 transition-all">
        <div className="flex items-center justify-between mb-3 text-zinc-400 font-mono text-xs border-b border-zinc-800/80 pb-2">
          <div className="flex items-center gap-2">
            <Terminal size={14} className="text-emerald-400" />
            <span>natural_language_intent.prompt</span>
          </div>
          <span className="text-emerald-500/80">LLM Compiler v1.0</span>
        </div>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full bg-transparent text-zinc-100 placeholder-zinc-600 outline-none resize-none h-32 font-sans text-base sm:text-lg leading-relaxed"
          placeholder="Describe your desired stock portfolio strategy..."
        />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-3 border-t border-zinc-800/80">
          <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
            Base Mainnet Verified Assets Only
          </div>

          <button
            onClick={() => onCompile(prompt)}
            disabled={isLoading || !prompt.trim()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold px-6 py-2.5 rounded-xl transition disabled:opacity-50 shadow-lg shadow-emerald-500/10 cursor-pointer"
          >
            <Sparkles size={16} />
            {isLoading ? 'Compiling Engine...' : 'Compile Strategy'}
          </button>
        </div>
      </div>

      {/* Preset Suggestions */}
      <div className="space-y-3">
        <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider block">Try a preset strategy prompt:</span>
        <div className="grid gap-2">
          {SAMPLE_PROMPTS.map((p, idx) => (
            <button
              key={idx}
              onClick={() => setPrompt(p)}
              className="text-left text-xs sm:text-sm bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800/60 hover:border-zinc-700 text-zinc-300 p-3 rounded-xl transition flex items-center justify-between group"
            >
              <span>"{p}"</span>
              <ArrowRight size={14} className="text-zinc-600 group-hover:text-emerald-400 transition-colors" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}