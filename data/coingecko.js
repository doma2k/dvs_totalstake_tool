// List of coingecko links.
const assetMantle = `https://api.coingecko.com/api/v3/coins/assetmantle/market_chart?vs_currency=usd&days=max`;
const cosmos = `https://api.coingecko.com/api/v3/coins/cosmos/market_chart?vs_currency=usd&days=max`;
const osmosis = 'https://api.coingecko.com/api/v3/coins/osmosis/market_chart?vs_currency=usd&days=max';
const bitcanna = 'https://api.coingecko.com/api/v3/coins/bitcanna/market_chart?vs_currency=usd&days=max';
const juno = 'https://api.coingecko.com/api/v3/coins/juno-network/market_chart?vs_currency=usd&days=max';
const persistence = 'https://api.coingecko.com/api/v3/coins/persistence/market_chart?vs_currency=usd&days=max';

// const names = ['JUNO', 'XPRT', 'MANTLE', 'BCNA', 'ATOM', 'OSMO'];
const urls = [juno, persistence, assetMantle, bitcanna, cosmos, osmosis];
const names = ["JUNO", "PERSISTENCE", "ASSETMANTLE", "BITCANNA", "COSMOS", 'OSMOSIS']
module.exports = { urls, names };
