import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

// auth
import { AuthUserContext } from './auth/utils/AuthUserContext';
import { withAuthentication } from './auth/utils/AuthHOC';

// core
import AuthorizedNavigation from './core/layout/AuthNavigation';
import { ACCOUNT, BOARD, BOARDS, LANDING, PASSWORD_FORGET, SIGN_IN, SIGN_UP } from './core/routes/routes';

// pages
import { WrappedSignUpPage } from './pages/SignUp';
import { SignInScreen } from './pages/SignIn';
import PasswordForgetScreen from './pages/PasswordForget';
import { WrapperBoardsScreen } from './pages/Boards';
import { WrapperAccountScreen } from './pages/Account';
import { WrapperBoardScreen } from './pages/Board';
import { NotFoundScreen } from './pages/NotFound';

// styles
import { GlobalStyle } from './global-styles';

//React-Bootstrap styles
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';



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
    constructor(props){
        super(props)
        this.state = {
            renderContent: false,
        }

    }
    buttonHandler = () => {
        this.setState({renderContent: true})
    }


    render() {
        console.log(this.state.renderContent)
        return (
            <div>
                <React.Fragment>
                    <Navbar bg="dark">
                        <Container>
                            <Navbar.Brand style={{color:'white'}} href="/">Brand link</Navbar.Brand>
                            <Button onClick={this.buttonHandler}>Log In</Button>
                        </Container>
                    </Navbar>
                    {this.state.renderContent ?  <Content /> : null } 
                    <GlobalStyle />
                </React.Fragment>
            </div>
        );
    }
}
