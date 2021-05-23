import React, { Component } from 'react';
import Routes from './core/routes';
import { GlobalStyle } from './global-styles';

export default class App extends Component {
    render() {
        return (
            <React.Fragment>
                <GlobalStyle />
                <Routes />
            </React.Fragment>
        );
    }
}
