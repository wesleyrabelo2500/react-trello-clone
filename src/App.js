import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import AccountPage from './auth/pages/Account';
import Landing from './pages/Landing';
import PasswordForgetPage from './auth/pages/PasswordForget';
import SignInPage from './auth/pages/SignIn';
import WrappedSignUpPage from './auth/pages/SignUp';
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
                {/* <Route exact path={LANDING} render={() => <Redirect to={BOARDS} />} /> */}
                <Route exact path={LANDING} component={Landing} />
                <Route exact path={SIGN_UP} component={WrappedSignUpPage} />
                <Route exact path={SIGN_IN} component={SignInPage} />
                <Route exact path={PASSWORD_FORGET} component={PasswordForgetPage} />
                <Route exact path={ACCOUNT} component={AccountPage} />
                <Route exact path={BOARDS} component={BoardsPage} />
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
