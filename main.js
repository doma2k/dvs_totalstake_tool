const https = require('https');
const axios = require('axios');
const urls = require('./data/coingecko.js').urls;
const names = require('./data/coingecko.js').names;
const dvs = require('./data/networkapi.js').monikers;
const apiArray = require('./data/networkapi.js').api;


let prices = []
const getCurrentPrice = (url) => {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            res.setEncoding('utf8');
            let body = '';
            res.on('data', (data) => {
                body += data;
            });
            res.on('end', () => {
                const response = JSON.parse(body);
                const currentPrice = response.prices[response.prices.length - 1][1];
                prices.push(currentPrice);
                resolve(currentPrice)
            });
        });
    });
};

const getCurrentPrices = async (urls) => {
    await Promise.all(urls.map(getCurrentPrice));
};
getCurrentPrices(urls).then(() => {
    getValidatorsList(apiArray);
});


// Get validators data.
async function getValidatorsList(apiArray) {
    apiArray.forEach(async (api, index) => {
        setTimeout(async () => {
            const response = await axios.get(api);
            const validators = response.data.result;
            console.log('\n');
            console.log(names[index]);
            console.log(prices[index]);
            for (let i = 0; i < dvs.length; i++) {
                const filteredValidators = validators.filter(validator => validator.description.moniker === dvs[i]);
                filteredValidators.forEach(validator => {
                    let x = (validator.tokens / 1000000).toFixed();
                    let tokenValue = x * prices[index];
                    console.log(validator.description.moniker + " : $" + tokenValue.toFixed(0));
                });
            }
        }, 1000 * index);
    });
}























