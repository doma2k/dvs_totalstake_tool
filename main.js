const axios = require('axios');
const urls = require('./data/coingecko.js').urls;
const names = require('./data/coingecko.js').names;
const dvs = require('./data/networkapi.js').monikers;
const apiArray = require('./data/networkapi.js').api;

let prices = [];
let totalStake = [];

const getCurrentPrice = async (url) => {
    try {
        const response = await axios.get(url);
        const currentPrice = response.data.prices[response.data.prices.length - 1][1];
        prices.push(currentPrice.toFixed(9));

    } catch (error) {
        console.error(`An error occurred while fetching the data from ${url}: ${error}`);
    }
}

const price = async () => {
    console.log("Collecting data, please whait....");
    for (let i = 0; i < urls.length; i++) {
        await getCurrentPrice(urls[i]);
        await new Promise(resolve => setTimeout(resolve, 5000));
    }
}

price(urls).then(() => {
    getValidatorsList(apiArray, function (total) {
        // Callback function that gives total stake value for DVS.
        console.log("Total stake: $" + total.toLocaleString());
    });
})
    

// Get validators data.
const getValidatorsList = async (apiArray, callback) => {
    apiArray.forEach(async (api, index) => {
        try {
            const response = await axios.get(api);
            const validators = response.data.result;
            console.log('\n');
            console.log(names[index]);
            console.log("Market price: $" + prices[index]);
            for (let i = 0; i < dvs.length; i++) {
                const filteredValidators = validators.filter(validator => validator.description.moniker === dvs[i]);
                filteredValidators.forEach(validator => {
                    let x = 0;
                    if (validator.tokens.length > 18) {
                        x = (validator.tokens / 1000000000000000000).toFixed();
                    } else {
                        x = (validator.tokens / 1000000).toFixed();
                    }
                    let tokenValue = x * prices[index];
                    totalStake.push(tokenValue);
                    console.log(validator.description.moniker + " tokens:" + x);
                });
            }
            let total = totalStake.reduce((acc, val) => acc + val);
            callback(total);
        } catch (error) {
            console.error(`An error occurred while fetching the data from ${apiArray[index]}: ${error}`);
        }
    });
}



