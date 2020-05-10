const mongoose = require('mongoose');
const transactionsSchema = mongoose.Schema(
    {
        userId: String,
        symbol: String,
        quantity: Number,
        price: Number,
        type: {type: String, enum: ["BUY", "SELL"]},
        timestamp : Date
    }
);
module.exports = transactionsSchema;
