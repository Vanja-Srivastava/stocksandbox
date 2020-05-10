const transactionsDao = require('../daos/transactions.dao.server');

module.exports = (app) => {
    app.post('/api/transactions', (req, res) => {
        const newTransaction = req.body;
        transactionsDao.createTransaction(newTransaction)
            .then(createdTransaction => res.send(createdTransaction))
    });

    app.get('/api/transactions',(req,res) => {
        transactionsDao.findAllTransactions()
            .then(allTransactions => res.json(allTransactions))
    });

    app.get('/api/transactions/:userId', (req, res) => {
        transactionsDao.findTransactionsForUserId(req.params.userId)
            .then(userTransactions => res.json(userTransactions))
    });
};
