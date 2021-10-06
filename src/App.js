import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AccountPage from './pages/Account';
import Landing from './pages/Landing';
import SignInPage from './pages/SignIn';
import WrappedSignUpPage from './pages/SignUp';
import { withAuthentication } from './utils/auth-hoc';
import { AuthUserContext } from './utils/auth-user-context';
import Nav from './components/Nav';
import BoardPage from './pages/Board';
import BoardsPage from './pages/Boards';
import { GlobalStyle } from './styles/global-styles';
import { NotFoundScreen } from './pages/NotFound';

export const ROUTES = {
    SIGN_UP: '/signup',
    SIGN_IN: '/signin',
    LANDING: '/',
    BOARDS: '/boards',
    ACCOUNT: '/account',
    BOARD: '/b/:board',
};

export const Content = withAuthentication(() => (
    <Router>
        <React.Fragment>
            <AuthUserContext.Consumer>
                {(authUser) => (authUser ? <Nav /> : <div />)}
            </AuthUserContext.Consumer>

            <Switch className="container">
                <Route exact path={ROUTES.LANDING} component={Landing} />
                <Route exact path={ROUTES.SIGN_UP} component={WrappedSignUpPage} />
                <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
                <Route exact path={ROUTES.ACCOUNT} component={AccountPage} />
                <Route exact path={ROUTES.BOARDS} component={BoardsPage} />
                <Route exact path={ROUTES.BOARD} component={BoardPage} />
                <Route component={NotFoundScreen} />
            </Switch>
        </React.Fragment>
    </Router>
));

const App = () => {
    return (
        <>
            <GlobalStyle />
            <Content />
        </>
    );
};

export default App;
