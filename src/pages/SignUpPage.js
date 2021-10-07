import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { EMAIL_ERROR_TYPES } from '../constants';
import { createUser, createUserWithEmailAndPassword } from '../services/auth';

const SignUpForm = ({ onSubmit }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, serConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [emailInputErr, setEmailInputErr] = useState({
        status: null,
        message: null,
    });

    const handleSubmit = async () => {
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

    const handleEmailInputBlur = () => {
        setEmailInputErr({
            status: EMAIL_ERROR_TYPES.INVALID.STATUS,
            message: EMAIL_ERROR_TYPES.INVALID.MESSAGE,
        });
    };

    return (
        <div>
            <h1 className={`text-xl mb-3 text-center`}>Sign Up</h1>
            <Form onFinish={(event) => handleSubmit(event)} className="login-form">
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input
                        prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
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
                        prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
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
                        prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
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
                        prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="Confirm password"
                        onChange={(event) => serConfirmPassword(event.target.value)}
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className={`w-full`}>
                        Sign Up
                    </Button>
                </Form.Item>

                <div className={`text-red-500`}>{error}</div>
            </Form>
        </div>
    );
};

export const SignUpPage = withRouter(() => {
    const onSubmit = async (email, password, username) => {
        const authUser = await createUserWithEmailAndPassword(email, password);
        await createUser(authUser.user.uid, username, email);
    };

    return (
        <div className={`flex h-full`}>
            <div className={`w-64 m-auto`}>
                <SignUpForm onSubmit={onSubmit} />
            </div>
        </div>
    );
});
