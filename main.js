const https = require('https');
const urls = require('./data/coingecko.js').urls;
const names = require('./data/coingecko.js').names;
const dvs = require('./data/networkapi.js').monikers;
const apiArray = require('./data/networkapi.js').api;

getCurrentPrices(urls);
getValidatorsList(apiArray);

let tokenPrice = [];

// Get validators data.
function getValidatorsList(apiArray) {
    for (let i = 0; i < apiArray.length; i++) {
        https.get(apiArray[i], (res) => {
            res.setEncoding('utf8');
            let body = '';
            res.on('data', (data) => {
                body += data;
            });
            res.on('end', () => {
                const validators = JSON.parse(body).result;
                console.log('\n');
                // Comparing JSON data to list of monikers.
                console.log(names[i]);
                for (let i = 0; i < dvs.length; i++) {
                    const filteredValidators = validators.filter(validator => validator.description.moniker === dvs[i]);
                    filteredValidators.forEach(validator => {
                        let x = (validator.tokens / 1000000).toFixed();
                        // console.log(validator.description.moniker + " : $" + ((validator.tokens / 1000000).toFixed(0) * tokenPrice).toFixed(0));
                        console.log(validator.description.moniker + " : " + x, "tokens");
                    });
                }
            }); 
        }); 
    }
}


// Getting prices from gitcoin.
async function getCurrentPrices(urls)
    {
    const coins = Object.keys(urls);
    for (let i = 0; i < urls.length; i++) {
        https.get(urls[i], (res) => {
            res.setEncoding('utf8');
            let body = '';
            res.on('data', (data) => {
                body += data;
            });
            res.on('end', () => {
                const response = JSON.parse(body);
                let tokenName = names[i];
                //get the last element of the prices array.
                const currentPrice = response.prices[response.prices.length - 1][1];
                tokenPrice = currentPrice;
                console.log(`${tokenName}: $${currentPrice.toFixed(2)}`);
            });
        });
    }
}











