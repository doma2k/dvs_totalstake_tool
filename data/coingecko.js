// List of coingecko links.
const assetMantle = `https://api.coingecko.com/api/v3/coins/assetmantle/market_chart?vs_currency=usd&days=max`;
// const cosmos = `https://api.coingecko.com/api/v3/coins/cosmos/market_chart?vs_currency=usd&days=max`;
// const akash = 'https://api.coingecko.com/api/v3/coins/akash-network/market_chart?vs_currency=usd&days=max';
const osmosis = 'https://api.coingecko.com/api/v3/coins/osmosis/market_chart?vs_currency=usd&days=max';
// const axelar = 'https://api.coingecko.com/api/v3/coins/axelar/market_chart?vs_currency=usd&days=max';
// const band = 'https://api.coingecko.com/api/v3/coins/band-protocol/market_chart?vs_currency=usd&days=max';
const bitcanna = 'https://api.coingecko.com/api/v3/coins/bitcanna/market_chart?vs_currency=usd&days=max';
const juno = 'https://api.coingecko.com/api/v3/coins/juno-network/market_chart?vs_currency=usd&days=max';
const persistence = 'https://api.coingecko.com/api/v3/coins/persistence/market_chart?vs_currency=usd&days=max';

// const urls = [assetMantle, cosmos, akash, osmosis, axelar, band, bitcanna, juno];
// const names = ['MNTL', 'ATOM', 'AKT', 'OSMO', 'AXLR', 'BAND', 'BCNA', 'JUNO'];
const names = ['JUNO', 'XPRT', 'MANTLE', 'BCNA'];
const urls = [juno, persistence, assetMantle, bitcanna];

module.exports = { urls, names };
