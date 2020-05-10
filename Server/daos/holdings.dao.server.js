const holdingsModel = require('../models/holdings.model.server');
const financeApiService = require('../services/yahoo-finance-api.server');
const userDao = require('./users.dao.server');

const createHolding = async (holding) => {
    foundHolding = await holdingsModel.findOne({symbol: holding.symbol, userId: holding.userId});
    const companyCurrentPrice = await financeApiService.findLatestStockPrice(holding.symbol);
    const price = companyCurrentPrice.last_price * holding.quantity;
    let user = await userDao.findUserById(holding.userId);
    if(foundHolding == null) {
        user.balance = user.balance - price;
        await userDao.updateUser(user);
        return await holdingsModel.create(holding)
    }
    else {
        if(holding.type === 'BUY') {
            foundHolding.quantity = foundHolding.quantity + holding.quantity;
            user.balance = user.balance - price;
        }
        else {
            foundHolding.quantity = foundHolding.quantity - holding.quantity;
            user.balance = user.balance + price;
        }
        await userDao.updateUser(user);
        if(foundHolding.quantity != 0)
            return await foundHolding.save();
        else
            return holdingsModel.remove({symbol: holding.symbol, userId: holding.userId});
    }
};

const findAllHoldings = () =>
    holdingsModel.find();

const findHoldingsForUserId = async (userId) => {
    return await holdingsModel.find({userId: userId})
};

const findHoldingsForUserForCompany = async (userId, tickerSymbol) => {
    return await holdingsModel.find({userId: userId, symbol: tickerSymbol})
};

const findTotalPortfolioValueForUser = async (userId) => {
    holdings = await findHoldingsForUserId(userId);
    let sum = 0;
    for(var i =0; i < holdings.length; i++) {
        holding = holdings[i];
        const companyCurrentPrice = await financeApiService.findLatestStockPrice(holding.symbol);
        sum = sum + companyCurrentPrice.last_price * holding.quantity;
    }
    return sum;
};

module.exports = {
    createHolding,
    findAllHoldings,
    findHoldingsForUserId,
    findHoldingsForUserForCompany,
    findTotalPortfolioValueForUser
};
