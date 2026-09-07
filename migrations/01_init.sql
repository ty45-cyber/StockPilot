CREATE TABLE assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    symbol VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    contract_address VARCHAR(42) NOT NULL,
    issuer VARCHAR(50) DEFAULT 'Coinbase',
    network VARCHAR(20) DEFAULT 'Base',
    is_verified BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed the official Coinbase Tokenized Stocks
INSERT INTO assets (symbol, name, contract_address) VALUES
('NVDAc', 'Nvidia', '0x...'), -- Replace with actual Base contract addresses
('MSFTc', 'Microsoft', '0x...'),
('GOOGLc', 'Alphabet', '0x...'),
('AMZNc', 'Amazon', '0x...'),
('METAc', 'Meta Platforms', '0x...'),
('AAPLc', 'Apple', '0x...'),
('MSTRc', 'MicroStrategy', '0x...'),
('TSLAc', 'Tesla', '0x...');

CREATE TABLE strategies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    wallet_address VARCHAR(42) NOT NULL,
    name VARCHAR(100) NOT NULL,
    prompt TEXT NOT NULL,
    capital_usdc NUMERIC(10, 2) NOT NULL,
    policy_json JSONB NOT NULL,
    status VARCHAR(20) DEFAULT 'DRAFT',
    created_at TIMESTAMPTZ DEFAULT NOW()
);