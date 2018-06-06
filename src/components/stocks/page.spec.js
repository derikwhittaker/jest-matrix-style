jest.mock('../../lib/logger');

import React, { Component } from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import stocksService from '../../services/stockService';
import StocksPage from './page';
import { ExpansionPanelActions } from 'material-ui';

describe('Stocks.Page', () => {

    describe('componentDidMount', () => {

        // to allow us to reuse/clean the items
        let serviceStub = null;

        afterEach(() => {
            if (serviceStub && serviceStub.restore) {
                serviceStub.restore();
            }
        });

        // Point out that I am doing a return because of the fact CDM is a promise
        it('When StockService returns correctly, will add stocks to state', () => {
            const stock = {
                symbol: 'FB',
                lastPrice: 184.50,
                purchasePrice: 115.35,
                units: 100,
                totalGain: 6915.00,
                value: 18450.00
            };

            serviceStub = sinon.stub(stocksService, 'GetStocks')
                .resolves({
                    successful: true,
                    data: [stock]
                });

            const wrapper = shallow(<StocksPage />);
            const component = wrapper.instance();

            return component.componentDidMount()
                .then(() => {

                    const stocks = component.state.data.stocks;

                    expect(stocks).toHaveLength(1);
                    expect(stocks[0]).toEqual(stock);
                });

        });

        it('When StockService returns correctly, will create totals correctly', () => {
            const stocks = [{
                symbol: 'FB',
                lastPrice: 184.50,
                purchasePrice: 115.35,
                units: 100,
                totalGain: 6915.00,
                value: 18450.00
            },
            {
                symbol: 'PS',
                lastPrice: 100.50,
                purchasePrice: 85.35,
                units: 100,
                totalGain: 6915.00,
                value: 18450.00
            },
            ];

            serviceStub = sinon.stub(stocksService, 'GetStocks')
                .resolves({
                    successful: true,
                    data: stocks
                });

            const wrapper = shallow(<StocksPage />);
            const component = wrapper.instance();

            return component.componentDidMount()
                .then(() => {

                    const totals = component.state.data.totals;

                    expect(totals).toEqual(
                        {
                            "totalGain": 13830,
                            "totalValue": 36900,
                            "units": 200
                        }
                    );
                });

        });

        it('When StockService failes, will set error state correctly', () => {
            const stocks = [{
                symbol: 'FB',
                lastPrice: 184.50,
                purchasePrice: 115.35,
                units: 100,
                totalGain: 6915.00,
                value: 18450.00
            },
            {
                symbol: 'PS',
                lastPrice: 100.50,
                purchasePrice: 85.35,
                units: 100,
                totalGain: 6915.00,
                value: 18450.00
            },
            ];

            serviceStub = sinon.stub(stocksService, 'GetStocks')
                .rejects({
                    successful: false,
                    message: "something bad happened"
                });

            const wrapper = shallow(<StocksPage />);
            const component = wrapper.instance();

            return component.componentDidMount()
                .then(() => {
                    expect(component.state.error).toEqual({ "message": "something bad happened", "successful": false });
                });

        });

        it('Test to show how to spy called', () => {
            const stock = {
                symbol: 'FB',
                lastPrice: 184.50,
                purchasePrice: 115.35,
                units: 100,
                totalGain: 6915.00,
                value: 18450.00
            };

            const getStocksSpy = sinon.spy(stocksService, 'GetStocks');

            const wrapper = shallow(<StocksPage />);
            const component = wrapper.instance();

            return component.componentDidMount()
                .then(() => {

                    expect(getStocksSpy.called).toBeTruthy();

                });

        });
    });

});
