import React, { Component } from 'react';
import {
    Grid,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableFooter,
    TableRow
} from 'material-ui';
import numeral from 'numeral';
import PropTypes from 'prop-types';


class StocksListing extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: {
                stocks: props.stocks,
                totals: props.totals
            }
        }
    }

    componentWillReceiveProps(props) {
        const data = this.state.data;

        data.stocks = props.stocks;
        data.totals = props.totals;

        this.setState({ data });
    }

    render() {

        const { data } = this.state;

        return (
            <Grid container>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Symbol</TableCell>
                            <TableCell numeric>Units #</TableCell>
                            <TableCell numeric>Last Price</TableCell>
                            <TableCell numeric>Purchase Price</TableCell>
                            <TableCell numeric>Total Gain $</TableCell>
                            <TableCell numeric>Value</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.stocks.map(stock => {
                            return (<TableRow key={stock.symbol} id={stock.symbol}>
                                <TableCell>{stock.symbol}</TableCell>
                                <TableCell numeric>{stock.units}</TableCell>
                                <TableCell numeric>{numeral(stock.lastPrice).format('$0,0.00')}</TableCell>
                                <TableCell numeric>{numeral(stock.purchasePrice).format('$0,0.00')}</TableCell>
                                <TableCell numeric>{numeral(stock.totalGain).format('$0,0.00')}</TableCell>
                                <TableCell numeric>{numeral(stock.totalValue).format('$0,0.00')}</TableCell>
                            </TableRow>)
                        })}

                    </TableBody>

                    <TableFooter>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell id='totals-units' numeric>{data.totals.units}</TableCell>
                            <TableCell numeric></TableCell>
                            <TableCell numeric></TableCell>
                            <TableCell id='totals-gain' numeric>{numeral(data.totals.totalGain).format('$0,0.00')}</TableCell>
                            <TableCell id='totals-value' numeric>{numeral(data.totals.totalValue).format('$0,0.00')}</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </Grid>
        )
    }
}

StocksListing.propTypes = {
    stocks: PropTypes.array.isRequired,
    totals: PropTypes.object.isRequired
};

export default StocksListing;