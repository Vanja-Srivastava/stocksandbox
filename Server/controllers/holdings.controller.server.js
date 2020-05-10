const holdingsDao = require('../daos/holdings.dao.server');

module.exports = (app) => {
    app.post('/api/holdings', (req, res) => {
      const newHolding = req.body;
      holdingsDao.createHolding(newHolding).then(createdHolding => res.send(createdHolding))
    });

    app.get('/api/holdings',(req,res) => {
        holdingsDao.findAllHoldings().then(allHoldings => res.json(allHoldings))
    });

    app.get('/api/holdings/:userId', (req, res) => {
        holdingsDao.findHoldingsForUserId(req.params.userId).then(userHoldings => res.json(userHoldings))
    });

    app.get('/api/holdings/:userId/:tickerSymbol', (req, res) => {
        holdingsDao.findHoldingsForUserForCompany(req.params.userId, req.params.tickerSymbol)
            .then(holdings => res.json(holdings))
    });

    app.get('/api/holdingsTotal/:userId', async (req, res) => {
        value = await holdingsDao.findTotalPortfolioValueForUser(req.params.userId);
        res.send(value + '');
    })
};
