'use client';

import { useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { Providers } from './providers';
import { CommandCenter } from '@/components/CommandCenter';
import { StrategyCompiler } from '@/components/StrategyCompiler';
import { ExecutionPreview } from '@/components/ExecutionPreview';
import { StrategyPolicy, PipelineStep } from '@/types/strategy';

function MainApp() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const [step, setStep] = useState<PipelineStep>('INPUT');
  const [policy, setPolicy] = useState<StrategyPolicy | null>(null);

  const handleCompile = async (prompt: string) => {
    setStep('COMPILING');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/strategy/compile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      
      // Fallback mock strategy response for immediate frontend testing
      const data: StrategyPolicy = res.ok ? await res.json() : {
        name: 'AI Infrastructure Basket',
        capital_usdc: 500,
        reserve: 0.10,
        rebalance_days: 7,
        assets: [
          { symbol: 'NVDAc', name: 'Nvidia Corp', weight: 0.20, contractAddress: '0x1234...5678', verified: true },
          { symbol: 'MSFTc', name: 'Microsoft Corp', weight: 0.20, contractAddress: '0x2345...6789', verified: true },
          { symbol: 'GOOGLc', name: 'Alphabet Inc', weight: 0.20, contractAddress: '0x3456...7890', verified: true },
          { symbol: 'AMZNc', name: 'Amazon Inc', weight: 0.20, contractAddress: '0x4567...8901', verified: true },
          { symbol: 'METAc', name: 'Meta Platforms', weight: 0.10, contractAddress: '0x5678...9012', verified: true },
        ],
        rules: [
          { condition_type: 'PRICE_DROP', target_symbol: 'NVDAc', threshold: 10, action_type: 'BUY', action_value: 25 },
        ],
      };

      setPolicy(data);
      setStep('COMPILED');
    } catch (e) {
      console.error(e);
      setStep('INPUT');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans border-t-2 border-emerald-500">
      {/* Top Bar */}
      <nav className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center border-b border-zinc-900">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-xl tracking-tight text-white">StockPilot</span>
          <span className="text-xs bg-zinc-800 text-zinc-400 font-mono px-2 py-0.5 rounded">BASE</span>
        </div>

        <div>
          {isConnected ? (
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-zinc-400 bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800">
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </span>
              <button
                onClick={() => disconnect()}
                className="text-xs text-zinc-500 hover:text-zinc-300 font-mono"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button
              onClick={() => connect({ connector: connectors[0] })}
              className="bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-xs px-4 py-2 rounded-lg transition"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </nav>

      {/* Workspace */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {step === 'INPUT' && <CommandCenter onCompile={handleCompile} isLoading={false} />}
        {step === 'COMPILING' && (
          <div className="text-center py-20 font-mono text-zinc-400 animate-pulse">
            Compiling Strategy DSL & Verifying Coinbase Token Contracts...
          </div>
        )}
        {step === 'COMPILED' && policy && (
          <StrategyCompiler
            policy={policy}
            onProceed={() => setStep('PREVIEW')}
            onReset={() => setStep('INPUT')}
          />
        )}
        {step === 'PREVIEW' && policy && (
          <ExecutionPreview
            policy={policy}
            onBack={() => setStep('COMPILED')}
            onSuccess={() => setStep('SUCCESS')}
          />
        )}
        {step === 'SUCCESS' && (
          <div className="max-w-md mx-auto text-center space-y-4 py-12">
            <div className="text-4xl">🚀</div>
            <h2 className="text-2xl font-bold text-white">Strategy Deployed to Base</h2>
            <p className="text-zinc-400 text-sm">
              Your tokenized stock portfolio is active and programmable monitoring rules are set.
            </p>
            <button
              onClick={() => setStep('INPUT')}
              className="bg-zinc-800 hover:bg-zinc-700 text-white font-mono text-xs px-4 py-2 rounded-lg"
            >
              Create Another Strategy
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <Providers>
      <MainApp />
    </Providers>
  );
}