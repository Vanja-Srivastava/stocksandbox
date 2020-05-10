const mongoose = require('mongoose')
const holdingsSchema = mongoose.Schema(
    {
        userId: String,
        symbol: String,
        quantity: Number,
        type: {type: String, enum: ["BUY", "SELL"]},
    },
    {collection: 'holdings'}
);
module.exports = holdingsSchema;
