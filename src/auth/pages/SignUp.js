import { Form, Input } from 'antd';
import { Icon } from '@ant-design/compatible';
import React, { Component, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { createUser } from '../../core/services/db';
import { LANDING } from '../../routes';
import { createUserWithEmailAndPassword } from '../services/auth';
import { ErrorMessage } from '../components/common/ErrorMessage';
import { FormButton } from '../components/common/FormButton';
import { FormContainer } from '../components/common/FormContainer';
import { EMAIL_ERROR_TYPES } from '../constants';

const SignUpForm = ({ form, onSubmit }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, serConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [emailInputErr, setEmailInputErr] = useState({
        status: '',
        message: '',
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (newPassword !== confirmPassword) {
            setError('new password and confirm password do not match');
            return;
        }
        const submitButton = document.querySelector('.signup-form-button');
        setEmailInputErr({
            status: '',
            message: '',
        });
        submitButton.disabled = true;
        try {
            await onSubmit(email, newPassword, username);
            submitButton.disabled = false;
        } catch (error) {
            submitButton.disabled = false;
            setError(error.message);
        }
    };

    const handleEmailInputBlur = (event) => {
        setEmailInputErr({
            status: EMAIL_ERROR_TYPES.INVALID.STATUS,
            message: EMAIL_ERROR_TYPES.INVALID.MESSAGE,
        });
    };

    return (
        <FormContainer>
            <h1 className="title">Sign Up</h1>
            <Form onSubmit={(event) => handleSubmit(event)} className="login-form">
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Username"
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </Form.Item>

                <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                    validateStatus={emailInputErr.status}
                    help={emailInputErr.message}
                >
                    <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Email"
                        onChange={(event) => setEmail(event.target.value)}
                        onBlur={handleEmailInputBlur}
                    />
                </Form.Item>

                <Form.Item
                    name="newPassword"
                    rules={[{ required: true, message: 'Please input your new password!' }]}
                >
                    <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="Password"
                        onChange={(event) => setNewPassword(event.target.value)}
                    />
                </Form.Item>

                <Form.Item
                    name="confirmPassword"
                    rules={[{ required: true, message: 'Please input your confirm password!' }]}
                >
                    <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="Confirm password"
                        onChange={(event) => serConfirmPassword(event.target.value)}
                    />
                </Form.Item>

                <Form.Item>
                    <FormButton
                        type="primary"
                        htmlType="submit"
                        className="login-form-button signup-form-button"
                    >
                        Sign Up
                    </FormButton>
                </Form.Item>

                <ErrorMessage>{error}</ErrorMessage>
            </Form>
        </FormContainer>
    );
};

function SignUpScreen() {
    const onSubmit = async (email, password, username) => {
        const authUser = await createUserWithEmailAndPassword(email, password);
        await createUser(authUser.user.uid, username, email);
        window.location = LANDING;
    };

    const WrappedSignUpForm = SignUpForm;
    return <WrappedSignUpForm onSubmit={onSubmit} />;
}

export default withRouter(SignUpScreen);
