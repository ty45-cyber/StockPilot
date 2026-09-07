use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct StrategyPolicy {
    pub name: String,
    pub capital_usdc: f64,
    pub assets: Vec<AssetAllocation>,
    pub reserve: f64, // e.g., 0.10 for 10%
    pub rebalance_days: u32,
    pub rules: Vec<StrategyRule>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct AssetAllocation {
    pub symbol: String,
    pub weight: f64, // e.g., 0.20 for 20%
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct StrategyRule {
    pub condition_type: String, // "PRICE_DROP", "POSITION_ABOVE"
    pub target_symbol: Option<String>,
    pub threshold: f64,
    pub action_type: String, // "BUY", "SELL", "REBALANCE"
    pub action_value: Option<f64>, 
}