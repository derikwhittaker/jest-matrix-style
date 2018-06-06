

const { logger } = require('../lib/logger');

const stocks = [
    {
        symbol: 'FB',
        lastPrice: 184.50,
        purchasePrice: 115.35,
        units: 100,
        totalGain: 6915.00,
        value: 18450.00
    },
    {
        symbol: 'TSLA',
        lastPrice: 284.50,
        purchasePrice: 305.19,
        units: 334,
        totalGain: -6910.46,
        value: 95023.00
    },
    {
        symbol: 'MSFT',
        lastPrice: 98.360,
        purchasePrice: 27.74,
        units: 225,
        totalGain: 15889.50,
        value: 22131.00
    },
    {
        symbol: 'AAPL',
        lastPrice: 188.58,
        purchasePrice: 149.94,
        units: 150,
        totalGain: 7146.00,
        value: 28287.00
    },
    {
        symbol: 'CSCO',
        lastPrice: 43.26,
        purchasePrice: 22.24,
        units: 400,
        totalGain: 8498.00,
        value: 17304.00
    }
]

function ExecuteOrder(order) {

    stocks.push(order);
}

function GetStocks() {
    logger.info("StocksService.GetStocks", 'Attempting to pull all stocks');

    const orderedStocks = stocks.sort((a, b) => {
        return b.symbol < a.symbol;
    })

    return Promise.resolve({
        successful: true,
        data: orderedStocks
    });
}

module.exports = {
    ExecuteOrder,
    GetStocks
}