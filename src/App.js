import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import logo from './logo.svg';
import './App.css';

import StocksPage from './components/stocks/page';
import StockPurchasePage from './components/stocksPurchase/page';

const AppHeader = () => {

    return (
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
        </header>
    );
};

const AppBody = () => {

    return (
        <div className='Body'>
            <BrowserRouter>
                <Switch>
                    <Route path='/' exact component={StocksPage} />
                    <Route path='/purchase' exact component={StockPurchasePage} />
                </Switch>
            </BrowserRouter>
        </div>
    );
};

class App extends Component {
    render() {

        return (
            <div className="App">
                <AppHeader />

                <AppBody />
            </div>
        );
    }
}

export default App;
