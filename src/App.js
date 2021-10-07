import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { withAuthentication, AuthUserContext } from './utils';
import { ROUTES } from './constants';
import { BoardPage, SignUpPage, NotFoundPage, BoardsPage, SignInPage } from './pages';
import { Navbar } from './components';
import './index.css';

export const Content = withAuthentication(() => (
    <Router>
        <>
            <AuthUserContext.Consumer>
                {(authUser) => authUser && <Navbar />}
            </AuthUserContext.Consumer>

            <div className="h-full">
                <Switch>
                    <Redirect exact from="/" to="/boards" />
                    <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
                    <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
                    <Route exact path={ROUTES.BOARDS} component={BoardsPage} />
                    <Route exact path={ROUTES.BOARD} component={BoardPage} />
                    <Route component={NotFoundPage} />
                </Switch>
            </div>
        </>
    </Router>
));

const App = () => <Content />;

export default App;
