import React, { Component } from 'react';
import { withRouter } from 'react-router';
import {
    Button,
    Grid,
    Input,
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from 'material-ui';
import numeral from 'numeral';

import stocksService from '../../services/stockService';

class StocksPurchasePage extends Component {

    constructor(props) {
        super(props);

        // comes w/ `withRouter`
        this.history = props.history;

        this.state = {
            order: {
                units: 0,
                orderType: '',
                symbol: '',
                lastPrice: 0,
                totalPurchaseCost: 0
            }
        }

        this.calculateTotalCost = this.calculateTotalCost.bind(this);
        this.cancelOrder = this.cancelOrder.bind(this);
        this.executeOrder = this.executeOrder.bind(this);
        this.handleOrderTypeSelection = this.handleOrderTypeSelection.bind(this);
        this.handleunitsChanged = this.handleunitsChanged.bind(this);
        this.handleSymbolChanged = this.handleSymbolChanged.bind(this);
    }

    calculateTotalCost() {
        const order = this.state.order;

        if (order.units > 0 && order.symbol.length > 0 && order.orderType !== '') {
            const cost = order.units * order.lastPrice;

            order.totalPurchaseCost = cost;

            this.setState({ order });
        }
    }

    createRandomPrice() {
        const min = 15.23;
        const max = 252.91;

        return Math.random() * (max - min) + min;
    }

    cancelOrder() {
        this.history.goBack();
    }

    executeOrder() {
        const order = this.state.order;

        const newOrder = {
            symbol: order.symbol,
            lastPrice: order.lastPrice,
            purchasePrice: order.purchasePrice,
            units: order.units,
            totalGain: '0',
            value: order.totalPurchaseCost
        };

        stocksService.ExecuteOrder(newOrder);

        this.history.goBack();
    }

    handleOrderTypeSelection(e) {
        const value = e.target.value;
        const order = this.state.order;

        order.orderType = value;

        this.setState({ order });
        this.calculateTotalCost();
    }

    handleunitsChanged(e) {
        const value = e.target.value;
        const order = this.state.order;

        order.units = value;

        this.setState({ order });
        this.calculateTotalCost();
    }

    handleSymbolChanged(e) {
        const value = e.target.value;
        const order = this.state.order;

        order.symbol = value;
        order.lastPrice = this.createRandomPrice();

        this.setState({ order });

        this.calculateTotalCost();
    }

    render() {

        const order = this.state.order;

        return (
            <React.Fragment>
                <h2>Stocks Purchase</h2>

                <Grid container>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Order Type</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Symbol</TableCell>
                                <TableCell>Last Price Price</TableCell>
                                <TableCell>Total Purchase Cost</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>

                                <TableCell>
                                    <Select
                                        value={order.orderType}
                                        onChange={this.handleOrderTypeSelection}
                                        input={<Input name="name" id="name-disabled" />}
                                    >
                                        <MenuItem value="">
                                            <em></em>
                                        </MenuItem>
                                        <MenuItem value="buy">Buy</MenuItem>
                                        <MenuItem value="sell">Sell</MenuItem>
                                        <MenuItem value="short-sell">Short Sell</MenuItem>
                                    </Select>
                                </TableCell>
                                <TableCell><Input
                                    value={order.units}
                                    onChange={this.handleunitsChanged}
                                    placeholder='Enter units'
                                /></TableCell>
                                <TableCell><Input
                                    value={order.symbol}
                                    onChange={this.handleSymbolChanged}
                                    placeholder='Enter Symbol'
                                /></TableCell>
                                <TableCell>{numeral(order.lastPrice).format('$0,0.00')}</TableCell>
                                <TableCell>{numeral(order.totalPurchaseCost).format('$0,0.00')}</TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>

                </Grid>

                <Grid container style={{ paddingTop: 25 }}>
                    <Grid item xs={10} />
                    <Grid item xs={2} className='grid-right'>
                        <Button variant="raised" color="primary" id='execute-order' className='button-padding'
                            onClick={this.executeOrder}>
                            Execute
                        </Button>

                        <Button variant="raised" color="secondary" className='button-padding'
                            onClick={this.cancelOrder}>
                            Cancel
                        </Button>
                    </Grid>
                </Grid>

            </React.Fragment>
        )
    }
}

export default withRouter(StocksPurchasePage);