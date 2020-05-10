const mongoose = require('mongoose');
const transactionsSchema = require('./transactions.schema.server');
const transactionsModel = mongoose.model(
    'Transactions',
    transactionsSchema
);
module.exports = transactionsModel;
