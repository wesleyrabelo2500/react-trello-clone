import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import { GlobalStyle } from './global-styles';
import { AuthUserContext } from './auth/utils/AuthUserContext';
import AuthorizedNavigation from './navigation/AuthorizedNavigation';
import { ACCOUNT, BOARD, BOARDS, LANDING, PASSWORD_FORGET, SIGN_IN, SIGN_UP } from './core/routes/routes';
import { WrappedSignUpScreen } from './auth/SignUp';
import { SignInScreen } from './auth/SignIn';
import PasswordForgetScreen from './auth/PasswordForget';
import { WrapperBoardsScreen } from './pages/boards/Boards';
import { WrapperAccountScreen } from './auth/Account';
import { WrapperBoardScreen } from './pages/board/Board';
import { NotFoundScreen } from './pages/not-found/NotFound';
import { withAuthentication } from './auth/utils/AuthHOC';

export const Content = withAuthentication(() => (
    <Router>
        <React.Fragment>
            <AuthUserContext.Consumer>
                {authUser => (authUser ? <AuthorizedNavigation /> : <div />)}
            </AuthUserContext.Consumer>

            <Switch className="container">
                {<Route exact path={LANDING} render={() => <Redirect to={BOARDS} />} />}
                <Route exact path={SIGN_UP} component={WrappedSignUpScreen} />
                <Route exact path={SIGN_IN} component={SignInScreen} />
                <Route exact path={PASSWORD_FORGET} component={PasswordForgetScreen} />
                {<Route exact path={BOARDS} component={WrapperBoardsScreen} />}
                <Route exact path={ACCOUNT} component={WrapperAccountScreen} />
                <Route exact path={BOARD} component={WrapperBoardScreen} />
                <Route component={NotFoundScreen} />
            </Switch>
        </React.Fragment>
    </Router>
));

export default class App extends Component {
    render() {
        return (
            <React.Fragment>
                <GlobalStyle />
                <Content />
            </React.Fragment>
        );
    }
}
