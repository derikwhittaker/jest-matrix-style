import React, { Component } from 'react';
import {
    Grid,
    Button,
    Icon
} from 'material-ui';
import { Link } from 'react-router-dom'
import numeral from 'numeral';


const StocksActions = () => {

    return (
        <Grid container className='stocks-actions-container'>
            <Grid item xs={12} className='grid-right'>
                {/* <Link to='/purchase'> */}
                <Button variant="raised" color="primary">
                    Purchase
                        </Button>
                {/* </Link> */}
            </Grid>
        </Grid>
    )
}

export default StocksActions;