const stockModel = require('../models/stocks.model.server');

const createStock = (stock) => {
    return stockModel.create(stock)
};

const findStockForSymbol = (symbol) => {
    return stockModel.findOne({tickerSymbol: symbol})
};

const findAllStocks = () => {
    return stockModel.find()
};

const updateStock = (stock) => {
    return stockModel.findOneAndUpdate({tickerSymbol: stock.tickerSymbol}, stock,{new:true, upsert:true},(err, doc) => {
        if (err) {
            console.log("Something wrong when updating data!");
        }

        console.log(doc);
    });
};

module.exports = {
    createStock,
    findStockForSymbol,
    updateStock,
    findAllStocks
};
