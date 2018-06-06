import React, { Component } from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import StocksService from './stockService';

describe('StocksService', () => {

    describe('ExecuteOrder', () => {

        it('When given an order, will add it to the stocks inventory correctly', () => {
            const order = {
                symbol: 'ABC',
                lastPrice: 14.50,
                purchasePrice: 14.50,
                units: 100,
                totalGain: 0.00,
                value: 1450.00
            };

            const originalStocks = StocksService.GetStocks();

            StocksService.ExecuteOrder(order);

            return StocksService.GetStocks()
                .then(results => {
                    const updatedStocks = results.data;

                    expect(updatedStocks).toHaveLength(6);

                });

        });
    });

});
