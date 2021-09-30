import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { BOARDS, SIGN_IN } from '../../routes';
import { Spinner } from '../../shared/components/Spinner';
import { AuthUserContext } from './AuthUserContext';

export const withAuthentication = (Component) =>
    class WithAuthentication extends React.Component {
        state = {
            authUser: null,
        };

        componentDidMount() {
            firebase.auth().onAuthStateChanged((authUser) => {
                authUser ? this.setState({ authUser }) : this.setState({ authUser: null });
            });
        }

        render() {
            const { authUser } = this.state;

            return (
                <AuthUserContext.Provider value={authUser}>
                    <Component {...this.props} />
                </AuthUserContext.Provider>
            );
        }
    };

export const withAuthorization = (authCondition) => (Component) => {
    class WithAuthorization extends React.Component {
        componentDidMount() {
            firebase.auth().onAuthStateChanged((authUser) => {
                if (!authCondition(authUser)) {
                    this.props.history.push(SIGN_IN);
                }
            });
        }

        render() {
            return (
                <AuthUserContext.Consumer>
                    {(authUser) => (authUser ? <Component {...this.props} /> : null)}
                </AuthUserContext.Consumer>
            );
        }
    }

    return withRouter(WithAuthorization);
};

export const withLandingAuthentication = (Component) => {
    class WithLandingAuthentication extends React.Component{

        state = {
            loading: false
        }

        componentDidMount() {
            this.setState({loading: true})
            firebase.auth().onAuthStateChanged((authUser) => {
                this.setState({loading: false})
                if(authUser){
                    this.props.history.push(BOARDS);
                }
            });
        }

        render(){

            if(this.state.loading){
                return <Spinner />
            }
            
            return (
                <Component />
            )
        }
    }

    return WithLandingAuthentication
}
