import React, { Component } from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import StocksActions from './actions';

describe('Stocks.Actions', () => {

    it('Render', () => {
        const wrapper = shallow(<StocksActions />);

        expect(wrapper.html()).toMatchSnapshot();
    });

    it('Snapshot an object graph', () => {
        const someObject = {
            foo: 'bar',
            baz: 'buzz'
        }

        expect(someObject).toMatchSnapshot();
    });

});