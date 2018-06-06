import React, { Component } from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import StocksListing from './listing';

describe('Stocks.Listing', () => {

    describe('Render', () => {
        it('Find Given Totals in UI Example', () => {
            const stocks = [];
            const totals = {
                units: 1,
                totalGain: 100,
                totalValue: 101
            };

            const wrapper = shallow(<StocksListing stocks={stocks} totals={totals} />);

            const totalsGainElement = wrapper.find("#totals-gain").first();

            expect(totalsGainElement.props().children).toBe("$100.00");
        });
    });

});