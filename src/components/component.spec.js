import React, { Component } from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

describe('First Test', () => {

    it('Math Demo', () => {
        const result = 3 + 3;

        expect(result).toBe(6);
    });

    it('Object Demo', () => {
        const expected = {
            totals: 1
        };

        const actual = {
            totals: 1
        };

        expect(actual).toEqual(expected)
    });

});