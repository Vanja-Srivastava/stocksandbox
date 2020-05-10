const mongoose = require('mongoose');
const stocksSchema = mongoose.Schema(
    {
        tickerSymbol: String,
        company: String,
        users: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'UserModel'
        }]
    },
    {collection: 'stocks'}
);
module.exports = stocksSchema;
