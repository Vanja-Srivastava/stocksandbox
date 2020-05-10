const transactionsModel = require('../models/transactions.model.server');

const createTransaction = async (transaction) =>
    transactionsModel.create(transaction);

const findAllTransactions = () =>
    transactionsModel.find();

const findTransactionsForUserId = (userId) =>
    transactionsModel.find({userId: userId});

module.exports = {
    createTransaction,
    findAllTransactions,
    findTransactionsForUserId
};

