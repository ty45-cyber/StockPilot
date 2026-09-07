export interface AssetAllocation {
  symbol: string;
  name: string;
  weight: number; // e.g., 0.20 for 20%
  contractAddress: `0x${string}`;
  verified: boolean;
}

export interface StrategyRule {
  condition_type: 'PRICE_DROP' | 'PERCENT_GAIN' | 'POSITION_ABOVE';
  target_symbol?: string;
  threshold: number;
  action_type: 'BUY' | 'SELL' | 'REBALANCE';
  action_value?: number;
}

export interface StrategyPolicy {
  name: string;
  capital_usdc: number;
  assets: AssetAllocation[];
  reserve: number; // e.g. 0.10 for 10%
  rebalance_days: number;
  rules: StrategyRule[];
}

export type PipelineStep = 'INPUT' | 'COMPILING' | 'COMPILED' | 'PREVIEW' | 'EXECUTING' | 'SUCCESS';