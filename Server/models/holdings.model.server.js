const mongoose = require('mongoose');
const holdingsSchema = require('./holdings.schema.server');
const holdingsModel =  mongoose.model(
    'Holdings',
    holdingsSchema
);
module.exports = holdingsModel;
