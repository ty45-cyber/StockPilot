export type PipelineStep = 'INPUT' | 'COMPILING' | 'COMPILED' | 'PREVIEW' | 'SUCCESS';

export interface Asset {
  symbol: string;
  name: string;
  weight: number;
  contractAddress: string;
  verified: boolean;
}

export interface Rule {
  condition_type: string;
  target_symbol: string;
  threshold: number;
  action_type: string;
  action_value: number;
}

export interface StrategyPolicy {
  name: string;
  capital_usdc: number;
  reserve: number;
  rebalance_days: number;
  assets: Asset[];
  rules: Rule[];
}