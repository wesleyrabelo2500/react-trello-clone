import WrappedSignUpForm from './components/SignUpForm';
import React, { Component } from 'react';
import { doCreateUserWithEmailAndPassword } from './api/auth';
import { doCreateUser } from '../core/api/db';
import { BOARDS } from '../core/routes/routes';
import { withRouter } from 'react-router-dom';

class SignUpScreen extends Component {
    async onSubmit(email, password, username) {
        return doCreateUserWithEmailAndPassword(email, password).then(authUser => {
            doCreateUser(authUser.user.uid, username, email);
            window.history.push(BOARDS);
        });
    }

    render() {
        return <WrappedSignUpForm onSubmit={this.onSubmit} />;
    }
}

export const WrappedSignUpScreen = withRouter(SignUpScreen);
