const mongoose = require('mongoose');
const stockSchema = require('./stocks.schema.server');
const stockModel =  mongoose.model(
    'StockModel',
    stockSchema
);
module.exports = stockModel;
