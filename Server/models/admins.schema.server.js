const mongoose = require('mongoose');
const adminSchema = mongoose.Schema({
                                       username: String,
                                       password: String,
                                       firstName: String,
                                       lastName: String,
                                       email: String,
                                       role: String,
                                       phone: String,
                                       dateOfJoining: Date,
                                        status: String
                                   }, {collection:'admins'});
module.exports = adminSchema;
