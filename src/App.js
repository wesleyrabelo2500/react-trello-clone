import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

// core
import AuthorizedNavigation from './core/layout/AuthNavigation';
import { ACCOUNT, BOARD, BOARDS, LANDING, PASSWORD_FORGET, SIGN_IN, SIGN_UP } from './routes';

// auth
import { AuthUserContext } from './auth/utils/AuthUserContext';
import { withAuthentication } from './auth/utils/AuthHOC';
import { WrappedSignUpPage } from './auth/pages/SignUp';
import { SignInScreen } from './auth/pages/SignIn';
import PasswordForgetScreen from './auth/pages/PasswordForget';
import { WrapperAccountScreen } from './auth/pages/Account';

// pages
import { WrapperBoardsScreen } from './pages/Boards';
import { WrapperBoardScreen } from './pages/Board';
import { NotFoundScreen } from './pages/NotFound';

// styles
import { GlobalStyle } from './global-styles';

export const Content = withAuthentication(() => (
    <Router>
        <React.Fragment>
            <AuthUserContext.Consumer>
                {authUser => (authUser ? <AuthorizedNavigation /> : <div />)}
            </AuthUserContext.Consumer>

            <Switch className="container">
                {<Route exact path={LANDING} render={() => <Redirect to={BOARDS} />} />}
                <Route exact path={SIGN_UP} component={WrappedSignUpPage} />
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
