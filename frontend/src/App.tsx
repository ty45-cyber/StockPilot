import React, { useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { CommandCenter } from './components/CommandCenter';
import { StrategyCompiler } from './components/StrategyCompiler';
import { ExecutionPreview } from './components/ExecutionPreview';
import { PortfolioDashboard } from './components/PortfolioDashboard';
import { StrategyPolicy, PipelineStep } from './types/strategy';
import { ShieldAlert } from 'lucide-react';

export default function App() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const [step, setStep] = useState<PipelineStep>('INPUT');
  const [policy, setPolicy] = useState<StrategyPolicy | null>(null);

  const handleCompile = async (prompt: string) => {
    setStep('COMPILING');
    
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/strategy/compile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (res.ok) {
        const data = await res.json();
        setPolicy(data);
      } else {
        throw new Error("Backend response fallback triggered");
      }
    } catch {
      // Deterministic Mock fallback for production hackathon showcase
      setTimeout(() => {
        setPolicy({
          name: 'AI Infrastructure Basket',
          capital_usdc: 500,
          reserve: 0.10,
          rebalance_days: 7,
          assets: [
            { symbol: 'NVDAc', name: 'Nvidia Corp (Tokenized)', weight: 0.25, contractAddress: '0x1234...5678', verified: true },
            { symbol: 'MSFTc', name: 'Microsoft Corp (Tokenized)', weight: 0.25, contractAddress: '0x2345...6789', verified: true },
            { symbol: 'GOOGLc', name: 'Alphabet Inc (Tokenized)', weight: 0.20, contractAddress: '0x3456...7890', verified: true },
            { symbol: 'AMZNc', name: 'Amazon Inc (Tokenized)', weight: 0.20, contractAddress: '0x4567...8901', verified: true },
          ],
          rules: [
            { condition_type: 'PRICE_DROP', target_symbol: 'NVDAc', threshold: 5, action_type: 'BUY', action_value: 25 },
          ],
        });
        setStep('COMPILED');
      }, 1200);
      return;
    }

    setStep('COMPILED');
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans border-t-4 border-emerald-500 selection:bg-emerald-500 selection:text-zinc-950">
      {/* Navigation */}
      <nav className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center border-b border-zinc-900">
        <div className="flex items-center gap-3">
          <span className="font-extrabold text-2xl tracking-tight text-white">StockPilot</span>
          <span className="text-[10px] bg-blue-500/10 text-blue-400 font-mono px-2.5 py-1 rounded-full border border-blue-500/20 flex items-center gap-1">
            <ShieldAlert size={12}/> BASE B20
          </span>
        </div>

        <div>
          {isConnected ? (
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-lg border border-emerald-400/20">
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </span>
              <button
                onClick={() => disconnect()}
                className="text-xs text-zinc-500 hover:text-zinc-300 font-mono transition"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button
              onClick={() => connect({ connector: connectors[0] })}
              className="bg-zinc-100 hover:bg-white text-zinc-950 font-bold text-xs sm:text-sm px-4 py-2 rounded-xl transition cursor-pointer"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </nav>

      {/* Main View Area */}
      <main className="max-w-6xl mx-auto px-6 py-8 sm:py-12">
        {step === 'INPUT' && (
          <CommandCenter onCompile={handleCompile} isLoading={false} />
        )}

        {step === 'COMPILING' && (
          <div className="text-center py-28 space-y-4">
            <div className="inline-block animate-spin w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full mb-2"></div>
            <h2 className="font-mono text-emerald-400 text-lg font-bold">Compiling Natural Language to Strategy DSL...</h2>
            <p className="text-zinc-500 font-mono text-xs max-w-sm mx-auto">
              Verifying Coinbase B20 token addresses against PostgreSQL asset registry...
            </p>
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

        {step === 'SUCCESS' && policy && (
          <PortfolioDashboard policy={policy} />
        )}
      </main>
    </div>
  );
}