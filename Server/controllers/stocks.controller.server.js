const stocksDao = require('../daos/stocks.dao.server');

module.exports = (app) => {
    app.post('/api/stocks', (req, res) => {
        const newStock = req.body;
        stocksDao.createStock(newStock).then(createdStock => res.send(createdStock))
    });

    app.get('/api/stocks',(req,res) => {
        stocksDao.findAllStocks().then(allStocks => res.json(allStocks))
    });

    app.get('/api/stocks/:symbol', (req, res) => {
        stocksDao.findStockForSymbol(req.params.symbol).then(curStocks => res.json(curStocks))
    });

    app.put('/api/stocks/', (req, res) => {
        stocksDao.updateStock(req.body).then(updatedStock => res.json(updatedStock))
    })
};
