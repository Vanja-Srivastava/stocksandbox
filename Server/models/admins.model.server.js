const mongoose = require('mongoose');
const adminSchema = require('./admins.schema.server');
const adminModel =  mongoose.model(
    'AdminModel',
    adminSchema
);
module.exports = adminModel;
