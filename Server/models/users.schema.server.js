const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
                                       username: String,
                                       password: String,
                                       firstName: String,
                                       lastName: String,
                                       email: String,
                                       gender: String,
                                       role: String,
                                        phone: String,
                                        address: String,
                                        dateOfBirth: Date,
                                        dateOfJoining: Date,
                                        balance: Number,
                                        stocks: [String],
                                        status: String
                                   }, {collection:'users'});
module.exports = userSchema;
