// Network cosmos network api's.
const juno = 'https://juno-api.polkachu.com/staking/validators';
const persistence = 'https://persistence-api.polkachu.com/staking/validators';
const assetMantle = 'https://assetmantle-api.polkachu.com/staking/validators';
const bitcanna = 'https://bitcanna-api.polkachu.com/staking/validators';
const osmosis = 'https://api.osl.zone/staking/validators';
const cosmos = 'https://lcd-cosmoshub.blockapsis.com/staking/validators';
const api = [juno, persistence, assetMantle, bitcanna, cosmos, osmosis];

// DVS monikers.
const monikers = ["POSTHUMAN∞DVS", "web34ever", "cyberG", "Imperator.co", "vbloher", "stakr-space", "Doma🏠Nodes", "👋 79anvi 🍀", "Colinka", "Paranormal Brothers", "ECO Stake 🌱", "POSTHUMAN ꝏ DVS"];

// Module export
module.exports = { api, monikers };

