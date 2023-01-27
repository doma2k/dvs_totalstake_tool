const axios = require('axios');
const urls = require('./data/coingecko.js').urls;
const names = require('./data/coingecko.js').names;
const dvs = require('./data/networkapi.js').monikers;
const apiArray = require('./data/networkapi.js').api;

let prices = [];
let totalStake = [];

const getCurrentPrice = async (url, index) => {
    try {
        await setTimeout(async () => {
            const response = await axios.get(url);
            const currentPrice = response.data.prices[response.data.prices.length - 1][1];
            if (currentPrice === undefined) {
                console.log("restarting request for url: ", url);
                getCurrentPrice(url, index);
            } else {
                prices.push(currentPrice);
                return currentPrice;
            }
        }, 1000 * index);
    } catch (err) {
        console.error(err);
    }
};

const getCurrentPrices = async (urls) => {
    await Promise.all(urls.map(getCurrentPrice));
};

getCurrentPrices(urls).then(() => {
    getValidatorsList(apiArray, function (total) {
        // Callback function that gives total stake value for DVS.
        console.log("Total stake: $" + total.toFixed(0));
    });
});


// Get validators data.
const getValidatorsList = async (apiArray, callback) => {
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
                    if (prices[index] === undefined) {
                        console.log("restarting request for url: ", url);
                        getCurrentPrice(url, index);
                    } else {
                        let tokenValue = x * prices[index];
                        totalStake.push(tokenValue);
                        console.log(validator.description.moniker + " : $" + tokenValue.toFixed(0));
                    }
                });
            }
            let total = totalStake.reduce((acc, val) => acc + val);
            callback(total);
        }, 1000 * index);
    });
}

