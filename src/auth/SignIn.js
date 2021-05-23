import { FormContainer } from './components/FormContainer';
import { WrappedSignInForm } from './components/SignInForm';
import { PasswordForgetLink } from './components/PasswordForgetLink';
import { SignUpLink } from './components/SignUpLink';
import React from 'react';

export const SignInScreen = ({ history }) => (
    <FormContainer>
        <WrappedSignInForm history={history} />
        <PasswordForgetLink />
        <SignUpLink />
    </FormContainer>
);
