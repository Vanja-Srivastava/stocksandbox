const fetch = require("node-fetch");

// const findCompanyProfile = (symbol) =>
//     fetch(`https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary?symbol=${symbol}`, {
//         headers: {
//             'X-RapidAPI-Key': '6b857a04bdmsh9a90cdc1639ee0cp181eaejsnb1676bec35ea'
//         }
//     }).then(response => response.json());
const findLatestStockPrice = (symbol) =>
    fetch(`https://api-v2.intrinio.com/securities/${symbol}/prices/realtime`, {
        headers: {
            api_key: 'OjE5MzM2NTMxNGFkN2RkOTM4MDVjN2MwN2RlMTczY2Vi'
        }
    })
        .then(response => response.json());

module.exports = {
    //findCompanyProfile,
    findLatestStockPrice
};
