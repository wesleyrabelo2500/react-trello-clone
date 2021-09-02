import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { WrapperAccountScreen } from './auth/pages/Account';
import PasswordForgetScreen from './auth/pages/PasswordForget';
import { SignInScreen } from './auth/pages/SignIn';
import { WrappedSignUpPage } from './auth/pages/SignUp';
import { withAuthentication } from './auth/utils/AuthHOC';
import { AuthUserContext } from './auth/utils/AuthUserContext';
import AuthorizedNavigation from './core/layout/AuthNavigation';
import BoardPage from './features/board/pages/Board';
import BoardsPage from './features/boards/pages/Boards';
import { GlobalStyle } from './global-styles';
import { NotFoundScreen } from './pages/NotFound';
import { ACCOUNT, BOARD, BOARDS, LANDING, PASSWORD_FORGET, SIGN_IN, SIGN_UP } from './routes';

export const Content = withAuthentication(() => (
    <Router>
        <React.Fragment>
            <AuthUserContext.Consumer>
                {(authUser) => (authUser ? <AuthorizedNavigation /> : <div />)}
            </AuthUserContext.Consumer>

            <Switch className="container">
                {<Route exact path={LANDING} render={() => <Redirect to={BOARDS} />} />}
                <Route exact path={SIGN_UP} component={WrappedSignUpPage} />
                <Route exact path={SIGN_IN} component={SignInScreen} />
                <Route exact path={PASSWORD_FORGET} component={PasswordForgetScreen} />
                <Route exact path={ACCOUNT} component={WrapperAccountScreen} />
                {<Route exact path={BOARDS} component={BoardsPage} />}
                <Route exact path={BOARD} component={BoardPage} />
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
