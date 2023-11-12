import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import React, { useEffect, useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { AuthUserContext } from './auth-user-context';
import { ROUTES } from '../application/constants';

export const withAuthentication = (Component) => (props) => {
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((authUser = null) => {
            setAuthUser(authUser);
        });
    }, []);

    return (
        <AuthUserContext.Provider value={authUser}>
            <Component {...props} />
        </AuthUserContext.Provider>
    );
};

export const withAuthorization = (authCondition) => (Component) =>
    withRouter((props) => {
        useEffect(() => {
            firebase.auth().onAuthStateChanged((authUser) => {
                if (!authCondition(authUser)) {
                    props.history.push(ROUTES.SIGN_IN);
                }
            });
        }, [props.history]);
        const authUser = useContext(AuthUserContext);

        return authUser ? <Component {...props} /> : null;
    });
